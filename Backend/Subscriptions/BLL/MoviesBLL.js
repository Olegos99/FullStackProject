const pathToMovieModel = '../DBmodels/Movie';

const MovieModel = require(pathToMovieModel);

//Get All Items
const GetAllMovies = () => {
    return new Promise ((resolve,reject) =>
    {
        MovieModel.find({}, (error, items) =>
        {
            if(error)
             reject(error)
            else 
            resolve(items)
        });
    });
}

//Get movie by id
const GetMovieById = (id) => {
    return new Promise ((resolve,reject) =>
    {
        MovieModel.find({_id : id}, (error, items) =>
        {
            if(error)
             reject(error)
            else 
            resolve(items)
        });
    });
}


//Post Item (Add new Item)
const PostNewMovie = (RecivedItem) =>
{
    return new Promise((resolve,reject) =>
    {
        const NewMovie = new MovieModel(RecivedItem);
        NewMovie.save((error) => 
        {
            if(error)
            reject(error)
            else
            resolve(`${NewMovie} item was succsesfuly saved`);
        });
    });
}

//Put Item by ID (Update existing)
const UpdateMovieById = (id, item) =>
{
    console.log("Update Movie Request Recived");
    console.log(id);
    console.log(item);
    return new Promise((resolve,reject) =>
    {
        MovieModel.findByIdAndUpdate(id, item,(error) => 
        {
            if(error)
            {
                reject(error)
                console.log("eror happend");
            }
            else
            {
                resolve(`Movie with id ${id} was succsesfuly updated`);
            }

        });
    });
}

//Delete Item by ID
const DeleteMovieByID = async (id) => {
    return new Promise((resolve, reject) => {
        MovieModel.findByIdAndDelete(id, (err) => {
            if(err)
            reject(err);
            else
            resolve(`Item with id:${id} was delited`);
        })
    })
}


module.exports ={
GetAllMovies,
PostNewMovie,
UpdateMovieById,
DeleteMovieByID,
GetMovieById
}