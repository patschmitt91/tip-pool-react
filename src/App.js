import React from 'react';
import './App.css';
import Staff from './components/staff-list/Staff.js';
import ResultPanel from './components/result-panel/ResultPanel.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tipAmount: '',
      calculated: '',
      keyCounter: 0
    };

    // preserve the initial state in a new object
    this.baseState = this.state;

    this.handleStaffChange = this.handleStaffChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.resetAll = this.resetAll.bind(this);
  }

    // Handles Text Field state change
    handleInputChange(event) {
      const target = event.target;
      const name = target.name;

      this.setState({
        [name]: event.target.value
      });

      if (this.state.staff) {
        this.calculateTotal();
        console.log(this.state.staff)
      } else {
        console.log('empty');
      }
    }

    handleStaffChange(staff) {
      this.setState({staff: staff}, () => this.calculateTotal());
    }

    resetAll = () => {
     // Reset app component state
      this.setState(this.baseState);
      // create counter to force child component rerender upon key change
      let newCounter = Math.random();
      this.setState({ keyCounter: newCounter })
    }

    calculateTotal() {
      let tipAmount = this.state.tipAmount;
      let staffList = this.state.staff;
      let numOfPeople = staffList.length;

      // Counter to calculate total number of hours worked
      let hourTotal = 0;
      for (let i = 0; i < numOfPeople; i++) {
        hourTotal += parseInt(staffList[i].hour);
      }

      // Calculate each member's weight based on percentage of event worked
      for (let i = 0; i < numOfPeople; i++) {
        staffList[i].total = (tipAmount / hourTotal) * staffList[i].hour;
        staffList[i].percentOfPool = (staffList[i].total / tipAmount) * 100;
        // Format to two decimal places
        staffList[i].total = parseFloat(staffList[i].total).toFixed(2);
        staffList[i].percentOfPool = parseFloat(staffList[i].percentOfPool).toFixed(2);
      }

      // Set to state before passing to result component
      this.setState({staff: staffList});
      this.setState({calculated: true});
    }

  render() {
    let results;
    if (this.state.calculated === true) {
      results = <ResultPanel entries={this.state.staff} />
    } else {
     
    }

    return (
      <div>
        <h1>Tip Pool</h1>

        <div style={{display: 'flex', justifyContent: 'center'}} className="tipInput">
            <TextField
                name="tipAmount"
                type="text"
                label="Tip Total"
                value={this.state.tipAmount}
                onChange={this.handleInputChange}
            />

        </div>

         <Staff id="staffComponent" key={this.state.keyCounter} onStaffChange={this.handleStaffChange} />

          <Button variant="contained" color="primary" id="calculateTotal" disabled={!this.state.staff} onClick={this.calculateTotal}>Calculate</Button>
          <Button variant="contained" color="primary" id="resetBtn" disabled={!this.state.staff} onClick={this.resetAll}>Reset</Button>

          {results}
      </div>
    );
  }
}

export default App;
