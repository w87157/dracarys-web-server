import {
  FormTypeEnum,
  GoodsTypeEnum,
  ILive,
  IGoods,
  ILiveConfig,
  IRole,
  IShoppingCartItems,
  IShoppingCart,
  IShopProduct,
  IShopDiamond,
  IShopPayment,
  IShopOrderDetail,
  IShopItems,
  IShopMyOrder,
  IShopMyFavorite,
  IForum,
  IForumContent,
  IForumList,
  IForumNews,
  IForumTop,
  IArtworkType,
  IArtwork
} from "@/interface";
import { PROJECT_ENV, PROJECT_ENV_ENUM } from "@/constant";
import { resolveApp } from "@/utils";
import { devFddmBase64 } from "@/init/base64/dev_fddm";
import { devFlowerBase64 } from "@/init/base64/dev_flower";
import { fddmHyzdwmglBase64 } from "@/init/base64/fddm_hyzdwmgl";
import { fddmMhswBase64 } from "@/init/base64/fddm_mhsw";
import { fddmNewboyBase64 } from "@/init/base64/fddm_newboy";
import { fddmSnjxhBase64 } from "@/init/base64/fddm_snjxh";
import { fddmXyzcslBase64 } from "@/init/base64/fddm_xyzcsl";
import { live1Base64 } from "@/init/base64/live1";
import { live3Base64 } from "@/init/base64/live3";
import { faker } from '@faker-js/faker';


export const initUser = {
  admin: {
    id: 1,
    username: "admin",
    password: "123456",
    avatar: "https://resource.hsslive.cn/live-livehss-cn/image/author.webp",
    user_roles: [3, 7],
    live_room: {
      id: 1,
      roomName: "admin的直播間",
      localFile:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "/node/video/live1.mp4"
          : resolveApp("./public/live1.mp4"),
      remoteFlv:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "rtmp://localhost/live/livestream/live1"
          : "rtmp://localhost/live/livestream/live1",
      flvurl:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "http://localhost:5001/live/livestream/live1.flv"
          : "http://localhost:5001/live/livestream/live1.flv",
      base64:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod ? live1Base64 : live1Base64,
    },
  },
  systemUser1: {
    id: 2,
    username: "CoCo",
    password: "123456",
    user_roles: [5],
    avatar: "https://resource.hsslive.cn/live-livehss-cn/image/CoCo.webp",
    live_room: {
      id: 2,
      roomName: "CoCo的直播間",
      localFile:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "/node/video/live3.mp4"
          : resolveApp("./public/live3.mp4"),
      remoteFlv:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "rtmp://localhost/live/livestream/live3"
          : "rtmp://localhost/live/livestream/live3",
      flvurl:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "https://live.hsslive.cn/srsflv/live/livestream/live3"
          : "http://localhost:5001/live/livestream/live3.flv",
      base64:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? live3Base64
          : live3Base64,
    },
  },
  systemUser2: {
    id: 3,
    username: "Dukoo",
    password: "123456",
    avatar: "https://resource.hsslive.cn/live-livehss-cn/image/Dukoo.webp",
    user_roles: [5],
    live_room: {
      id: 3,
      roomName: "Dukoo的直播間",
      localFile:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "/node/video/fddm_hyzdwmgl.mp4"
          : resolveApp("./public/fddm.mp4"),
      remoteFlv:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "rtmp://localhost/live/livestream/fddm_hyzdwmgl"
          : "rtmp://localhost/live/livestream/dev_fddm",
      flvurl:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "https://live.hsslive.cn/srsflv/live/livestream/fddm_hyzdwmgl.flv"
          : "http://localhost:5001/live/livestream/dev_fddm.flv",
      base64:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? fddmHyzdwmglBase64
          : devFddmBase64,
    },
  },
  systemUser3: {
    id: 4,
    username: "MoonTIT",
    password: "123456",
    avatar: "https://resource.hsslive.cn/live-livehss-cn/image/MoonTIT.webp",
    user_roles: [5],
    live_room: {
      id: 4,
      roomName: "MoonTIT的直播間",
      localFile:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "/node/video/fddm_snjxh.mp4"
          : resolveApp("./public/fddm.mp4"),
      remoteFlv:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "rtmp://localhost/live/livestream/fddm_snjxh"
          : "rtmp://localhost/live/livestream/dev_fddm",
      flvurl:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "https://live.hsslive.cn/srsflv/live/livestream/fddm_snjxh.flv"
          : "http://localhost:5001/live/livestream/dev_fddm.flv",
      base64:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod ? fddmSnjxhBase64 : devFddmBase64,
    },
  },
  systemUser4: {
    id: 5,
    username: "Nill",
    password: "123456",
    avatar: "https://resource.hsslive.cn/live-livehss-cn/image/Nill.webp",
    user_roles: [5],
    live_room: {
      id: 5,
      roomName: "Nill的直播間",
      localFile:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "/node/video/fddm_newboy.mp4"
          : resolveApp("./public/fddm.mp4"),
      remoteFlv:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "rtmp://localhost/live/livestream/fddm_newboy"
          : "rtmp://localhost/live/livestream/dev_fddm",
      flvurl:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "https://live.hsslive.cn/srsflv/live/livestream/fddm_newboy.flv"
          : "http://localhost:5001/live/livestream/dev_fddm.flv",
      base64:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? fddmNewboyBase64
          : devFddmBase64,
    },
  },
  systemUser5: {
    id: 6,
    username: "Ojin",
    password: "123456",
    avatar: "https://resource.hsslive.cn/live-livehss-cn/image/Ojin.webp",
    user_roles: [5],
    live_room: {
      id: 6,
      roomName: "Ojin的直播間",
      localFile:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "/node/video/fddm_xyzcsl.mp4"
          : resolveApp("./public/fddm.mp4"),
      remoteFlv:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "rtmp://localhost/live/livestream/fddm_xyzcsl"
          : "rtmp://localhost/live/livestream/dev_fddm",
      flvurl:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? "https://live.hsslive.cn/srsflv/live/livestream/fddm_xyzcsl.flv"
          : "http://localhost:5001/live/livestream/dev_fddm.flv",
      base64:
        PROJECT_ENV === PROJECT_ENV_ENUM.prod
          ? fddmXyzcslBase64
          : devFddmBase64,
    },
  },
};

