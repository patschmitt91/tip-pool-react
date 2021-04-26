import React from 'react';
import StaffMember from './StaffMember.js';
import './staffList.css';

class Staff extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      staff: []
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e) {
    if (this._inputName.value !== "") {
      var newItem = {
        name: this._inputName.value,
        hour: this._inputHour.value,
        key: Date.now()
      };

      let newState = this.state.staff.concat(newItem);
   
      this.setState((prevState) => {
        return { 
          staff: prevState.staff.concat(newItem) 
        };
      });
     
      this._inputName.value = "";
      this._inputHour.value = "";
      this.props.onStaffChange(newState);
    }     
    //console.log(this.state.staff);  
    e.preventDefault();
  }

  deleteItem(key) {
  var filteredStaff = this.state.staff.filter(function (staff) {
    return (staff.key !== key);
  });
 
  this.setState({
    staff: filteredStaff
  });

  this.props.onStaffChange(filteredStaff);

}


  render() {

    return (
      <div className="staffContainer">
      <h6>Staff List</h6>
      
      <div className="header">
          <form onSubmit={this.addItem}>
            <input ref={(a) => this._inputName = a} placeholder="enter task" />
             <input ref={(a) => this._inputHour = a} placeholder="enter hours worked" />
            <button type="submit">add</button>
          </form>
        </div>

        <StaffMember entries={this.state.staff}
                     delete={this.deleteItem}/>
       
      </div>
    );
  }
}

export default Staff;