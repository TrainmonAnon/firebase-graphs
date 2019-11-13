import React from 'react';
import Plot from 'react-plotly.js';
import firebase from 'firebase';

var data;
var users = [];
var totalTimePlayed = [];
var sessionCount = [];
var highScore = [];

class GameGraphs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users:[],
            totalTimePlayed:[],
            sessionCount:[],
            highScore:[],
            authorized: false,
        }
        var ref = props.database.ref("Summary").child(props.gameName);
        ref.once('value').then(snapshot => {
            data = snapshot.val();
            Object.keys(data).forEach((user, index) => {
                users[index] = user;
                totalTimePlayed[index] = data[user]["Total Time Played"];
                sessionCount[index] = data[user]["Session Count"];
                highScore[index] = data[user]["High Score"];
            });
            this.setState({
                users,
                totalTimePlayed,
                sessionCount,
                highScore,
            });
        });
    }
    render(){
        return (
            <div>
                <Plot data={ [{
                    x: this.state.users,
                    y: this.state.totalTimePlayed,
                    type: 'bar'
                }]}
                layout={ {
                    title: this.props.gameName + ' Total Time Played',
                    xaxis: {title: 'Player'},
                    yaxis: {title: 'Time Played (In Seconds)'},
                } }/>
                <Plot data={ [{
                    x: this.state.users,
                    y: this.state.sessionCount,
                    type: 'bar'
                }]}
                layout={ {
                    title: this.props.gameName + ' SessionCount',
                    xaxis: {title: 'Player'},
                    yaxis: {title: 'Times Played'},
                } }/>
            </div>
        );
    }
}

export default GameGraphs;
