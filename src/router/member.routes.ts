import express from "express";
import jwt from "jsonwebtoken";
import path from "path";
import MemberController from "../controller/member.controller";
import { OAuth2Client } from "google-auth-library";

const oauthClient = new OAuth2Client(
  ""
);

const router = express.Router();

const setMessage = (code: number) => {
  const messages = {
    0: "操作成功",
    401: "帳號錯誤",
    402: "密碼錯誤",
    501: "帳號已存在",
    502: "電子信箱已存在",
    503: "驗證碼錯誤",
    504: "發送驗證碼失敗",
    505: "驗證碼逾期",
    506: "電子信箱不存在",
  };

  if (Math.floor(code / 100) === 4) {
    return "帳號或密碼有誤";
  } else {
    return messages[code] || "未知錯誤";
  }
};

// 獲取所有會員
router.get("/user", async (req, res) => {
  const result = await MemberController.getAllMember();
  res.send(result);
});

// 登入
router.post("/login", async (req, res) => {
  const output = {
    success: false,
    code: 0,
    message: "",
    data: {
      login: "",
      email: "",
      name: "",
      diamond: 0,
      photo_url: "",
    },
  };

  try {
    const member = await MemberController.getMemberByLogin(req.body.login);
    if (!member) {
      // 帳號是錯的
      output.code = 401;
      output.message = setMessage(output.code);
      res.json(output);
      return;
    }

    const result = req.body.password === member["password"];
    if (!result) {
      // 密碼是錯的
      output.code = 402;
      res.json(output);
      return;
    }

    output.data = {
      login: member["login"],
      email: member["email"],
      name: member["name"],
      diamond: member["diamond"],
      photo_url: member["photo_url"],
    };

    output.success = true;
    res.json(output);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Internal server error..." });
  }
});

// 使用JWT進行登入
router.post("/login-jwt", async (req, res) => {
  const output = {
    success: false,
    code: 0,
    message: "",
    data: {
      login: "",
      email: "",
      name: "",
      diamond: 0,
      token: "",
      photo_url: "",
    },
  };

  const { login, password } = req.body;

  try {
    const member = await MemberController.getMemberByLogin(login);
    if (!member) {
      // 帳號是錯的
      output.code = 401;
      output.message = setMessage(output.code);
      res.json(output);
      return;
    }

    const result = password === member["password"];
    if (!result) {
      // 密碼是錯的
      output.code = 402;
      res.json(output);
      return;
    }

    output.success = true;
    const payload = {
      login: member["login"],
      email: member["email"],
    };
    const token = jwt.sign(payload, "idhwueifhuifihfweihfow452432");
    output.data = {
      login: member["login"],
      email: member["email"],
      name: member["name"],
      diamond: member["diamond"],
      photo_url: member["photo_url"],
      token,
    };

    output.success = true;
    res.json(output);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Internal server error..." });
  }
});

