import React from "react";
import './RoundFirst.css';
import RoundSecond from './RoundSecond.js';
import InputControl from './InputControl.js';
import ClueModal from './ClueModal.js';
import CategoriesTitle from './CategoriesTitle.js';
import PopUp from "./PopUp.js"; 


// Global Variables

const ReceivedCategories = window.$titleGlobalStore;
console.log(ReceivedCategories.slice(1,4));

const dailyDoubleNotToConsiderMeIndicatorHolder = [];

// const IntialCategories = ['SPORTS','ANIMALS','SCIENCE'];
console.log("Tiral Me here");
console.log(window.$titleGlobalStore);
const InitialCluesCatgoOne = ['$200', '$400', '$600'];
const InitialCluesCatgoTwo = ['$200', '$400', '$600'];
const InitialCluesCatgoThree = ['$200', '$400', '$600'];

// function DisplayCategoriesTitles(){
//     return (      
//         <CategoriesTitle />        
//     );
// }

class RoundFirst extends React.Component {

    constructor(props) {
        super(props);
        const categories = [];
        const cluesCatgoOne = [];
        const cluesCatgoTwo = [];
        const cluesCatgoThree = [];

        this.state = {
            chosenNumberOfCategories: 3,
            chosenNumberOfCluesCategoOne: 3,
            chosenNumberOfCluesCategoTwo: 3,
            chosenNumberOfCluesCategoThree: 3,
            categories,
            cluesCatgoOne,
            cluesCatgoTwo,
            cluesCatgoThree,
            show: false,
            titleStore : [],
            titleIds: [],
            catOneQues: [],
            catOneAnswers: [],
            catTwoQues: [],
            catTwoAnswers: [],
            catThreeQues: [],
            catThreeAnswers: [],
            seenFirstCatTwoHund: false,
            seenFirstCatFourHund: false,
            seenFirstCatSixHund: false,
            seenSecondCatTwoHund: false,
            seenSecondCatFourHund: false,
            seenSecondCatSixHund: false,
            seenThirdCatTwoHund: false,
            seenThirdCatFourHund: false,
            seenThirdCatSixHund: false,
            dailDoubleCheckFlag: false
        }; 
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showcatOneQueAnsTwoHund = this.showcatOneQueAnsTwoHund.bind(this);
        this.showcatOneQueAnsFourHund = this.showcatOneQueAnsFourHund.bind(this);
        this.showcatOneQueAnsSixHund = this.showcatOneQueAnsSixHund.bind(this);
        this.showcatTwoQueAnsTwoHund = this.showcatTwoQueAnsTwoHund.bind(this);
        this.showcatTwoQueAnsFourHund = this.showcatTwoQueAnsFourHund.bind(this);
        this.showcatTwoQueAnsSixHund = this.showcatTwoQueAnsSixHund.bind(this);
        this.showcatThreeQueAnsTwoHund = this.showcatThreeQueAnsTwoHund.bind(this); 
        this.showcatThreeQueAnsFourHund = this.showcatThreeQueAnsFourHund.bind(this);
        this.showcatThreeQueAnsSixHund = this.showcatThreeQueAnsSixHund.bind(this);
        this.togglePop = this.togglePop.bind(this);       
      }



