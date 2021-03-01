import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Drawer from 'material-ui/Drawer';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import image1 from './image1.jpg';
import image2 from './image2.jpg';

var images = [{
		img: image1,
		caption1: "",
		caption2: ""
	},
	{
		img: image2,
		caption1: "",
		caption2: ""
	}
	];
class App extends Component {
	constructor() {
		super();
		this.state = {
			imgIndex: 0,
			drawerOpen: false,
			dialogOpen: false,
			editedValue: null,
			editableCaption: 0,
		};
		this.ourCanvas = null;
	}
	valueChange = (event, value) => {
		this.setState ({
			editedValue: value
		}); 
	}
	// Renders the next/previous image
	changeImg = (event, value) => {
		this.setState({
			imgIndex: this.state.imgIndex+(value==="next"?1:-1),
		}, function() {
			this.updateCanvas(this.state);
		}.bind(this)
		);
	};
	// Opens or closes the drawer
	toggleDrawer = () => {
		this.setState(
			(prevState, props) => ({
				drawerOpen: !prevState.drawerOpen
			})
		);
	}
	// Stores the caption which is being edited and opens the dialog
	showDialog = (value) => {
		this.setState({
			dialogOpen: true,
			editableCaption: (value==="one"?1:2),
		});
	}

	// Updates and saves the caption and closes dialog
	handleClose = (commit) => {
		if(this.state.editableCaption === 1 && commit) {
			images[this.state.imgIndex].caption1= this.state.editedValue;
			this.updateCanvas();
		}
		else if (commit){
			images[this.state.imgIndex].caption2= this.state.editedValue;
			this.updateCanvas();
		}
		this.setState({
			dialogOpen: false,
			editedValue: ""
		});
	}
	componentDidMount() {
        this.updateCanvas();
    }
	updateCanvas=() => {
		var ctx = this.ourCanvas.getContext('2d');
		const image = new Image();
		image.src = images[this.state.imgIndex].img;

		image.onload = () => {
			ctx.drawImage(image, 0, 0, this.ourCanvas.width, this.ourCanvas.height);
			ctx.font = "25px Arial";
			ctx.fillStyle = "white";
			ctx.fillText(images[this.state.imgIndex].caption1, 10, 50);
			ctx.textBaseline = "bottom";
			ctx.fillText(images[this.state.imgIndex].caption2, 10, 200);
			ctx.textBaseline = "top";
		}
	}
	render() {
		const actions = [
			<FlatButton label="Cancel"
			primary={false}
			onClick={() => {this.handleClose(false);}}
			/>,
			<FlatButton label="Add"
			primary={true}
			onClick={() => {this.handleClose(true);}}
			/>
		];
		const menu = <IconMenu 
						iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
						onChange={this.changeImg}>
						<MenuItem value="next" disabled={this.state.imgIndex === images.length-1} primaryText="Next" />
						<MenuItem value="previous" disabled={this.state.imgIndex === 0} primaryText="Previous" />
					</IconMenu>
		
		return (
			
			<MuiThemeProvider>
				<div className="App">
					<AppBar title="Exercise 5.2" iconElementRight={menu}></AppBar>
					<Drawer open={this.state.drawerOpen}>
						<MenuItem onClick={() => {this.showDialog("one");}} >Add top caption</MenuItem>
						<MenuItem onClick={() => {this.showDialog("two");}} >Add bottom caption</MenuItem>
					</Drawer>
					<Dialog
						title="Add caption"
						actions={actions}
						open={this.state.dialogOpen}
					>
						<TextField 
						 id="dialogField" 
						 disabled={false} 
						 onChange={this.valueChange} 
						 />
					</Dialog>
					<canvas 
						ref={(el) => {this.ourCanvas = el;}}
						width={450} 
						height={300}
						onClick = {this.toggleDrawer}
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
