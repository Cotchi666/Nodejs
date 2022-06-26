import db from "../models/index";
import bcrypt from "bcryptjs";
//
const salt = bcrypt.genSaltSync(10);
//
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exist
        let user = await db.User.findOne({
          // only getting email roleId password from a obj
          attributes: ["email", "roleId", "password"],
          where: { email: email },
          raw: true,
        });
        //user found
        if (user) {
          //compare password
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "ok";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "wrong password";
          }
          //user not found
        } else {
          userData.errCode = 2;
          userData.errMessage = "User's not found";
        }
        //user is not already exist
      } else {
        userData.errCode = 1;
        userData.errMessage =
          "your's Email isn't exist in your system.. PLz try again";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "All") {
        users = await db.User.findAll({
          attributes: {
            //except password parameters
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "All") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            //except password parameters
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, rejects) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({
          errCode: 1,
          errMessage: "Your email is already in used, plz try it again~",
        });
      } else {
        let hashPasswordFormBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFormBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phone: data.phone,
          gender: data.gender === "1" ? true : false,
          roleId: data.roleId,
        });
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      rejects(e);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, rejects) => {
    try {
      let foundUser = await db.User.findOne({
        where: { id: userId },
      });
      if (!foundUser) {
        resolve({
          errCode: 2,
          message: "The user is not exist~",
        });
      }

      await db.User.destroy({
        where: { id: userId },
      });

      resolve({
        errCode: 0,
        message: "the user is deleted~",
      });
    } catch (e) {
      rejects(e);
    }
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, rejects) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Missing required parameters~",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        resolve({
          errCode: 0,
          message: "Update the user successfully~",
        });
      } else {
        resolve({
          errCode: 1,
          message: "The user is not found~",
        });
      }
    } catch (e) {
      rejects(e);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, rejects) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      rejects(e);
    }
  });
};
let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};



module.exports = {
  getAllUsers: getAllUsers,
  handleUserLogin: handleUserLogin,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  getAllCodeService: getAllCodeService,
};
