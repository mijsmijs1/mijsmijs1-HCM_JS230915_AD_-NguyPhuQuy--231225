import express from 'express';
const Router = express.Router();
import { todoController } from '../controllers/todoList.controller';
import { loginController } from '../controllers/login.controller';
import { userMiddleware } from '../middlewares';
Router.post('/login', loginController.login)
Router.post('/register', loginController.register)
Router.post('/decode-token/:token', userMiddleware.tokenValidate, loginController.decodeToken)
Router.post('/todo', userMiddleware.tokenValidate, todoController.create)
Router.get('/todo', userMiddleware.tokenValidate, todoController.findAll)
Router.patch('/todo/:id', userMiddleware.tokenValidate, todoController.update)
Router.delete('/todo/:id', userMiddleware.tokenValidate, todoController.delete)
export default Router;