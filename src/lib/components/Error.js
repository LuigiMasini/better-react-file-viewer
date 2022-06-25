// Copyright (c) 2017 PlanGrid, Inc.

import React from 'react';
import styled from 'styled-components'

const Error = props => (
	<ErrorMessage>
		<p>{props.error ? props.error : "Unable to preview file"}</p>
	</ErrorMessage>
);

const ErrorMessage = styled.div`
	background-color:#707070;
	border-radius:12px;
	margin:auto;
	text-align:center;
	box-shadow:0 5px 12px 5px rgba(0,0,0,0.2);
	width:min(30vw, 100%);
	padding:2vh 0;
	
	& p {
		color:#FAFAFA;
	}
`

export default Error;
