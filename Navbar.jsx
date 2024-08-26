import axios from "axios";
import "../Css/Navbar.css";
import logo1 from "/images/logo_steam.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {

  useEffect(() => {
    axios
      .get("https://alpik58.github.io/allgame/latestgame.json")
      .then((res) => {
        console.log("navbar",res);
      });
  }, []);
  return (
    <>
      <div className="logo">
        <div className="logo58">
        <img src={logo1} />
        </div>
      </div>

      <hr />
      <div className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
          <Link to="/action">Action</Link>
          </li>
          <li>
          <Link to="/anime">Anime</Link>
          </li>
          <li>
          <Link to="/addgame">Add Game</Link>
          </li>
        
        </ul>
      </div>
      <hr />
     
    </>
  );
};

export default Navbar;
