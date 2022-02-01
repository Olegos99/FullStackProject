const pathToUserModel = '../DBmodel/User.js';

const UserModel = require(pathToUserModel);

const PremissionsDAL = require('../DAL/PremissionsDAL');
const UsersDAL = require('../DAL/UsersDAL');

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

const CheckUserByUsernameAndPassword = (username, password) => {
    return new Promise ((resolve,reject) =>
    {
        UserModel.find({ UserName:username, Password: password}, (error, items) =>
        {
            if(items.length > 0)
            {
                resolve(items[0]._id)
            }
            else{
                reject("no such combination found")
            }
        });
    });
}

const CheckNewUserExistance = (username) => {
    return new Promise ((resolve,reject) =>
    {
        UserModel.find({ UserName:username, Password: ""}, (error, items) =>
        {
            if(items.length > 0)
            {
                resolve(items[0])
            }
            else{
                reject("no such new user found")
            }
        });
    });
}

const GetUserInfo = (id) =>
{
    return new Promise (async(resolve,reject) =>
    {
        var AllRequestedData = [];

        let json = await PremissionsDAL.getPremissionsJSON();
        let json2 = await UsersDAL.getUsersJSON();

        var premissions = json.filter((obj) => obj.id == id);
        var otherInfo = json2.filter((obj) => obj.id == id);

        AllRequestedData.push(premissions);
        AllRequestedData.push(otherInfo);

        if(premissions != null || premissions != undefined )
        {
            resolve(AllRequestedData);
        }
        else{
            reject("no such user");
        }

    });
}

//set users info


//Post Item (Add new Item)
const PostNewUser = (RecivedItem) =>
{
    return new Promise((resolve,reject) =>
    {
        const NewUser = new UserModel(RecivedItem);
        NewUser.save((error) => 
        {
            if(error)
            reject(error)
            else
            resolve(`${NewUser} item was succsesfuly saved`);
        });
    });
}

//Put Item by ID (Update existing)
const UpdateUserById = (id, item) =>
{
    return new Promise((resolve,reject) =>
    {
        UserModel.findByIdAndUpdate(id, item,(error) => 
        {
            if(error)
            reject(error)
            else
            resolve(`User with id ${id} was succsesfuly updated`);
        });
    });
}

//Delete Item by ID
const DeleteUserByID = async (id) => {
    return new Promise((resolve, reject) => {
        UserModel.findByIdAndDelete(id, (err) => {
            if(err)
            reject(err);
            else
            resolve(`Item with id:${id} was delited`);
        })
    })
}

module.exports ={
    GetAllUsers,
    PostNewUser,
    UpdateUserById,
    DeleteUserByID,
    CheckUserByUsernameAndPassword,
    GetUserInfo,
    CheckNewUserExistance
    }