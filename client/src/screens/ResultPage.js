import '../App.css';
import searchIcon from '../img/searchIcon3.png'
import React, { useState, useEffect } from "react";
import { CircularProgress } from '@mui/material';
import PodcastCard from '../components/PodcastCard';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const urlParams = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const [value, setValue] = useState(urlParams.get('name'));
  const [jsonResponse, setResponse] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPodcasts(value, urlParams.get('page'))
  }, [location]);

  const fetchPodcasts = async (name, pageNum) => {
    const options = {
      method: "GET",
      headers:{
        'Content-Type': 'application/json',
      }
    };
    fetch(`http://localhost:5010/podcasts?name=${name}&page=${pageNum}`, options).then((response) => response.json()).then((json) => {
      setResponse(json);
    }
    ).then(() => setLoading(false));   
  };

  const getPodcasts = async (e) => {
    e.preventDefault();
    navigate(`/results?name=${value}&page=0`)
  };

  const nextPage = (e) => {
    navigate(`/results?name=${value}&page=${jsonResponse.paginatorInfo.currentPage+1}`)
  }

  const previousPage = (e) => {
    navigate(`/results?name=${value}&page=${jsonResponse.paginatorInfo.currentPage-1}`)
  }

  return (
    <div className="homeScreen">
      <h1 id="homeTitle">Search any podcast</h1>
      <form id="search">
        <input type="text" id="searchBar" onChange={(e) => setValue(e.target.value)} value={value} placeholder="Ex: Sous Ecoute"></input>
        <button type="submit" id="searchSubmit" value="Search" onClick={(e) => getPodcasts(e)}><img id="searchImg" src={searchIcon}></img></button>
      </form>
      {!isLoading ? 
      (<>
        <div className='podcastsGrid'>
          {jsonResponse.data.map((podcast,i) => PodcastCard({podcast,i}))}
        </div>
        <div id='pagination'>
          {urlParams.get('page') > 0 ?
          <button onClick={(e) => previousPage(e)}>
            Previous
          </button> : <></>
          }
          {jsonResponse.paginatorInfo.hasMorePages ?
          <button onClick={(e) => nextPage(e)}>
            Next
          </button> : <></>
          }
        </div>
      </>) : 
      (<div className='loaderHome'>
        <CircularProgress color='success' />
      </div>)}
    </div>
  );
}

export default ResultPage;