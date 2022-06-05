import express from "express";
import res from "express/lib/response";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    // router.get('/',(req, res)=>{
    //     return res.send('hello with Chien')
    // });
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.getCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.post('/delete-crud', homeController.deleteCRUD);

    return app.use("/", router);
}

module.exports = initWebRoutes;