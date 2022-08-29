import React from "react";

const NotFound = () => {
  return (
    <div className="notfound">
      <header className="notfound__logo">
        <img
          src="https://i.postimg.cc/xdnhfYwx/pokedex-title.png"
          alt="pokedex-logo"
          width='100%'
        />
      </header>
      <div className="notfound__div">
        <h2 className="notfound__title">Sorry! Page not found 😓</h2>
      </div>
    </div>
  );
};

export default NotFound;
