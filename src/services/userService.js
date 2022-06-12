import db from "../models/index";
import bcrypt from "bcryptjs";

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
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users ='';
            if(userId=== 'All'){
                users= await db.User.findAll({
                    attributes:{
                        //except password parameters
                        exclude:["password"]
                    }
                })
            }
            if(userId && userId!=='All'){
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        //except password parameters
                        exclude: ["password"]
                    }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getAllUsers:getAllUsers,
    handleUserLogin: handleUserLogin
}
