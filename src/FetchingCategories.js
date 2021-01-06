import React, { Component } from 'react';

window.$titleGlobalStore = [];

const apiUrl = "http://jservice.io/api/categories?count=15&offset=200";

class FetchingCategories extends Component {

    constructor(props) {
        super(props);
        this.state = {
          titleStore: [],
          selected: null
        };
      }

      componentDidMount() {
        fetch('http://jservice.io/api/categories?count=15&offset=200')
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
            for(let i=0; i<10; i++){
                titleStore.push(tempStore[i].title);
            }
            window.$titleGlobalStore  = titleStore;
            
            // const titleStore = tempStore[0].title;
                //   .map(key => data[key].item[0]);
            this.setState({
              titleStore,
              error : null
            });
          })
          .catch(err =>{
              this.setState({
                  error : err.message
              });
          });
      }

      render() {    
        return (
          <div className="demonym_app">
              <h2>data here</h2>
            <div>{this.state.titleStore}</div>
            <div>
            {this.state.titleStore.map((category, index) => (
                    <div>{category}</div>
                ))}
            </div>
          </div>
        );
      }
}
  


export default FetchingCategories;