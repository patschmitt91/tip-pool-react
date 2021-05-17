import React from 'react';
import StaffMember from './StaffMember.js';
import './staffList.css';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';




class Staff extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      staff: [],
      input: {
        hour: '',
        name: ''
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e) {

      let newItem = {
        name: this.state.name,
        hour: this.state.hour,
        key: Date.now()
      };

      let newState = this.state.staff.concat(newItem);
   
      this.setState((prevState) => {
        return { 
          staff: prevState.staff.concat(newItem) 
          }
      });
    console.log(this.state.staff);
    this.myFormRef.reset();
    // refocus name input
    document.getElementById("staffName").focus();
    this.props.onStaffChange(newState);


    e.preventDefault();
  }

  deleteItem(key) {
    let filteredStaff = this.state.staff.filter(function (staff) {
      return (staff.key !== key);
    });

    this.setState({
      staff: filteredStaff
    });

    this.props.onStaffChange(filteredStaff);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

  }



  render() {

    return (
        <Container>
          <div className="header">
            <form onSubmit={this.addItem} ref={(el) => this.myFormRef = el}>
              <TextField label="Name" name="name" id="staffName" onChange={this.handleInputChange} required />
              <TextField label="Hour" name="hour" onChange={this.handleInputChange} required />
              <Button variant="contained" color="primary" type="submit">add</Button>
            </form>
          </div>

        <StaffMember
            entries={this.state.staff}
            delete={this.deleteItem}
        />
        </Container>
    );
  }
}

export default Staff;