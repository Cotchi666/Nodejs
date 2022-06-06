// import {db} from  "../models/index.js";
import db from '../models/index';
// db = require("../models/index.js");
import CRUDService from "../services/CRUDService";




let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("homepage.ejs", {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
};

let getAboutPage = (req, res) => {
    return res.render("test/about.ejs");
};
let getCRUD = (req, res) => {
    return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
    
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("hellooooo");
};
// let getEditCRUD = async (req, res) => {
//     let userId = req.body.id;
//     if (userId) {
//         let userData = await CRUDService.getUserInfoById(userId);

//         return res.render('editCRUD.ejs', {
//             user: userData
//         });
//     }
//     else {
//         return res.send('not found');
//     }
// }
// let putCRUD = async (req, res) => {
//     let data = req.body;
//     let allUsers = await CRUDService.updateUserData(data);
//     return res.render('displayCRUD.ejs', {
//         dataTable: allUsers
//     })
// }
// let deleteCRUD = async (req, res) => {
//     let userId = req.body.id;
//     if (userId) {
//          await CRUDService.deleteUserById(userId);

//         return res.send('Deleted successfullu');
//     }
//     else {
//         return res.send('not found');
//     }
// }
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    // putCRUD: putCRUD,
    // getEditCRUD: getEditCRUD,
    // deleteCRUD:deleteCRUD,
};
