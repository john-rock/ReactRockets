import React, { Component, Fragment } from 'react';
import "./App.css";
// import Countdown from 'react-countdown-now';
import Countdown, { doubleDigit } from 'react-downcount';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      launches: [],
       // Boolean attribute that will allow us to toggle the switch
      // Keep the switch on if the theme is dark
      checked: localStorage.getItem("theme") === "dark" ? true : false,
      // theme: localStorage.getItem("theme")
    }
  }

  componentDidMount(){
    const url = "https://launchlibrary.net/1.4.1/launch/next/10?sort=asc";
    fetch(url)
    .then(response => response.json())
    .then(json => this.setState({ launches: json.launches }))

    document
    .getElementsByTagName("HTML")[0]
    .setAttribute("data-theme", localStorage.getItem("theme"));
  }

   // Class method allowing us to toggle the theme change
   toggleThemeChange = () => {
    const { checked } = this.state;
    // If theme is light then change to dark
    if (checked === false) {
      // Update localstorage
      localStorage.setItem("theme", "dark");
      /**
       * The document.getElementsByTagName(...).setAttribute(...)
       * will only update the value
       */
      // Update the data-theme attribute of our html tag
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
      // Update our state
      this.setState({
        // Ensure our switch is on if we change to dark theme
        checked: true
      });
    } else {
      // Update localstorage
      localStorage.setItem("theme", "light");
      /**
       * The document.getElementsByTagName(...).setAttribute(...)
       * will only update the value until the App is mounted and we change
       * the state of the switch so we will need to introduce
       * a React lifecycle called ˝componentDidMount()˝
       */
      // Update the data-theme attribute of our html tag
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
      // Update our state
      this.setState({
        // Ensure our switch is off if we change to light theme
        checked: false
      });
    }
  };

  


  render() {
    const { launches } = this.state;
    
    console.log(launches.launches) 
 

    return (
      <div className="container clearfix">

      <nav className="navbar">
        <h1 className="navbar-brand font-weight-bolder m-0">NEXT LAUNCH</h1>

        <label className="switch float-right p-2 m-2">
            {/* checked attribute is used to determine the state of 
              checkbox
              ----------------------------------------------
              The onChange attribute will toggle our theme change
            */}
            <input
              type="checkbox"
              // checked={this.state.checked}
              defaultChecked={this.state.checked}
              onChange={() => this.toggleThemeChange()}
            />
            <span className="slider round" />
          </label>
      </nav>
        


        {launches.map((launch) => {

        const endDate = new Date(launch.net);
        const countdownRenderer = ({ days, hrs, mins, secs, isCompleted }) => {
        return isCompleted
            ? 'Liftoff!'
            : <Fragment>{days > 0 && `${days} days `}{hrs} hours {doubleDigit(mins)} minutes {doubleDigit(secs)} seconds</Fragment>
      }
        console.log(endDate);
          
        return(
        <div className="card mb-5 shadow-sm rounded" key={launch.id}>
          
          <div className="card-body">
            <h3 className="card-title font-weight-bold">{launch.name}</h3>
            <h5 className="card-subtitle mb-3 text-muted">{launch.lsp.name}</h5>
            {launch.missions.map((mission) => (
              <p className="card-text mt-4 mb-4" key={mission.id}>{mission.description}</p>
            ))}

            <h6>{launch.net}</h6>
            

            { launch.netstamp != 0 ? <h6><Countdown className="custom-counter" endDate={endDate}>
              {({ days, hrs, mins, secs }) => {
                return `${days} days ${hrs}h ${doubleDigit(mins)}m ${doubleDigit(secs)}s`;
              }}
            </Countdown></h6> : <h6>Launch Time TBD</h6>}

            { launch.vidURLs != 0 ? <a href={launch.vidURLs} target="_blank" className="btn btn-primary mt-3">View Stream</a> : <a className="btn btn-outline-secondary mt-3 disabled">Stream Unavailable</a>}

            
          </div>
        </div>
        )}
        )}
      </div>
    );
  }
}
export default App;
