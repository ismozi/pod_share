const PodcastPage = (props) => {
    return (
        <div className="homeScreen">
            <div id="podcastPageItem">
                <img id="podcastPageImg" src="https://i.imgur.com/F8pthmM.png"></img>
                <div id="podcastPageArticle">
                    <h1 id="podcastPageTitle">Mike Ward Sous Ecoute</h1>
                    <p id="podcastPageText">Chaque semaines l'humoriste Mike Ward reçoit des personalités du monde du divertissement pour des entrevues et discussions candides.</p>
                    <div id="socialMediaPanel">Share</div>
                </div>
            </div>  
            <hr class="solid"/>
        </div>
      );
}

export default PodcastPage;