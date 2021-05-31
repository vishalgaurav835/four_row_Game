import React, { Component } from 'react';
import './App.css';
import Home from './container/home/Home';
import AddDetailPage from './container/DetailAddPage/DetailAddionPage';
import FourPlayGameBoard from './container/FourRowGame/FourRowGame';

class App extends Component {
  constructor(){
      super();
      this.state = {
          flagForRenderPage: "",
          playerOne: "",
          playerTwo: "",
          noOfGame: 1,
          whostart: "Alternative turn",
      };
  }
  
  handleDetailPageOpen = (data) => {
       this.setState( () => {
         return {
           flagForRenderPage: data,
         }
       })
  };

  handlePlayPageOpen = (data,valuePlayerOne,valuePlayerTwo,valueForNoOfPlay,valueForWhoStart) => {
    if( valueForNoOfPlay == "2 Games"){
      this.setState( () => {
        return {
          noOfGame: 2
        }
      })
    }
    if( valueForNoOfPlay == "3 Games"){
      this.setState( () => {
        return {
          noOfGame: 3
        }
      })
    }
    if( valueForNoOfPlay == "5 Games"){
      this.setState( () => {
        return {
          noOfGame: 5
        }
      })
    }
    if( valueForNoOfPlay == "10 Games"){
      this.setState( () => {
        return {
          noOfGame: 10
        }
      })
    }
    if(!valueForNoOfPlay){
      this.setState( () => {
        return {
          noOfGame: 1
        }
      })
    }

    this.setState( () => {
      return {
        flagForRenderPage: data,
        playerOne: valuePlayerOne ? valuePlayerOne : "player01",
        playerTwo: valuePlayerTwo? valuePlayerTwo: "player02",
        whostart: valueForWhoStart? valueForWhoStart: "Alternative turn",
      }
    })
  }

  handleBackScreen = () => {
    this.setState( () => {
      return {
        flagForRenderPage: ""
      }
    })
  }

  backToPreviousScreen = () => {
    this.setState( () => {
      return {
        flagForRenderPage: "detailPage"
      }
    })
  }


  render() {
    let openPageOnResponseToUser;
    if( this.state.flagForRenderPage == "detailPage" ){
      openPageOnResponseToUser = <AddDetailPage
      backToHomeScreen = { this.handleBackScreen }
      handlePlayPageOpen = { this.handlePlayPageOpen } />
    }
     if(this.state.flagForRenderPage == ""){
      openPageOnResponseToUser =  <Home
      handleDetailPageOpen = { this.handleDetailPageOpen } />
    }
    if(this.state.flagForRenderPage == "startGame"){
      openPageOnResponseToUser = <FourPlayGameBoard
          playerOne={this.state.playerOne}
          playerTwo={this.state.playerTwo}
          noOfGame={this.state.noOfGame}
          whostart={this.state.whostart}
          handleHomePage = { this.handleBackScreen }
          backToPreviousScreen = { this.backToPreviousScreen}
      />
    }
    return (
      <div className="App">
       {openPageOnResponseToUser}
      </div>
    );
  }
}

export default App;
