// Copyright (c) 2017 PlanGrid, Inc.

import Styled from 'styled-components'

const Styles = Styled.div`

width:100%;
height:100%;
max-height:100%;

.pg-viewer-wrapper {
	height: 100%;
	display: flex;
	flex-direction: row;

	.pg-viewer {
		width:100%;
		height: 99%;
		position: relative;
		flex-grow: 2;

		.pg-driver-view {
			margin: auto;
			width: 100%;
			height: 100%;

			canvas, .react-grid-Container {
				width:100%;
			}
		}
	}

	.pg-viewer-link {
		background: mediumpurple;
		height: 100%;
		flex-grow: 1;
	}
}

.react-grid-Container {
	margin: auto;
}

#xbim-viewer {
	height: 100%;
	width: 100%
}
`

export default Styles
