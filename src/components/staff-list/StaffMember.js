import React from 'react';
import './staffList.css';

class StaffMember extends React.Component {
   constructor(props) {
    super(props);

    this.createStaffMember = this.createStaffMember.bind(this);
  }

  delete(key) {
    this.props.delete(key);
  }

  createStaffMember(staff) {
    return <div><li>Name: {staff.name} - Hours: {staff.hour} <button onClick={() => this.delete(staff.key)} key={staff.key}>X</button></li></div>
  }


  render() {
    var staffEntries = this.props.entries;
    var listItems = staffEntries.map(this.createStaffMember);
 
    return (
      <ul className="theList">
          {listItems}
      </ul>
    );
  }
};

export default StaffMember;