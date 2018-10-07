import React, { Component } from 'react';
import ReactLoader from 'react-loaders';

class Loader extends Component {
  render() {
    if (!this.props.active) {
      return <div/>;
    }

    return (
      <div className="progress-container">
        <ReactLoader type="square-spin"/>
      </div>
    );
  }
}

export default Loader;