const initLive = (): ILive[] => {
  const defaultLive: ILive[] = [
    {
      id: 1,
      socketId: 'pLOfbTfgXFokod2sAAAB',
      roomId: 'oyf9KQ4QpoBm3Je',
      data: '{"roomId":"oyf9KQ4QpoBm3Je","data":{"roomName":"123123123","coverimage":"data:image/webp;base64,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"},"isAdmin":true}',
    },
  ];
  return defaultLive;
};

const initShopProduct = (): IShopProduct[] => {
  const defaultShopProduct: IShopProduct[] = [
    {
      id: 1,
      product_name: "新手冒險裝備組",
      product_desc:
        "每個新手冒險家的必備選擇！內含新手武器和初學者護甲套裝，為你的冒險提供堅實保障。",
      category: "A",
      price: 2000,
      image: "/shop/product_01.png",
      onshelf_status: "上架中",
    },
    {
      id: 2,
      product_name: "無畏探險者寶箱",
      product_desc:
        "為勇敢的探險者準備！使用探險者指南針發現隱藏的寶藏，強化護甲套裝提供卓越保護和敏捷性。",
      category: "A",
      price: 2200,
      image: "/shop/product_02.png",
      onshelf_status: "上架中",
    },
    {
      id: 3,
      product_name: "勝利勇士至尊包",
      product_desc:
        "每位戰士的夢想！內含史詩武器和勇士護甲，助你在戰場上無往不利。",
      category: "A",
      price: 2200,
      image: "/shop/product_03.png",
      onshelf_status: "上架中",
    },
    {
      id: 4,
      product_name: "巫師魔力珍藏包",
      product_desc:
        "這是為魔法師量身打造的道具包！神秘法杖增強你的魔力輸出，巫師長袍提供保護和魔力加成。",
      category: "A",
      price: 2200,
      image: "/shop/product_04.png",
      onshelf_status: "上架中",
    },
    {
      id: 5,
      product_name: "歡慶嘉年華豪華包",
      product_desc:
        "歡慶嘉年華豪華包讓你在節日中成為焦點！穿上派對服裝，點燃20個煙火，讓節日更加歡樂。",
      category: "A",
      price: 2000,
      image: "/shop/product_05.png",
      onshelf_status: "上架中",
    },
    {
      id: 6,
      product_name: "至尊VIP皇家包",
      product_desc:
        "至尊VIP皇家包為尊貴的VIP會員打造！獨家坐騎展示你的威風，皇家護甲套裝提供極致保護。",
      category: "A",
      price: 2400,
      image: "/shop/product_06.png",
      onshelf_status: "上架中",
    },
  ];
  return defaultShopProduct;
};

const initShopDiamond = (): IShopDiamond[] => {
  const defaultShopDiamond: IShopDiamond[] = [
    {
      id: 1,
      d_name: "Black Diamond 鑽石 x100",
      d_amount: 100,
      price: 100,
    },
    {
      id: 2,
      d_name: "Black Diamond 鑽石 x200",
      d_amount: 200,
      price: 200,
    },
    {
      id: 3,
      d_name: "Black Diamond 鑽石 x500",
      d_amount: 500,
      price: 500,
    },
    {
      id: 4,
      d_name: "Black Diamond 鑽石 x1,000",
      d_amount: 1000,
      price: 1000,
    },
    {
      id: 5,
      d_name: "Black Diamond 鑽石 x2,000",
      d_amount: 2000,
      price: 2000,
    },
    {
      id: 6,
      d_name: "Black Diamond 鑽石 x5,000",
      d_amount: 5000,
      price: 5000,
    },
    {
      id: 7,
      d_name: "Black Diamond 鑽石 x10,000",
      d_amount: 10000,
      price: 10000,
    },
  ];
  return defaultShopDiamond;
};

