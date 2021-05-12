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
      eventLength: '',
      calculated: ''
    };

 this.handleStaffChange = this.handleStaffChange.bind(this);
 this.handleInputChange = this.handleInputChange.bind(this);
 this.calculateTotal = this.calculateTotal.bind(this);

  }

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
        console.log('empty as fuck');
      }
    }


    handleStaffChange(staff) {
      this.setState({staff: staff}, () => this.calculateTotal());
    }

    calculateTotal() {

      let tipAmount = this.state.tipAmount;
      let eventLength = parseInt(this.state.eventLength);
      let staffList = this.state.staff;
      let numOfPeople = staffList.length;

      // Calculate total number of hours worked
      let hourTotal = 0;
      for (let i = 0; i < numOfPeople; i++) {
        hourTotal += parseInt(staffList[i].hour);
      }

      console.log(hourTotal);
      // Will need to calculate each member's weight based on percentage of event worked
      for (let i = 0; i < numOfPeople; i++) {
        let hoursWorked = parseInt(staffList[i].hour);
        let percentOfEventWorked = hoursWorked / eventLength;
        staffList[i].percentEventWorked = percentOfEventWorked * 100;
        staffList[i].total = (tipAmount / hourTotal) * staffList[i].hour;
      }

      this.setState({staff: staffList});
      this.setState({calculated: true});
      console.log(this.state);
      // Return a results component that we pass state into

    }

  render() {
    let results;
    if (this.state.calculated === true) {
      results = <ResultPanel entries={this.state.staff} />
    } else {
     
    }

    return (
      <div>
      <h1>Tip Pool v2</h1>
      <div style={{display: 'flex', justifyContent: 'center'}} className="tipInput">
          <TextField
              name="tipAmount"
              type="text"
              label="Tip Total"
              onChange={this.handleInputChange}
          />

          <TextField
              name="eventLength"
              type="text"
              label="Event Length"
              onChange={this.handleInputChange}
          />

      </div>


       <Staff onStaffChange={this.handleStaffChange} />

      <Button variant="contained" color="primary" id="calculateTotal" disabled={!this.state.staff} onClick={this.calculateTotal}>Calculate</Button>

              {results}
              </div>
    );
  }
}

export default App;
