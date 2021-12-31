import ComponentTest from "./components/ComponentTest.js"
import HomeScreen from "./screens/HomeScreen.js"
import Header from "./components/Header.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" ;
import PodcastPage from "./screens/PodcastPage.js";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path = "/" element={<HomeScreen/>}></Route>
        <Route path = "/discover" element={<ComponentTest/>}></Route>
        <Route path = "/podcast/" element={<PodcastPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
