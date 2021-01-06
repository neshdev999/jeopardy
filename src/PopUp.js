import React, { Component } from "react";
import './PopUp.css';

class PopUp extends Component {
    handleClick = () => {
     this.props.togglePopWindow();

    };

    flip = () =>{

        var displayQuestion = document.querySelector('.frontCardQue');
        var displayAnswer = document.querySelector('.backCardAnswer');
        if (displayQuestion.style.display === "none") {
          displayQuestion.style.display = "block";
          displayAnswer.style.display = "none";
        } else {
          displayQuestion.style.display = "none";
          displayAnswer.style.display = "block";
        }

    }
    
    render() {
    return (
     <div className="modal">
       <div className="modal_content">

       <p></p>

       <div className="container">
            <p className="frontCardQue">{this.props.Question}</p>
            <p className="backCardAnswer">{this.props.Answer}</p>       
       </div>
       <div className="buttonsContainer">
        <button onClick={this.flip}>Clue/Question</button>
        <button className="close" onClick={this.handleClick}>Done</button>
       </div>
      </div>
     </div>
    );
   }
  }

  export default PopUp;