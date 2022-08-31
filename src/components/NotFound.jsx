import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound">
      <header className="notfound__logo">
        <img
          src="https://i.postimg.cc/xdnhfYwx/pokedex-title.png"
          alt="pokedex-logo"
          width="100%"
        />
      </header>
      <div className="notfound__div">
        <h2 className="notfound__title">Sorry! Page not found 😓</h2>
        <button className="notfound__btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>Return
        </button>
      </div>
    </div>
  );
};

export default NotFound;
