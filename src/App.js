import React from 'react';
//import Plot from 'react-plotly.js';
import firebase from 'firebase';
import './App.css';
import GameGraphs from './GameGraphs.jsx';
import PlayerGraphs from './PlayerGraphs.jsx';
require("dotenv").config();

var config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET
};

firebase.initializeApp(config);

class App extends React.Component {
    render(){
        return (
            <div>
                <GameGraphs gameName="See Explorer" database={firebase.database()}/>
                <PlayerGraphs database={firebase.database()}/>
            </div>
        );
    }
    
}

export default App;
