import React from 'react'
import Styled from 'styled-components'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import * as STYLES from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as LANGS from 'react-syntax-highlighter/dist/esm/languages/prism';

function renderObjs(obj){
	var list=[]
	for (let i in obj)
		list.push(<option value={i} key={i}>{i}</option>);
	//
	return list;
}


function TxtViewer (props) {
	const {data, width, height, /*fileType,*/ defHigh} = props
	
// 	console.log(props)
	
	const [language, setLanguage] = React.useState(defHigh)
	const [style, setStyle] = React.useState(STYLES.cb)
	
	return (
		<Container width={width} height={height}>
			<Heading>
				<select onChange={e=>setStyle(STYLES[e.target.value])} defaultValue='cb'>
					{renderObjs(STYLES)}
				</select>
				
				<select onChange={e=>setLanguage(e.target.value)} defaultValue={language}>
					{renderObjs(LANGS)}
				</select>
				
			</Heading>
			
			<SyntaxHighlighter language={language} style={style} showLineNumbers>
				{data}
			</SyntaxHighlighter>
			
		</Container>
	)
}
//
const Container = Styled.div`
	width:auto;
	
	pre {
		height:calc(100% - min(4vh, 4vw) * 2);
		margin:0!important;
		box-sizing:border-box;
	}
`
const Heading = Styled.div`
	display:flex;
	flex-wrap:wrap;
	height:min(4vh, 4vw);
	margin-bottom:min(4vh, 4vw);
`
export default TxtViewer
