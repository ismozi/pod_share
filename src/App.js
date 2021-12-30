import ComponentTest from "./components/ComponentTest.js"
import Header from "./components/Header.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" ;

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path = "/" element={<ComponentTest/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
