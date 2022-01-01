import { Link } from "react-router-dom";
import unknownImg from '../audioWaves.png'

function PodcastCard({podcast}){
    return (
        <Link to={`/podcast?id=${podcast.id}`}>
            <div id="podcastItem">
                <img className="podcastImg" src={podcast.imageUrl} onError={(e) => e.target.src=unknownImg}></img>
                <div id="podcastTitle">{podcast.title}</div>
            </div>
        </Link>
        )
}

export default PodcastCard;