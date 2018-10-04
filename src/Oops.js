import React, { Component } from 'react';

class Oops extends Component {
   state = {
      active: false,
      animal: {},
   }

   handleFieldChange = (evt) => {
      //Good Way
      //get a copy of the state object to change
      //make changes to the copy
      //setState to updated object

      // const animal = {...this.state.animal};
      // animal[evt.target.name] = evt.target.value;
      // this.setState({animal});

      //Not so good, wrong way
      //setting variable equal to the state value follows up to
      //the original from the find method
      //causes changes to props of this component - no, no
      //swap it out and check state and props with chrome react tools

      const animal = this.state.animal;
      animal[evt.target.name] = evt.target.value;
      this.setState({ animal });
   }

   makeActive = (event) => {
      //make a copy of this.state.active
      let active = this.state.active;
      let newActive = active = !active;
      if (!active) {
         //reset the animal to the original props
         const animal = this.props.animal;
         this.setState({
            animal,
            active: newActive
         })
      } else {
         this.setState({
            active: newActive,
         });
      }
   }

   handleSave = () => {
      this.props.saveAnimal(this.state.animal);
      this.setState({
         active: false,
      })
   }

   componentDidMount = () => {
      this.setState({
         animal: this.props.animal,
      })
   }

   render() {
      //this should be pulled from props to keeping original data.
      const { kind, story } = this.props.animal;

      return (
         <div>
            <strong>{kind}:</strong> {story}

            {this.state.active ?
               <div>
                  <input type="text" value={this.state.animal.kind} name="kind"
                     onChange={this.handleFieldChange} />
                  <input type="textarea" style={{ width: '100%' }} value={this.state.animal.story} name="story"
                     onChange={this.handleFieldChange} />
                  <button onClick={this.handleSave}>Save</button>
               </div>
               :
               null
            }
            <button onClick={this.makeActive} id={this.state.animal.id}>
               {this.state.active ?
                  "cancel"
                  : "edit"
               }
            </button>
            <hr />
         </div>
      )
   }
}

export default Oops;