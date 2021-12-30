import ComponentTest from "./components/ComponentTest.js"
import HomeScreen from "./screens/HomeScreen.js"
import Header from "./components/Header.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" ;

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path = "/" element={<HomeScreen/>}></Route>
        <Route path = "/discover" element={<ComponentTest/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
