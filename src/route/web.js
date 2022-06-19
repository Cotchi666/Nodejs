import express from "express";
import res from "express/lib/response";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
let router = express.Router();
//
let initWebRoutes = (app) => {
    //backend testing
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.getCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);

    router.post('/put-crud', homeController.putCRUD);
    router.post('/delete-crud', homeController.deleteCRUD);
    router.get('/crud', homeController.getCRUD);

    //api
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    //api-crud
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);


    return app.use("/", router);
}

module.exports = initWebRoutes;