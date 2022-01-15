import '../App.css';
import searchIcon from '../searchIcon3.png'
import React, { useState, useEffect } from "react";
import { CircularProgress } from '@mui/material';
import PodcastCard from '../components/PodcastCard';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function ResultPage() {
  const [value, setValue] = useState("");
  const [jsonResponse, setResponse] = useState([]);
  const [isLoading, setLoading] = useState(true);
  
  const location = useLocation();
  const urlParams = new URLSearchParams(useLocation().search);
  const searchedName = urlParams.get('name');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchPodcasts(searchedName)
  }, [location]);

  const fetchPodcasts = async (name) => {
    const options = {
      method: "GET",
      headers:{
        'Content-Type': 'application/json',
      }
    };
    fetch(`http://localhost:5010/podcasts?name=${name}`, options).then((response) => response.json()).then((json) => {
      setResponse(json);
      console.log(json);
    }
    ).then(() => setLoading(false));   
  };

  const getPodcasts = async (e) => {
    e.preventDefault();
    navigate(`/results?name=${value}`)
    setValue("");
    setResponse([]);
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

export default ResultPage;