const initShopOrderDetail = (): IShopOrderDetail[] => {
  const defaultShopOrderDetail: IShopOrderDetail[] = [
    {
      id: 1,
      fk_player_account:'w87157',
      fk_order_id: 'P1722491013699ec60de85',
      fk_product_id: 2,
      quantity: 1,
    },
    {
      id: 2,
      fk_player_account:'w87157',
      fk_order_id: 'P1722491013699ec60de85',
      fk_product_id: 4,
      quantity: 1,
    },
    {
      id: 3,
      fk_player_account:'w87157',
      fk_order_id: 'P17224913274397656aa04',
      fk_product_id: 1,
      quantity: 1,
    },
    {
      id: 4,
      fk_player_account:'w87157',
      fk_order_id: 'P17224913274397656aa04',
      fk_product_id: 2,
      quantity: 1,
    },
    {
      id: 5,
      fk_player_account:'w87157',
      fk_order_id: 'P1722491327439760fiej3',
      fk_product_id: 4,
      quantity: 1,
    },
    {
      id: 6,
      fk_player_account:'w87157',
      fk_order_id: 'P17224913274392jfu992u',
      fk_product_id: 4,
      quantity: 1,
    },
    {
      id: 7,
      fk_player_account:'w87157',
      fk_order_id: 'P17224913274392jfu992u',
      fk_product_id: 5,
      quantity: 1,
    },
    {
      id: 8,
      fk_player_account:'w87157',
      fk_order_id: 'P1722491327439udj782gf',
      fk_product_id: 4,
      quantity: 1,
    },
  ];
  return defaultShopOrderDetail;
};


const initShopMyOrder = (): IShopMyOrder[] => {
  const defaultShopMyOrder: IShopMyOrder[] = [
    {
      id: 'P1722491013699ec60de85',
      fk_player_account: 'w87157',
      amount: 2000,
      status: '購物車',
      payment_status: '尚未付款',
    },
    {
      id: 'P17224913274397656aa04',
      fk_player_account: 'w87157',
      amount: 2000,
      status: '已下單',
      payment_status: '尚未付款',
    },
    {
      id: 'P1722491327439760fiej3',
      fk_player_account: 'w87157',
      amount: 2000,
      status: '我的最愛',
      payment_status: '尚未付款',
    },
    {
      id: 'P17224913274392jfu992u',
      fk_player_account: 'w87157',
      amount: 2000,
      status: '我的最愛',
      payment_status: '尚未付款',
    },
    {
      id: 'P1722491327439udj782gf',
      fk_player_account: 'w87157',
      amount: 2000,
      status: '我的最愛',
      payment_status: '尚未付款',
    },
  ];
  return defaultShopMyOrder;
};

const initShopItems = (): IShopItems[] => {
  const defaultShopItems: IShopItems[] = [
    {
      id: 1,
      item_name: '新手包',
      item_desc: '提供基本保護的新手護甲。前3小時遊戲時間獲得雙倍經驗值。',
      image: '/shop/productItem_01_01.png',
      fk_product_id: 1,
    },
    {
      id: 2,
      item_name: '刺客匕首',
      item_desc: '一把可靠的基礎武器，適合開始冒險之旅。',
      image: '/shop/productItem_01_02.png',
      fk_product_id: 1,
    },
    {
      id: 3,
      item_name: '生命藥水',
      item_desc: '10瓶在戰鬥中恢復生命的藥水。',
      image: '/shop/productItem_01_03.png',
      fk_product_id: 1,
    },
    {
      id: 4,
      item_name: '探險補給品',
      item_desc: '基本物品，如火把、繩索和攀爬工具。',
      image: '/shop/productItem_02_01.png',
      fk_product_id: 2,
    },
    {
      id: 5,
      item_name: '強化護甲套裝',
      item_desc: '提供更高防護和敏捷性的護甲。',
      image: '/shop/productItem_02_02.png',
      fk_product_id: 2,
    },
    {
      id: 6,
      item_name: '耐力藥水',
      item_desc: '10瓶增加耐力並減少疲勞的藥水。',
      image: '/shop/productItem_02_03.png',
      fk_product_id: 2,
    },
    {
      id: 7,
      item_name: '戰鬥卷軸',
      item_desc: '至尊包內含5張強大戰鬥法術的卷軸。',
      image: '/shop/productItem_03_01.png',
      fk_product_id: 3,
    },
    {
      id: 8,
      item_name: '史詩武器',
      item_desc: '為精英戰士設計的強大武器。',
      image: '/shop/productItem_03_02.png',
      fk_product_id: 3,
    },
    {
      id: 9,
      item_name: '力量精華',
      item_desc: '10瓶在戰鬥中增強體力的精華。',
      image: '/shop/productItem_03_03.png',
      fk_product_id: 3,
    },
    {
      id: 10,
      item_name: '魔法書',
      item_desc: '5本包含高級魔法的書籍。',
      image: '/shop/productItem_04_01.png',
      fk_product_id: 4,
    },
    {
      id: 11,
      item_name: '魔力藥水',
      item_desc: '10瓶補充魔法能量的藥水。',
      image: '/shop/productItem_04_02.png',
      fk_product_id: 4,
    },
    {
      id: 12,
      item_name: '慶祝藥水',
      item_desc: '10瓶賦予臨時增益效果的藥水。',
      image: '/shop/productItem_05_01.png',
      fk_product_id: 5,
    },
    {
      id: 13,
      item_name: '派對服裝',
      item_desc: '獨特的服裝，讓你在慶典中光彩奪目。',
      image: '/shop/productItem_05_02.png',
      fk_product_id: 5,
    },
    {
      id: 14,
      item_name: '每日獎勵',
      item_desc: '獲取包含稀有物品的每日登錄獎勵。',
      image: '/shop/productItem_06_01.png',
      fk_product_id: 6,
    },
    {
      id: 15,
      item_name: 'VIP貨幣',
      item_desc: '1000 VIP點數，可在專屬VIP商城使用。',
      image: '/shop/productItem_06_02.png',
      fk_product_id: 6,
    },
    {
      id: 16,
      item_name: '皇家護甲套裝',
      item_desc: '具有皇家設計的高品質護甲。',
      image: '/shop/productItem_06_03.png',
      fk_product_id: 6,
    },
  ];
  return defaultShopItems;
};

