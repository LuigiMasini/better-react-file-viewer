import React from 'react'

// import Loading from '../Loading'
import Error from '../Error'

class OfficeViewer extends React.Component {
	state={
		loaded:false,
		error:false
	}
	
	render(){
		if (this.state.error)
			return <Error/>
		
		var iframeId = "OfficeViewer";
		
		/*if (this.state.loaded) {
			var iframe = document.getElementById(iframeId)
			if (iframe){
				var iframeDocument = iframe.contentDocument //|| iframe.contentWindow.document;
				if (iframeDocument && iframeDocument.getElementById("WACErrorHeader"))
					this.setState({error:true})
			}
		}*/
		
		const {filePath, width, height} = this.props
		return (
		<iframe src={'https://view.officeapps.live.com/op/embed.aspx?src='+filePath}
			onError={(e)=>{console.error(e);this.setState({error:true})}}
			onLoad={()=>this.setState({loaded:true})}	
			width={width} height={height} frameBorder='0' title={iframeId}>
			This is an embedded 
			<a target='_blank' rel="noopener noreferrer" href='http://office.com'>
				Microsoft Office</a> 
			document, powered by 
			<a target='_blank' rel="noopener noreferrer" href='http://office.com/webapps'>
				Office Online</a>.
		</iframe>
		)
	}
	
}

export default OfficeViewer
