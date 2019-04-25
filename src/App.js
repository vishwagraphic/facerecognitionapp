import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density : {
        enable : true,
        value_area: 800
      }
    } 
  }
}

const initialState = {
  input: '',
  imageUrl : '',
  box : {},
  route : 'signin',
  isSignedIn : false,
  user: {
    id: '',
    name : '',
    email: '',
    entries : 0,
    joined : ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl : '',
      box : {},
      route : localStorage.getItem('route') || 'signin',
      isSignedIn : localStorage.getItem('route') ? true : false,
      user: {
        id: localStorage.getItem('id') || '',
        name : localStorage.getItem('name') || '',
        email: '',
        entries : localStorage.getItem('entries') || 0,
        joined : ''
      }
    }
  }
  loadUser = (userData) => {
    this.setState({user : {
      id: userData.id,
      name : userData.name,
      email: userData.email,
      entries : userData.entries,
      joined : userData.joined
    }})
  }

  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    let image = document.getElementById('inputImage');
    let width = Number(image.width);
    let height = Number(image.height);
    console.log(clarifaiFace)
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
    this.setState({box : box})
    console.log(this.state.box);
  }
  
  onInputChange = (event) => {
    this.setState({input : event.target.value})
  }
  onButtonSubmit = () => {
    this.setState({imageUrl : this.state.input})
    fetch('https://salty-plains-83584.herokuapp.com/imageurl', {
      method : 'post',
      headers: {'Content-Type' : 'application/json'},
      body : JSON.stringify({
        input : this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
        if(response){
          console.log(this.state.user.id);
          fetch('https://salty-plains-83584.herokuapp.com/image', {
            method : 'put',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
              this.setState(Object.assign(this.state.user, {entries : count}));
              localStorage.setItem('entries', count);
          })
          .catch(err => console.log(err));
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      } 
    )
    .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
      localStorage.clear();
    }else if(route === 'home'){
      this.setState({isSignedIn : true})
      localStorage.setItem('route', 'home');
      localStorage.setItem('name' , this.state.user.name);
      localStorage.setItem('entries' , this.state.user.entries)
      localStorage.setItem('id' , this.state.user.id)
    }
    this.setState({route : route})
    console.log(this.state.route)
  }
  render() {
    return (
      <div className="App">
      <Particles className='particles' params={particlesOptions}  />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange= {this.onRouteChange}/>
      {
        this.state.route === 'home' ?
        <div>
          <Logo />
          {this.state.user.name}
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange}  onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} /> 
        </div>
        : (
          this.state.route === 'signin' 
          ? <Signin loadUser={this.loadUser} onRouteChange= {this.onRouteChange} />
          : <Register loadUser={this.loadUser} onRouteChange= {this.onRouteChange}/>
        )

      }
      </div>
    );
  }
}

export default App;
