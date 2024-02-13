import User from "../model/User.js";
import emailExist from "../lib/emailExist.js";
import bcrypt from "bcrypt";

class Authcontroller {
  async login(req, res) {
    try {
      if (!req.body.email) {
        throw { code: 400, message: "EMAIL_IS_REQUIRED" };
      }
      if (!req.body.password) {
        throw { code: 400, message: "PASSWORD_IS_REQUIRED" };
      }

      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw { code: 400, message: "USER_NOT_FOUND_OR_WRONG_EMAIL" };
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        throw { code: 400, message: "PASSWORD_INVALID" };
      }

      return res.status(200).json({
        status: true,
        message: "USER_LOGIN_SUCCESS",
        fullname: user.fullname,
      });
    } catch (error) {
      return res.status(error.code || 500).json({
        message: error.message,
      });
    }
  }
  async register(req, res) {
    try {
      const { fullname, email, password } = req.body;
      const isEmailExist = await emailExist(req.body.email);
      if (!req.body.fullname) {
        throw { code: 400, message: "FULLNAME_IS_REQUIRED" };
      }
      if (!req.body.email) {
        throw { code: 400, message: "EMAIL_IS_REQUIRED" };
      }
      if (!req.body.password) {
        throw { code: 400, message: "PASSWORD_IS_REQUIRED" };
      }
      // cek password harus minimal 6 karakter
      if (req.body.password.length < 6) {
        throw { code: 400, message: "PASSWORD_MINIMUM_6_CHARACTERS" };
      }
      //cek email unique
      if (isEmailExist) {
        throw { code: 409, message: "EMAIL_ALREADY_EXIST" };
      }

      // hashing password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const user = await User.create({
        fullname,
        email,
        password: hashPassword,
      });
      if (!user) {
        throw {
          code: 500,
          message: "USER_REGISTER_FAILED",
        };
      }
      return res.status(200).json({
        status: true,
        message: "USER_REGISTER_SUCCESS",
        user,
      });
    } catch (err) {
      return res
        .status(err.code || 500)
        .json({ status: false, message: err.message });
    }
  }
}

export default new Authcontroller();
