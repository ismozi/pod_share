import '../App.css';
import searchIcon from '../searchIcon3.png'
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function HomeScreen() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const getPodcasts = async (e) => {
    e.preventDefault();
    navigate(`/results?name=${value}&page=0`)
  };

  return (
    <div className="homeScreen">
      <h1 id="homeTitle">Search any podcast</h1>
      <form id="search">
        <input type="text" id="searchBar" onChange={(e) => setValue(e.target.value)} value={value} placeholder="Ex: Sous Ecoute"></input>
        <button type="submit" id="searchSubmit" value="Search" onClick={(e) => getPodcasts(e)}><img id="searchImg" src={searchIcon}></img></button>
      </form>
    </div>
  );
}

export default HomeScreen;