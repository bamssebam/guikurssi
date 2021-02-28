import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class App extends Component {
	constructor() {
        super();
		this.state = {
            amount: 1,
            currency: "dollar",
            result: "£0.77"
        };
    }
    // updates result after change of amount in currency
	handleChange = (event, value) => {
		this.setState({
            amount: value
        }, function() {
            this.convertCurrency(this.state);
        }.bind(this)
        );       
    };
    // sets direction of conversion
    changeCurrency = (event, value) => {
        this.setState({
            currency: value,
            checked: true,
        }, function() {
            this.convertCurrency(this.state);
        }.bind(this)
        );
    };
    // does the math
    convertCurrency = () => {
        let res = 0;
        // dollar to pound
        if (this.state.currency === "dollar") {
            res = this.state.amount * 0.773069356;
            res =  "£" + res.toFixed(2);
        }
        // pound to dollar
        else {
            res = this.state.amount * 1.293545;
            res = "$" + res.toFixed(2);
        }
        this.setState ({
            result: res
        });
    };
    // returns date & time in suitable format
    getDateTime = () => {
        let dateTime;
        let date = new Date();
        if (this.state.currency === "dollar") {
            dateTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute:'numeric', second:'numeric', timeZone: 'America/New_York' }).format(date);
        }
        else {
            dateTime = new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute:'numeric', second:'numeric', timeZone: 'Europe/London'}).format(date);            
        }
        return dateTime;
    };
    //returns appropriate sign of currency
    getSign = () => {
        if (this.state.currency === "dollar") 
            return "$";
        else
            return "£"
    };

	render() {
		const menu = <IconMenu 
						iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
						anchorOrigin={{horizontal: 'left', vertical: 'top'}}
						targetOrigin={{horizontal: 'left', vertical: 'top'}}>
                    </IconMenu>			
        
		return (
			<MuiThemeProvider>
				<div className="App">
					<AppBar title="Exercise 7.2" iconElementRight={menu} ></AppBar>
					<Paper style={{width: 220, padding: 20, textAlign: 'left', display:'inline-block'}}>
                        Exchange rate at:
                        <div> 
                            {this.getDateTime()}
                        </div>
                        
                        <div>
                            {this.getSign()}
                            <TextField 
                                style={{width:40}}
                                id="amount" 
                                type="number" 
                                value={this.state.amount} 
                                onChange = {this.handleChange} 
                            />
                            = {this.state.result}
						</div>
                        
						<div style={{width: 150, margin: 'auto', padding: 15, borderStyle: "solid", borderRadius:15}}>
                            Direction:
                            <RadioButtonGroup title= "direction" defaultSelected="dollar">
                                <RadioButton label="$ to £" value="dollar" onClick={(e) => this.changeCurrency(e, "dollar")} />
                                <RadioButton label="£ to $" value="pound" onClick={(e) => this.changeCurrency(e, "pound")} />                       
                            </RadioButtonGroup>
                        </div>							                    
        			</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
