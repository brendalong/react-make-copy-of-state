# React: Make A Copy Of State - Gotcha
Testing edit data with forms.

Many examples and tutorials surrounding React include making a copy of state prior to calling `setState()`. Ok, I can follow the rules. However for new developers many rules get put on the sidelines until a situation arises when the rule is broken.

Making a copy of state prior to calling `setState()` is one of those rules.

Let's say we have an array of animals. We want to display a particular animal based on a specified id. There are numerous ways to pass the animal to a component. We could get the specific animal using the `find` array method. We match a particular animal id with a variable or specified value. Checkout the following:

```
const animal = this.props.animals.find(a => a.id === 3)) || {}
```

We could also send the animal as props to a component.

```
{this.state.animals.map(animal =>
   <Details key={animal.id}
   id={animal.id}
   saveAnimal={this.saveAnimal}
   animal={animal}/>
```

Great, you have an animal and now want to make the details editable. Forms need state, so within the form component, you `setState()` equal to the animal props(usually with componentDidMount) and then render the fields with the info based on state.

The flow would be something like:
* Set state equal to props
* Render component based on state.
* Change field.
* Call a method to update state with setState().
* Render component with new state.

This is the tricky part: the state is tied directly to the props. As a user changes an input form value and you `setState()` equal to those values, the state changes and also the original props. This breaks the rule: a component must never modify its own props.
Props are Read Only https://reactjs.org/docs/components-and-props.html#props-are-read-only

Fix It - Make a Copy Of State
Before calling `setState()`, get a copy of the item to update. Make a copy of it (ES6 spread operator works great). Update the copy with the new data and then `setState()` to the updated data.

```
handleFieldChange = (evt) => {
    //get a copy of the state object to change
    //make changes to the copy
    //setState to updated object

    const animal = {...this.state.animal};
    animal[evt.target.name] = evt.target.value;
    this.setState({animal});
}
```

The original animal is intact (props) and the state has been updated. You are now ready to "lift" the new state to the parent. Updating the parent state results in new props passed to the animal details component.

Check out this repl.it example: https://repl.it/@BrendaLong1/Making-A-Copy-of-State. Use the React developer tools (available as a Chrome extension) to inspect the state and props of the components. The "Good Stuff" works correctly.
1. **Good Stuff**: Select edit. Make a change. Select cancel. No changes made.
2. **Oops**: Select edit. Make a change. Notice how edits effects current title or description. Select cancel. Changes still reflected in oops AND, select edit in the Good Stuff and notice the change from Oops gets applied. Without the copy on state, changes traveled up to the parent - oops.


Note: you could also pass setState a function rather than object
