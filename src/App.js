//import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import InstagramLogin from 'react-instagram-login';
import Profile from  './profile.js';
import Post from './post.js'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from './home.js';

function App() {
  const [data , setData ] = useState([]);
  const [listMedia , setMedia] = useState([]);

  function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }


  const ResponseInstagram = async (response) => {

    if(response){
     const rawData =  await fetch('https://api.instagram.com/oauth/access_token', {
        method: 'post',
        body:getFormData( {client_id:'2407132766257141',client_secret:'214000a0bb0c40cc9648de01e82b46af',grant_type:'authorization_code',redirect_uri:'https://localhost:3000/', code:response})
     }); 
     const data = await rawData.json();
     Login(data);
     Media();
        }
    else{
      console.log("error token");
    }  
}
async function Login (data ){
if(data){
  const rawProfile = await fetch('https://graph.instagram.com/me?fields=id,username&access_token='+data.access_token, {
  method : 'get', });
  var profile = await rawProfile.json();
  setData(profile);
  Media(profile, data);
  }
  else{
    console.log("data vuoto")
  }
  
};
async function Media (data, token){
    if(data){
      const rawMedia = await fetch('https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token='+token.access_token,
      { method:'get',});
      const media = await rawMedia.json(); 
      setMedia(Object.entries(media.data));
  }
};



  return (
    <div className="App">
      <header className="App-header">

            <InstagramLogin
              clientId="2407132766257141"
              buttonText="Login"
              onSuccess={ResponseInstagram}
              onFailure={ResponseInstagram}
              scope = {"user_profile,user_media"}
              redirect_uri = { " https://localhost:3000/"}
            />
            {listMedia.map((media) => (
              <img src={media[1].media_url} key = {media[1].id} width = '10%'></img>
            )
            )
            }
           <Router>
			       <div>
             <Link to="/profile" params={{ username: data.username }}>profile</Link>
			      	<Route exact path="/profile" component={Profile}/>
              <Profile username= {data.username}></Profile>

			     </div>
			    </Router>
           
         
      </header>
    </div>
  );
}

export default App;