      componentDidMount() {

        let getRandomOffsetValue = getRandomArbitrary(10,5000);
        let titleAndAllDataApiUrl = 'http://jservice.io/api/categories?count=15&offset=' + getRandomOffsetValue;
        // console.log("RandomHere");
        // console.log(titleAndAllDataApiUrl);

        fetch(titleAndAllDataApiUrl)
            .then(response => {
            if(!response.ok) {
              throw new Error('Something went wrong, please try again later.')
            }
            return response;
          })
          .then(response => response.json())
          .then(data => {
              console.log(data);
              console.log(data[0].title);
            // const titleStore = Object.keys(data);
            const tempStore = Object.values(data);
            const titleStore = [];
            const titleIds = [];
            for(let i=0; i<3; i++){
                titleStore.push(tempStore[i].title);
                titleIds.push(tempStore[i].id);
            }
            console.log("checkdata");
            console.log(titleStore);
            console.log(titleIds);
            console.log(titleStore[0]);
            console.log(titleIds[0]);
            console.log(titleStore[1]);
            console.log(titleIds[1]);
            console.log(titleStore[2]);
            console.log(titleIds[2]);
            window.$titleGlobalStore  = titleStore;
            console.log(titleIds);
            console.log(titleIds[0]);
            
            // const titleStore = tempStore[0].title;
                //   .map(key => data[key].item[0]);
            this.setState({
              titleStore,
              titleIds,
              error : null
            });

            let firstCatApi = 'http://jservice.io/api/category?id=' + this.state.titleIds[0];
            console.log(firstCatApi);
            let getCluesDataOne=this.FetchClues(firstCatApi, '1');

            let secondCatApi = 'http://jservice.io/api/category?id=' + this.state.titleIds[1];
            console.log(secondCatApi);
            let getCluesDataTwo=this.FetchClues(secondCatApi, '2');

            let thirdCatApi = 'http://jservice.io/api/category?id=' + this.state.titleIds[2];
            console.log(thirdCatApi);
            let getCluesDataThree=this.FetchClues(thirdCatApi, '3');


          })
          .catch(err =>{
              this.setState({
                  error : err.message
              });
          });

      }

      FetchClues = (appliedUrl, catSpecificationId) =>{
        const cluesUrl = appliedUrl;
        const queArray = [];
        const ansArray = [];
    
        fetch(cluesUrl)
        .then(response => {
        if(!response.ok) {
          throw new Error('Something went wrong, please try again later.')
        }
        return response;
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          console.log(data.clues);
          console.log(data['clues_count']);
          console.log(data.clues[0]);
          var maxRandomLimit = data['clues_count'];
          if(3< parseInt(data['clues_count'])){
            for(let i=0; i<3; i++){
                var j = getRandomArbitrary(0,maxRandomLimit);
                console.log(j);
                queArray.push(data.clues[j]['question']);
                ansArray.push(data.clues[j]['answer']);
            }
            console.log("checkNesh");
            console.log(queArray);
            console.log(ansArray);

            if(parseInt(catSpecificationId) === 1){
                this.setState({
                    catOneQues: queArray,
                    catOneAnswers: ansArray,
                    error : null
                  });
            }else if(parseInt(catSpecificationId) === 2){
                this.setState({
                    catTwoQues: queArray,
                    catTwoAnswers: ansArray,
                    error : null
                  });
            }else if(parseInt(catSpecificationId) === 3){
                this.setState({
                    catThreeQues: queArray,
                    catThreeAnswers: ansArray,
                    error : null
                  });
            }


          }
        })
        .catch(err =>{
            console.log(err.message);
        });
        console.log("Nesh Me");
        console.log(queArray);
        return(
            "trial Me BETA"
        );
      }; 

      showModal = () =>{
          this.setState({show : true});
      };

      hideModal = () =>{
          this.setState({show: false});
      };