const initShopPayment = (): IShopPayment[] => {
  const defaultShopPayment: IShopPayment[] = [
    {
      id: "1234566",
      fk_order_id: 1,
      payment_method: "信用卡",
      isSuccess: true,
      paid_at: new Date(),
      coupon_used: true,
      fk_coupon_id: 1,
    },
    {
      id: "1234567",
      fk_order_id: 2,
      payment_method: "LINEPAY",
      isSuccess: false,
      coupon_used: true,
      fk_coupon_id: 0,
    },
  ];
  return defaultShopPayment;
};

const initForum = (): IForum[] => {
  const defaultForum: IForum[] = [
    {
      id: 1,
      Player_id: 50,
      area: "Forum Area",
      category: "Guide",
      article_title: '關於最近更新預告',
      article: '大家好！這次《龍焰與魔法》的更新真是讓人既期待又緊張。我最期待的是新地圖的探索，希望能發現一些隱藏的寶藏和秘密任務。此外，新裝備看起來很酷，不知道大家覺得哪些裝備會成為新版本的必備呢？還有，新BOSS的挑戰性如何？我們的公會已經開始討論策略了。這次更新還對平衡性做了一些調整，希望能讓遊戲更公平。歡迎大家在這裡分享你們的看法和經驗，讓我們一起迎接這次激動人心的更新吧！',
      image: 'src/public/img/1722481409429-castle-5.jpg',
      figcaption: '《龍焰與魔法》的更新',
      submit_time: new Date(),
    },
    {
      id: 2,
      Player_id: 50,
      area: "Forum Area",
      category: "Guide",
      article_title: '終極BOSS擊敗攻略',
      article: '挑戰《龍焰與魔法》的終極BOSS需要策略與技巧。首先，了解BOSS的技能和攻擊模式。終極BOSS通常有多階段變化，每階段攻擊方式和弱點不同。建議戰鬥前仔細觀察BOSS行動，找出攻擊模式規律。其次，選擇合適的裝備和隊伍配置是關鍵。推薦高防禦和生命值的坦克角色承受傷害，搭配高輸出攻擊角色和提供治療的輔助角色。建議裝備減少傷害和提升輸出的附魔裝備，並使用增加隊伍生存能力的技能。戰鬥中，保持隊伍靈活性和協作。坦克需保持仇恨，攻擊角色集中火力在BOSS弱點上，輔助角色提供治療和支援。總之，挑戰終極BOSS需要耐心和團隊合作。通過合理戰術安排和持續練習，相信你能成功擊敗BOSS，獲得豐厚戰利品。',
      image: 'src/public/img/1721630849988-dragon-1.jpg',
      figcaption: '終極BOSS擊敗攻略',
      submit_time: new Date(),
    },
    {
      id: 3,
      Player_id: 50,
      area: "Forum Area",
      category: "Map",
      article_title: '新手村地圖全攻略',
      article: '新手村是《龍焰與魔法》中玩家的起點，地圖雖小，但資源豐富，任務多樣。建議玩家進入新手村後，立即前往村莊中心的NPC處接取初始任務，這些任務能幫助你快速升級並獲得基礎裝備。記得與每位NPC對話，可能會獲得隱藏任務和有用信息。新手村的地圖中有鍛造坊、藥店和訓練場等重要地點，鍛造坊可強化和修理裝備，藥店出售恢復藥劑，訓練場提升角色技能。建議探索新手村周圍的野外地區，了解怪物分佈和掉落物品。總之，新手村是熟悉遊戲的第一步，通過完成任務、與NPC互動和探索地圖，你將快速掌握遊戲基本操作。',
      image: 'src/public/img/1721630917058-map.jpg',
      figcaption: '新手村地圖全攻略',
      submit_time: new Date(),
    },
    {
      id: 4,
      Player_id: 50,
      area: "Forum Area",
      category: "Equipment",
      article_title: '新手裝備推薦指南',
      article: '作為新手玩家，選擇合適的裝備能讓你的冒險之旅更加順利。建議從基礎裝備開始，這些裝備通常在完成新手任務後獲得，具有平衡的屬性，適合新手使用。隨著等級提升，可以購買或製作更高級的裝備，這些裝備具有更高屬性和特殊效果。建議參加副本和活動，這些地方通常掉落稀有裝備和材料。選擇裝備時，根據職業和玩法風格決定。坦克角色應選擇高防禦和生命值的裝備，輸出角色選擇高攻擊力和爆擊率的裝備，輔助角色選擇提升治療效果和回復速度的裝備。建議多交流和分享裝備心得，找到適合自己的裝備配置。',
      image: 'src/public/img/1721630966269-weapon-2.jpg',
      figcaption: '新手裝備推薦指南',
      submit_time: new Date(),
    },
    {
      id: 5,
      Player_id: 50,
      area: "Forum Area",
      category: "Other",
      article_title: '遊戲中的社交活動介紹',
      article: '《龍焰與魔法》是一個豐富的社交平台，玩家可以參加公會戰、團隊副本和玩家交易等社交活動。公會戰是遊戲中最具挑戰性和樂趣的活動之一，玩家可以與公會成員一起參與戰鬥，爭奪榮譽和獎勵。團隊副本是玩家合作挑戰高難度怪物的好地方，通過合理分工和協作，獲得豐厚獎勵和經驗。玩家交易是遊戲經濟系統的重要組成部分，玩家可在交易市場上出售和購買物品，滿足需求。遊戲中還有好友系統、聊天系統和玩家評價等功能，這些功能能讓玩家結識更多朋友，增加遊戲樂趣。',
      image: 'src/public/img/1721631002227-world-9.jpg',
      figcaption: '遊戲中的社交活動介紹',
      submit_time: new Date(),
    },
    {
      id: 6,
      Player_id: 50,
      area: "Forum Area",
      category: "Map",
      article_title: '高等秘境地圖詳解',
      article: '高等秘境是《龍焰與魔法》中高難度的探索區域，隱藏著強大怪物和豐富寶藏。進入高等秘境前，建議組隊並準備充分恢復道具。在秘境中，小心各種陷阱和敵人埋伏，合理利用地形和技能是生存關鍵。秘境中有多個重要地點，如寶藏房、BOSS房和傳送點，根據地圖提示探索。每個秘境有特定BOSS，擊敗BOSS後，獲得豐厚獎勵和稀有裝備。總之，高等秘境是一個充滿挑戰和機遇的地方，提升實力，獲得成就感。',
      image: 'src/public/img/1721631059167-castle-6.jpg',
      figcaption: '高等秘境地圖詳解',
      submit_time: new Date(),
    },
    {
      id: 7,
      Player_id: 50,
      area: "Forum Area",
      category: "Guide",
      article_title: '新手玩家快速升級指南',
      article: '新手玩家在《龍焰與魔法》中快速升級的方法有很多。首先，完成主線任務是最有效的升級方法，這些任務不僅經驗豐富，還能快速熟悉遊戲背景和玩法。參加各種活動和副本，這些活動通常有豐厚經驗獎勵。與其他玩家組隊，通過合作更快完成任務和擊敗怪物。合理利用經驗加成道具，大幅提升經驗獲取速度。通過這些方法，你可以在短時間內迅速提升等級，體驗更多遊戲內容。',
      image: 'src/public/img/1721631146648-weapon.jpg',
      figcaption: '新手玩家快速升級指南',
      submit_time: new Date(),
    },
    {
      id: 8,
      Player_id: 50,
      area: "Forum Area",
      category: "Equipment",
      article_title: '稀有裝備的獲取與搭配',
      article: '《龍焰與魔法》中，稀有裝備是玩家夢寐以求的寶物。這些裝備屬性強大，擁有特殊技能和效果。獲取稀有裝備的方法很多，最常見的是通過挑戰高難度副本和BOSS。此外，參加限時活動和競技比賽也是重要途徑。已獲得的稀有裝備，需合理搭配發揮最大效果。根據職業和玩法風格選擇適合的裝備。例如，戰士角色選擇增加攻擊力和防禦力的裝備，法師角色選擇增加法術傷害和魔法值的裝備。合理搭配，戰鬥中發揮出色，擊敗強大敵人。',
      image: 'src/public/img/1721631146648-weapon.jpg',
      figcaption: '稀有裝備的獲取與搭配',
      submit_time: new Date(),
    },
    {
      id: 9,
      Player_id: 50,
      area: "Forum Area",
      category: "Other",
      article_title: '遊戲中的經濟系統解析',
      article: '《龍焰與魔法》的經濟系統設計精巧，提供豐富的交易和獲利機會。玩家可通過完成任務、擊敗怪物和參加活動獲得金幣和物品，這些資源可用來購買裝備、藥品和其他消耗品。遊戲中設有交易市場，玩家可出售和購買各種物品，不僅能獲得所需資源，還能通過買賣差價獲取利潤。拍賣行也是重要交易場所，玩家可在此競拍稀有物品。理財和資源管理是重要技能，建議多學習和探索，找到適合自己的經濟策略。',
      image: 'src/public/img/1721631189392-b00k.jpg',
      figcaption: '遊戲中的經濟系統解析',
      submit_time: new Date(),
    },
    {
      id: 10,
      Player_id: 50,
      area: "Forum Area",
      category: "Map",
      article_title: '秘境探險地圖詳解',
      article: '秘境探險是《龍焰與魔法》中充滿挑戰和驚喜的活動。這些秘境隱藏在遊戲世界的各個角落，玩家需解謎和完成特定任務才能進入。秘境中，玩家將面臨強大怪物和陷阱，需要充分利用技能和裝備克服困難。秘境中有寶藏和稀有物品，這些都是探險動力。建議進入秘境前，做好充分準備，攜帶恢復道具和合適裝備。注意觀察環境和敵人行動，找到最佳戰鬥策略和逃生路徑。通過不斷探索和挑戰，獲得豐厚獎勵和成就感。',
      image: 'src/public/img/1721631232592-dragon-4.jpg',
      figcaption: '秘境探險地圖詳解',
      submit_time: new Date(),
    }
  ];
  return defaultForum;
};

