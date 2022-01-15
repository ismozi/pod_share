import React, { useState } from "react";
import { CircularProgress } from '@mui/material';
import EpisodeCard from '../components/EpisodeCard';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const PodcastPage = () => {  
    const location = useLocation();
    const urlParams = new URLSearchParams(useLocation().search);
    const navigate = useNavigate();
    const podcastId = urlParams.get('id');

    const [jsonResponse, setResponse] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [isPlaying, setPlaying] = useState(false);
    const [toggledPlaying, setToggled] = useState(false);
    const [audio, setAudio] = useState("");
    const [episodePlaying, setEpisode] = useState(0);

    var audioPlayer = document.getElementById('audioPlayer');

    React.useEffect(async () => {
        setLoading(true);
        await getPodcast(urlParams.get('page'));
    }, [location]);

    const getPodcast = async (page) => {
        const options = {
            method: "GET",
            headers:{
                'Content-Type': 'application/json',       
            }
        };
        fetch(`http://localhost:5010/episodes?podcastId=${podcastId}&page=${page}`, options).then((response) => response.json()).then((json) => {
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

    const nextPage = (e) => {
        navigate(`/podcast?id=${podcastId}&page=${jsonResponse.episodes.paginatorInfo.currentPage+1}`)
      }
    
      const previousPage = (e) => {
        navigate(`/podcast?id=${podcastId}&page=${jsonResponse.episodes.paginatorInfo.currentPage-1}`)
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
                    <div id='pagination'>
                        {urlParams.get('page') > 0 ?
                        <button onClick={(e) => previousPage(e)}>
                            Previous
                        </button> : <></>
                        }
                        {jsonResponse.episodes.paginatorInfo.hasMorePages ?
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
            {isPlaying ? 
                (<footer>
                        <audio id="audioPlayer" onPlay={() => togglePlaying()} onPause={() => togglePlaying()} autoPlay controls src={audio}></audio>                   
                </footer>) :  <></>}
        </>
      );
}

export default PodcastPage;