      applyDailyDouble = (activationKey) =>{

        var tempKey = getRandomArbitrary(1,9);

        while(true){
            if(dailyDoubleNotToConsiderMeIndicatorHolder.includes(tempKey)){
                tempKey = getRandomArbitrary(1,9);
            }else{
                break;
            }
        }


        let randomKey = getRandomArbitrary(1,9);
        let convertedActivationKey = parseInt(activationKey);


        switch(randomKey){
            case 1:
                if((convertedActivationKey === randomKey) && (this.state.dailDoubleCheckFlag === false)){
                    alert("Daily Double");
                     this.state.dailDoubleCheckFlag = true;
                }
                break;
            case 2:
                if((convertedActivationKey === randomKey) && (this.state.dailDoubleCheckFlag === false)){
                    alert("Daily Double");
                     this.state.dailDoubleCheckFlag = true;
                }
                break;
            case 3:
                if((convertedActivationKey === randomKey) && (this.state.dailDoubleCheckFlag === false)){
                    alert("Daily Double");
                     this.state.dailDoubleCheckFlag = true;
                }
                break;
            case 4:
                if((convertedActivationKey === randomKey) && (this.state.dailDoubleCheckFlag === false)){
                    alert("Daily Double");
                     this.state.dailDoubleCheckFlag = true;
                }
                break;
            case 5:
                if((convertedActivationKey === randomKey) && (this.state.dailDoubleCheckFlag === false)){
                    alert("Daily Double");
                     this.state.dailDoubleCheckFlag = true;
                }
                break;
            case 6:
                if((convertedActivationKey === randomKey) && (this.state.dailDoubleCheckFlag === false)){
                    alert("Daily Double");
                     this.state.dailDoubleCheckFlag = true;
                }
                break;
            case 7:
                if((convertedActivationKey === randomKey) && (this.state.dailDoubleCheckFlag === false)){
                    alert("Daily Double");
                     this.state.dailDoubleCheckFlag = true;
                }
                break;
            case 8:
                if((convertedActivationKey === randomKey) && (this.state.dailDoubleCheckFlag === false)){
                    alert("Daily Double");
                     this.state.dailDoubleCheckFlag = true;
                }
                break;
            case 9:
                if((convertedActivationKey === randomKey) && (this.state.dailDoubleCheckFlag === false)){
                    alert("Daily Double");
                     this.state.dailDoubleCheckFlag = true;
                }
                break;
        }
      }



      showcatOneQueAnsTwoHund = () =>{
        // alert("Question: " + this.state.catOneQues[0] + " Answer: " + this.state.catOneAnswers[0]);
        this.setState({
            seenFirstCatTwoHund: !this.state.seenFirstCatTwoHund
        });
        document.querySelector('#catOneQueAnsTwoHund').style.backgroundColor = "rgba(76, 65, 71, 0.3)";
        this.applyDailyDouble('1');

      };

      showcatOneQueAnsFourHund = () =>{
        // alert("Question: " + this.state.catOneQues[1] + " Answer: " + this.state.catOneAnswers[1]);
        this.setState({
            seenFirstCatFourHund: !this.state.seenFirstCatFourHund
        });
        document.querySelector('#catOneQueAnsFourHund').style.backgroundColor = "rgba(76, 65, 71, 0.3)";
        this.applyDailyDouble('2');

      };

      showcatOneQueAnsSixHund = () =>{
        // alert("Question: " + this.state.catOneQues[2] + " Answer: " + this.state.catOneAnswers[2]);
        this.setState({
            seenFirstCatSixHund: !this.state.seenFirstCatSixHund
        });
        document.querySelector('#catOneQueAnsSixHund').style.backgroundColor = "rgba(76, 65, 71, 0.3)";
        this.applyDailyDouble('3');

      };

      showcatTwoQueAnsTwoHund = () =>{
        // alert("Question: " + this.state.catTwoQues[0] + " Answer: " + this.state.catTwoAnswers[0]);
        this.setState({
            seenSecondCatTwoHund: !this.state.seenSecondCatTwoHund
        });
        document.querySelector('#catTwoQueAnsTwoHund').style.backgroundColor = "rgba(76, 65, 71, 0.3)";
        this.applyDailyDouble('4');

      };

      showcatTwoQueAnsFourHund = () =>{
        // alert("Question: " + this.state.catTwoQues[1] + " Answer: " + this.state.catTwoAnswers[1]);
        this.setState({
            seenSecondCatFourHund: !this.state.seenSecondCatFourHund
        });
        document.querySelector('#catTwoQueAnsFourHund').style.backgroundColor = "rgba(76, 65, 71, 0.3)";
        this.applyDailyDouble('5');

      };

