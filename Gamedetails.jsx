import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../Css/Gamedetails.css";
import logo1 from "/images/logo_steam.svg";
import { Footer } from "./Footer";

const Gamedetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/games")
      .then((res) => {
        const game = res.data.find((item) => String(item.id) === String(id));
        setGame(game);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  },[id]);

  return (
    <>
      <Navbar />
      {game ? (
        <>
          <div className="title">
            <h2>{game.title}</h2>
          </div>
          <div className="slide-container">
            {game.allimages.map((image, index) => (
              <div
                key={index}
                className="divstyle"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            ))}
          </div>
          <div className="description">
            <h3>Description</h3>
          </div>
          <hr />
          <div className="desc">
            <p>{game.description}</p>
          </div>
          <div className="buttons">
            <button onClick={() => setShowPopup(true)}>Buy</button>
          </div>
            <br/>
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <div className="popup-details">
                <img src={logo1} className="App-logo" alt="logo" />
                <hr/>
                  <p>Name: {game.title}</p>
                  <p>Price: {game.price}</p>
                  <p>Tax: 0.00%</p>
                  <p>Total: {game.price}</p>
                </div>
              
                <div className="buttonss">
                  <button onClick={() => setShowPopup(false)}>Close</button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </>
  );
};

export default Gamedetails;
