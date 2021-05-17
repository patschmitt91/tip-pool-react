import React from 'react';
import './History.css';


class History extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <h1>History</h1>
        <p>This will come later on because still building backend -</p>
        <ul>
          <li>Analytics on all tips entered while logged in.</li>
          <li>Record keeping for past shift tips.</li>
          <li>Potentially build api endpoints for other apps to plug into for tip tracking.</li>
        </ul>

       </div>
    );
  }
}

export default History;