// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component } from 'react';

import styled from 'styled-components'
import Loading from '../Loading';

class AudioViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  onCanPlay() {
    this.setState({ loading: false });
  }

  renderLoading() {
    if (this.state.loading) {
      return <Loading />;
    }
    return null;
  }

  render() {
    const visibility = this.state.loading ? 'hidden' : 'visible';
    return (
      <div className="pg-driver-view">
        <VideoContainer>
          {this.renderLoading()}
          <audio
            style={{ visibility }}
            controls
            onCanPlay={e => this.onCanPlay(e)}
            src={this.props.filePath}
          >
            Video playback is not supported by your browser.
          </audio>
        </VideoContainer>
      </div>
    );
  }
}

const VideoContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	height: 100%;
	justify-content: center;
	width: 100%;
`

export default AudioViewer;
