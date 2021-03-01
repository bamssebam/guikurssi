import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Population from './Population';

const pop = new Population("UK");
var peeps = new Array(3);

for(let i=0; i<3; i++) {
	peeps[i] = pop.nextPerson();
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			personIndex: 0,
			dialogOpen: false,
			editedFn: null,
			editedLn: null,
			editedBt: null,
			editedDate: null
		};
	}

	navigate = (event, value) => {
		this.setState({
			personIndex: this.state.personIndex+(value==="next"?1:-1),
		});
	};
	
	openDialog() {
		this.setState({
			dialogOpen: true,
		});
	};

	// Saves the edited fields
	valueChange = (event) => {
		if (event.target.id === "fName") {
			this.setState({
                editedFn: event.target.value,
			});
		}
		else if (event.target.id === "lName") {
			this.setState({
                editedLn: event.target.value,
			});
		}
		else if (event.target.id === "bTown") {
			this.setState({
				editedBt: event.target.value,
			});
		}
		else {
			this.setState({
				editedDate: event.target.value,
			});
        } 		
	}
  // Saves the changes made or cancels the editing and closes the dialog
  closeDialog = (storeValue) => {
		if (storeValue) {
			if(this.state.editedFn !== null) {
				peeps[this.state.personIndex].firstName = this.state.editedFn;
			}
			if (this.state.editedLn !== null) {
				peeps[this.state.personIndex].lastName = this.state.editedLn;
            }
            if (this.state.editedBt !== null) {
                peeps[this.state.personIndex].birthTown = this.state.editedBt;
            }
            if (this.state.editedDate !== null) {
                peeps[this.state.personIndex].birthYear = this.state.editedDate;
            }
        }
		this.setState({
			dialogOpen: false,
            editedFn: null,
			editedLn: null,
			editedBt: null,
			editedDate: null,
		});
	};
	
	render() {
		const actions = [
			<FlatButton
                label="Cancel"
                primary={true}
                onClick={() => {this.closeDialog(false);}}
			/>,
			<FlatButton
                label="OK"
                primary={true}
                keyboardFocused={true}
                onClick={() => {this.closeDialog(true);}}
			/>,
		];
		const menu = <IconMenu 
						iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
						anchorOrigin={{horizontal: 'left', vertical: 'top'}}
						targetOrigin={{horizontal: 'left', vertical: 'top'}}
						onChange={this.navigate}>
						<MenuItem value="next" disabled={this.state.personIndex === peeps.length-1} primaryText="Next" />
						<MenuItem value="previous"  disabled={this.state.personIndex === 0} primaryText="Previous" />
					</IconMenu>
		
		return (
			
			<MuiThemeProvider>
				<div className="App">
					<AppBar title="Exercise 6.1" iconElementRight={menu}></AppBar>
					<Paper style={{width: 400, display: 'inline-block',}}>{this.props.title}
						<TextField 
							disabled={true} 
							value={peeps[this.state.personIndex].firstName + " " + peeps[this.state.personIndex].lastName} 
							id="displayField" 
                        />
						<RaisedButton onClick={() => {this.openDialog()}} label="Edit..." />
					</Paper>
					
					<Dialog
                        style={{width: 430}}
						title="Edit info"
						actions={actions}
						modal={true}
						open={this.state.dialogOpen}
						onRequestClose={this.handleClose}
					>
						First name:
						<TextField 
                            id="fName" 
                            value={this.state.editedFn!==null ? this.state.editedFn : peeps[this.state.personIndex].firstName} 
                            onChange={(e) => {this.valueChange(e)}} 
						/>
                         Last name:
						<TextField 
                            id="lName" 
                            value={this.state.editedLn!==null ? this.state.editedLn : peeps[this.state.personIndex].lastName}
                            onChange={(e) => {this.valueChange(e)}} 
						/>
						Birth town:
						<TextField 
                            id="bTown" 
                            value={this.state.editedBt!==null ? this.state.editedBt : peeps[this.state.personIndex].birthTown}
                            onChange={(e) => {this.valueChange(e)}} 
						/>
						Birth year:
						<TextField 
						    id="bYear" 
                            type = "number"
                            value={this.state.editedDate!==null ? this.state.editedDate : peeps[this.state.personIndex].birthYear}
                            onChange={(e) => {this.valueChange(e)}} 
						/>
					</Dialog>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
