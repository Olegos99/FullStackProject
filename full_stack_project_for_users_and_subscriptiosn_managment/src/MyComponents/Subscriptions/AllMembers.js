import React, {useState, useEffect, useRef} from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import {getAll, deleteObj, getById, updateObj, addObj, deleteSubscription} from '../../Utils/Utils';
import { useSelector } from "react-redux";
import SubscriptionPartOfMember from './SubscriptionPartOfMember';

function AllMembers() {
  const history = useHistory();
  const store = useSelector((state) => state);
  const location = useLocation();

  const MembersUrl = "http://localhost:8500/api/members";
  const SubsciptionsUrl = "http://localhost:8500/api/subscriptions";
  const FilmsUrl = "http://localhost:8500/api/movies";


  const [Members, SetMembers] = useState([]);
  const [Subscriptions, SetSubscriptions] = useState([]);
  const [films, SetFilms] = useState([]);

  const [AllMembersToRender, SetAllMembersToRender] = useState([]);
  const [AllSubscriptionsToRender, SetAllSubscriptionsToRender] = useState([]);

  const [ShowCreateNewSubscription, SetShowCreateNewSubscription] = useState([]);

  const referenceToShowCreateNewSubscription = useRef();
  referenceToShowCreateNewSubscription.current = ShowCreateNewSubscription;

  const RefToFilms = useRef();
  RefToFilms.current = films;

  const RequestAllRelevantData = async() => {

    await getAll(MembersUrl).then((result) => {
      SetMembers(result.data);
    }).catch(ex => console.error(ex));

    await getAll(FilmsUrl).then((result) => {
      SetFilms(result.data);
  }).catch(ex => console.error(ex));

    await getAll(SubsciptionsUrl).then((result) => {
        SetSubscriptions(result.data);
    }).catch(ex => console.error(ex));

  }


  useEffect(async() => {

    if(window.localStorage.getItem('LastPage') !== location.pathname)
    {
      window.localStorage.setItem('LastPage', location.pathname);
    }

    RequestAllRelevantData();

    return function cleanUp()
    {
        // console.log("cleanUp was called");
        SetMembers([]);
        SetSubscriptions([]);
        SetFilms([]);
    }
    }, []);

    const EditMemberWithId = (e) => {
      console.log("Edit member with id: " + e.target.id);
      history.push(`/Subscriptions/EditMember/${e.target.id}`);
  }

  const DeleteMember = async(e) => {
    console.log("Delete Member with id: " + e.target.id);
    var responce = await deleteObj(MembersUrl, e.target.id);
    console.log(responce);
    var responce = await deleteSubscription(SubsciptionsUrl, e.target.id);
    console.log(responce);
    //refresh Somehow
    RequestAllRelevantData();
  }

  const GetMovieNameById = (id) =>
  {
    var MovieName = RefToFilms.current.filter((obj) => obj._id === id);
    if(MovieName[0] != undefined)
    {
      return (MovieName[0].Name);
    }
    else{
      return (null);
    }
  }

  useEffect(()=>{
    let SubscriptionsPrep = Subscriptions.map((item, key) =>(
     <ul key={key} id={item.MemberID}>
       {item.Movies.map((obj, key) =>{
        //  console.log(obj)
          var NameToDisplay = GetMovieNameById(obj.movieId);
          // console.log(NameToDisplay);
         if(GetPremmisionByPremName("View_Movies"))
         {
           return (<li key ={key} id={obj.movieId}><Link to={`/Movies/spesificMovie/${obj.movieId}`}>{NameToDisplay}</Link>, {obj.date.slice(0,-14)}</li>)
         }
         else{
          return (<li key ={key} id={obj.movieId}>{NameToDisplay}, {obj.date.slice(0,-14)}</li>)
         }
       })}
     </ul>
    ));
    SetAllSubscriptionsToRender(SubscriptionsPrep);
  }, [Subscriptions]);

    useEffect(() => {
      // console.log("usefect2");
          let Prep = Members.map((item,key) => (
              <table name={item.Name} id={item._id} key={key} style={{ border: "thick solid black", margin:"auto", width:"80%" }}>
              <tbody>
                <tr>
                  <th>
                      <b> {item.Name}</b><br/>
                  </th>
                </tr>
                <tr>
                  <td>
                Email: {item.Email}<br/>
                  </td>
                </tr>
                <tr>
                  <td>
                City: {item.City}<br/>
                  </td>
                </tr>
                <tr>
                  <td>
                      <nav style={{ display: 'flex', margin:"auto", justifyContent:"center"}}>
                          <button id={`${item._id}`} onClick={EditMemberWithId} style={{display: GetPremmisionByPremName("Update_Subscriptions") ? 'block':'none'}}>
                          Edit
                          </button>
                          <button id={`${item._id}`} onClick={DeleteMember} style={{display: GetPremmisionByPremName("Delete_Subscriptions") ? 'block':'none'}}>
                          Delete
                          </button>
                      </nav>
                  </td>
                </tr>
                <tr>
                  <td>
                      <nav style={{ display: 'flex', margin:"auto", justifyContent:"center"}}>
                        {SubscriptionPartOfMember(item,OpenSubscriptionCreation,
                           ShowCreateNewSubscription.includes(item._id),[...films],
                            [...AllSubscriptionsToRender], SubscribeToMovie, GetPremmisionByPremName("Update_Subscriptions"))}
                      </nav>    
                  </td>
                </tr>
    

              </tbody>
            </table>
          ));
          SetAllMembersToRender(Prep);
   
      return function cleanUp2()
      {
        SetAllMembersToRender([]);
          // console.log("cleanUp2 was called");
      }
  }, [Members, ShowCreateNewSubscription, films, AllSubscriptionsToRender]);

  const SubscribeToMovie = async(subscription) =>{
    // console.log("get new subscription: ");
    // console.log(subscription);

    const isFound = Subscriptions.some(element => {
      if (element.MemberID === subscription.userId) {
        return true;
      }
    });
    //const CheckIfUserHaveSubscriptions = Subscriptions.includes(obj => obj.MemberID === subscription.userId);

    console.log("UserHave previous subscriptions = " + isFound);
    if(isFound)
    {
      const SubscriptionRequest = await getById(SubsciptionsUrl, subscription.userId);
      let UpdatedSubscription = {...SubscriptionRequest.data[0]};
      // console.log("Subscription info:");
      // console.log(UpdatedSubscription);
      
      const newMovie = {
        movieId: subscription.Movie.movieId,
        date: `${subscription.Movie.date}T00:00:00.000Z`
      }
      var updatedMovies = UpdatedSubscription.Movies;
      updatedMovies.push(newMovie);
      UpdatedSubscription.Movies = updatedMovies;
      // console.log(UpdatedSubscription);
      const responce = await updateObj(SubsciptionsUrl, UpdatedSubscription._id, UpdatedSubscription);
      console.log(responce);
      if(responce.statusText == "OK")
      {
        RequestAllRelevantData()
      }
      else{
        alert("Error happend wile saving subscription");
      }
    }
    else{
      //create new subscription and save it
      var NewSubscription = {
        MemberID : subscription.userId,
        Movies : [{
            movieId : subscription.Movie.movieId,
            date : `${subscription.Movie.date}T00:00:00.000Z`
        }]
      };
      const responce = await addObj(SubsciptionsUrl, NewSubscription);     //save subscription
      console.log(responce);
      if(responce.statusText == "OK")
      {
        RequestAllRelevantData()
      }
      else{
        alert("Error happend wile saving subscription");
      }
    }

  }

  const OpenSubscriptionCreation = (e) => {
      console.log("create new subscription for user: " + e.target.name);
      var ShowSubscription = e.target.id;

      var ArrayOfCreateNewSubscriptions = [...referenceToShowCreateNewSubscription.current];
      if(ArrayOfCreateNewSubscriptions.includes(ShowSubscription))
      {
        ArrayOfCreateNewSubscriptions = ArrayOfCreateNewSubscriptions.filter(function( obj ) {
          return obj !== ShowSubscription;
        });
      }
      else{
        ArrayOfCreateNewSubscriptions.push(ShowSubscription);
      }
      SetShowCreateNewSubscription(ArrayOfCreateNewSubscriptions);

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
      <h2>All Members:</h2>
      {AllMembersToRender}
  </div>;
}

export default AllMembers;
