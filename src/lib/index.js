import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';

import FileViewerControls from './components/FileViewerControls'
import FileViewer from './components/FileViewer'
import Loading from './components/Loading'

function FileViewerContainer ({name, type, path, data, close, hideControls, ...props}){

	const [filePath, setFilePath] = useState(path)
	const [fileType, setFileType] = useState(type)
	const [loading, setLoading] = useState([true, true])

	useEffect(() => {
		if (!path && data){
			var urlCreator = window.URL || window.webkitURL;
			setFilePath(urlCreator.createObjectURL(data));
		}
		else setFilePath(path);

		setLoading(l => [false, l[1]])
	},[path, data])

	useEffect(() => {
		if (!type && name){
			const pieces = name.split('.')
			if (pieces.length === 0)
				console.warn("Could not get file type in `FileViewer`, defaulting to txt")
			setFileType(pieces.length > 0 ? pieces[pieces.length - 1] : 'txt');
			setLoading(l => [l[0], false])
		}
	},[type, name])

	if (loading.reduce((curr, prev) => prev && curr, true))
		return <Loading/>

	if (!hideControls)
		return (
			<FileViewerControls filePath={filePath} fileName={name} close={close} {...props}>
				<FileViewer fileType={fileType} fileData={data} filePath={filePath} {...props}/>
			</FileViewerControls>
		)

	return <FileViewer fileType={fileType} fileData={data} filePath={filePath} {...props}/>
}


const requiredTypeSource = (props, propName, componentName) => {
	if (!props.name && !props.type) {
		return new Error(`One of 'name' or 'type' is required by '${componentName}' component.`)
	}
	if(props.name && typeof props.name !== "string")
		return new Error(`Expecting string for 'name' but got ${typeof props.name} in '${componentName}' component.`)
	if(props.type && typeof props.type !== "string")
		return new Error(`Expecting string for 'type' but got ${typeof props.type} in '${componentName}' component.`)
}

const requiredDataSource = (props, propName, componentName) => {
	if (!props.data && !props.path) {
		return new Error(`One of 'data' or 'path' is required by '${componentName}' component.`)
	}
	if (props.path && typeof props.path !== "string")
		return new Error(`Expecting string for 'path' but got ${typeof props.path} in '${componentName}' component.`)
	if (props.data && !(props.data instanceof Blob) )
		return new Error(`Expecting blob for 'data' in '${componentName}' component.`)
}

FileViewerContainer.propTypes = {
	type: requiredTypeSource,
	name: requiredTypeSource,
	path: requiredDataSource,
	data: requiredDataSource,
	close: PropTypes.func,
	onError: PropTypes.func,
	errorComponent: PropTypes.element,
	unsupportedComponent: PropTypes.element,
};

FileViewerContainer.defaultProps = {
	close: () => {},
	onError: e => console.warn(e),
	errorComponent: null,
	unsupportedComponent: null,
};

export default FileViewerContainer
