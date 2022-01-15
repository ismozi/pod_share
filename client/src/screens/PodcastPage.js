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

    var audioPlayer = document.getElementById('audioPlayer');

    React.useEffect(async () => {
        await getPodcast();
    }, []);

    const urlParams = new URLSearchParams(useLocation().search);
    const podcastId = urlParams.get('id');

    const getPodcast = async () => {
        const options = {
            method: "GET",
            headers:{
                'Content-Type': 'application/json',       
            }
        };
        fetch(`http://localhost:5010/episodes?podcastId=${podcastId}`, options).then((response) => response.json()).then((json) => {
            setResponse(json);
            console.log(json);
        }
        ).then(() => setLoading(false)); 
        
    };

    const playEpisode = (audioUrl, key) => {
        if (toggledPlaying && key != episodePlaying){
            setToggled(false);
        }

        setPlaying(true);
        setAudio(audioUrl);
        setEpisode(key);

        toggledPlaying ? audioPlayer.pause() : audioPlayer.play() ;
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
                        <audio id="audioPlayer" onPlay={() => togglePlaying()} onPause={() => togglePlaying()} autoPlay controls src={audio}></audio>                   
                </footer>) :  <></>}
        </>
      );
}

export default PodcastPage;