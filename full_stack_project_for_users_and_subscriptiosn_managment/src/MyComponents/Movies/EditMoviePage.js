import React, {useState, useRef, useEffect} from 'react';
import { Link, useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import {updateObj, getById} from '../../Utils/Utils';
import { useSelector } from 'react-redux'

function EditMoviePage(props) {
    const history = useHistory();
    const match = useRouteMatch();
    const location = useLocation();
    const store = useSelector((state) => state);

    const FilmsUrl = "http://localhost:8500/api/movies";

    const Name = useRef(null);
    const Genres = useRef(null);
    const ImageUrl = useRef(null);
    const PremieredDate = useRef(null);
    const Raiting = useRef(null);

    let MovieIdToEdit = match.params.id;
    const [Movie, SetMovie] = useState({
        Name: "",
        Genres: "",
        img:"",
        premiered:"",
        Raiting: 0
      }
      );

        useEffect(() => {
            console.log("User id to edit = " + MovieIdToEdit); // <-- pass the component props
            if(window.localStorage.getItem('LastPage') !== location.pathname)
            {
              window.localStorage.setItem('LastPage', location.pathname);
            }
            FillMovieInfo();
        },[])

        const validateFormAndSubmit = async(event) => {
            event.preventDefault();

            if (document.forms["myForm"]["Name"].value == "") {
                alert("Name must be filled out");
                return false;
              }
              if (document.forms["myForm"]["Genres"].value == "") {
                alert("Genres must be filled out");
                return false;
              }
              if (document.forms["myForm"]["img"].value == "") {
                alert("ImageUrl must be filled out");
                return false;
              }
              if (document.forms["myForm"]["premiered"].value == "") {
                alert("Premiered Date must be filled out");
                return false;
              }

            let UpdatedMovie = {...Movie};
            console.log(MovieIdToEdit);
            console.log(UpdatedMovie);

            var check = await updateObj(FilmsUrl, MovieIdToEdit, UpdatedMovie);
            console.log(check);
            // redirection to all movies
            history.push('/Movies/');
        }

       const FillMovieInfo = async() =>
        {
            var allInfo = await getById(FilmsUrl, MovieIdToEdit);
            var Movie = allInfo.data[0];
            // console.log(Movie);
            Name.current.value = Movie.Name;
            Genres.current.value = DoStringFronGenres(Movie.Genres);
            ImageUrl.current.value = Movie.img;
            Raiting.current.value = Movie.Raiting;
            if( Movie.premiered.length > 10)
            {
                PremieredDate.current.value = Movie.premiered.slice(0,-14);
            }
            else{
                PremieredDate.current.value = Movie.premiered;
            }
            let UpdatedMovie = {...Movie};
            UpdatedMovie.Name = Name.current.value;

            UpdatedMovie.Genres = Movie.Genres;

            // console.log("Genres length = " + UpdatedMovie.Genres.length);

            UpdatedMovie.img = ImageUrl.current.value;
            UpdatedMovie.premiered = `${PremieredDate.current.value}T00:00:00.000Z`;

            UpdatedMovie.Raiting = Raiting.current.value;

            SetMovie(UpdatedMovie);
        }

        const DoStringFronGenres = (genres) =>
        {
            let GenresString ="";
            if(genres.length > 0)
            {
                genres.forEach(element => {
                    GenresString += `${element.Gener}, `
                });
            }
    
            GenresString = GenresString.slice(0,-2);
    
            return GenresString;
        } 

        const HandleInputChange = (e) =>
        {
            var fieldName = e.target.name;
            let UpdatedMovie = {...Movie};
            if(fieldName === "premiered")
            {
                UpdatedMovie =  {
                    ...UpdatedMovie,
                    premiered: `${e.target.value}T00:00:00.000Z`
                  }
            }
            else if(fieldName === "Genres")
            {
                var RecivedString = Genres.current.value;
                var WordsArray = RecivedString.split(' ');
                WordsArray = WordsArray.filter(word => word != "");
                WordsArray.forEach(element => {
                    element = element.replace(',','');
                });
                if(WordsArray.length == UpdatedMovie.Genres.length)
                {
                    // UpdatedMovie.Genres.forEach((element, key) => {
                    //     element.Gener = WordsArray[key].replace(',','')
                    // });
                }
                else{
                    if(WordsArray.length > UpdatedMovie.Genres.length)
                    {
                        let NewGenerObj = {
                            Gener: "GenerName",
                        }
                        const difference = WordsArray.length - UpdatedMovie.Genres.length;
                        for(var i = 0; i < difference; i++)
                        {
                            UpdatedMovie.Genres.push(NewGenerObj);
                        }
                    }
                    if(WordsArray.length < UpdatedMovie.Genres.length)
                    {
                        const difference = UpdatedMovie.Genres.length - WordsArray.length;
                        for(var i = 0; i < difference; i++)
                        {
                            UpdatedMovie.Genres.pop();
                        }
                    }
                }
                UpdatedMovie.Genres.forEach((element, key) => {
                    element.Gener = WordsArray[key].replace(',','')
                });
            }
            else if(fieldName === "Raiting")
            {
                UpdatedMovie =  {
                    ...UpdatedMovie,
                    [fieldName]:Number(e.target.value)
                  }
            }
            else{
                UpdatedMovie =  {
                    ...UpdatedMovie,
                    [fieldName]:e.target.value
                  }
            }
            SetMovie(UpdatedMovie);
        }
   

  return <div>
      <h2>Edit Movie:</h2>
      <form name="myForm" onSubmit={validateFormAndSubmit}>
      Name: <input ref={Name} type="text" name="Name" onChange={HandleInputChange}/> <br/>
      Genres: <input ref={Genres} type="text" name="Genres"onChange={HandleInputChange}/> <br/>
      Imgae url: <input ref={ImageUrl} type="text" name="img"onChange={HandleInputChange}/> <br/>
      Rating: <input ref={Raiting} type="number" step="any" name="Raiting" onChange={HandleInputChange}/> <br/>
      Premiered: <input ref={PremieredDate} type="date" name="premiered" onChange={HandleInputChange}/> <br/>
      <input type="submit" value="Submit"/>
      <Link to='/Movies/'>Back</Link>
      </form>
  </div>;
}

export default EditMoviePage;
