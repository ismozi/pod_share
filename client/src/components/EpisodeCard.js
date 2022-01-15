import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons'

function EpisodeCard({episode, playEpisode, episodePlaying, toggledPlaying, i}){

    const toggleIcon = (key) => {
        if(episodePlaying == key)
            return !toggledPlaying ? faPlayCircle : faPauseCircle;
        return faPlayCircle;
    }
    
    return (
        <div id="episodeCard" key={i}>
            <div id="episodeCardContent">
                <div id="episodeTitle">{episode.title}</div>
                <div id="episodeDate">{(episode.airDate).slice(0,10)}</div>
            </div>
            <FontAwesomeIcon key={i} icon={toggleIcon(i)} onClick={() => {playEpisode(episode.audioUrl, i)}}/>
        </div>
        );
}

export default EpisodeCard;