const initForumContent = (): IForumContent[] => {
  const defaultForumContent: IForumContent[] = [
    {
      id: 1,
      Player_id: 10,
      area: "News",
      category: "Headline News",
      article_title: "新作公布《龍焰與魔法》！全新世界地圖與角色揭曉",
      article:
        "期待已久的新作《龍焰與魔法》終於揭曉，為玩家帶來一個全新的魔幻世界。這次更新中，開發團隊投入大量心血設計了全新的世界地圖，將帶領玩家踏上一段前所未有的冒險旅程。新地圖不僅擁有多樣的地形和風景，還充滿了神秘的隱藏寶藏和未知的危險挑戰，讓探索變得更加刺激和富有挑戰性。除了全新的世界地圖，《龍焰與魔法》還推出了數個全新角色，每個角色都有獨特的背景故事和技能設計。這些新角色將為遊戲注入新的活力，玩家可以選擇並培養他們，利用各自的特殊技能來應對不同的戰鬥和任務挑戰。新角色的加入不僅擴展了遊戲的可玩性，也為玩家提供了更多策略組合的可能性。",
      image: "/forum/castle-6.jpg",
      figcaption:
        "《龍焰與魔法》的全新世界地圖與角色現已上線，快來探索這個充滿魔法與冒險的新世界，展開屬於你的英雄之旅！",
    },
    {
      id: 3,
      Player_id: 18,
      area: "News",
      category: "Popular News",
      article_title: "新增多人模式，挑戰你的策略極限",
      article:
        "《龍焰與魔法》最新更新帶來了激動人心的多人模式，為玩家提供了全新的合作與對戰體驗。這次新增的多人模式不僅讓玩家可以與好友並肩作戰，共同探索神秘的魔幻世界，還能挑戰各種高難度的副本和任務。每個副本和任務都需要隊友間密切合作，發揮各自角色的特長來擊敗強大的敵人。",
      image: "/forum/person-2.jpg",
      figcaption:
        "新增多人模式，為玩家帶來了前所未有的挑戰和樂趣。快召集你的好友，一起迎接這場策略和合作的極限挑戰，體驗更加豐富多彩的遊戲世界！",
    },
    {
      id: 5,
      Player_id: 25,
      area: "Forum",
      category: "Guide",
      article_title: "新手指南：從零開始的冒險之路",
      article:
        "歡迎來到《龍焰與魔法》的奇幻世界！首先，花些時間熟悉遊戲介面和基本操作，了解主選單、設置和快捷鍵，以便快速上手。選擇適合你的遊戲風格的角色，每個角色都有獨特的技能和屬性，了解它們的優缺點是成功的關鍵。完成遊戲提供的新手任務，這些任務不僅能幫助你熟悉遊戲機制，還能獲得初始資源和裝備。",
      image: "/forum/person-2.jpg",
      figcaption:
        "這些建議將幫助你在《龍焰與魔法》的世界中迅速成長，從零開始踏上屬於你的冒險之路。祝你遊戲愉快，早日成為強大的冒險者！",
    },
    {
      id: 7,
      Player_id: 70,
      area: "Forum",
      category: "Equipment",
      article_title: "高手進階：裝備選擇與搭配",
      article:
        "裝備的選擇與搭配至關重要。根據角色的特性選擇最佳裝備，可以大幅提升戰力。不同角色有不同的需求，戰士需要高防禦和攻擊力的裝備，法師則更注重法力和魔法攻擊。合理搭配防具與武器，以最大化屬性增益。例如，某些裝備可以提高暴擊率，適合高攻擊速度的角色；而增加生命值的裝備則適合坦克角色。",
      image: "/shop/productItem_06_03.png",
      figcaption:
        "定期更新和調整裝備，確保在各種挑戰中保持優勢，這樣才能在《龍焰與魔法》的世界中脫穎而出，成為真正的高手。ss",
    },
  ];
  return defaultForumContent;
};

