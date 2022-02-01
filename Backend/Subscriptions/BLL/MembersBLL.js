const pathToMemberModel = '../DBmodels/Member';


const MemberModel = require(pathToMemberModel);


const GetAllMembers = () => {
    return new Promise ((resolve,reject) =>
    {
        MemberModel.find({}, (error, items) =>
        {
            if(error)
             reject(error)
            else 
            resolve(items)
        });
    });
}

const GetMemberById = (id) => {
    return new Promise ((resolve,reject) =>
    {
        MemberModel.find({_id : id}, (error, items) =>
        {
            if(error)
             reject(error)
            else 
            resolve(items)
        });
    });
}



//Post Item (Add new Item)
const PostNewMember = (RecivedItem) =>
{
    return new Promise((resolve,reject) =>
    {
        const NewMember = new MemberModel(RecivedItem);
        NewMember.save((error) => 
        {
            if(error)
            reject(error)
            else
            resolve(`${NewMember} item was succsesfuly saved`);
        });
    });
}

//Put Item by ID (Update existing)
const UpdateMemberById = (id, item) =>
{
    return new Promise((resolve,reject) =>
    {
        MemberModel.findByIdAndUpdate(id, item,(error) => 
        {
            if(error)
            reject(error)
            else
            resolve(`Movie with id ${id} was succsesfuly updated`);
        });
    });
}

//Delete Item by ID
const DeleteMemberByID = async (id) => {
    return new Promise((resolve, reject) => {
        MemberModel.findByIdAndDelete(id, (err) => {
            if(err)
            reject(err);
            else
            resolve(`Item with id:${id} was delited`);
        })
    })
}


module.exports ={
GetAllMembers,
PostNewMember,
UpdateMemberById,
DeleteMemberByID,
GetMemberById
}