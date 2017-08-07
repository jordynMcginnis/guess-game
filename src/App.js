import React, { Component } from 'react';
import './App.css';
import getPrincesses from './princesses'

class Grid extends React.Component {
  render () {
    return (
      <div>
        <div className="box-border">
          {this.props.princesses.map(function(princess){
            var img = require(`./photo/${princess.photoURL}`)
            return (
              <div className='box' onClick={this.props.checkBox.bind(null, princess)} key={princess.name} style={{backgroundImage: `url(${img})`}} />
            )
          }.bind(this))}
        </div>
        <div className='box25'>
          <div className="dropdown">
            <button className="dropbtn">Ask a Question!</button>
            <div className="dropdown-content">
              <a href="#1" onClick={this.props.hair}>What color is your hair?</a>
              <a href="#1" onClick={this.props.friend}>Who is your best friend?</a>
              <a href="#1" onClick={this.props.eyes}>Tell me about yourself</a>
            </div>
          </div>
        </div>
        <button className='button' onClick={this.props.showMessage}> Click for a Secret Message </button>
        <button className='button'onClick={this.props.chooseCharacter}> Restart Game!</button>
        <div className = 'bottom'> </div>
      </div>
    )
  }
}

class CharacterInfo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedCharacter:'', // character name goes here
      box: '', //box number of character will go here
      questionAnswer: '',
      hair: '',
      eyes: '',
      friend: '',
      answersList: [],
      princesses: getPrincesses()
    };
    this.chooseRandomCharacter = this.chooseRandomCharacter.bind(this);
    this.showHair = this.showHair.bind(this);
    this.showFriend = this.showFriend.bind(this);
    this.showEyes = this.showEyes.bind(this);
    this.checkBox = this.checkBox.bind(this);
    this.showMessage = this.showMessage.bind(this);
  };
  componentDidMount () {
    this.chooseRandomCharacter();
  }
  chooseRandomCharacter () {
    var character = this.state.princesses[Math.floor(Math.random() * 24)];
    this.setState(function(){
      return {
        selectedCharacter: character.name,
        hair: character.hair,
        eyes: character.eyes,
        friend: character.friend,
        box: character.box,
        answersList: [],
        message: '',
        princesses: getPrincesses()
      }
    })
  }
  showHair () {
      this.setState(function(){
        return {
          answersList: this.state.answersList.concat(this.state.hair)
        }
      })
    }
  showEyes () {
      this.setState(function(){
        return {
          answersList: this.state.answersList.concat(this.state.eyes)
        }
      })
  }
  showFriend () {
      this.setState(function(){
        return {
          answersList: this.state.answersList.concat(this.state.friend)
        }
      })
  }
  checkBox (clickedCharacter) {
    if(this.state.selectedCharacter === clickedCharacter.name){
      this.setState(function(){
        return {
          message: "Good Job!"
        }
      })
    } else {
      this.setState(function(){
        return {
          message: 'Try Again!',
          princesses: this.state.princesses.map(function (princess) {
            if (princess.name === clickedCharacter.name) {
              return {
                ...princess,
                photoURL: 'tangled.gif'
              }
            } else {
              return princess
            }
          })
        }
      })
    }
  }
  showMessage (){
    this.setState(function(){
      return {
        message: 'Secret'
      }
    })
  }
  render () {
    var userMessage;
    if(this.state.message === "Try Again!"){
      userMessage = (
        <div className='loser'> Try Again</div>
      )
    } else if(this.state.message === "Good Job!") {
      userMessage = (
        <div className='winner'>
          <div className='winnertitle'>
            Good Job!
            <button className='button'onClick={this.chooseRandomCharacter}> Play Again?!</button>
          </div>
        </div>
      )
    } else if (this.state.message === 'Secret'){
      userMessage = (
        <div className='secretMessage'>
          <h1> Hi Sophie and Scarlett! </h1>
          <p> I hope that you enjoy this game I made for you!</p>
          <p>
            Don't forget to ask questions to find the player!
          </p>
          <p> Have Fun! </p>
          <p> Love, Jojo</p>
          <button className='button'onClick={this.chooseRandomCharacter}> Play </button>
        </div>
      )
  }

    return (
      <div>
        <Grid
          princesses={this.state.princesses}
          chooseCharacter={this.chooseRandomCharacter}
          hair={this.showHair}
          friend={this.showFriend}
          eyes={this.showEyes}
          checkBox={this.checkBox}
          showMessage={this.showMessage}
        />
         <ul>
         {this.state.answersList.map(function(item){
            return (
                <li>{item}</li>
              )
          })}
        </ul>
        <div>
        </div>
        <div>{userMessage}</div>
      </div>
    )
  }
}



class App extends Component {
  render() {
    return (
      <div className="App">

        <CharacterInfo />
      </div>
    );
  }
}

export default App;
