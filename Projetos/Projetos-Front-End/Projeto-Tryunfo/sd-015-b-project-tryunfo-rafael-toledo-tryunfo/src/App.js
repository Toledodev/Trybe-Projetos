import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      cardList: [],
    };

    this.checkSuperTrunfoCard = this.checkSuperTrunfoCard.bind(this);
    this.enableSaveButton = this.enableSaveButton.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.validateAttributeFields = this.validateAttributeFields.bind(this);
    this.validateTextFields = this.validateTextFields.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.enableSaveButton());
  }

  onSaveButtonClick(event) {
    event.preventDefault();
    this.checkSuperTrunfoCard();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
    } = this.state;

    const savedCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
    };
    this.setState((previousState) => ({
      cardList: [...previousState.cardList, savedCard],
    }));

    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
  }

  createCardList() {
    const { cardList } = this.state;
    return cardList
      .map((card) => (
        <Card
          key={ card.cardName }
          { ...card }
        />));
  }

  checkSuperTrunfoCard() {
    const { cardTrunfo } = this.state;
    return cardTrunfo && this.setState({ hasTrunfo: true });
  }

  validateAttributeFields() {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const attr1 = Number(cardAttr1);
    const attr2 = Number(cardAttr2);
    const attr3 = Number(cardAttr3);
    const sumAttrs = attr1 + attr2 + attr3;
    const maxAttValue = 90;
    const maxSumAttValue = 210;
    if (attr1 > maxAttValue || attr1 < 0
      || attr2 > maxAttValue || attr2 < 0
      || attr3 > maxAttValue || attr3 < 0
      || sumAttrs > maxSumAttValue) {
      return false;
    }
    return true;
  }

  validateTextFields() {
    const { cardName, cardDescription, cardImage } = this.state;
    if (cardName === '' || cardDescription === '' || cardImage === '') {
      return false;
    }
    return true;
  }

  enableSaveButton() {
    if (this.validateAttributeFields() && this.validateTextFields()) {
      return this.setState({ isSaveButtonDisabled: false });
    }
    return this.setState({ isSaveButtonDisabled: true });
  }

  render() {
    const { onInputChange, onSaveButtonClick } = this;
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
    } = this.state;
    return (
      <div>
        <header>
          <h1>Tryunfo</h1>
        </header>
        <main>
          <Form
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ onInputChange }
            onSaveButtonClick={ onSaveButtonClick }
          />
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
          />
          {
            this.createCardList()
          }
        </main>
      </div>
    );
  }
}

export default App;
