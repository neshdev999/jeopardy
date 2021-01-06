import React from 'react';
import './ViewControl.css';
import RoundFirst from "./RoundFirst.js";
import RoundSecond from "./RoundSecond.js";
import RoundThird from "./RoundThird.js";
import RoundFourth from "./RoundFourth.js";
import RoundFifth from "./RoundFifth.js";


class ViewControl extends React.Component {
    constructor(props) {
      super(props);
      this.handleFirstRoundClick = this.handleFirstRoundClick.bind(this);
      this.handleSecondRoundClick = this.handleSecondRoundClick.bind(this);
      this.handleThirdRoundClick = this.handleThirdRoundClick.bind(this);
      this.handleFourthRoundClick = this.handleFourthRoundClick.bind(this);
      this.handleFifthRoundClick = this.handleFifthRoundClick.bind(this);
      this.state = {isLoggedIn: 'firstView'};
    }
  
    handleFirstRoundClick() {
      this.setState({isLoggedIn: 'secondView'});
    }
  
    handleSecondRoundClick() {
      this.setState({isLoggedIn: 'thirdView'});
    }

    handleThirdRoundClick() {
      this.setState({isLoggedIn: 'fourthView'});
    }

    handleFourthRoundClick() {
      this.setState({isLoggedIn: 'fifthView'});
    }

    handleFifthRoundClick(){
      this.setState({isLoggedIn: 'firstView'});
    }


  
    render() {
      var isLoggedIn = this.state.isLoggedIn;
      let button;
  
      if (isLoggedIn === 'secondView') {
        button = <LoginSecondButton onClick={this.handleSecondRoundClick} />;
      } else if (isLoggedIn === 'thirdView') {
        button = <LoginThirdButton onClick={this.handleThirdRoundClick} />;
      } else if (isLoggedIn === 'fourthView') {
        button = <LoginFourthButton onClick={this.handleFourthRoundClick} />;
      } else if (isLoggedIn === 'fifthView') {
        button = <LoginFifthButton onClick={this.handleFifthRoundClick} />;
      } else{
        button = <LoginButton onClick={this.handleFirstRoundClick} />;
      }
  
      return (
        <div className="viewControlContainer">
          <Greeting isLoggedIn={isLoggedIn} />
          {button}
        </div>
      );
    }
  }
  
  function UserSecondRoundGreeting(props) {
    return (
    <div>
        <h1>Welcome To Second Round</h1>
        <RoundSecond />
    </div>
    );
  }
  
  function GuestFirstRoundGreeting(props) {
    return (
    <div className="FirstRoundHolderContainer">
        <h1>Welcome To First Round</h1>
        <RoundFirst />
    </div>
    );
  }

  function UserThirdRoundGreeting(props){
    return(
      <div>
        <h1>Welcome To Third Round</h1>
        <RoundThird />
      </div>
    )
  }

  function UserFourthRoundGreeting(props){
    return(
      <div>
        <h1>Welcome To Fourth Round</h1>
        <RoundFourth />
      </div>
    )
  }

  
  function UserFifthRoundGreeting (props){
    return(
      <div>
        <h1>Welcome To Fifth Round</h1>
        <RoundFifth />
      </div>
    )
  }
  
  function Greeting(props) {
    var isLoggedIn = props.isLoggedIn;
    if (isLoggedIn === 'secondView') {
      return <UserSecondRoundGreeting />;
    }else if(isLoggedIn === 'thirdView'){
      return <UserThirdRoundGreeting />;
    }else if(isLoggedIn === 'fourthView'){
      return <UserFourthRoundGreeting />;
    }else if(isLoggedIn === 'fifthView'){
      return <UserFifthRoundGreeting />;
    }else{
      return <GuestFirstRoundGreeting />;
    }

  }
  
  function LoginButton(props) {
    return (
      <div className="nextRoundBtnContainer">
      <button className="nextRoundBtn" onClick={props.onClick}>
        Next Round
      </button>
      </div>
    );
  }
  
  function LoginSecondButton(props) {
    return (
      <div className="nextRoundBtnContainer">
      <button  className="nextRoundBtn" onClick={props.onClick}>
        Next Round
      </button>
      </div>
    );
  }

  function LoginThirdButton(props){
    return(
      <div className="nextRoundBtnContainer">
      <button className="nextRoundBtn" onClick={props.onClick}>
        Next Round
      </button>
      </div>
    );
  }

  function LoginFourthButton(props){
    return(
      <div className="nextRoundBtnContainer">
      <button  className="nextRoundBtn" onClick={props.onClick}>
        Next Round
      </button>
      </div>
    );
  }

  function LoginFifthButton(props){
    return(
      <div className="nextRoundBtnContainer">
      <button className="nextRoundBtn" onClick={props.onClick}>
        Go to First Round
      </button>
      </div>
    );
  }

  export default ViewControl;