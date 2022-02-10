import React, {useState, useEffect, useRef} from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import {getAll, deleteObj, DeleteMovieFromAllSubscriptions} from '../../Utils/Utils';
import { useSelector } from "react-redux";

function AllMoviespage() {
    const history = useHistory();
    const store = useSelector((state) => state);
    const match = useRouteMatch();
    const location = useLocation();
    const MoviesUrl = "http://localhost:8500/api/movies";
    const SubsciptionsUrl = "http://localhost:8500/api/subscriptions";
    const MembersUrl = "http://localhost:8500/api/members";

    const isMountedRef = useRef(null);
    const IsFetchedRef = useRef(null);
    const SearchLineRef = useRef(null);

    const [CurrentluSearching, SetCurrentluSearching] = useState(false);

    const [Movies, SetMovies] = useState([]);
    const [Subscriptions, SetSubscriptions] = useState([]);
    const [Members, SetMembers] = useState([]);

    const [AllMoviesToRender, SetAllMoviesToRender] = useState([]);
    const [AllMoviesToShow, SetAllMoviesToShow] = useState([]);

    const referenceToCurrentluSearching = useRef();
    const referenceToMoviesToRender = useRef();
    const referenceToMoviesToShow = useRef();
    const referenceToSubscriptions = useRef();
    referenceToMoviesToRender.current = AllMoviesToRender;
    referenceToMoviesToShow.current = AllMoviesToShow;
    referenceToCurrentluSearching.current = CurrentluSearching;
    referenceToSubscriptions.current = Subscriptions;

    let OnlyMovieIdToShow = match.params.id;

    useEffect(async() => {
        if(window.localStorage.getItem('LastPage') !== location.pathname)
        {
          window.localStorage.setItem('LastPage', location.pathname);
        }
        IsFetchedRef.current = true;

        console.log("only one movie to show = " + OnlyMovieIdToShow);

        if(IsFetchedRef.current)
        {

            await getAll(MembersUrl).then((result) => {
                SetMembers(result.data);
            }).catch(ex => console.error(ex));

            await getAll(MoviesUrl).then((result) => {
                SetMovies(result.data);
            }).catch(ex => console.error(ex));
    
            await getAll(SubsciptionsUrl).then((result) => {
                SetSubscriptions(result.data);
            }).catch(ex => console.error(ex));
        }

        if(OnlyMovieIdToShow != undefined)
        {
            SetCurrentluSearching(true);
        }

        return function cleanUp()
        {
            // console.log("cleanUp was called");
            SetMovies([]);
            SetSubscriptions([]);
            SetMembers([]);
        }
    }, []);

    useEffect(() =>
    {
        if(OnlyMovieIdToShow != undefined)
        {
            if(AllMoviesToShow.length == 0)
            {
                if(Movies.length > 0)
                {
                    console.log("Search for spesific movie");
                    var SearchLineNode = SearchLineRef.current;
                    SearchLineNode.value = Movies.filter(obj => obj._id == OnlyMovieIdToShow)[0].Name;
                    SearchAlgorithm();
                }
            }
            else
            {
                
            }

            // fill the search line and refresh
        }
    }, [CurrentluSearching]);

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

    const SearchAlgorithm = () =>
    {
        var SearchLineNode = SearchLineRef.current;
        var SearchLine = SearchLineNode.value;
        var SearchLineLength = SearchLine.length;
        // console.log("Searching for: " + SearchLine);
        if(SearchLineLength == 0 || SearchLine == undefined)
        {
            SetCurrentluSearching(false);
            SetAllMoviesToShow(AllMoviesToRender);
            // console.log("Set show movies DEFAULT value");
        }
        else{
            SetCurrentluSearching(true);
            // console.log("Searchline to lower = " + SearchLine.toLowerCase());
            var newMoviesArray = AllMoviesToRender.filter((element) => element.props.name.toLowerCase().includes(SearchLine.toLowerCase()));
            // console.log("Set show movies to new value");
            SetAllMoviesToShow(newMoviesArray);
        }
    }

    useEffect(() => {
        // console.log("usefect2");
        isMountedRef.current = true;

        const SubscriptionsLength = Subscriptions.length;

        if(isMountedRef.current)
        {
            let Prep = Movies.map((item,key) => (
                <table name={item.Name} id={item._id} key={key} style={{ border: "thick solid black"}}>
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
                                       {
                                       Subscriptions.map((obj) =>
                                       {
                                           return(
                                        obj.Movies.map((movie, key) =>
                                        {
                                            // console.log(movie);
                                            if(movie.movieId == item._id)
                                            {
                                                if(GetPremmisionByPremName("View_Subscriptions"))
                                                {
                                                    return (<div key={key}><Link to="/Subscriptions/">{Members.filter(member => member._id === obj.MemberID)[0].Name}</Link>
                                                    <span>, {movie.date.slice(0, -14)}</span>
                                                    </div>)
                                                }
                                                else{
                                                    return (<div key={key}><span>{Members.filter(member => member._id === obj.MemberID)[0].Name}</span>
                                                    <span>, {movie.date.slice(0, -14)}</span>
                                                    </div>)
                                                }

                                            }
                                            else{
                                                return null;
                                            }
                                        })
                                           )}
                                      )
                                      }
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
            // console.log(OnlyMovieIdToShow);
            if(OnlyMovieIdToShow === undefined)
            {            
                SetAllMoviesToShow(Prep);
            }
        }
        return function cleanUp2()
        {
            SetAllMoviesToRender([]);
            SetAllMoviesToShow([]);
            // console.log("cleanUp2 was called");
        }
    }, [Movies, Subscriptions]);

    const EditMovieWithId = (e) => {
        console.log("Edit movie with id: " + e.target.id);
        history.push(`/Movies/EditMovie/${e.target.id}`);
    }

    const DeleteMovie = async(e) => {
        console.log("Delete movie with id: " + e.target.id);
        var responce = await deleteObj(MoviesUrl, e.target.id);
        console.log(responce);
        // delete movie from subscriptions!!!
        var response2 = await DeleteMovieFromAllSubscriptions(SubsciptionsUrl,e.target.id);
        console.log(response2);

        //refreshPage
        var UpdatedFilmsToRender = referenceToMoviesToRender.current;
        UpdatedFilmsToRender = UpdatedFilmsToRender.filter(function( obj ) {
            return obj.props.id !== e.target.id;
        });
        SetAllMoviesToRender(UpdatedFilmsToRender);
        if(referenceToCurrentluSearching.current)
        {
            console.log("updating curr searching list");
            var UpdatetFilmsToShow = referenceToMoviesToShow.current;
            var deletedFilmid = e.target.id;
            UpdatetFilmsToShow = UpdatetFilmsToShow.filter(function( obj ) {
                return obj.props.id !== deletedFilmid;
            });
            console.log(UpdatetFilmsToShow);
            SetAllMoviesToShow(UpdatetFilmsToShow);
        }
        else{
            SetAllMoviesToShow(UpdatedFilmsToRender);
        }
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
      <div>Search: <input ref ={SearchLineRef} type="text" onChange={SearchAlgorithm}></input></div><br/>
      {AllMoviesToShow}
  </div>;
}

export default AllMoviespage;
