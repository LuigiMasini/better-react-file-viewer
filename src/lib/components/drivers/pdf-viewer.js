import { useEffect, useRef, useState} from 'react';

import * as PDFJS from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

import styled from 'styled-components'
import VisibilitySensor from 'react-visibility-sensor'
import Loading from '../Loading'
import Error from '../Error'

const DEFAULT_SCALE = 1.1
const INCREASE_PERCENTAGE = 0.2;

PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function Page ({getPage, containerWidth, zoom, ...props}) {

	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState()
	const [isVisible, setIsVisible] = useState(false)
	const canvasRef = useRef()


	useEffect(() => {

	}, [])

	useEffect(() => {
		setLoading(true)
		getPage().then(setPage)
	}, [getPage])


	useEffect(() => {
		if (!isVisible || !page)
			return

		setLoading(true)

		const calculatedScale = (containerWidth / page.getViewport({scale:DEFAULT_SCALE}).width);
		const scale = Math.min(DEFAULT_SCALE, calculatedScale);
		const viewport = page.getViewport({scale: scale + zoom})
		canvasRef.current.width = viewport.width;
		canvasRef.current.height = viewport.height;

		page.render({
			canvasContext: canvasRef.current.getContext('2d'),
			viewport
		}).promise.then( () => setLoading(false))

		return () => page.cleanup()
	}, [page, containerWidth, zoom, isVisible])

	return (
		<VisibilitySensor partialVisibility={true} onChange={setIsVisible}>
			<PdfCanvas>
				{loading ? <Loading style={{position:'absolute'}}/> : null}
				<canvas ref={canvasRef} width={670} height={870}/>
			</PdfCanvas>
		</VisibilitySensor>
	)
}


function PdfDriver ({filePath, fileData, ...props}) {

	const [loading, setLoading] = useState(true)
	const [options, setOptions] = useState({})
	const [error, setError] = useState(false)
	const [pdf, setPdf] = useState()
	const [offsetWidth, setOffsetWidth] = useState()
	const [zoom, setZoom] = useState(0)
	const containerRef = useRef()

	//listen for container.offsetWidth mutation
	const resizeObserver = new ResizeObserver(entries => entries.forEach(entry => {
		if(offsetWidth !== entry.target.offsetWidth)
			setOffsetWidth(entry.target.offsetWidth)
	}));


	useEffect(() => {

		setLoading(true)

		if (!!fileData){
			const reader = new FileReader()

			reader.addEventListener("loadend", e => setOptions({data: new Uint8Array(e.target.result)}) )
			reader.addEventListener("error", e => {console.warn(e); setOptions({url: filePath})})

			reader.readAsArrayBuffer(fileData)
		}
		else setOptions({url: filePath})

	}, [fileData, filePath])



	useEffect(() => {
		if (!options || typeof options !== "object" || !Object.keys(options).length)
			return

		try {
			PDFJS.getDocument(options).promise.then(pdf => {
				setPdf(pdf)
				setLoading(false)
				resizeObserver.observe(containerRef.current);
			})
		}
		catch(err) {
			console.warn(err)
			setError("PDFJS : "+err.message)
		}

	}, [options])


	if (error)
		return <Error error={error}/>


	const pageGetter = id => () => pdf.getPage(id+1)

	return (
		<PdfViewer ref={containerRef}>
			<div className="pdf-controlls-container">
				<div className="view-control" onClick={() => setZoom(z => z+INCREASE_PERCENTAGE)} >
					<i className="zoom-in" >zoom in</i>
				</div>
				<div className="view-control" onClick={() => setZoom(0)}>
					<i className="zoom-reset" >reset</i>
				</div>
				<div className="view-control" onClick={() => setZoom(z => z-INCREASE_PERCENTAGE)}>
					<i className="zoom-out" >zoom out</i>
				</div>
			</div>
			{ (loading || !pdf) ?
				<Loading/> :
				new Array(pdf.numPages).fill('').map((a, id) => <Page getPage={pageGetter(id)} key={id} containerWidth={offsetWidth} zoom={zoom}/> )
			}
		</PdfViewer>
	)

}

export { Page }
export default PdfDriver

const PdfViewer = styled.div`
	color:white;

	.pdf-controlls-container {
		display:flex;
		justify-content:center;
		margin-bottom:1vh;

		position:sticky;

		.view-control {
			background-color:rgba(0,0,0,.9);
			padding:.5vw 1vw;
		}
	}
`

const PdfCanvas = styled.div`
	text-align:center;
	position:relative;

	& canvas {
		display:inline-block
	}
`
