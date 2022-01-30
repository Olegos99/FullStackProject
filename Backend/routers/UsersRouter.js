const UsersBLLPath = '../BLL/UsersBLL.js';

const expess = require('express');
const UsersBLL = require(UsersBLLPath);

const Router = expess.Router();

//get all users
Router.get('/',async (req,res) => {
    try {
        const Items = await UsersBLL.GetAllUsers();
        res.send(Items);
    } catch (error) {
        res.send(error);
    }
});


module.exports = Router;