import React from 'react';


class ResultPanel extends React.Component {
   constructor(props) {
    super(props);
  }

  render() {
    var staffEntries = this.props.entries;
    var listItems = staffEntries.map((staffMember) =>
      <li>{staffMember.name} - {staffMember.total}</li>
      // we need to expand this to cover the rest of the results
    ); 
 
    return (
      <ul className="theList">
          {listItems}
      </ul>
    );
  }
};

export default ResultPanel;