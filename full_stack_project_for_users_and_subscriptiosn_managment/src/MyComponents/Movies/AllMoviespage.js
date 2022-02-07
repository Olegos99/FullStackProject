import React, {useState, useEffect, useRef} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {getAll, deleteObj} from '../../Utils/Utils';
import { useSelector } from "react-redux";

function AllMoviespage() {
    const history = useHistory();
    const store = useSelector((state) => state);
    const location = useLocation();
    const MoviesUrl = "http://localhost:8500/api/movies";
    const SubsciptionsUrl = "http://localhost:8500/api/subscriptions";

    const isMountedRef = useRef(null);
    const IsFetchedRef = useRef(null);

    const [Movies, SetMovies] = useState([]);
    const [Subscriptions, SetSubscriptions] = useState([]);

    const [AllMoviesToRender, SetAllMoviesToRender] = useState([]);

    useEffect(async() => {
        IsFetchedRef.current = true;

        if(IsFetchedRef.current)
        {
            await getAll(MoviesUrl).then((result) => {
                SetMovies(result.data);
            }).catch(ex => console.error(ex));
    
            await getAll(SubsciptionsUrl).then((result) => {
                SetSubscriptions(result.data);
            }).catch(ex => console.error(ex));
        }

        return function cleanUp()
        {
            console.log("cleanUp was called");
            SetMovies([]);
            SetSubscriptions([]);
        }
    }, []);

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

    useEffect(() => {
        console.log("usefect2");
        isMountedRef.current = true;
        if(isMountedRef.current)
        {
            let Prep = Movies.map((item,key) => (
                <table id={item.key} key={key} style={{ border: "thick solid black"}}>
                <tbody>
                  <tr>
                    <th>
                  Name: {item.Name}<br/>
                    </th>
                  </tr>
                  <tr>
                    <td>
                  Genres: {DoStringFronGenres(item.Genres)}<br/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                        <nav style={{ display: 'flex'}}>
                            <img src={`${item.img}`} style={{width:"50%",height:"50%"}}/>
                            <table style={{ border: "1px solid black"}}>
                            <tbody>
                                <tr>
                                    <th>
                                        Subscriptions watched:
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                       items
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </nav>    
                    </td>
                  </tr>
      
                  <tr>
                    <td>
                        <nav style={{ display: 'flex'}}>
                            <button id={`${item._id}`} onClick={EditMovieWithId} style={{display: GetPremmisionByPremName("Update_Movies") ? 'block':'none'}}>
                            Edit
                            </button>
                            <button id={`${item._id}`} onClick={DeleteMovie} style={{display: GetPremmisionByPremName("Delete_Movies") ? 'block':'none'}}>
                            Delete
                            </button>
                        </nav>
                    </td>
                  </tr>
                </tbody>
              </table>
            ));
            SetAllMoviesToRender(Prep);
        }
        return function cleanUp2()
        {
            SetAllMoviesToRender([]);
            console.log("cleanUp2 was called");
        }
    }, [Movies]);

    const EditMovieWithId = (e) => {
        console.log("Edit movie with id: " + e.target.id);
        history.push(`/Movies/EditMovie/${e.target.id}`);
    }

    const DeleteMovie = async(e) => {
        console.log("Delete movie with id: " + e.target.id);
        var responce = await deleteObj(MoviesUrl, e.target.id);
        console.log(responce);
        //refreshPage
    }


    let GetPremmisionByPremName = (premissionName) =>
    {
        var haveThisPremission = false;
        var objectToCompare ={
            [premissionName]: true
        }
        store.CurrentUserPremissions.forEach(element => {
            if(JSON.stringify(element) === JSON.stringify(objectToCompare))
            {
                haveThisPremission = true;
            }
        });
        // var premmision = store.CurrentUserPremissions.filter((obj) => obj.name === `${premissionName}`);
        return (haveThisPremission);
    }

  return <div>
      <h2>All movies:</h2>
      {AllMoviesToRender}
  </div>;
}

export default AllMoviespage;
