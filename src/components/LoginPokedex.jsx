import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { setTrainerName } from "../store/slices/trainerName.slice";

const LoginPokedex = () => {
  const [trainer, setTrainer] = useState(
    "https://i.postimg.cc/1zM1sH0L/male-trainer-login.png"
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.user.value.trim();
    if (inputValue.length !== 0) {
      dispatch(setTrainerName(inputValue));
      navigate("/pokedex");
    }
    e.target.user.value = "";
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://i.postimg.cc/xdnhfYwx/pokedex-title.png"
          alt="logo"
          width="100%"
        />
      </div>
      <article className="login__card">
        <div className="login__trainer">
          <div className="login__info">
            <h1 className="login__title">Hello trainer!</h1>
            <h3 className="login__welcome">Welcome to Pokedex App</h3>
            <h4 className="login__select">Choose your trainer:</h4>
            <div className="login__select_trainer">
              <label htmlFor="male">Allan</label>
              <input
                type="radio"
                name="trainer"
                id="male"
                defaultChecked
                onClick={() =>
                  setTrainer(
                    "https://i.postimg.cc/1zM1sH0L/male-trainer-login.png"
                  )
                }
              />
              <label htmlFor="jessie">Jessie</label>
              <input
                type="radio"
                name="trainer"
                id="female"
                onClick={() =>
                  setTrainer("https://i.postimg.cc/V66Q6CD5/female-trainer.png")
                }
              />
            </div>
          </div>
          <div className="trainer__img">
            <img
              src={trainer}
              alt="pokemon-trainer"
              width="100%"
              className="img"
            />
          </div>
        </div>
        <p className="login__name">Give me your name to start</p>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="user"
            className="login__input"
            placeholder="User name"
          />
          <button className="login__btn">GO</button>
        </form>
      </article>
    </div>
  );
};

export default LoginPokedex;
