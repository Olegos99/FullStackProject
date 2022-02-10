import React, {useState, useEffect, useRef} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {addObj} from '../../Utils/Utils';

function AddMoviePage() {
  const history = useHistory();
  const location = useLocation();

  const FilmsUrl = "http://localhost:8500/api/movies";

  const Genres = useRef(null);

  useEffect(()=>
  {
    if(window.localStorage.getItem('LastPage') !== location.pathname)
    {
      window.localStorage.setItem('LastPage', location.pathname);
    }
  },[]);

  const [Movie, SetMovie] = useState({
    Name: "",
    Genres: [],
    img:"",
    premiered:"",
    Raiting: 0
  }
  );

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

    console.log(UpdatedMovie);

    var check = await addObj(FilmsUrl, UpdatedMovie);
    console.log(check);
    // redirection to all movies
    history.push('/Movies/');
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
      <h2>Add Movie:</h2>
        <form name="myForm" onSubmit={validateFormAndSubmit}>
            Name: <input type="text" name="Name" onChange={HandleInputChange}/> <br/>
            Genres: <input ref={Genres} type="text" name="Genres"onChange={HandleInputChange}/> <br/>
            Imgae url: <input type="text" name="img"onChange={HandleInputChange}/> <br/>
            Rating: <input type="number" step="any" name="Raiting" onChange={HandleInputChange}/> <br/>
            Premiered: <input  type="date" name="premiered" onChange={HandleInputChange}/> <br/>
            <input type="submit" value="Submit"/>
            <Link to='/Movies/'>Back</Link>
        </form>
  </div>;
}

export default AddMoviePage;
