import '../App.css';
import searchIcon from '../searchIcon3.png'
import React, { useState } from "react";
import { CircularProgress } from '@mui/material';
import PodcastCard from '../components/PodcastCard';

function HomeScreen() {
  const [value, setValue] = useState("");
  const [jsonResponse, setResponse] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getPodcasts = async (e) => {
    setLoading(true);
    setResponse([]);
    e.preventDefault();
    const options = {
      method: "GET",
      headers:{
        'Content-Type': 'application/json',
      }
    };
    fetch(`http://localhost:5010/podcasts?name=${value}`, options).then((response) => response.json()).then((json) => {
      setResponse(json);
      console.log(json);
    }
    ).then(() => setLoading(false));   
  };

  return (
    <div className="homeScreen">
      <h1 id="homeTitle">Search any podcast</h1>
      <form id="search">
        <input type="text" id="searchBar" onChange={(e) => setValue(e.target.value)} value={value} placeholder="Ex: Sous Ecoute"></input>
        <button type="submit" id="searchSubmit" value="Search" onClick={(e) => getPodcasts(e)}><img id="searchImg" src={searchIcon}></img></button>
      </form>
      {!isLoading ? 
      (<div className='podcastsGrid'>
        {jsonResponse.map((podcast,i) => PodcastCard({podcast,i}))}
      </div>) : 
      (<div className='loaderHome'>
        <CircularProgress color='success' />
      </div>)}
    </div>
  );
}

export default HomeScreen;