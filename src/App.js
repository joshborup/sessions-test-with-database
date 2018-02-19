import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state ={
      username:'',
      password:'',
      userOject:[]
    }
  }
  render() {
    var cool = this.state.userOject.map((elem,i) =>{
      return (
      <ul>
        <li>{elem.username}</li>
        <li>{elem.views}</li>
        <li>{elem.userId}</li>
      </ul>
      )
    })
    return (
      <div className="App">
      {cool}
      name: <input onChange={(e) => this.setState({username: e.target.value})} value={this.state.username}></input>
       password: <input onChange={(e) => this.setState({password: e.target.value})} value={this.state.password}></input>
       <button onClick={() => axios.post('http://localhost:4000/api/josh', {username: this.state.username, password: this.state.password}).then(resp => {
         console.log(resp.data);
         this.setState({userOject: resp.data})
      
      })}>submit</button>
      </div>
    );
  }
}

export default App;