const initForumList = (): IForumList[] => {
  const defaultForumList: IForumList[] = [
    {
      image: "/forum/castle-6.jpg",
      article_title: "年全新世界地圖與角色揭曉",
      description:
        "新遊戲更新公布了全新世界地圖與角色，為玩家帶來更多探索和挑戰的機會。快來體驗這個精彩的冒險旅程！",
    },
    {

      image: "/forum/dragon-1.jpg",
      article_title: "跨平台版本即將上線",
      description:
        "期待已久的跨平台版本即將上線，玩家可以在不同裝置上無縫切換，享受一致的遊戲體驗。",
    },
    {
      image: "forum/person-2.jpg",
      article_title: "新增多人模式，挑戰你的策略極限",
      description:
        "最新更新中加入了全新的多人模式，讓玩家可以與好友一起挑戰極限，測試策略和協作能力。",
    },
  ];
  return defaultForumList;
};

const initForumNews = (): IForumNews[] => {
  const defaultForumNews: IForumNews[] = [
    {
      admin_id: 1,
      area: "News",
      category: "Headline News",
      article_title: "全新世界地圖與角色揭曉",
      article:
        "新遊戲更新公布了全新世界地圖與角色，為玩家帶來更多探索和挑戰的機會。快來體驗這個精彩的冒險旅程！",
      image: "/forum/castle-6.jpg",
    },
  ];
  return defaultForumNews;
};

