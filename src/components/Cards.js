import React, { useState, useEffect } from "react";
import chip from "../images/chip.png";

const Card = (props) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const cardsArr = JSON.parse(localStorage.getItem("cards")) || [];
    setCards(cardsArr);
  }, []);
  const onAddClick = () => {
    props.history.push("/cards/add");
  };
  const onCardClick = (id) => {
    props.history.push(`/cards/${id}/edit`);
  };

  return (
    <div className="cards">
      <h1>My cards</h1>
      <div className="cards-list">
        {cards.map((card) => {
          return (
            <div
              className="card-item"
              key={card.id}
              onClick={() => onCardClick(card.id)}
            >
              <div className="card-type">
                <img src={card.cardType} alt="card type" />
              </div>
              <div className="chip">
                <img src={chip} alt="chip" />
              </div>
              <div className="card-number">
                <div className="first">{card.firstNumber}</div>
                <div className="second">{card.secondNumber}</div>
                <div className="third">{card.thirdNumber}</div>
                <div className="fourth">{card.fourthNumber}</div>
              </div>
              <div className="user-name">{card.name}</div>
              <div className="expiry-date">{card.expires}</div>
            </div>
          );
        })}

        <div className="add-card" onClick={onAddClick}>
          +
        </div>
      </div>
    </div>
  );
};

export default Card;
