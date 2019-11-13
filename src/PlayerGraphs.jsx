import React from 'react';
import Plot from 'react-plotly.js';
import firebase from 'firebase';

var data;

class PlayerGraphs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            authorized: false,
            data:[],
        }
        var ref = props.database.ref("Players");
        ref.once('value').then(snapshot => {
            data = snapshot.val();
            this.setState({
                data,
            });
        });
    }
    render(){
        var data = [];
        var graphs = [];
        Object.keys(this.state.data).forEach(user => {
            data[user] = [];
            graphs[user] = [];
            Object.keys(this.state.data[user]).forEach(game => {
                data[user][game] = {
                    totalTimePlayed:[],
                    eventName:[],
                    sessionNumber:[],
                };
                Object.keys(this.state.data[user][game]).forEach((log, count) => {
                    data[user][game].totalTimePlayed[count] = this.state.data[user][game][log]["Total Time Played"];
                    data[user][game].eventName[count] = this.state.data[user][game][log]["Event"];
                    data[user][game].sessionNumber[count] = this.state.data[user][game][log]["Session Number"];
                });
                graphs[user][game] = <Plot data={ [{
                    x: data[user][game].totalTimePlayed,
                    y: data[user][game].sessionNumber,
                    mode: 'markers',
                    type: 'scatter'
                }]}
                layout={ {
                    title: this.props.gameName + ' Total Time Played',
                    xaxis: {title: 'Time Played'},
                    yaxis: {title: 'Event'},
                } }/>;
            });
        });
        console.log(graphs);
        console.log(Object.keys(graphs))
        console.log(graphs.Bob && graphs.Bob["See Explorer"]);
        return (
            <div>
                {Object.keys(graphs).map(user => <div key={"User:"+ user}>{Object.keys(graphs[user]).map(game => <div key={"Game:"+ game}>{graphs[user][game]}</div>)}</div>)}
            </div>
        );
    }
}

export default PlayerGraphs;