      showcatTwoQueAnsSixHund = () =>{
        // alert("Question: " + this.state.catTwoQues[2] + " Answer: " + this.state.catTwoAnswers[2]);
        this.setState({
            seenSecondCatSixHund: !this.state.seenSecondCatSixHund
        });
        document.querySelector('#catTwoQueAnsSixHund ').style.backgroundColor = "rgba(76, 65, 71, 0.3)";
        this.applyDailyDouble('6');
      };

      showcatThreeQueAnsTwoHund = () =>{
        // alert("Question: " + this.state.catThreeQues[0] + " Answer: " + this.state.catThreeAnswers[0]);
        this.setState({
            seenThirdCatTwoHund: !this.state.seenThirdCatTwoHund
        });
        document.querySelector('#catThreeQueAnsTwoHund').style.backgroundColor = "rgba(76, 65, 71, 0.3)";
        this.applyDailyDouble('7');
      }

      showcatThreeQueAnsFourHund = () =>{
        // alert("Question: " + this.state.catThreeQues[1] + " Answer: " + this.state.catThreeAnswers[1]);
        this.setState({
            seenThirdCatFourHund: !this.state.seenThirdCatFourHund
        });
        document.querySelector('#catThreeQueAnsFourHund').style.backgroundColor = "rgba(76, 65, 71, 0.3)";
        this.applyDailyDouble('8');
      }

      showcatThreeQueAnsSixHund = () =>{
        // alert("Question: " + this.state.catThreeQues[2] + " Answer: " + this.state.catThreeAnswers[2]);
        this.setState({
            seenThirdCatSixHund: !this.state.seenThirdCatSixHund
        });
        document.querySelector('#catThreeQueAnsSixHund').style.backgroundColor = "rgba(76, 65, 71, 0.3)";
        this.applyDailyDouble('9');
      }

      togglePop = () => {
        this.setState({
         seen: !this.state.seen
        });
       };

      toggleCatgoTwoPop = () =>{
        this.setState({
        seenClueCatgoTwo : !this.state.seenClueCatgoTwo
        });
      } 

