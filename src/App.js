import React from 'react';
import './App.css';
import Staff from './components/staff-list/Staff.js';
import ResultPanel from './components/result-panel/ResultPanel.js';

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

      // basic mean
      let avgPerStaff = tipAmount / numOfPeople;

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
    if (this.state.calculated == true) {
      results = <ResultPanel entries={this.state.staff} />
    } else {
     
    }

    return (
      <div>
      <h1>Tip Pool v2</h1>
      <div className="tipInput">
         <label>
            Tip Amount:
            <input
              name="tipAmount"
              type="text"
              onChange={this.handleInputChange} />
          </label>

          <label>
            Event Length:
            <input
              name="eventLength"
              type="text"
              onChange={this.handleInputChange} />
          </label>
        </div>

      <div className="tipInfo">
       <h2>Tip Amount: {this.state.tipAmount}</h2>
       <h2>Event Length: {this.state.eventLength}</h2>
      </div>

       <Staff onStaffChange={this.handleStaffChange} />

      <button id="calculateTotal" disabled={!this.state.staff} onClick={this.calculateTotal}>Calculate</button>

              {results}
              </div>
    );
  }
}

export default App;
