import React from 'react';


class ResultPanel extends React.Component {
   constructor(props) {
    super(props);
  }

  render() {
    let staffEntries = this.props.entries;

    let listItems = staffEntries.map((staffMember) =>
      <li>{staffMember.name} - {staffMember.total} - {staffMember.hour} Hours -  {staffMember.percentOfPool}% of Tips</li>
      // we need to expand this to cover the rest of the results
    ); 
 
    return (
      <ul className="theList">
          {listItems}
      </ul>
    );
  }
}

export default ResultPanel;
