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
const SetUserInfo = (id, userInfo) =>
{
    return new Promise (async(resolve,reject) =>
    {
        let Premissionsjson = await PremissionsDAL.getPremissionsJSON();
        let Usersjson = await UsersDAL.getUsersJSON();

        var counter = 0;
        Premissionsjson.forEach(element => {
            if(element.id === id)
            {
                element = userInfo[1];
                counter ++;
            }
        });

        if(counter === 0) // not found such user => create it
        {
            var newPremission =     {
                id: `${id}`,
                Premissions: userInfo[1]
            }
            Premissionsjson.push(newPremission);
        }

        counter = 0;

        Usersjson.forEach(element => {
            if(element.id === id)
            {
                element = userInfo[2][0];
                counter ++;
            }
        });

        if(counter === 0) // not found such user => create it
        {
            var newPersonalInfo = userInfo[2][0];
            newPersonalInfo.id = id;
            Usersjson.push(newPersonalInfo);
        }

        var premissions = await PremissionsDAL.setPremissionsJSON(Premissionsjson);
        var users = await UsersDAL.setUsersJSON(Usersjson);

        if(premissions != null || premissions != undefined && users != null || users != undefined)
        {
            resolve("Json's sucssesfully updated");
        }
        else{
            reject("Was error on writing files to jsons");
        }

    });
}


//Post Item (Add new Item)
const PostNewUser = (RecivedItem) =>
{
    return new Promise(async(resolve,reject) =>
    {
        const NewUser = new UserModel(RecivedItem[0][0]);
        NewUser.save((error) => 
        {
            if(error)
            reject(error)
            else
            resolve(NewUser);
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
    CheckNewUserExistance,
    SetUserInfo
    }