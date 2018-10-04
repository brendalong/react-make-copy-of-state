import React, { Component } from 'react';
import Details from './Details';
import Oops from './Oops'


class App extends Component {

   //sample data
   animalsFromAPI = [
      {
         id: 1,
         kind: "goat",
         story: "Once upon a time there were three billy goats"
      },
      {
         id: 2,
         kind: "lion",
         story: "A Lion lay asleep in the forest, his great head resting on his paws. A timid little Mouse came upon him unexpectedly"
      },
      {
         id: 3,
         kind: "bear",
         story: "Once upon a time, there was a little girl named Goldilocks."
      }
   ]

   state = {
      animals: []
   }

   saveAnimal = (obj) => {
      //get a copy of state
      const animals = [...this.state.animals];
      //get index of object to update
      const index = this.state.animals.findIndex(a => a.id === obj.id);
      //update the copy
      animals[index] = obj;
      //setState equal to copy
      this.setState({ animals })
   }

   componentDidMount() {
      this.setState({
         animals: this.animalsFromAPI,
      })
   }
   /*

         */


   render() {
      return (
         <div className="App">
            <section>
               <h2>Good Stuff!</h2>
               {this.state.animals.map(animal =>
                  <Details key={animal.id} animals={this.state.animals} id={animal.id} saveAnimal={this.saveAnimal} animal={animal} />
               )}
            </section>
            <section style={{ backgroundColor: 'pink' }}>
               <h2>Oops - Need to make a copy of state</h2>
               {this.state.animals.map(animal =>
                  <Oops key={animal.id} animals={this.state.animals} id={animal.id} saveAnimal={this.saveAnimal} animal={animal} />
               )}
            </section>
         </div>
      );
   }
}

export default App;