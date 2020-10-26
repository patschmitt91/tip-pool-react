import React from 'react';
import './App.css';
import Staff from './Staff.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tipAmount: '',
      eventLength: ''
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
      } else {
        console.log('empty as fuck');
      }
    }


    handleStaffChange(staff) {
      this.setState({staff: staff});
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

      console.log(staffList);
    }

  render() {
    return (
      <div>
      <h1>Tip Pool v2</h1>
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

       <h1>Tip Amount: {this.state.tipAmount}</h1>
       <h1>Event Length: {this.state.eventLength}</h1>

       <Staff onStaffChange={this.handleStaffChange} />

       <button onClick={this.calculateTotal}>Calculate</button>
       </div>
    );
  }
}

export default App;
