import React, {useState, useRef} from 'react';

const SubscriptionPartOfMember = (item,OpenSubscriptionCreation, ShowCreateNewSubscription ,films, AllSubscriptionsToRender, SubscriptionFunction, CanUpdateSubscriptions) =>
  {
    // const Date = useRef(null); // cant use them why?
    // const MovieID = useRef(null);
    // const [sub, Setsub] = useState([]);

    let SubscriptionsToShow = AllSubscriptionsToRender.filter(obj => obj.props.id == item._id)[0];
    // let FilmsToSubscribeOptions = () =>
    // {
    //     let FilmsToPresentForChoosing = films.filter((obj) => {
    //         SubscriptionsToShow.forEach(element => {

    //         });
    //     });

    //     films.map((obj, key) => 
    //     <option key={key} value={`${obj._id}`}>{obj.Name}</option>
    //     )
    // }

    let NewSubscription = {
        userId: "",
        Movie : {
            movieId : 0,
            date : null
        }
    }

    const SubscribeToMovie = () =>{

        if(NewSubscription.Movie.movieId == "0")
        {
            alert("You shold choose a movie to subscribe!")
        }
        else if(NewSubscription.Movie.date == null){
            alert("You shold choose a Date to subscribe!")
        }
        else{
            NewSubscription.userId = item._id;
            SubscriptionFunction(NewSubscription);
        }
    }

    const SetNewFilm = (e) =>
    {
        NewSubscription.Movie.movieId = e.target.value;
    }

    const SetNewDate = (e) =>
    {
        NewSubscription.Movie.date = e.target.value;
    }


  return <div id = {item._id}>
    <table style={{ border: "1px solid black"}}>
        <tbody>
            <tr>
                <th>
                    Movies watched:
                </th>
            </tr>
            <tr>
                <td style ={{justifyContent:"center"}}>
                    <button id={`${item._id}`} name ={item.Name} style={{display: CanUpdateSubscriptions? "block":"none", margin:"auto"}} onClick={OpenSubscriptionCreation}>Subscribe to new movie</button>
                </td>
            </tr>
            <tr>
                <td>
                    <table style={{ border: "1px solid red", display: ShowCreateNewSubscription? "block": "none"}}>
                        <tbody>
                            <tr>
                            <th>
                                Add new Movie:
                            </th>
                            </tr>
                            <tr>
                            <td>
                                <nav>
                                <select onChange={SetNewFilm}>
                                <option value="0">Select Movie:</option>
                                    {films.map((obj, key) => {
                                    var FilmsIdsNOTtoShow = [];
                                        if(SubscriptionsToShow != undefined)
                                        {
                                            // console.log(SubscriptionsToShow.props.children.length);
                                            SubscriptionsToShow.props.children.forEach(element => {
                                                if(element.props.children.length > 0)
                                                {
                                                    FilmsIdsNOTtoShow.push(element.props.id); 
                                                }
                                            });
                                            // console.log(FilmsIdsNOTtoShow);
                                        }

                                            if(!FilmsIdsNOTtoShow.includes(obj._id))
                                            {
                                                return (<option key={key} value={`${obj._id}`}>{obj.Name}</option>)
                                            }  
                                            return null

                                           
                  
                                    })}
                                </select>
                                <input onChange={SetNewDate} name="SubscriptionDate"type="date"/>
                                </nav>
                                <button onClick={SubscribeToMovie}>Subscribe</button>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td id={`SubscriptionsOf${item._id}`}>
                    {SubscriptionsToShow}
                        {/* {AllSubscriptionsToRender.filter(obj => obj.props.id == item._id)[0]} */}
                </td>
            </tr>
        </tbody>
    </table>
  </div>;
}


export default SubscriptionPartOfMember;
