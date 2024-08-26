import React, { useEffect, useState } from "react";
import "../Css/Allgames.css";
import logo1 from "/images/logo_steam.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "./Footer";

const Allgames = () => {
  const [data, setdata] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/games").then((res) => {
      console.log(res);
      setdata(res.data);
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
      <div className="allgamesimg">
        {data.map((item) => (
          <div className="allgames" key={item.id}>
            <Link to={`/gamedetails/${item.id}`}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "310px", height: "400px" }}
              />
            </Link>
            <p>{item.title}</p>
            <button>
              <Link to={`/editgame/${item.id}`}>Edit</Link>
            </button>
            <button onClick={() => handledelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Allgames;
