// Copyright (c) 2017 PlanGrid, Inc.

import React from 'react';
// import 'styles/unsupported.scss';
import styled from 'styled-components'

const UnsupportedViewer = ({fileType, filePath, ...props}) => (
	<div className="pg-driver-view centerContent">
		<UnsupportedMessage>
			<p><b><u>.{fileType}</u></b> files are not supported.</p>
		</UnsupportedMessage>
	</div>
);

/*moved from ../styles/unsupported.scss
style is the same as error.js*/
const UnsupportedMessage = styled.div`
	display:flex;
	align-items:center;
	justify-content:center;
	
	background-color:#707070;
	border-radius:12px;
	margin:auto;
	text-align:center;
	box-shadow:0 5px 12px 5px rgba(0,0,0,0.2);
	padding:2vh 0;
	
	& p {
		color:#FAFAFA !important;
	}
	
	b {
		margin-left:.5vw;
	}
`

export default UnsupportedViewer;
