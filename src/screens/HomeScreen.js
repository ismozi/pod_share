import '../App.css';
import searchIcon from '../searchIcon3.png'
import unknownImg from '../audioWaves.png'
import React, { useState } from "react";
import { CircularProgress } from '@mui/material';
import { Link } from "react-router-dom";

function HomeScreen() {
  const [value, setValue] = useState("");
  const [jsonResponse, setResponse] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getPodcasts = async (e) => {
    setLoading(true);
    setResponse([]);
    e.preventDefault();
    const options = {
      method: "POST",
      headers:{
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0,
        'Content-Type': 'application/json',
        "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NTNiZDY4Mi0wMTBkLTQ3ZmItOTVmOS02OWY2NGQwMGVmNTgiLCJqdGkiOiJmNzcxYzY5ZDlmYmZjZWM4YjE2NjMwODc2YzhhNWJhNmRlMjdhMDViNTJjZmY5YjRmNzg3ZDgxNGUxOGE3MjhkNDMzNTU1MTZmN2QxNmI0NCIsImlhdCI6MTY0MDg0MzI4NS42MTc5MTgsIm5iZiI6MTY0MDg0MzI4NS42MTc5MjUsImV4cCI6MTY3MjM3OTI4NS41ODIzMzcsInN1YiI6IiIsInNjb3BlcyI6WyIqIl19.WGFJrzF-fz3arvdqA6rjmaGTShmk4_uO3O9uE3Em8bIWQhEAqHbAyodLAXw9AnZf1nsQ1ZdWZDOzYpv9yxUkDf6tLLPAp3883KX6TPWm604re7sU3Hw8PihjCU79mtbkRQQZKgCZmqU-ryFKAOwmMoRU4u5-Gz75yXxSPyLRyAvn1Ddi906rmIiWbviRnwHVk1asfQ1CUfLyCj-arnAmsP-tC6yGcNlVn8UttwS5Dvs6pdCD82U-Y24AJ6Rp-X03LTLtEpn0SbNPrRMS3Ces3dwhPF0VCcBvTTjmJed9K08ay66dX3CURXvzFfg69uPLV-kooD78trkEgCncBBE3rqgeOFbeaVrkCXoHBUcLUo6w3LSzj4bydM3qVYZFG_PE7EGsNo58yZyBkaqaFI_kp555tewYz9AIadZRis5B0mJVEvAfyho9rk55P-vt75lnVouNvnTNuC8VPa_SXzbaSeerSAKG08X2Cf2Jwn8P8VdwHrZgf6atyiVKbiU7SbfwSuey0HBQUXL3C7E446LRWeW36RiBgi_004J-9oZJ5h38IAGV8SA9kXcLJKhcDTkDolfQmJtjnmuOG2ZxItzpv1U2007l0ybDIgVAq8ThQE1iLfCvvMFKO_r7Ua1MrJkYw6MYswpUJZbNSaMNUpjxAMepb55-QgpGFe0mx5aGsMU"
      },
      body: JSON.stringify({
        query: `query maQuery{podcasts(searchTerm: "${value}") {data {title,id,imageUrl}}}`
      })
    };
    fetch("https://api.podchaser.com/graphql", options).then((response) => response.json()).then((json) => {
      setResponse(json.data.podcasts.data);
      console.log(json.data.podcasts.data);
    }
    ).then(() => setLoading(false)); 
    
  };

  const selectPodcast = (e) => {
    // e.target.classList.add("podcastSelected");
  }

  return (
    <div className="homeScreen">
      <h1 id="homeTitle">Search any podcast</h1>
      <form id="search">
        <input type="text" id="searchBar" onChange={(e) => setValue(e.target.value)} value={value} placeholder="Ex: Sous Ecoute"></input>
        <button type="submit" id="searchSubmit" value="Search" onClick={(e) => getPodcasts(e)}><img id="searchImg" src={searchIcon}></img></button>
      </form>
      {!isLoading ? (<div className='podcastsGrid'>
        {jsonResponse.map((podcast) => {return <Link to={{pathname: "/podcast/", state: {titre: podcast.title}}}><div id="podcastItem" onClick={(e) => selectPodcast(e)}><img className="podcastImg" src={podcast.imageUrl} onError={(e) => e.target.src=unknownImg}></img><div id="podcastTitle">{podcast.title}</div></div></Link>})}
      </div>) : (<div className='loaderHome'>
                  <CircularProgress color='success' />
                </div>)}
    </div>
  );
}

export default HomeScreen;