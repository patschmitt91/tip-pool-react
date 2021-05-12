import React from 'react';
import './staffList.css';
import Button from '@material-ui/core/Button';

class StaffMember extends React.Component {
   constructor(props) {
    super(props);

    this.createStaffMember = this.createStaffMember.bind(this);
  }

  delete(key) {
    this.props.delete(key);
  }

  createStaffMember(staff) {
    return <div><li>Name: {staff.name} - Hours: {staff.hour} <Button variant="contained" color="primary" onClick={() => this.delete(staff.key)} key={staff.key}>X</Button></li></div>
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


