// Copyright (c) 2017 PlanGrid, Inc.

import React, { useState } from 'react';
import styled from 'styled-components'
import Loading from '../Loading';

function VideoViewer ({filePath, fileType, ...props}) {

	const [loading, setLoading] = useState(true)

	return (
		<VideoContainer className="pg-driver-view">
			{loading ? <Loading/> : null}
			<video
				style={{ visibility:loading ? 'hidden' : 'visible' }}
				controls
				type={'video/'+fileType}
				onCanPlay={() => setLoading(false)}
				src={filePath}
			>
				Video playback is not supported by your browser.
			</video>
		</VideoContainer>
	);
}

const VideoContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;


	video {
		height: 100%;
		width: 100%;
	}
`

export default VideoViewer;
