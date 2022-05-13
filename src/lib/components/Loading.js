// Copyright (c) 2017 PlanGrid, Inc.

import React from 'react';
import styled, {keyframes} from 'styled-components'
import img from '../assets/spinner-primary-large.png'

const rotate = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`

const LoadingContainer = styled.div`
	position:relative;
	align-items: center;
	display: flex!important;
	flex-direction: row;
	height: 100%;
	justify-content: center;
	width: 100%;
`

const Loading = styled.span`
	background-image: url(${img});
	background-repeat: no-repeat;
	display: inline-block;
	height: 96px;
	width: 96px;
	animation: ${rotate} 2s linear infinite;
`

const LoadingComponent = (props) =>
	<LoadingContainer {...props}>
		<Loading/>
	</LoadingContainer>

export default LoadingComponent
