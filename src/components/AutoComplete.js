import React, {Component, Fragment} from 'react'

// Thanks to Alligator.io for the react autocomplete tutorial
// https://alligator.io/react/react-autocomplete/
class AutoComplete extends Component {
  constructor(props){
    super(props)
    this.state ={
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    }
  };

// will have to fill out suggestions and pass in
// handles the updating of the search bar
  onChange = (e) => {
    const { suggestions } = this.props
    const userInput = e.target.value
    const filteredSuggestions= suggestions.filter( suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    )

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput
    })

  }

  onClick = (e) => {
    this.props.retrieveUserInput(e.currentTarget.innerText)
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    })
  }

  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state
    //checks if enter key is pressed
    // if so sets what ever was currently shown to be the users input
    if(e.key === "Enter"){
      this.props.retrieveUserInput(filteredSuggestions[activeSuggestion])

      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      })
    }
    //check if up arrow is hit
    else if(e.keyCode === "ArrowUp"){
      if(activeSuggestion === 0){
        return
      }
      this.setState({activeSuggestion: activeSuggestion - 1})
    }
    //check if down arrow is hit
    else if(e.keyCode === "ArrowDown"){
      if(activeSuggestion -1 === filteredSuggestions.length){
        return
      }
      this.setState({activeSuggestion: activeSuggestion + 1})
    }
  }



  render () {
    const {onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this

    let suggestionsListComponent;
    if(showSuggestions && userInput) {
      if(filteredSuggestions.length){
        suggestionsListComponent = (
          <ul className="suggestions" >
          {filteredSuggestions.map((suggestion, index) => {
            let className
            //adds the different display to active suggestion
            if(index === activeSuggestion){
              className="suggestion_active"
            }

            return(
              <li
                className={className}
                key={suggestion}
                onClick={onClick}
              > {suggestion}
              </li>
            )

          })}
          </ul>
        )
      } else {
        suggestionsListComponent = (
          <div className="no_suggestions">
            <em> Sorry there is no workout matching those search terms! </em>
          </div>
        )
      }
    }
    return(
      <Fragment>
        <input type="text"
          name="exercise"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          placeholder="Search for exercise"
        /> {suggestionsListComponent}
      </Fragment>
    )
  }
}

export default AutoComplete;
