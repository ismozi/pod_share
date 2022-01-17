import fetch from "node-fetch";
import express from "express";
import http from "http";
import cors from "cors";

let app = express()

app.use((req, res, next) => {
    console.log(`New HTTP request: ${req.method} ${req.url}`);
    next();
});

app.use(cors());

app.get("/podcasts", (req, res, next) => {
  // const options = {
  //     method: "POST",
  //     headers:{
  //       'Cache-Control': 'no-cache, no-store, must-revalidate',
  //       'Pragma': 'no-cache',
  //       'Expires': 0,
  //       'Content-Type': 'application/json',
  //       "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NTNiZDY4Mi0wMTBkLTQ3ZmItOTVmOS02OWY2NGQwMGVmNTgiLCJqdGkiOiJmNzcxYzY5ZDlmYmZjZWM4YjE2NjMwODc2YzhhNWJhNmRlMjdhMDViNTJjZmY5YjRmNzg3ZDgxNGUxOGE3MjhkNDMzNTU1MTZmN2QxNmI0NCIsImlhdCI6MTY0MDg0MzI4NS42MTc5MTgsIm5iZiI6MTY0MDg0MzI4NS42MTc5MjUsImV4cCI6MTY3MjM3OTI4NS41ODIzMzcsInN1YiI6IiIsInNjb3BlcyI6WyIqIl19.WGFJrzF-fz3arvdqA6rjmaGTShmk4_uO3O9uE3Em8bIWQhEAqHbAyodLAXw9AnZf1nsQ1ZdWZDOzYpv9yxUkDf6tLLPAp3883KX6TPWm604re7sU3Hw8PihjCU79mtbkRQQZKgCZmqU-ryFKAOwmMoRU4u5-Gz75yXxSPyLRyAvn1Ddi906rmIiWbviRnwHVk1asfQ1CUfLyCj-arnAmsP-tC6yGcNlVn8UttwS5Dvs6pdCD82U-Y24AJ6Rp-X03LTLtEpn0SbNPrRMS3Ces3dwhPF0VCcBvTTjmJed9K08ay66dX3CURXvzFfg69uPLV-kooD78trkEgCncBBE3rqgeOFbeaVrkCXoHBUcLUo6w3LSzj4bydM3qVYZFG_PE7EGsNo58yZyBkaqaFI_kp555tewYz9AIadZRis5B0mJVEvAfyho9rk55P-vt75lnVouNvnTNuC8VPa_SXzbaSeerSAKG08X2Cf2Jwn8P8VdwHrZgf6atyiVKbiU7SbfwSuey0HBQUXL3C7E446LRWeW36RiBgi_004J-9oZJ5h38IAGV8SA9kXcLJKhcDTkDolfQmJtjnmuOG2ZxItzpv1U2007l0ybDIgVAq8ThQE1iLfCvvMFKO_r7Ua1MrJkYw6MYswpUJZbNSaMNUpjxAMepb55-QgpGFe0mx5aGsMU"
  //     },
  //     body: JSON.stringify({
  //       query: `query maQuery{podcasts(searchTerm: "${req.query.name}", page: ${req.query.page}) {data {title,id,imageUrl}, paginatorInfo{hasMorePages, currentPage}}}`
  //     })
  //   };
  //   fetch("https://api.podchaser.com/graphql", options).then((response) => response.json()).then((json) => {
  //     console.log(json);
  //     res.status(200).send(JSON.stringify(json.data.podcasts));
  //   })
    var jsonMock = {
      data: [
        {id: 1, title: 'Mike Ward sous écoute', imageUrl: 'https://yt3.ggpht.com/ytc/AKedOLQs-Bfh_Y5C1VinHef9HChZxm9Fb-YZKEtzleI44Q=s900-c-k-c0x00ffffff-no-rj'},
        {id: 2, title: 'Le Carré de Sable', imageUrl: 'https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/5721009/c1892f9358612cc0.png'},
        {id: 3, title: 'Avec son Sam', imageUrl: 'https://www.omnycontent.com/d/playlist/bf51a523-1f9d-4e51-9cdf-a8d501394d60/ee1fea85-dc68-406e-91e7-ad2d01477ff9/b9f510d9-0790-423d-b7f1-ad2d01478007/image.jpg?t=1621453945&size=Large'},
        {id: 4, title: 'Le podcast de Thomas Levac', imageUrl: 'http://cdn01.baladoquebec.ca/images/2299/tl-vignette1-1500.jpg'},
        {id: 5, title: 'The Pantelis Frenchcast', imageUrl: 'https://m.media-amazon.com/images/M/MV5BYTEyOGQzODgtYTg5ZC00ZjA5LTlkMDktYjU3MWJiMzZiMDAyXkEyXkFqcGdeQXVyMTk4NTc0MTU@._V1_.jpg'},
        {id: 6, title: 'Pivot avec Pineault', imageUrl: 'https://cdn01.baladoquebec.ca/images/6025bee2ce3d78.65028118.png'},
        {id: 7, title: 'Faits Divers', imageUrl: 'https://cdn-images-1.listennotes.com/podcasts/faits-divers-maire-de-laval-ihk8prSGD9Y-xfHsNy1hRAj.1400x1400.jpg'},
        {id: 8, title: 'Jay Du Temple Discute', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMzk2MGUzMmUtYjM3ZC00ZmQyLWJmMTMtNTg4YjZkZTM1ZWY4XkEyXkFqcGdeQXVyMTAyMzYwNzgw._V1_.jpg'},
        {id: 9, title: 'Couple Ouvert', imageUrl: 'http://cdn01.baladoquebec.ca/images/3537/coupleouvert-podbean.jpg'},
        {id: 10, title: 'Chiller chez boulay', imageUrl: 'https://yt3.ggpht.com/ytc/AKedOLSI0Mwcuky-jBFFuvYQmpHTeyqnM8e3m9js1g6p=s900-c-k-c0x00ffffff-no-rj'}
      ],
      paginatorInfo: {
        hasMorePages: false,
        currentPage: 0
      } 
    }
    res.status(200).send(JSON.stringify(jsonMock));

})

app.get("/episodes", (req, res, next) => {
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
      query: `query maQuery{podcast(identifier: {id: "${req.query.podcastId}", type: PODCHASER}) {title,description,imageUrl,episodes(sort: {sortBy: AIR_DATE}, page: ${req.query.page}) {data {airDate, title, audioUrl}, paginatorInfo {hasMorePages, currentPage}}}}`
    })
  };
  fetch("https://api.podchaser.com/graphql", options).then((response) => response.json()).then((json) => {
    console.log(json.data.podcast.episodes);
    res.status(200).send(JSON.stringify(json.data.podcast))
  })
})

http.createServer (app).listen(5010)
console.log("server started")