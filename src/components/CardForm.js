import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import visa from "../images/visa.png";
import mastercard from "../images/mastercard.png";
import discover from "../images/discovercard.png";
import chip from "../images/chip.png";

class CardForm extends Component {
  state = {
    name: "",
    expires: "",
    firstNumber: "",
    secondNumber: "",
    thirdNumber: "",
    fourthNumber: "",
    errorNumber: "",
    errorDate: "",
    cardType: visa
  };
  componentDidMount() {
    if (this.props.match.params.id) {
      const cards = JSON.parse(localStorage.getItem("cards"));
      const currentCard = cards.find((card) => card.id === this.props.match.params.id)

      this.setState({
        name: currentCard.name,
        expires: currentCard.expires,
        firstNumber: currentCard.firstNumber,
        secondNumber: currentCard.secondNumber,
        thirdNumber: currentCard.thirdNumber,
        fourthNumber: currentCard.fourthNumber,
        cardType: currentCard.cardType
      })
    }
  }
  handleChangeFirst = (e) => {
    var { firstNumber } = this.state;
    firstNumber = e.target.value;
    var errNum = '';
    var cardTp;

    if(firstNumber[0] !== '4' && firstNumber[0] !== '5' && firstNumber[0] !== '6' && firstNumber) { 
      errNum = 'Wrong card number';
      cardTp = '';
    } else {
      if(firstNumber[0] === '4') {
        cardTp = visa;
      }
      else if (firstNumber[0] === '5') {
        cardTp = mastercard;
      } else if(firstNumber[0] === '6') {
        cardTp = discover;
      }
      errNum = '';
    }
    this.setState({ firstNumber: e.target.value, cardType: cardTp, errorNumber: errNum });
  }
  handleChangeDate = (e) => {
    var year = parseInt(new Date().getFullYear().toString().substr(2, 4));
    var month = new Date().getMonth() + 1;
    var date = e.target.value;

    var cardDate = date.split('/');
    var cardMonth = parseInt(cardDate[0]);
    var cardYear = parseInt(cardDate[1]);

    var errDate = '';

    if(year === cardYear) {
      if(month >= cardMonth) {
        errDate = 'Wrong date';
      }
    }
    else if(year > cardYear) {
      errDate = 'Wrong date';
    } else {
      errDate = '';
    }
    this.setState({ expires: e.target.value, errorDate: errDate });
  } 
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, errorNumber: '', errorDate: '' });
  };
  handleFocus = (id) => {
    var element = document.getElementById(id);
    element.focus()
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstNumber,
      secondNumber,
      thirdNumber,
      fourthNumber,
    } = this.state;

    if(firstNumber[0] !== '4' && firstNumber[0] !== '5' && firstNumber[0] !== '6' && firstNumber) {
      this.setState({ errorNumber: 'Wrong card number' });
      return;
    }
    if(firstNumber.length !== 4 || secondNumber.length !== 4 || thirdNumber.length !== 4 || fourthNumber.length !== 4) {
      this.setState({ errorNumber: 'Wrong card number' });
      return;
    }

    let cardsArr = JSON.parse(localStorage.getItem("cards")) || [];
    if(this.props.match.params.id) {
      var cardIndex = cardsArr.findIndex((card) => card.id === this.props.match.params.id)
      cardsArr[cardIndex] = { ...this.state, id: this.props.match.params.id };
    } else {
      cardsArr.push({ ...this.state, id: uuidv4() });
    }
    localStorage.setItem("cards", JSON.stringify(cardsArr));

    this.props.history.push("/cards/");
  };
  render() {
    const {
      name,
      expires,
      firstNumber,
      secondNumber,
      thirdNumber,
      fourthNumber,
      cardType,
      errorNumber,
      errorDate
    } = this.state;
    return (
      <div className="cards">
        <h1>{this.props.match.params.id ? 'Edit current card' : 'Add card to account'}</h1>
        
        <div className="card-item current-card">
          <div className="card-type">
            <img src={cardType || visa} alt="card type" />
          </div>
          <div className="chip">
            <img src={chip} alt="chip" />
          </div>
          <div className="card-number">
            <div onClick={() => this.handleFocus('first')} className="first">{firstNumber}</div>
            <div onClick={() => this.handleFocus('second')} className="second">{secondNumber}</div>
            <div onClick={() => this.handleFocus('third')} className="third">{thirdNumber}</div>
            <div onClick={() => this.handleFocus('fourth')} className="fourth">{fourthNumber}</div>
          </div>
          <div onClick={() => this.handleFocus('name')} className="user-name">{name}</div>
          <div onClick={() => this.handleFocus('expires')} className="expiry-date">{expires}</div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="first">Card Number</label>
          <div className="input-group">
            <input
              type="number"
              id="first"
              name="firstNumber"
              value={firstNumber}
              onChange={this.handleChangeFirst}
              required
            />
            <input
              type="number"
              id="second"
              name="secondNumber"
              value={secondNumber}
              onChange={this.handleChange}
              required
            />
            <input
              type="number"
              id="third"
              name="thirdNumber"
              value={thirdNumber}
              onChange={this.handleChange}
              required
            />
            <input
              type="number"
              id="fourth"
              name="fourthNumber"
              value={fourthNumber}
              onChange={this.handleChange}
              required
            />
          </div>
          {errorNumber && <div className="error">{errorNumber}</div>}
          <label htmlFor="expires">Expires on</label>
          <input
            type="text"
            id="expires"
            name="expires"
            value={expires}
            onChange={this.handleChangeDate}
            required
          />
          {errorDate && <div className="error">{errorDate}</div>}
          <button type="submit" disabled={errorNumber || errorDate}>Save</button>
        </form>
      </div>
    );
  }
}

export default CardForm;