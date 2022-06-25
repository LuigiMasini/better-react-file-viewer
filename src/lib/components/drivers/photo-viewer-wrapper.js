// Copyright (c) 2017 PlanGrid, Inc.

import React, { useState, useEffect } from 'react';

import * as THREE from 'three';
import PhotoViewer from './photo-viewer';
import Photo360Viewer from './photo360-viewer';
import Loading from '../Loading';
import Error from '../Error'

function getPhotoDriver(width, height, fileType) {
	if (fileType === 'jpg' && window.Math.abs((width / height) - 2) <= 0.01) {
		return Photo360Viewer;
	}
	return PhotoViewer;
}

function PhotoViewerWrapper ({filePath, fileType, ...props}) {

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [dimensions, setDimensions] = useState({originalWidth: 0,originalHeight: 0,})
	const [texture, setTexture] = useState({})

	useEffect(() => {

		setLoading(true)
		// spike on using promises and a different loader or adding three js loading manager
		//WARNING this is wrong for svg imgs (shoud use SVGLoader()), but it works as long as u dont
		//give style witdth & height to img element in phoyo-viewer.js (it cant read em, given 100% works just fine)
		//NOTE bmp currently not working
		const loader = new THREE.TextureLoader();
		loader.crossOrigin = '';
		// load a resource
		loader.load(
			// resource URL
			filePath,
			// Function when resource is   loaded
			(texture) => {
				setLoading(false)
				setError(false)
				setDimensions({
					originalWidth: texture.image.width,
					originalHeight: texture.image.height,
				})
				setTexture(texture)
			},
			(xhr) => {
				console.log(`${xhr.loaded / xhr.total * 100}% loaded`);
			},
			(xhr) => {
				console.error ('Could not load image at url ', filePath);
				setError(true)
			},
		);
	}, [filePath, props.fileData])

	if (error)
		return <Error />;
	else if (loading)
		return <Loading/>

	const PhotoDriver = getPhotoDriver(dimensions.originalWidth, dimensions.originalHeight, fileType);

	return (
		<PhotoDriver {...dimensions} texture={texture} filePath={filePath} {...props} />
	);
}

export default PhotoViewerWrapper
