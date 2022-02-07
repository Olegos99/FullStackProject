import React, {useState, useEffect, useRef} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {addObj} from '../../Utils/Utils';

function AddMoviePage() {
    const validateFormAndSubmit = async(event) => {
        event.preventDefault();
    }
    const HandleInputChange = (e) =>
  {

  }
  return <div>
      <h2>Add Movie:</h2>
        <form name="myForm" onSubmit={validateFormAndSubmit}>
            Name: <input type="text" name="Name" onChange={HandleInputChange}/> <br/>
            Genres: <input type="text" name="Genres"onChange={HandleInputChange}/> <br/>
            Imgae url: <input type="text" name="url"onChange={HandleInputChange}/> <br/>
            Premiered: <input type="date" name="premiered" onChange={HandleInputChange}/> <br/>
            <input type="submit" value="Submit"/>
            <Link to='/Movies/'>Back</Link>
        </form>
  </div>;
}

export default AddMoviePage;
