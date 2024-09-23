import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import Account from "../model/member.model";
import OTP from "../model/otp.model";

class MemberController {
  // 獲取所有會員
  getAllMember = async () => {
    const res = await Account.findAll();
    return res;
  };

  // 根據 login 獲取會員
  getMemberByLogin = async (login: string) => {
    return await Account.findOne({ where: { login } });
  };

  // 根據 email 獲取會員
  getMemberByEmail = async (email: string) => {
    return await Account.findOne({ where: { email } });
  };

  // 根據 email 更新會員密碼
  updateMemberPasswordByEmail = async (email: string, password: string) => {
    return await Account.update({ password }, { where: { email } });
  };

  // 根據 login 更新會員圖片
  updateMemberPhotoByLogin = async (login: string, photo_url: string) => {
    return await Account.update({ photo_url }, { where: { login } });
  };

  // 創建新會員
  createMember = async (
    login: string,
    email: string,
    name: string,
    password: string,
    diamond?: number,
    photo_url?: string,
    google_uid?: string
  ) => {
    const res = await Account.create({
      login,
      email,
      name,
      password,
      spw: "未建立超級密碼",
      diamond: diamond || 0,
      photo_url: photo_url || "",
      google_uid: google_uid || "",
    });
    return res;
  };

  // 驗證 OTP
  verifyOTP = async (email: string, otp: string) => {
    const otpRecord = await OTP.findOne({ where: { email, otp } });
    if (!otpRecord) {
      return { code: 503, result: false }; // OTP不存在或不匹配
    }

    const currentTime = new Date();
    const expiresAt = new Date(otpRecord.expiresAt);

    // 檢查OTP是否超過有效期
    if (currentTime > expiresAt) {
      await OTP.destroy({ where: { email } }); // 刪除過期的OTP紀錄
      return { code: 505, result: false }; // OTP過期
    }

    await OTP.destroy({ where: { email } }); // 驗證成功後刪除OTP紀錄
    return { code: 0, result: true }; // OTP驗證通過
  };

  // 發送 OTP 郵件
  sendOTPByEmail = async (email: string) => {
    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });

    // 設置過期時間，假設有效期為60秒
    const expirationTime = new Date(Date.now() + 60 * 1000);

    try {
      // 檢查是否已存在有效的OTP
      const existingOTP = await OTP.findOne({ where: { email } });
      if (existingOTP) {
        const currentTime = new Date();
        const expiresAt = new Date(existingOTP.expiresAt);

        // 檢查OTP是否逾期
        if (currentTime <= expiresAt) {
          return { result: true, expiresAt };
        } else {
          await OTP.destroy({ where: { email } }); // 刪除過期的OTP紀錄
        }
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "w87157@gmail.com",
          pass: "xszuowqwzpljdsyq",
        },
      });

      const mailOptions = {
        from: "w87157@gmail.com",
        to: email,
        subject: "驗證碼",
        text: `您的註冊驗證碼是 ${otp}`,
      };

      await transporter.sendMail(mailOptions);
      await OTP.create({ email, otp, expiresAt: expirationTime }); // 存儲帶有過期時間的OTP

      return { result: true, expiresAt: expirationTime };
    } catch (error) {
      console.error("發送郵件失敗:", error);
      return { result: false, expiresAt: undefined };
    }
  };

  // 發送 URL 郵件
  sendURLByEmail = async (email: string, token: string) => {
    const verificationLink = `http://localhost:3000/member/forget-password-step3?token=${token}`;

    const mailOptions = {
      from: "w87157@gmail.com",
      to: email,
      subject: "驗證郵件",
      text: `請點擊以下連結來完成驗證： ${verificationLink}`,
    };

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "w87157@gmail.com",
          pass: "xszuowqwzpljdsyq",
        },
      });

      await transporter.sendMail(mailOptions);

      return { result: true };
    } catch (error) {
      console.error("發送郵件失敗:", error);
      return { result: false };
    }
  };
}

export default new MemberController();
