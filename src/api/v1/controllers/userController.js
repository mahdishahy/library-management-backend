const url = require("url");
const UserModel = require("../models/users.js");
const bcrypt = require("bcrypt");

const getAll = async (req, res) => {
  const users = await UserModel.find();
  res.writeHead(200, { "content-type": "application/json" });
  res.write(JSON.stringify(users));
  res.end();
};

const getUserById = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const id = parsedUrl.query.id;
  const user = await UserModel.findById(id);
  res.writeHead(200, { "content-type": "application/json" });
  res.write(JSON.stringify(user));
  res.end();
};

const update = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const id = parsedUrl.query.id;
  let body = "";
  req.on("data", (data) => {
    body += data.toString();
  });
  req.on("end", async () => {
    try {
      const updateData = JSON.parse(body);
      const updateResult = await UserModel.update(id, updateData);
      res.writeHead(updateResult.success ? 200 : 404, {
        "content-type": "application/json",
      });
      res.write(JSON.stringify(updateResult));
      res.end();
    } catch (error) {
      res.writeHead(400, { "content-type": "application/json" });
      res.write(JSON.stringify({ success: false, message: "ورودی نامعتبر" }));
      res.end();
    }
  });
};

const remove = async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const id = parsedUrl.query.id;
    const removeResult = await UserModel.remove(id);
    res.writeHead(removeResult.success ? 200 : 404, {
      "content-type": "application/json",
    });
    res.write(JSON.stringify(removeResult));
    res.end();
  } catch (error) {
    res.writeHead(400, { "content-type": "application/json" });
    res.write(JSON.stringify({ success: false, message: "ورودی نامعتبر" }));
    res.end();
  }
};

const store = async (req, res) => {
  try {
    let newUserInfosBody = "";
    req.on("data", async (data) => {
      newUserInfosBody += data.toString();
    });

    req.on("end", async () => {
      const {
        full_name,
        email,
        password,
        address = null,
        phone_number = null,
      } = JSON.parse(newUserInfosBody);
      const saltRounds = 10;
      if (!full_name || !email || !password) {
        res.writeHead(400, { "content-type": "application/json" });
        res.write(
          JSON.stringify({
            success: false,
            message: "نام، ایمیل و رمزعبوری الزامی هستند",
          })
        );
        res.end();
      } else {
        const isExistEmail = await UserModel.findByEmail(email);
        if (isExistEmail) {
          res.writeHead(409, { "content-type": "application/json" });
          res.write(
            JSON.stringify({
              success: false,
              message: "ایمیل از قبل وجود دارد",
            })
          );
          res.end();
        } else {
          const newUserData = {
            full_name,
            email,
            password: await bcrypt.hash(password, saltRounds),
            address,
            phone_number,
            role: "USER",
            memebership: false,
            created_at: Date.now(),
            updated_at: Date.now(),
          };
          const storeUserResult = await UserModel.store(newUserData);
          res.writeHead(storeUserResult.success ? 201 : 400, {
            "content-type": "application/json",
          });
          res.write(JSON.stringify(storeUserResult));
          res.end();
        }
      }
    });
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json" });
    res.write(JSON.stringify({ success: false, message: "خطا در سرور" }));
    res.end();
  }
};

const login = async (req, res) => {
  let buffer = "";
  req.on("data", (data) => {
    buffer += data.toString();
  });
  req.on("end", async () => {
    const { email, password } = JSON.parse(buffer);

    if (!email || !password) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          success: false,
          message: "فیلد ایمیل و رمزعبور الزامی است",
        })
      );
      return res.end();
    }

    const user = await UserModel.findUser({ email });
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          success: false,
          message: "کابری با این اطلاعات یافت نشد",
        })
      );
      return res.end();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({ success: true, message: "ایمیل یا رمزعبور اشتباه" })
      );
      return res.end();
    }

    await UserModel.updateUserLoginStatus(email, true);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ success: false, message: "ورود انجام شد" }));
    return res.end();
  });
};

const logout = async (req, res) => {
  let body = "";
  req.on("data", (data) => {
    body += data.toString();
  });
  req.on("end", async () => {
    try {
      const { email } = JSON.parse(body);
      console.log(email);
      const result = await UserModel.logoutUser(email);
      res.writeHead(result.success ? 200 : 400, {
        "content-type": "application/json",
      });
      res.write(
        JSON.stringify({
          success: true,
          message: "خروج از حساب با موفقیت انجام شد",
        })
      );
      res.end();
    } catch (error) {
      res.writeHead(500, { "content-type": "application/json" });
      res.write(JSON.stringify({ success: false, message: "خطا در سرور" }));
      res.end();
    }
  });
};

const getUserCount = async (req, res) => {
  try {
    const userCount = await UserModel.countUsers();
    res.writeHead(200, { "content-type": "application/json" });
    res.write(JSON.stringify({success:true, count: userCount}));
    res.end();
  } catch (error) {
    res.writeHead(500, { "content-type": "application/json" });
    res.write(JSON.stringify({ success: false, message: "خطا در سرور" }));
    res.end();
  }
};

module.exports = {
  getAll,
  getUserById,
  update,
  remove,
  store,
  login,
  logout,
  getUserCount,
};
