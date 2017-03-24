import React, { Component } from 'react';
import styles from './app-content.scss'; // eslint-disable-line no-unused-vars

class AppContent extends Component {

  render() {
    return (
      <main className="app">
        { this.props.children }
      </main>
    );
  }
}

AppContent.propTypes = {
  children: React.PropTypes.array
}

export default AppContent;
