import React, {useState} from 'react'

import './App.css';
import FileViewer from './lib'

function App() {
 	const [files, setFiles] = useState([])
	const [currentFile, setCurrentFile] = useState()

	return (
		<div className="App">
			<div className="input">
				<input type="file" onChange={e => setFiles(e.target.files)} multiple/>

				{files && files.length && new Array(files.length).fill('').map((a, id) =>
					<div key={id} onClick={()=>setCurrentFile(id)}>{files[id].name}</div>
				)}

				{typeof currentFile === "number" &&
					<FileViewer
						name={files[currentFile].name}
						type={files[currentFile].name.split('.')[1]}
						data={files[currentFile]}
						hideControls={false}
						close={() => setCurrentFile()}
						/>
				}

			</div>
		</div>
	);
}

export default App;
