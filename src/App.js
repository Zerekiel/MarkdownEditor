import React, { Component } from 'react';
import './App.css';

import { sampleText } from './sample.js';
import marked from 'marked';

class App extends Component {
  state = {
    text: sampleText
  }

  //récupération des infos stockées en local au refresh de la page
  componentDidMount () {
    const text = localStorage.getItem('text');
    if (text) {
      this.setState({ text: text })
    } else {
      this.setState({ text: sampleText });
    }
  }

  //stockage local à l'update du component
  componentDidUpdate () {
    const { text } = this.state;
    localStorage.setItem('text', text);
  }

  handleChange = (event) => {
    const current = event.target.value;
    this.setState({ text : current });
  }

  handleRender = (text) => {
    return (marked(text, { sanitize: true }));
  }

  render() {
    return (
      <div className="general">
        <h1>Markdown Editor</h1>
        <div className="main">
          <div className="gauche">
            <textarea
              onChange={this.handleChange}
              value={this.state.text}
              rows="53"
              cols="86"
            />
          </div>
          <div
            className="droite"
            dangerouslySetInnerHTML={{
              __html: this.handleRender(this.state.text)
            }}
          />
        </div>
      </div>
    );
  }
}


export default App;
