import express from "express";
import res from "express/lib/response";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/',(req, res)=>{
        return res.send('hello with Chien')
    });
    // router.get('/', homeController.getHomePage);
    // router.get('/about', homeController.getAboutPage);
   
    return app.use("/", router);
}

module.exports = initWebRoutes;