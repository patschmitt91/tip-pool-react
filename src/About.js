import React from 'react';
import './About.css';


class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <h1>ABOUT</h1>
        <p>Tip Pool exists to make pooling tips easier.</p>
        <hr/>
        <p>Features to come are - Point system and percent tip out types</p>
       </div>
    );
  }
}

export default About;
