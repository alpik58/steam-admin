import React, { useEffect, useState } from "react";
import "../Css/Anime.css";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";

export const Anime = () => {
  const [anime, animedata] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:3000/games")
      .then((res) => {
        const dataanime = res.data.filter((game) => game.category === "Anime");
        animedata(dataanime)
      });
  }, []);


  const handledelete = (id) => {
    const confirm = window.confirm("Do you want to delete?");

    if (confirm) {
      axios.delete(`http://localhost:3000/games/${id}`).then((res) => {
        alert("data deleted successfully");
        window.location.reload();
        navigate("/");
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="allgamesimg">
        {anime.map((data) => (
           <div className="allgames" key={data.id}>
           <Link to={`/gamedetails/${data.id}`}>
             <img src={data.image} alt={data.title}  style={{ width: "310px", height: "400px"}}  />
           </Link>
           <p>{data.title}</p>
           <button>
            <Link to={`/editgame/${data.id}`}>
           Edit
            </Link>
            </button>
            <button onClick={() => handledelete(data.id)}>Delete</button>
         </div>
        ))}
      </div>
      <Footer/>
    </>
  );
};
