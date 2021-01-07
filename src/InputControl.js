import React from 'react';
import './InputControl.css';

class InputControl extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        numberOfCategories: 3,
        numberOfCluesCategoOne: 3,
        numberOfCluesCategoTwo: 3,
        numberOfCluesCategoThree: 3
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleInputCatOneChange = this.handleInputCatOneChange.bind(this);
      this.handleInputCatTwoChange = this.handleInputCatTwoChange.bind(this);
      this.handleInputCatThreeChange = this.handleInputCatThreeChange.bind(this);
      this.handleSubmitCatSelectionForm = this.handleSubmitCatSelectionForm.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;  
      this.setState({
        numberOfCategories : value
      });

    var catValue = target.value;
    this.displayOrNotElement(catValue);
    }

    displayOrNotElement(input){

        var changeInput = parseInt(input);

        var catOne = document.getElementById('categoryOne');
        var catTwo = document.getElementById('categoryTwo');
        var catThree = document.getElementById('categoryThree');

        switch(changeInput){
            case 1:
                catOne.style.display = 'block';
                catTwo.style.display = 'none';
                catThree.style.display = 'none';
                this.setState({
                    numberOfCluesCategoTwo: 0,
                    numberOfCluesCategoThree: 0
                });
                break;
            case 2: 
                catOne.style.display = 'block';
                catTwo.style.display = 'block';
                catThree.style.display = 'none';  
                this.setState({
                    numberOfCluesCategoThree: 0
                });              
                break;
            case 3:
                catOne.style.display = 'block';
                catTwo.style.display = 'block';   
                catThree.style.display = 'block';
                break;               
        }
    }

    handleInputCatOneChange(event){
        const targetCatOne = event.target;
        const valueCatOne = targetCatOne.value;
        this.setState({
             numberOfCluesCategoOne: valueCatOne
        });
    }

    handleInputCatTwoChange(event){
        const targetCatTwo = event.target;
        const valueCatTwo = targetCatTwo.value;
        this.setState({
             numberOfCluesCategoTwo: valueCatTwo
        });
    }

    handleInputCatThreeChange(event){
        const targetCatThree = event.target;
        const valueCatThree = targetCatThree.value;
        this.setState({
             numberOfCluesCategoThree: valueCatThree
        });
    }

    sendCatSelectionData(event){
        this.setState({
            numberOfCategories: event.target.value,
            numberOfCluesCategoOne: event.target.value,
            numberOfCluesCategoTwo: event.target.value,
            numberOfCluesCategoThree: event.target.value
        });
        this.props.parentCallbackFromCurrentRound(this.state.numberOfCategories, this.state.numberOfCluesCategoOne, this.state.numberOfCluesCategoTwo, this.state.numberOfCluesCategoThree);
    }

    handleSubmitCatSelectionForm(event){
        event.preventDefault();
        this.sendCatSelectionData(event);
        this.setState({numberOfCategories: 3,
            numberOfCluesCategoOne: 3,
            numberOfCluesCategoTwo: 3,
            numberOfCluesCategoThree: 3});        
    }

    handleResetAction(event){
        window.location.reload();
    }
  
    render() {
      return (
          <div className="formHolder">
              <div className="formContent">


        <form onSubmit={this.handleSubmitCatSelectionForm}>
            <div className="formInputContainer">
                <div className="formInputItemContent">
                    <label>
                        Category size 
                        <input
                        name="titleCategory"
                        type="number"
                        min="0" max="3"
                        value={this.state.numberOfCategories}
                        onChange={this.handleInputChange} />
                    </label>
                </div>
                <div className="formInputItemContent">
                    <div className="cluesTitleHolder">Clue size </div>
                    <div id="categoryOne">
                        <label>
                            Clues For First Category 
                            <input
                             name="firstCategory"
                            type="number"
                            min="0" max="3"
                            value={this.state.numberOfCluesCategoOne}
                            onChange={this.handleInputCatOneChange} />
                        </label>
                    </div>
                    <div id="categoryTwo">
                        <label>
                            Clues For Second Category 
                            <input
                            name="secondCategory"
                            type="number"
                            min="0" max="3"
                            value={this.state.numberOfCluesCategoTwo}
                            onChange={this.handleInputCatTwoChange} />
                        </label>
                    </div>
                    <div id="categoryThree">
                        <label>
                            Clues For Third Category 
                            <input
                            name="thirdCategory"
                            type="number"
                            min="0" max="3"
                            value={this.state.numberOfCluesCategoThree}
                            onChange={this.handleInputCatThreeChange} />
                        </label>
                    </div>
                </div>
                <div className="formInputItemContent buttonsGroupContainer">
                <button type='submit' className="searchBtn">APPLY</button>
                <button type="reset" onClick={this.handleResetAction}>RESET</button>
                </div>
            </div>
        </form>
        </div>
        </div>
      );
    }
  }

  export default InputControl;