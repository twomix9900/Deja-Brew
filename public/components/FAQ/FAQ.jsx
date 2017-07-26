import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';


export default class FAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }



    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <Paper style={style} zDepth={4}>
                            <h1><u>Frequently Asked Questions</u></h1>
                            <h3>Can I use this to update my friends?</h3>
                            <h4><i>Maybe, I dunno, I just work here</i></h4>
                            <h3>Is this real life?</h3>
                            <h4><i>We're all in the Matrix</i></h4>
                            <h3>Who won the 2009 Superbowl?</h3>
                            <h4><i>The Green Bay Packers</i></h4>
                            <h3>What does mine say?</h3>
                            <h4><i>Dude, what does mine say?</i></h4>
                            <h3>What do people do with beer?</h3>
                            <h4><i>Apparently they drink it</i></h4>
                            <h3>From the windows to the wall</h3>
                            <h4><i>Til the sweat drops down and falls</i></h4>
                            <h3>What's the proper alcohol drinking etiquette?</h3>
                            <h4><i>Beer before liquor, never been sicker</i></h4>
                        </Paper>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }


}
const style = {
    height: 'auto',
    width: 1200,
    margin: 'auto',
    textAlign: 'left',
    display: 'inline-block',
    backgroundColor: '#E0E0E0'
};