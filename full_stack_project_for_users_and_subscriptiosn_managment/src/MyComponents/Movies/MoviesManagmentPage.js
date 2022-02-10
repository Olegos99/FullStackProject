import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';
import AddMoviePage from './AddMoviePage';
import EditMoviePage from './EditMoviePage';
import AllMoviespage from './AllMoviespage';

function MainPage() {
  const history = useHistory();
  const store = useSelector((state) => state)
  const location = useLocation();

  useEffect(() => {
    if(store.CurrentUserID === 0 || !GetPremmisionByPremName("View_Movies")) // if no current loged in user
    {
      // window.localStorage.setItem("LastPage", "/");
      history.push('/'); 
    }
    else{
      if(window.localStorage.getItem('LastPage') !== location.pathname)
      {
        window.localStorage.setItem('LastPage', location.pathname);
      }
    }
  }, []);

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

  const ShowAllMovies = async () =>
  {
    history.push('/Movies/');
  }

  const AddFilm = () =>
  {
    history.push('/Movies/addMovie');
  }

  return <div>
      <h2>Movies:</h2>
      <nav style={{display: 'flex', justifyContent: 'left'}}>
        <button onClick={ShowAllMovies} style={{display:'block'}} >All Films</button>
        <button onClick={AddFilm} style={{display: GetPremmisionByPremName("Create_Movies") ? 'block':'none'}}>Add Movie</button>
      </nav>
      <Switch>
                <Route path='/Movies/' component = {AllMoviespage} exact/>
                <Route path='/Movies/spesificMovie/:id' component = {AllMoviespage} />
                <Route path='/Movies/addMovie' component = {AddMoviePage}/>
                <Route path='/Movies/EditMovie/:id' component = {EditMoviePage}/>
      </Switch>
  </div>;
}

export default MainPage;
