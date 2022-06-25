import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import DownloadIco from '../assets/DownloadIco'
import CloseIco from '../assets/CloseIco'
import FullscreenIco from '../assets/FullscreenIco'
//import Loading from './Loading'

function FileViewerControls ({fileName, filePath, close, children, ...props}){
	
	const [isFullscreen, setFullscreen]  = useState(false)

	useEffect(() => {
		const handleKeyPress = (e) =>{
			e.stopPropagation()
			switch(e.key || e.which){
				case 'Escape':
				case 27:
					if (isFullscreen){
						setFullscreen(false)
						return
					}
					close(e)
					break;
			}
		}

		document.addEventListener("keydown", handleKeyPress, true)

		return () => document.removeEventListener("keydown", handleKeyPress, true)
	},[isFullscreen, close])

	return (
		<View fullscreen={isFullscreen} {...props}>
			<Toolbar>
				<Title>{fileName ? fileName : ''}</Title>
				<ToolbarButtons>
					<FullscreenIco onClick={() => setFullscreen(!isFullscreen)}/>
					<a href={filePath} download={fileName} title={fileName}><DownloadIco/></a>
					<CloseIco onClick={close}/>
				</ToolbarButtons>
			</Toolbar>
			<Content>
				{children}
			</Content>
		</View>
	)
}

FileViewerControls.propTypes = {
	fileName: PropTypes.string,
	filePath: PropTypes.string,
	close: PropTypes.func,
}

FileViewerControls.defaultProps = {
	fileName: '',
	filePath: '',
	close: () => {},
}


const View = styled.div`
	${props => props.fullscreen ?
		`
		position:fixed;
		z-index:100;
		left:0;
		top:0;
		bottom:0;
		right:0;

		width:100vw;
		height:100vh;

		`:
		`
		width:100%;
		max-height:100%;

		`
	}

	padding:min(5vh, 5vw);
	box-sizing:border-box;

	overflow:auto;
	background:rgba(0, 0, 0, 0.8);
	clear:both;
	color:#000;

	
	.pg-viewer-wrapper {
		overflow:auto;
		height:100%;
	}
`

const Toolbar = styled.div`
	position:sticky;
	top:0;

	display:flex;
 	justify-content:space-between;

	z-index:100;

	margin-bottom:min(5vh, 5vw);
`

const ToolbarButtons = styled.div`
	display:flex;

	gap:1vw;

	svg, a{
		flex-shrink:0;
		cursor:pointer;
		height:4vh;
	}
`

const Title = styled.span`
	font-weight:bold;
	color:#c8c8c8;
	font-size:2.5vh;
	height:100%;
	max-width:80vw;
	word-wrap:anywhere;
	text-align:left;
`

const Content = styled.div`
	width:100%;
	height:calc(100% - 4vh - min(5vh, 5vw));	//height of ToolbarButtons
	max-height:100%;
`

export default FileViewerControls
