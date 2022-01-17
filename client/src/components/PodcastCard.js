import { Link } from "react-router-dom";
import unknownImg from '../img/audioWaves.png'

function PodcastCard({podcast,i}){

    function loadImage() {
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
        <Link id='podcastItemLink' to={`/podcast?id=${podcast.id}&page=0`}>
            <div id="podcastItem">
                <img className="podcastImg" src={unknownImg}></img>
                {loadImage()}
                <div id="podcastTitle">{podcast.title}</div>
            </div>
        </Link>
        )
}

export default PodcastCard;