// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component } from 'react';
import mammoth from 'mammoth/mammoth.browser.min.js';

import Styles from '../../styles/docx';
import Loading from '../Loading';
import Error from '../error'

export default class extends Component {
	state = {
		error : false
	}
	
  componentDidMount() {
    const jsonFile = new XMLHttpRequest();
    jsonFile.open('GET', this.props.filePath, true);
    jsonFile.send();
    jsonFile.responseType = 'arraybuffer';
    jsonFile.onreadystatechange = () => {
      if (jsonFile.readyState === 4 && jsonFile.status === 200) {
        mammoth.convertToHtml(
          { arrayBuffer: jsonFile.response },
          { includeDefaultStyleMap: true },
        )
        .then((result) => {
          const docEl = document.createElement('div');
          docEl.className = 'document-container';
          docEl.innerHTML = result.value;
          document.getElementById('docx').innerHTML = docEl.outerHTML;
        })
        .catch((a) => {
          console.error ('alexei: something went wrong', a);
	  this.setState({error:true})
	  
        })
        .done();
      }
    };
  }

  render() {
    return (
		<Styles>
      <div id="docx">
        {this.state.error? <Error/> : <Loading />}
      </div>
		</Styles>
	);
  }
}
