import React, {useState} from 'react'

import './App.css';
import FileViewer from './lib'
import sampleFiles from './sampleFiles'

function App() {
 	const [files, setFiles] = useState(sampleFiles)
	const [currentFile, setCurrentFile] = useState()

	const addFile = e => setFiles(f => [...f, ...(new Array(e.target.files.length).fill('').map((a, id) => ({name:e.target.files.item(id).name, data:e.target.files.item(id)})) ) ])
	const removeFile = id => {
		let f = [...files]
		f.splice(id, 1)
		setFiles(f)
	}

	return (
		<div className="App">

			{typeof currentFile === "object" &&
				<FileViewer
					{...currentFile}
					hideControls={false}
					close={() => setCurrentFile()}
					/>
			}

			<div className="files">
				{files && files.length && files.map(({name}, id) =>
					<div key={id} className="file">
						<span onClick={() => setCurrentFile(files[id])}>{name}</span>
						<span onClick={() => removeFile(id)} className="remove">x</span>
					</div>
				)}
			</div>

			<div className="input">
				<div>Drag and drop files here, or click</div>
				<input type="file" onChange={addFile} multiple/>
			</div>
		</div>
	);
}

export default App;
