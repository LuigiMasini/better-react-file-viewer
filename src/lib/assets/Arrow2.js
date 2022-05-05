import * as React from "react"

function SvgComponent(props) {
	return (
		<svg width={16} height={25} viewBox="0 0 16 25" fill="none" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M15.196 3.501L12.315.621a2.037 2.037 0 012.88 2.88zm0 0L12.315.621.792 12.144l11.523 11.523 2.88-2.88-8.642-8.643 8.643-8.643zm-2.88 20.166l2.88-2.88a2.037 2.037 0 01-2.88 2.88z"
			fill="#D0E6F7"
		/>
		</svg>
	)
}

export default SvgComponent
