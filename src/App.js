import './App.css';
import { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Admin from './components/admin/Admin';
import Guest from './components/guest/Guest';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAdmin: false
    }
  }

  affterLogin = (isAdmin) => {
    this.setState({
      isAdmin: isAdmin
    })
  }

  render() {
    var {isAdmin} = this.state
    var element = isAdmin ? <Admin affterLogin={this.affterLogin}/> : <Guest affterLogin={this.affterLogin}/>
    return (
      <div>
        <Router>
              {element}
        </Router>
      </div>
    );
  }
}

export default App;