import styled from 'styled-components'

function PhotoViewer (props){
	return (
		<PhotoViewerContainer id="pg-photo-container" width={props.originalWidth} height={props.originalHeight} src={props.filePath}/>
	)
}


const PhotoViewerContainer = styled.img`
width: min(${props => props.width}px, 100%);
height: min(${props => props.height}px, 100%);
object-fit:contain;
`;

export default PhotoViewer
