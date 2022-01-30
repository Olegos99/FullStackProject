import React, {useEffect, useState} from 'react';
import axios from 'axios'

const MySubscriptionsURL = "http://localhost:8000/api/subscriptions/Movie";
const MySubscriptionsMembersURL = "http://localhost:8000/api/subscriptions/Member";


const FilmsURL = "https://api.tvmaze.com/shows";
const MembersURL = "https://jsonplaceholder.typicode.com/users";


function FirstDataUploadingComponent() {
const [Movies, setMovies] = useState([])
const [Members, setMembers] = useState([])

useEffect(() => {
    const getUsers = async () => {
        const { data } = await axios.get(FilmsURL)
        setMovies(data)
    }
    getUsers()
}, [])

useEffect(() => {
    const getMembers = async () => {
        const { data } = await axios.get(MembersURL)
        setMembers(data)
    }
    getMembers()
}, [])

const MembersList = Members.map((member) => {
    return (
        <li key={member.id}>
            Name: <span>{member.name}</span> <br />
            Email: <span>{member.email}</span> <br />
            City: <span>{member.address.city}</span> <br />
        </li>
    )
})

const MoviesList = Movies.map((movie) => {
    return (
        <li key={movie.id}>
            movie Name: <span>{movie.name}</span> <br />
            <img src={`${movie.image.medium}`}/> <br />
            genres: <span>{movie.genres}</span> <br />
            premiered: <span>{movie.premiered}</span> <br />
        </li>
    )
})

const SaveToDatabase = async() =>
{
    for(var i = 0; i< Movies.length; i++)
    {
        var newmovie ={
            Name : Movies[i].name,
            Genres :  [],
            img : Movies[i].image.medium,
            premiered : Movies[i].premiered,
            Raiting : Movies[i].rating.average
        }

        var newGanersArr = []

        for(var z = 0;z<Movies[i].genres.length; z++)
        {
            var newGaner = {
                Gener: Movies[i].genres[z]
            }
            newGanersArr.push(newGaner);
        }

        newmovie.Genres = newGanersArr;

        try {
            const PostRequest = await fetch(`${MySubscriptionsURL}`, {
                method : "post", //  (create ("post")  /  update("put")  /  delete ("delete")  / get - default?)
                headers : { "Content-Type": "application/json" }, //specify to webServise what we are sending (type of data)
                body: JSON.stringify(newmovie) //convert user to json and send in rquest body
            });
    
            if(PostRequest.ok)
            {
                console.log(PostRequest);
                console.log(newmovie);
            }
            else
            console.log("Error in POSTING"); 
        } catch (error) {
            console.log(error);
        }
    }
    
}

const SaveToDatabase2 = async() =>
{
    for(var i = 0; i< Members.length; i++)
    {
        var newMember ={
            Name : Members[i].name,
            Email :  Members[i].email,
            City :  Members[i].address.city
        }


        try {
            const PostRequest = await fetch(`${MySubscriptionsMembersURL}`, {
                method : "post", //  (create ("post")  /  update("put")  /  delete ("delete")  / get - default?)
                headers : { "Content-Type": "application/json" }, //specify to webServise what we are sending (type of data)
                body: JSON.stringify(newMember) //convert user to json and send in rquest body
            });
    
            if(PostRequest.ok)
            {
                console.log(PostRequest);
                console.log(newMember);
            }
            else
            console.log("Error in POSTING"); 
        } catch (error) {
            console.log(error);
        }
    }
    
}


  return <div>
      <h1>LoadedData:</h1>
      {/* <ul>{MoviesList}</ul> */}

      <ul>{MembersList}</ul> 


      {/* <button onClick={SaveToDatabase}>Save All</button> */} 

      <button onClick={SaveToDatabase2}>Save All 2</button>
      
  </div>;
}

export default FirstDataUploadingComponent;


