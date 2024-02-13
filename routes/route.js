import express from 'express';  
import AuthController from '../controller/AuthController.js';
const router = express.Router(); 

router.get('/',(request,response) => { 
    console.log(request.body.umur);
    response.json({title:"Hello " + request.query.nama}); 
}) 
router.post('/',(req,res) => {
    res.json({nama:`Hello ${req.body.nama}, umur : ${req.body.umur} `});
}) 

router.post('/register', AuthController.register) 
router.post('/login',AuthController.login)

export default router; 

// testing user 
// fullname : tesFullname 
// email : tesEmail@abc.com 
// password : tesPassword 
// fullname : tesFullname1 
// email : tesEmail1@abc.com 
// password : tesPassword1 
