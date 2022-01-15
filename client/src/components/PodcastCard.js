import { Link } from "react-router-dom";
import unknownImg from '../audioWaves.png'

function PodcastCard({podcast,i}){

    function LoadImage() {
        setTimeout(() => {
            var img = new Image(),
            x = document.getElementsByClassName("podcastImg").item(i);
        
            img.onload = function() {
                x.src = img.src;
            };
        
            img.src = podcast.imageUrl;
          }, 0);
    }
    
    return (
        <Link to={`/podcast?id=${podcast.id}&page=0`}>
            <div id="podcastItem">
                <img className="podcastImg" src={unknownImg}></img>
                {LoadImage()}
                <div id="podcastTitle">{podcast.title}</div>
            </div>
        </Link>
        )
}

export default PodcastCard;