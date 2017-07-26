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
                            <div className='container'>
                                <h1><u>Frequently Asked Questions</u></h1>
                                <h3>Can I use this to update my friends?</h3>
                                <h4><i>Yes you can send this info to your friends</i></h4>
                                <h3>What information does this tell me about the brewery?</h3>
                                <h4><i>You get a list of what they carry and where it's located</i></h4>
                                <h3>Am i able to save time with this app?</h3>
                                <h4><i>We believe so! it should save you that precious time so that you're ready to get out there!</i></h4>
                                <h3>What information does this tell me about my beer selection?</h3>
                                <h4><i>We give you a description of the beer and how much alcohol is contained</i></h4>
                                <h3>What do people do with beer?</h3>
                                <h4><i>Apparently they drink it</i></h4>
                                <h3>Can I use this with any place that serves alcohol?</h3>
                                <h4><i>Not quite, but were working to add those places too!</i></h4>
                                <h3>What's the proper alcohol drinking etiquette?</h3>
                                <h4><i>Beer before liquor, never been sicker</i></h4>
                            </div>
                        </Paper>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }


}
const style = {
    height: 'auto',
    width: 1450,
    margin: 'auto',
    textAlign: 'center',
    display: 'inline-block',
    color: 'white',
    backgroundColor: '#00B8D4'
};