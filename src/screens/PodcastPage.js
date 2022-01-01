import { useLocation } from 'react-router-dom';
import React, { useState } from "react";
import { CircularProgress } from '@mui/material';
import EpisodeCard from '../components/EpisodeCard';

const PodcastPage = () => {    
    const [jsonResponse, setResponse] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [isPlaying, setPlaying] = useState(false);
    const [toggledPlaying, setToggled] = useState(false);
    const [audio, setAudio] = useState("");
    const [episodePlaying, setEpisode] = useState(0);

    React.useEffect(async () => {
        await getPodcast();
    }, []);

    const urlParams = new URLSearchParams(useLocation().search);
    const podcastId = urlParams.get('id');

    const getPodcast = async () => {
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
            query: `query maQuery{podcast(identifier: {id: "${podcastId}", type: PODCHASER}) {title,description,imageUrl,episodes(sort: {sortBy: AIR_DATE}) {data {airDate, title, audioUrl}}}}`
        })
        };
        fetch("https://api.podchaser.com/graphql", options).then((response) => response.json()).then((json) => {
            setResponse(json.data.podcast);
            console.log(json.data.podcast);
        }
        ).then(() => setLoading(false)); 
        
    };

    const playEpisode = (audioUrl, key) => {
        setToggled(false)
        setPlaying(true);
        console.log(episodePlaying);
        setAudio(audioUrl);
        setEpisode(key);
    }

    const togglePlaying = () => {
        toggledPlaying ? setToggled(false) : setToggled(true);
    }
    
    return (
        <>
            <div className="homeScreen">
                {!isLoading ? (
                <>
                    <div id="podcastPageItem">
                        <img id="podcastPageImg" src={jsonResponse.imageUrl}></img>
                        <div id="podcastPageArticle">
                            <h1 id="podcastPageTitle">{jsonResponse.title}</h1>
                            <p id="podcastPageText">{jsonResponse.description}</p>
                            <div id="socialMediaPanel">Share</div>
                        </div>
                    </div>  
                    <hr className="solid"/>
                    <div className='episodeList'>
                        {jsonResponse.episodes.data.map((episode, i) => EpisodeCard({episode, playEpisode, episodePlaying,toggledPlaying, i}))}
                    </div>
                </>) : 
                (<div className='loaderHome'>
                    <CircularProgress color='success' />
                </div>)}
            </div>
            {isPlaying ? 
                (<footer>
                        <audio onPlay={() => togglePlaying()} onPause={() => togglePlaying()} autoPlay controls src={audio}></audio>                   
                </footer>) :  <></>}
        </>
      );
}

export default PodcastPage;