const initForumTop = (): IForumTop[] => {
  const defaultForumTop: IForumTop[] = [
    {
      image: "/forum/person-3.jpg",
      area: "Official Event",
      category: "Latest Event",
      article_title: "藝術走廊歡迎你投稿",
      description:
        "藝術走廊是一個展示玩家才華的特別場所。在這裡，你可以分享你在遊戲世界中的靈感與創意，並與其他玩家共同欣賞彼此的作品。我們深知每位冒險者都有自己獨特的故事和視角，而藝術走廊正是你展示這些故事和視角的絕佳平臺。",
    },
    {
      image: '/forum/b00k.jpg',
      area: 'Official Event',
      category: 'Latest Event',
      article_title: '暑假強檔活動開始',
      description: '暑假清涼禮包內含多種限量好禮，包括絕版服飾、稀有道具、強力增益藥水以及特別的夏天限定坐騎。這些珍貴的物品不僅能提升你的遊戲體驗，還能讓你的角色在這個特別的季節中閃耀全場。此外，禮包中還附贈專屬的暑假主題裝飾，讓你可以把假期的美好氣氛帶到你的遊戲世界中。',
    },
  ];
  return defaultForumTop;
};

const initArtworkType = (): IArtworkType[] => {
  const defaultArtworkType: IArtworkType[] = [
    {
      user_account: "測試",
      artwork_id: 0,
    },

  ];
  return defaultArtworkType;
};

const returnURL = () => {
  const categories = ['church', 'castle', 'medieval', 'knight', 'sunset'];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const height = 1000;
  const width = 800;

  const imageUrl = faker.image.urlLoremFlickr({
    category: randomCategory,
    height: height,
    width: width
  });
  return imageUrl
}

