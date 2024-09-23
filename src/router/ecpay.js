import express from 'express';
import crypto from 'crypto';
import Account from './../model/member.model'
import ShopMyDiamondOrder from './../model/shop-my-d-order.model'

// 綠界提供的 SDK
const ecpay_payment = require('ecpay_aio_nodejs');

// 直接將配置寫在這裡
const options = {
  OperationMode: 'Test', // Test or Production
  MercProfile: {
    MerchantID: '2000132',
    HashKey: '5294y06JbISpM5x9',
    HashIV: 'v77hoKGq4kWxNNIS',
  },
  IgnorePayment: [
    // "Credit",
    // "WebATM",
    // "ATM",
    // "CVS",
    // "BARCODE",
    // "AndroidPay"
  ],
  IsProjectContractor: false,
};

const router = express.Router();
let TradeNo;

router.get('/d_recharge', (req, res) => {
  // const MerchantTradeDate = new Date().toLocaleString('zh-TW', {
  //   year: 'numeric',
  //   month: '2-digit',
  //   day: '2-digit',
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   second: '2-digit',
  //   hour12: true,
  //   timeZone: 'Asia/Taipei', // 更新為正確的時區
  // });

  const { orderId, MerchantTradeDate, TotalAmount, fk_player_account } = req.query;

  if (!orderId || !MerchantTradeDate || !TotalAmount || !fk_player_account ) {
    return res.status(400).send('Missing required parameters');
  }
  
  TradeNo = new Date().getTime();
  let base_param = {
    MerchantTradeNo: TradeNo.toString(), // 確保是字符串
    MerchantTradeDate, // : MerchantTradeDate.toString(), // 確保是字符串
    TotalAmount, // 字符串類型
    TradeDesc: '測試交易描述', // 字符串類型
    ItemName: '遊戲鑽石', // 字符串類型
    ReturnURL: 'https://2196-1-160-29-159.ngrok-free.app/ecpay/callback',
    ClientBackURL: 'http://localhost:3000/shop/record#rechargeHistory',
    // OrderResultURL: 'http://localhost:3000/shop/recharge/result',
    CustomField1: fk_player_account,
    CustomField2: orderId,
  };

  // 打印所有參數以進行調試
  console.log('Base Parameters:', base_param);

  try {
    const create = new ecpay_payment(options);
    // console.log('Parameters being sent to ecpay:', base_param);
    const html = create.payment_client.aio_check_out_all(base_param);
    console.log(html);

    // 返回包含表單的 HTML 頁面，並確保表單自動提交
    res.send(`
      <html>
      <body>
        ${html}
        <script type="text/javascript">
          document.forms[0].submit();
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Error:', error.stack); // 打印詳細的錯誤堆棧
    res.status(500).send(`An error occurred: ${error.message}`);
  }
});

// 後端接收綠界回傳的資料
router.post('/callback', async (req, res) => {
  console.log('req.body:', req.body);

  try {
    const { CheckMacValue, TradeAmt, CustomField1, CustomField2 } = req.body;

    if (!CustomField1) {
      console.error('fk_player_account is missing in the callback');
      return res.status(400).send('fk_player_account is missing');
    }

    const data = { ...req.body };
    delete data.CheckMacValue;

    const create = new ecpay_payment(options);
    const checkValue = create.payment_client.helper.gen_chk_mac_value(data);
    console.log('確認交易正確性：', CheckMacValue === checkValue, CheckMacValue, checkValue);

    if (CheckMacValue !== checkValue) {
      console.error('CheckMacValue 校驗失敗');
      return res.status(400).send('Invalid CheckMacValue');
    }

    // 更新鑽石數量
    const fk_player_account = CustomField1;
    const amountToAdd = parseInt(TradeAmt, 10);
    if (isNaN(amountToAdd) || amountToAdd <= 0) {
      throw new Error('Invalid TradeAmt');
    }

    const account = await Account.findOne({ where: { login: fk_player_account } });
    if (!account) {
      console.error(`找不到帳號 ${fk_player_account}`);
      return res.status(404).send('Account not found');
    }

    console.log(`Current diamonds: ${account.diamond}`);
    account.diamond = parseInt(account.diamond, 10) || 0;
    // if (isNaN(account.diamond) || isNaN(amountToAdd)) {
    //   throw new Error('Invalid number');
    // }

    account.diamond += amountToAdd;
    await account.save();
    // await account.save(); // 儲存修改
    console.log(`Updated diamonds for user ${fk_player_account}: ${account.diamond}`);

    // 更新訂單狀態
    const order = await ShopMyDiamondOrder.findOne({ where: { id: CustomField2 } });
    if (!order) {
      console.error(`找不到訂單 ${CustomField2}`);
      return res.status(404).send('Order not found');
    }

    order.status = '付款完成';
    await order.save();
    console.log(`Updated order status for order ${CustomField2}`);

    res.send('1|OK'); // 回應綠界

    // notifyFrontend(account.diamond);
  } catch (error) {
    console.error('更新訂單狀態時發生錯誤:', error);
    return res.status(500).send('Internal Server Error');
  }
});


// 用戶交易完成後的轉址
router.get('http://localhost:3000/shop', (req, res) => {
  console.log('clientReturn:', req.body, req.query);
  res.render('return', { query: req.query });
});

export default router;