    getCallBackDataFromInputControl = (dataNumberOfCategories, dataNumberOfCluesCategoOne, dataNumberOfCluesCategoTwo, dataNumberOfCluesCategoThree) =>{
        var changedCategories = [];
        var changedCluesCatgoOne = [];
        var changedCluesCatgoTwo = [];
        var changedCluesCatgoThree = [];



        if(parseInt(dataNumberOfCategories) === 3){
            changedCategories = this.state.titleStore;
        }else if(parseInt(dataNumberOfCategories) === 2){
            changedCategories = (this.state.titleStore).slice(0,parseInt(dataNumberOfCategories));
        }else if(parseInt(dataNumberOfCategories) === 1){
            changedCategories = (this.state.titleStore).slice(0,parseInt(dataNumberOfCategories));
        }else if(parseInt(dataNumberOfCategories) === 0){

            /* disable clicks on all elements */

            document.querySelector('#catOneQueAnsTwoHund').style.pointerEvents = 'none';
            document.querySelector('#catOneQueAnsFourHund').style.pointerEvents = 'none';
            document.querySelector('#catOneQueAnsSixHund').style.pointerEvents = 'none';

            document.querySelector('#catTwoQueAnsTwoHund').style.pointerEvents = 'none';
            document.querySelector('#catTwoQueAnsFourHund').style.pointerEvents = 'none';
            document.querySelector('#catTwoQueAnsSixHund').style.pointerEvents = 'none';

            document.querySelector('#catThreeQueAnsTwoHund').style.pointerEvents = 'none';
            document.querySelector('#catThreeQueAnsFourHund').style.pointerEvents = 'none';
            document.querySelector('#catThreeQueAnsSixHund').style.pointerEvents = 'none';
        }

        if((parseInt(dataNumberOfCluesCategoOne)) === 3){
            changedCluesCatgoOne = InitialCluesCatgoOne;
        }else if((parseInt(dataNumberOfCluesCategoOne)) === 2){
            changedCluesCatgoOne = (InitialCluesCatgoOne).slice(0,parseInt(dataNumberOfCluesCategoOne));
           
            /* disable clicks on no data elements */
            document.querySelector('#catOneQueAnsSixHund').style.pointerEvents = 'none';

            /* remove possible daily double */
            /* Fail Safe logic -remove at last */
            // if((this.state.dailyDoubleNotToConsiderMeIndicatorHolder).includes('3')){
            //     let temp = [];
            //     temp = removeSameItemFromArray(this.state.dailyDoubleConsiderMeIndicatorHolder, ('3'));
            //         (this.state.dailyDoubleConsiderMeIndicatorHolder).push(temp);
            // }            
            let pass = '3';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(pass);     
            

        }else if((parseInt(dataNumberOfCluesCategoOne)) === 1){
            changedCluesCatgoOne = (InitialCluesCatgoOne).slice(0,parseInt(dataNumberOfCluesCategoOne));
            /* disable clicks on no data elements */
            document.querySelector('#catOneQueAnsSixHund').style.pointerEvents = 'none';
            document.querySelector('#catOneQueAnsFourHund').style.pointerEvents = 'none';

            /* remove possible daily double */          
            let pass = '3';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(pass);          
            let passSecondValue = '2';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(passSecondValue);

        }else{
            changedCluesCatgoOne = [];
            /* disable clicks on no data elements */
            document.querySelector('#catOneQueAnsSixHund').style.pointerEvents = 'none';
            document.querySelector('#catOneQueAnsFourHund').style.pointerEvents = 'none';
            document.querySelector('#catOneQueAnsTwoHund').style.pointerEvents = 'none';

            /* remove possible daily double */
          
            let pass = '3';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(pass);           
            let passSecondValue = '2';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(passSecondValue);            
            let passThirdValue = '1';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(passThirdValue);  
            
        }

        if((parseInt(dataNumberOfCluesCategoTwo)) === 3){
            changedCluesCatgoTwo = InitialCluesCatgoTwo;
        }else if((parseInt(dataNumberOfCluesCategoTwo)) === 2){
            changedCluesCatgoTwo = (InitialCluesCatgoTwo).slice(0,parseInt(dataNumberOfCluesCategoTwo));
            
            /* disable clicks on no data elements */
            document.querySelector('#catTwoQueAnsSixHund').style.pointerEvents = 'none';

            /* remove possible daily double */
            let pass = '6';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(pass);     
        }else if((parseInt(dataNumberOfCluesCategoTwo)) === 1){
            changedCluesCatgoTwo = (InitialCluesCatgoTwo).slice(0,parseInt(dataNumberOfCluesCategoTwo));
            
            /* disable clicks on no data elements */
            document.querySelector('#catTwoQueAnsSixHund').style.pointerEvents = 'none';
            document.querySelector('#catTwoQueAnsFourHund').style.pointerEvents = 'none';

            /* remove possible daily double */
            let pass = '6';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(pass);
            let passSecondValue = '5';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(passSecondValue);    
        }else{
            changedCluesCatgoTwo = [];
            /* disable clicks on no data elements */
            document.querySelector('#catTwoQueAnsSixHund').style.pointerEvents = 'none';
            document.querySelector('#catTwoQueAnsFourHund').style.pointerEvents = 'none';
            document.querySelector('#catTwoQueAnsTwoHund').style.pointerEvents = 'none';
            
            /* remove possible daily double */
            let pass = '6';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(pass);
            let passSecondValue = '5';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(passSecondValue);
            let passThirdValue = '4';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(passThirdValue);   
        }

        if((parseInt(dataNumberOfCluesCategoThree)) === 3){
            changedCluesCatgoThree = InitialCluesCatgoThree;
        }else if((parseInt(dataNumberOfCluesCategoThree)) === 2){
            changedCluesCatgoThree = (InitialCluesCatgoThree).slice(0,parseInt(dataNumberOfCluesCategoThree));
            /* disable clicks on no data elements */
            document.querySelector('#catThreeQueAnsSixHund').style.pointerEvents = 'none';

            /* remove possible daily double */
            let pass = '9';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(pass);  
        }else if((parseInt(dataNumberOfCluesCategoThree)) === 1){
            changedCluesCatgoThree = (InitialCluesCatgoThree).slice(0,parseInt(dataNumberOfCluesCategoThree));
            /* disable clicks on no data elements */
            document.querySelector('#catThreeQueAnsSixHund').style.pointerEvents = 'none';
            document.querySelector('#catThreeQueAnsFourHund').style.pointerEvents = 'none';
            
            /* remove possible daily double */
            let pass = '9';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(pass);
            let passSecondValue = '8';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(passSecondValue);  
        }else{
            changedCluesCatgoThree = [];
            /* disable clicks on no data elements */
            document.querySelector('#catThreeQueAnsSixHund').style.pointerEvents = 'none';
            document.querySelector('#catThreeQueAnsFourHund').style.pointerEvents = 'none';
            document.querySelector('#catThreeQueAnsTwoHund').style.pointerEvents = 'none';

            /* remove possible daily double */
            let pass = '9';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(pass);
            let passSecondValue = '8';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(passSecondValue);
            let passThirdValue = '7';
            dailyDoubleNotToConsiderMeIndicatorHolder.push(passThirdValue); 
        }
      
        this.setState({
            chosenNumberOfCategories: dataNumberOfCategories,
            chosenNumberOfCluesCategoOne: dataNumberOfCluesCategoOne,
            chosenNumberOfCluesCategoTwo: dataNumberOfCluesCategoTwo,
            chosenNumberOfCluesCategoThree: dataNumberOfCluesCategoThree,
            categories : changedCategories,
            cluesCatgoOne : changedCluesCatgoOne,
            cluesCatgoTwo: changedCluesCatgoTwo,
            cluesCatgoThree: changedCluesCatgoThree
        });

        console.log(changedCategories);
    }