// Google 登入端點
router.post("/google-login", async (req, res) => {
  const output = {
    success: false,
    code: 0,
    message: "",
    data: {
      login: "",
      email: "",
      name: "",
      diamond: 0,
      token: "",
      photo_url: "",
    },
  };

  const { code } = req.body;
  const client_id =
    "";
  const client_secret = "";
  const redirect_uri = "postmessage";
  const grant_type = "authorization_code";

  try {
    // 用 code 交換 access_token
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id,
        client_secret,
        redirect_uri,
        grant_type,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const tokens = await response.json();
    const { id_token } = tokens;

    // 用 id_token 驗證用戶
    const ticket = await oauthClient.verifyIdToken({
      idToken: id_token,
      audience: client_id,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: google_uid, picture: photo_url } = payload;
    const login = email.split("@")[0];

    // 檢查用戶是否存在
    let member = await MemberController.getMemberByEmail(email);
    if (!member) {
      // 如果用戶不存在，創建新會員
      member = await MemberController.createMember(
        login,
        email,
        name,
        "", // 如果有需要，可以使用預設密碼或空字串
        0,
        photo_url,
        google_uid
      );
    }

    output.success = true;
    output.data = {
      login: login,
      email: email,
      name: name,
      diamond: member["diamond"],
      token: id_token,
      photo_url: photo_url,
    };

    res.json(output);
  } catch (error) {
    console.error("Google 登入處理失敗:", error);
    res.status(500).json({ success: false, message: "Google 登入處理失敗" });
  }
});

// 註冊
router.post("/register", async (req, res) => {
  const output = {
    success: false,
    code: 0,
    message: "",
    data: {
      login: "",
      email: "",
      name: "",
      diamond: 0,
      token: "",
      photo_url: "",
    },
  };

  try {
    const { login, email, name, password, otp } = req.body;

    // 檢查用戶提供的OTP是否正確
    const { code, result } = await MemberController.verifyOTP(email, otp);
    if (!result) {
      output.code = code;
      output.message = setMessage(output.code);
      res.json(output);
      return;
    }

    let member = await MemberController.getMemberByLogin(login);
    if (member) {
      output.code = 501;
      output.message = setMessage(output.code);
      res.json(output);
      return;
    }

    member = await MemberController.getMemberByEmail(email);
    if (member) {
      output.code = 502;
      output.message = setMessage(output.code);
      res.json(output);
      return;
    }

    const newMember = await MemberController.createMember(
      login,
      email,
      name,
      password
    );

    const payload = {
      login: newMember["login"],
      email: newMember["email"],
    };
    const token = jwt.sign(payload, "idhwueifhuifihfweihfow452432");

    output.data = {
      login: newMember["login"],
      email: newMember["email"],
      name: newMember["name"],
      diamond: 0,
      token: token,
      photo_url: "",
    };

    output.success = true;
    res.json(output);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Internal server error..." });
  }
});

// 發送OTP的端點
router.post("/send-otp", async (req, res) => {
  const output = {
    success: false,
    code: 0,
    message: "",
    expires_time: undefined as Date | undefined,
  };

  const { email } = req.body;
  try {
    const member = await MemberController.getMemberByEmail(email);
    if (member) {
      output.code = 502;
      output.message = setMessage(output.code);
      console.log(output.message);
      res.json(output);
      return;
    }

    const { result, expiresAt } = await MemberController.sendOTPByEmail(email);
    if (!result) {
      output.code = 504;
      output.message = setMessage(output.code);
      res.json(output);
      return;
    }

    output.success = true;
    output.expires_time = expiresAt;

    res.json(output);
  } catch (error) {
    console.error("發送OTP失敗:", error);
    res.status(500).json({ success: false, message: "發送OTP失敗" });
  }
});

// 發送URL的端點
router.post("/send-url", async (req, res) => {
  const output = {
    success: false,
    code: 0,
    message: "",
  };

  const { email } = req.body;
  const token = jwt.sign({ email }, "your_secret_here", { expiresIn: "1d" }); // 有效期可以自行調整

  try {
    const member = await MemberController.getMemberByEmail(email);
    if (!member) {
      output.code = 506;
      output.message = setMessage(output.code);
      res.json(output);
      return;
    }

    const { result } = await MemberController.sendURLByEmail(email, token);
    if (!result) {
      output.code = 504;
      output.message = setMessage(output.code);
      res.json(output);
      return;
    }

    output.success = true;

    res.json(output);
  } catch (error) {
    console.error("發送URL失敗:", error);
    res.status(500).json({ success: false, message: "發送URL失敗" });
  }
});

// token驗證
router.post("/verify-token", (req, res) => {
  const { token } = req.body;

  try {
    jwt.verify(token, "your_secret_here");

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: "驗證連結無效或已過期" });
  }
});

// 更新密碼端點
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    // 驗證 token
    const decoded = jwt.verify(token, "your_secret_here");
    const { email } = decoded as { email: string }; // 從 token 中提取 email

    // 確保密碼符合要求
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "密碼必須至少6個字符長" });
    }

    // 獲取會員資料
    const member = await MemberController.getMemberByEmail(email);
    if (!member) {
      return res.status(404).json({ success: false, message: "會員不存在" });
    }

    // 更新密碼
    await MemberController.updateMemberPasswordByEmail(email, password);

    res.json({ success: true, message: "密碼已成功重設" });
  } catch (error) {
    console.error("重設密碼失敗:", error);
    res.status(500).json({ success: false, message: "內部伺服器錯誤" });
  }
});

router.post("/upload-photo", async (req, res) => {
  try {
    const { login } = req.body; // 假設 login 從請求中獲取

    // 檢查文件是否存在
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("沒有上傳任何文件");
    }

    // 獲取上傳的文件
    let uploadedFile = req.files.file;

    // 生成唯一文件名或使用用戶 login 加上原文件名的後綴
    const uniqueFileName = `${login}-${Date.now()}${path.extname(
      uploadedFile.name
    )}`;

    // 設定文件儲存路徑
    const uploadPath = path.join(
      __dirname,
      "../public/img/member",
      uniqueFileName
    );

    // 移動文件到指定路徑
    uploadedFile.mv(uploadPath, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("文件移動失敗");
      }

      // 更新會員資料中的圖片 URL
      const photo_url = `http://localhost:8080/img/member/${uniqueFileName}`;
      try {
        await MemberController.updateMemberPhotoByLogin(login, photo_url);
        res.json({ success: true, data: { photo_url } });
      } catch (updateError) {
        console.error("更新會員圖片失敗:", updateError);
        res.status(500).json({ success: false, message: "更新會員圖片失敗" });
      }
    });
  } catch (error) {
    console.error("上傳圖片失敗:", error);
    res.status(500).json({ success: false, message: "上傳圖片失敗" });
  }
});

export default router;