// const initArtwork = (): IArtwork[] => {
//   const defaultArtwork: IArtwork[] = Array.from({ length: 100 }, () => ({
//     title: faker.word.words({ count: { min: 1, max: 5 } }),
//     desc: faker.word.words({ count: { min: 50, max: 200 } }),
//     img: returnURL(),
//     view_count: faker.number.int({ min: 10, max: 4000 }),
//     download_count: faker.number.int({ min: 10, max: 4000 }),
//     like_count: faker.number.int({ min: 10, max: 4000 }),
//     artwork_type_id: faker.helpers.arrayElement([1, 2, 3]),
//     user_account: faker.internet.email().split('@')[0],
//     createdAt: faker.date.past(),
//     updatedAt: new Date(),
//   }))
//   return defaultArtwork;
// };
const initArtwork = (): IArtwork[] => {
  // 前10個作品的自訂資料
  const customArtworks: IArtwork[] = [
    {
      title: '靈魂的凝視',
      desc: '在古老的王國中，神秘的巨龍再次現身，帶來毀滅和混亂。玩家將扮演一位年輕的騎士，必須集結勇士、尋找傳說中的武器，並解開巨龍重生的秘密，拯救被火焰吞噬的家園。',
      img: 'http://localhost:8080/img/1720956695113.jpg',
      view_count: 100,
      download_count: 50,
      like_count: 25,
      vote_count: 8563,
      artwork_type_id: 1,
      user_account: 'ileneh889',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: '王座之爭',
      desc: '五大王國陷入戰亂，各自宣稱擁有正統的統治權。玩家將選擇一個陣營，通過策略和戰鬥，在血腥的戰場上奪取王位，並平衡權力與正義。',
      img: 'http://localhost:8080/img/r1.jpg',
      view_count: 16574,
      download_count: 2501,
      like_count: 265,
      vote_count: 8254,
      artwork_type_id: 1,
      user_account: 'andy0404',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: '暗影之森',
      desc: '一片神秘的森林籠罩在永恆的黑暗中，充滿了詭異的生物和失落的古代文明。玩家需要探索這片未知的領域，發掘隱藏的寶藏，並揭開埋藏已久的詛咒真相。',
      img: 'http://localhost:8080/img/r9.jpg',
      view_count: 654,
      download_count: 23434,
      like_count: 267,
      vote_count: 12315,
      artwork_type_id: 2,
      user_account: 'shanie0610',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: '魔法學院',
      desc: '進入一所充滿神秘和危險的魔法學院，學習強大的法術和技能。學院內部充滿了競爭和陰謀，玩家必須在這個充滿挑戰的環境中生存並揭開校內黑暗勢力的真相。',
      img: 'http://localhost:8080/img/r6.jpg',
      view_count: 3463,
      download_count: 3456,
      like_count: 6578,
      vote_count: 5098,
      artwork_type_id: 3,
      user_account: 'coop1004',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: '靈魂契約',
      desc: '被詛咒的靈魂締結契約，獲得強大的力量，但也被迫面對靈魂的痛苦回憶和未解的怨恨。在冒險過程中，玩家需要解開靈魂的過去，幫助其復仇，最終達成雙方的解脫。',
      img: 'http://localhost:8080/img/r4.png',
      view_count: 345,
      download_count: 567,
      like_count: 345,
      vote_count: 9573,
      artwork_type_id: 2,
      user_account: 'zach0127',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: '聖劍傳說',
      desc: '傳說中的聖劍再次現世，然而它的力量已被封印。玩家必須踏上尋找聖劍碎片的旅程，克服重重困難，對抗邪惡勢力，最終重鑄聖劍，拯救世界於水深火熱之中。',
      img: 'http://localhost:8080/img/r5.jpg',
      view_count: 234,
      download_count: 56756,
      like_count: 345,
      vote_count: 1029,
      artwork_type_id: 1,
      user_account: 'bryandopeasfuk0101',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: '森林的女神',
      desc: ' 一個曾經被驅逐的獸人部落開始反擊，誓言奪回他們的家園和榮耀。玩家將扮森林人部落的領袖，通過智慧和勇氣，重建家園，並向壓迫他們的帝國展開反擊。',
      img: 'http://localhost:8080/img/r3.jpg',
      view_count: 34545,
      download_count: 34534,
      like_count: 789,
      vote_count: 999,
      artwork_type_id: 2,
      user_account: 'ileneh889',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: '秘法遺跡',
      desc: '古老的遺跡中隱藏著失落的秘法力量，吸引了無數冒險者的目光。玩家將組織一支探險隊，深入遺跡探索不為人知的秘密，面對古代守護者的挑戰，最終揭開秘法的真相。',
      img: 'http://localhost:8080/img/r7.jpg',
      view_count: 2988,
      download_count: 67432,
      like_count: 234,
      vote_count: 926,
      artwork_type_id: 3,
      user_account: 'shinder520',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: '黑暗議會',
      desc: '一個神秘的黑暗議會在背後操縱著王國的命運，計畫著邪惡的陰謀。玩家必須潛入議會，收集情報，揭穿陰謀，並在關鍵時刻阻止他們毀滅王國的計劃。',
      img: 'http://localhost:8080/img/r8.webp',
      view_count: 9992,
      download_count: 123,
      like_count: 234,
      vote_count: 745,
      artwork_type_id: 3,
      user_account: 'fukispan174',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: '永恆戰士',
      desc: '一位被古老儀式賦予不死之身的戰士，注定要永遠守護王國免受邪惡力量的侵害。玩家將扮演這位戰士，在歷經千年戰爭的歲月中，不斷學習和進步，最終成為傳奇。',
      img: 'http://localhost:8080/img/r2.jpg',
      view_count: 345,
      download_count: 9565,
      like_count: 3453,
      vote_count: 345,
      artwork_type_id: 2,
      user_account: 'julianmiss1212',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // 使用 faker 生成剩下的作品資料
  const randomArtworks: IArtwork[] = Array.from({ length: 50 }, () => ({
    title: faker.word.words({ count: { min: 1, max: 5 } }),
    desc: faker.word.words({ count: { min: 50, max: 200 } }),
    img: returnURL(),
    view_count: faker.number.int({ min: 10, max: 4000 }),
    download_count: faker.number.int({ min: 10, max: 4000 }),
    like_count: faker.number.int({ min: 10, max: 4000 }),
    vote_count: faker.number.int({ min: 10, max: 4000 }),
    artwork_type_id: faker.helpers.arrayElement([1, 2, 3]),
    user_account: faker.internet.email().split('@')[0],
    createdAt: faker.date.past(),
    updatedAt: new Date(),
  }));

  // 合併自訂資料和隨機生成的資料
  return [...customArtworks, ...randomArtworks];
};

export const bulkCreateLive = initLive();
export const bulkCreateShopProduct = initShopProduct();
export const bulkCreateShopDiamond = initShopDiamond();
export const bulkCreateShopPayment = initShopPayment();
export const bulkCreateShopOrderDetail = initShopOrderDetail();
export const bulkCreateShopMyOrder = initShopMyOrder();
export const bulkCreateShopItems = initShopItems();
export const bulkCreateForum = initForum();
export const bulkCreateForumContent = initForumContent();
export const bulkCreateForumList = initForumList();
export const bulkCreateForumNews = initForumNews();
export const bulkCreateForumTop = initForumTop();
export const bulkCreateArtworkType = initArtworkType();
export const bulkCreateArtwork = initArtwork();
