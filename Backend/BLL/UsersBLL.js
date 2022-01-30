const pathToUserModel = '../DBmodels/User.js';

const UserModel = require(pathToUserModel);

const GetAllUsers = () => {
    return new Promise ((resolve,reject) =>
    {
        UserModel.find({}, (error, items) =>
        {
            if(error)
             reject(error)
            else 
            resolve(items)
        });
    });
}

module.exports ={
    GetAllUsers
    }