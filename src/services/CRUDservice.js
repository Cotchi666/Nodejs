


import bcrypt from "bcryptjs";
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, rejects) => {
    try {
      let hashPasswordFormBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFormBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phone :data.phone,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        
      })

      resolve("ok");
    } catch (e) {
      rejects(e);
    }
  })
}
// let createNewUser = async (data) => {
//   console.log(data)
//   console.log('------')
// }
let hashUserPassword = (password) => {
  return new Promise(async (resolve, rejects) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      rejects(e);
    }

  })
}
// let getUserInfoById = (useId) => {
//   return new Promise(async (resolve, rejects) => {
//     try {
//       let user = await db.User.findOne({
//         where: { id: useId },
//         raw: true,
//       })
//       if (user) {
//         resolve(user);
//       } else {
//         resolve({})
//       }

//     } catch (e) {
//       rejects(e);
//     }
//   })
// }
// let updateUserData = (data) => {
//   return new Promise(async (resolve, rejects) => {
//     try {
//       let user = await db.User.findOne({
//         where: { id: data.id },

//       })
//       if (user) {
//         user.firstName = data.firstName;
//         user.lastName = data.lastName;
//         user.address = data.address;
//         await user.save();
//         let allUsers = await db.User.findOne();

//         resolve(allUsers);
//       } else {
//         resolve({})
//       }

//     } catch (e) {
//       rejects(e);
//     }
//   })
// }
// let deleteUserById = (userId) => {
//   return new Promise(async (resolve, rejects) => {
//     try {
//       let user = await db.User.findOne({
//         where: { id: userId},

//       })
//       if (user) {

//         await user.destroy();


//       } resolve();

//     } catch (e) {
//       rejects(e);
//     }
//   })
// }

module.exports = {
  // getUserInfoById: getUserInfoById,
  // updateUserData: updateUserData,
  createNewUser: createNewUser,
  // deleteUserById: deleteUserById,
  hashUserPassword: hashUserPassword,
};
