import express from 'express';
import { login, register, forgotpassword, resetpassword,adminlogin } from '../controller/Usercontroller.js';


const userrouter = express.Router();

userrouter.post('/login', login);
userrouter.post('/register', register);
userrouter.post('/forgot', forgotpassword);
userrouter.put('/reset', resetpassword);
userrouter.post('/admin',adminlogin);

export default userrouter;