    render(){
        return (
            <div>
                <div className="inputControlStyles">
                    <InputControl parentCallbackFromCurrentRound = {this.getCallBackDataFromInputControl}/>
                </div>
                {/* <div className="game-heading-board">
                {this.state.categories.map((category, index) => (
                    <div className="box headingCat">{category}</div>
                ))}
                </div>
                <span className="game-clue-board">
                {this.state.cluesCatgoOne.map((clueCatgoOne, index) => (
                    <span className="box headingCat">{clueCatgoOne}</span>
                ))}
                </span>
                <span className="game-clue-board">
                {this.state.cluesCatgoTwo.map((clueCatgoTwo, index) => (
                    <span className="box headingCat">{clueCatgoTwo}</span>
                ))}
                </span>
                <span className="game-clue-board">
                {this.state.cluesCatgoThree.map((clueCatgoThree, index) => (
                    <span className="box headingCat">{clueCatgoThree}</span>
                ))}
                </span> */}

                {/* <div>
                    <DisplayCategoriesTitles />
                </div> */}

                <ClueModal show={this.state.show} handleClose={this.hideModal}>
                    <p>ClueModal</p>
                </ClueModal>

                <div className="game-board">
                    <div className="box headingCat">{this.state.categories[0] ? this.state.categories[0] : ""}</div>
                    <div className="box headingCat">{this.state.categories[1] ? this.state.categories[1] : ""}</div>
                    <div className="box headingCat">{this.state.categories[2] ? this.state.categories[2] : ""}</div>
                    {/* <div className="box headingCat">{this.state.titleStore[0] ? this.state.titleStore[0] : ""}</div>
                    <div className="box headingCat">{this.state.titleStore[1] ? this.state.titleStore[1] : ""}</div>
                    <div className="box headingCat">{this.state.titleStore[2] ? this.state.titleStore[2] : ""}</div> */}
                    {/* <div className="box clueCat" onClick={this.showModal}>{this.state.cluesCatgoOne[0] ? this.state.cluesCatgoOne[0] : ""}</div> */}
                    
                    <div className="box clueCat" onClick={this.showcatOneQueAnsTwoHund} id="catOneQueAnsTwoHund">
                        {this.state.cluesCatgoOne[0] ? this.state.cluesCatgoOne[0] : ""}
                    </div>
                    {this.state.seenFirstCatTwoHund ? <PopUp togglePopWindow={this.showcatOneQueAnsTwoHund} Question={this.state.catOneQues[0]} Answer={this.state.catOneAnswers[0]}  /> : null}

                    <div className="box clueCat" onClick={this.showcatTwoQueAnsTwoHund} id="catTwoQueAnsTwoHund">
                    {this.state.cluesCatgoTwo[0] ? this.state.cluesCatgoTwo[0] : ""}
                    </div>
                    {this.state.seenSecondCatTwoHund ? <PopUp togglePopWindow={this.showcatTwoQueAnsTwoHund} Question={this.state.catTwoQues[0]} Answer={this.state.catTwoAnswers[0]}  /> : null}


                    <div className="box clueCat" onClick={this.showcatThreeQueAnsTwoHund} id="catThreeQueAnsTwoHund">
                        {this.state.cluesCatgoThree[0] ? this.state.cluesCatgoThree[0] : ""}
                    </div>
                    {this.state.seenThirdCatTwoHund ? <PopUp togglePopWindow={this.showcatThreeQueAnsTwoHund} Question={this.state.catThreeQues[0]} Answer={this.state.catThreeAnswers[0]}  /> : null}

                    <div className="box clueCat" onClick={this.showcatOneQueAnsFourHund} id="catOneQueAnsFourHund">
                        {this.state.cluesCatgoOne[1] ? this.state.cluesCatgoOne[1] : ""}
                    </div>
                    {this.state.seenFirstCatFourHund ? <PopUp togglePopWindow={this.showcatOneQueAnsFourHund} Question={this.state.catOneQues[1]} Answer={this.state.catOneAnswers[1]}  /> : null}

                    <div className="box clueCat" onClick={this.showcatTwoQueAnsFourHund} id="catTwoQueAnsFourHund">
                        {this.state.cluesCatgoTwo[1] ? this.state.cluesCatgoTwo[1] : ""}
                    </div>
                    {this.state.seenSecondCatFourHund ? <PopUp togglePopWindow={this.showcatTwoQueAnsFourHund} Question={this.state.catTwoQues[1]} Answer={this.state.catTwoAnswers[1]}  /> : null}
                    
                    <div className="box clueCat" onClick={this.showcatThreeQueAnsFourHund} id="catThreeQueAnsFourHund">
                        {this.state.cluesCatgoThree[1] ? this.state.cluesCatgoThree[1] : ""}
                    </div>
                    {this.state.seenThirdCatFourHund ? <PopUp togglePopWindow={this.showcatThreeQueAnsFourHund} Question={this.state.catThreeQues[1]} Answer={this.state.catThreeAnswers[1]}  /> : null}

                    <div className="box clueCat" onClick={this.showcatOneQueAnsSixHund} id="catOneQueAnsSixHund">
                        {this.state.cluesCatgoOne[2] ? this.state.cluesCatgoOne[2] : ""}
                    </div>
                    {this.state.seenFirstCatSixHund ? <PopUp togglePopWindow={this.showcatOneQueAnsSixHund} Question={this.state.catOneQues[2]} Answer={this.state.catOneAnswers[2]}  /> : null}

                    <div className="box clueCat" onClick={this.showcatTwoQueAnsSixHund} id="catTwoQueAnsSixHund">
                        {this.state.cluesCatgoTwo[2] ? this.state.cluesCatgoTwo[2] : ""}
                    </div>
                    {this.state.seenSecondCatSixHund ? <PopUp togglePopWindow={this.showcatTwoQueAnsSixHund} Question={this.state.catTwoQues[2]} Answer={this.state.catTwoAnswers[2]}  /> : null}

                    <div className="box clueCat" onClick={this.showcatThreeQueAnsSixHund} id="catThreeQueAnsSixHund">
                        {this.state.cluesCatgoThree[2] ? this.state.cluesCatgoThree[2] : ""}
                    </div>
                    {this.state.seenThirdCatSixHund ? <PopUp togglePopWindow={this.showcatThreeQueAnsSixHund} Question={this.state.catThreeQues[2]} Answer={this.state.catThreeAnswers[2]}  /> : null}

                </div>

                {/* <div className="game-board">
                    <div className="box headingCat">SPORTS</div>
                    <div className="box headingCat">ANIMALS</div>
                    <div className="box headingCat">SCIENCE</div>
                    <div className="box clueCat">$200</div>
                    <div className="box clueCat">$200</div>
                    <div className="box clueCat">$200</div>
                    <div className="box clueCat">$400</div>
                    <div className="box clueCat">$400</div>
                    <div className="box clueCat">$400</div>
                    <div className="box clueCat">$600</div>
                    <div className="box clueCat">$600</div>
                    <div className="box clueCat">$600</div>
                </div> */}


                {/* <div className="nextRoundBtnContainer">
                    <button className="nextRoundBtn" id="nextRoundFromFirst" onClick={RoundSecond}>Next Round</button>
                </div>     */}
                {/* <div>
                <div className="testModal" onClick={this.togglePop}><button>Try Me</button></div>
                {this.state.seen ? <PopUp togglePopWindow={this.togglePop} content={this.showcatThreeQueAnsFourHund} Question={this.state.catThreeQues[0]} Answer={this.state.catThreeAnswers[0]}  /> : null}
                </div> */}



            {/* 
                <div>
                    <p>{this.state.catOneQues}</p>
                </div>

                <div>
                    <p>{this.state.catOneAnswers}</p>
                </div>

                <div>
                    <p>{this.state.catTwoQues}</p>
                </div>

                <div>
                    <p>{this.state.catTwoAnswers}</p>
                </div>

                <div>
                    <p>{this.state.catThreeQues}</p>
                </div>

                <div>
                    <p>{this.state.catThreeAnswers}</p>
                </div>
             */}
            </div>
    
      );
    }

}

// function FetchClues(appliedUrl){

//     const cluesUrl = appliedUrl;
//     const queArray = [];
//     const ansArray = [];

//     fetch(cluesUrl)
//     .then(response => {
//     if(!response.ok) {
//       throw new Error('Something went wrong, please try again later.')
//     }
//     return response;
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       console.log(data.clues);
//       console.log(data['clues_count']);
//       console.log(data.clues[0]);
//       if(3< parseInt(data['clues_count'])){
//         for(let i=0; i<3; i++){

//             queArray.push(data.clues[i]['question']);
//             ansArray.push(data.clues[i]['answer']);
//         }
//         console.log(queArray);
//         console.log(ansArray);
//       }
//     })
//     .catch(err =>{
//         console.log(err.message);
//     });
//     console.log("Nesh Me");
//     console.log(queArray);
//     return(
//         "trial Me BETA"
//     );
// }

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

function removeSameItemFromArray(arr, item){
    const result = arr.filter(function(x){
        return x !== item;
    });

    return result;
}
  

export default RoundFirst;