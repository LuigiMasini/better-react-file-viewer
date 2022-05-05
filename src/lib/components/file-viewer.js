import React, { useState, useEffect } from 'react';
import Styles from '../styles/main';

import provideData from './data-wrapper';


import {
	DocxViewer,
	VideoViewer,
	XlsxViewer,
	//   XBimViewer,
	PDFViewer,
	UnsupportedViewer,
	PhotoViewerWrapper,
	AudioViewer,
	OfficeViewer,
	TxtViewer,
} from './drivers';

function FileViewer ({fileType, filePath, fileData, ...props}) {

	const [dimensions, setDimension] = useState({width:0,height:0})

	useEffect(() => {
		const container = document.getElementById('pg-viewer');
		const height = container ? container.clientHeight : 0;
		const width = container ? container.clientWidth : 0;
		setDimension({ height, width });
	}, [])
	

	function getDriver(fileType) {
		switch (fileType) {
			case 'abap':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'abap'}));
			case 'as':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'actionscript'}));
			case 'ada':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'ada'}));
			case 'applescript':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'applescript'}));
			case 'ino':
			case 'pde':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'arduino'}));
			case 'arff':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'arff'}));
			case 'txt':
			case '':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'asciidoc'}));
			case 'aspx':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'aspnet'}));
			case 'sh':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'bash'}));
			case 'bas':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'basic'}));
			case 'bat':
			case 'cmd':
			case 'btm':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'batch'}));
			case 'y':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'bison'}));
			case 'b':
			case 'bf':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'brainfuck'}));
			case 'bro':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'bro'}));
			case 'h':
			case 'c':
			case 'cc':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'c'}));
			case 'clj':
			case 'cljs':
			case 'edn':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'clojure'}));
			case 'coffee':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'coffeescript'}));
			case 'cpp':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'cpp'}));
			case 'cs':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'csharp'}));
			case 'csp':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'csp'}));
			case 'css':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'css'}));
			case 'd':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'d'}));
			case 'dart':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'dart'}));
			case 'diff':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'diff'}));
			case 'e':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'eiffel'}));
			case 'ex':
			case 'exs':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'elixir'}));
			case 'elm':
			case 'erb':
			case 'erl':
			case 'flow':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'elm'}));
			case 'f90':
			case 'for':
			case 'f':
			case 'fpp':
			case 'ftn':
			case 'i':
			case 'i90':
			case 'f95':
			case 'f03':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'fortran'}));
			case 'md':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'markdown'}));
			case 'mat':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'matlab'}));
			case 'mel':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'mel'}));
			case 'miz':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'mizar'}));
			case 'nim':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'nim'}));
			case 'nix':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'nix'}));
			case 'nsi':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'nsis'}));
			case 'm':
			case 'mm':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'objectivec'}));
			case 'ml':
			case 'mli':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'ocaml'}));
			case 'cl':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'opencl'}));
			case 'fs':
			case 'fsi':
			case 'fsx':
			case 'fsscript':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'fsharp'}));
			case 'gedcom':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'gedcom'}));
			case 'feature':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'gherkin'}));
			case 'go':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'go'}));
			case 'graphql':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'graphql'}));
			case 'groovy':
			case 'gvy':
			case 'gy':
			case 'gsh':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'groovy'}));
			case 'haml':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'haml'}));
			case 'hbs':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'handlebars'}));
			case 'hs':
			case 'lhs':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'haskell'}));
			case 'hx':
			case 'hxml':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'haxe'}));
			case 'ini':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'ini'}));
			case 'io':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'io'}));
			case 'j':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'j'}));
			case 'java':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'java'}));
			case 'js':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'javascript'}));
			case 'json':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'json'}));
			case 'jsx':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'jsx'}));
			case 'jl':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'julia'}));
			case 'kps':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'keyman'}));
			case 'kt':
			case 'ktm':
			case 'kts':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'kotlin'}));
			case 'tex':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'latex'}));
			case 'less':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'less'}));
			case 'liquid':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'liquid'}));
			case 'lisp':
			case 'lsp':
			case 'l':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'lisp'}));
			case 'ls':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'livescript'}));
			case 'lol':
			case 'lols':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'lolcode'}));
			case 'lua':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'lua'}));
			case 'make':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'make'}));
			case 'gp':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'parigp'}));
			case 'pas':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'pascal'}));
			case 'pl':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'perl'}));
			case 'php':
			case 'php3':
			case 'php4':
			case 'php5':
			case 'phtml':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'php'}));
			case 'pks':
			case 'pkb':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'plsql'}));
			case 'ps1':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'powershell'}));
			case 'pro':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'prolog'}));
			case 'pug':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'pug'}));
			case 'pp':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'puppet'}));
			case 'pd':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'pure'}));
			case 'py':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'python'}));
			case 'q':
			case 'qm':
			case 'qtest':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'q'}));
			case 'r':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'r'}));
			case 'reason':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'reason'}));
			case 'rpy':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'renpy'}));
			case 'rst':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'rest'}));
			case 'rb':
			case 'rbw':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'ruby'}));
			case 'rs':
			case 'rlib':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'rust'}));
			case 'sas':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'sas'}));
			case 'sass':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'sass'}));
			case 'scss':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'scss'}));
			case 'scala':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'scala'}));
			case 'scm':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'scheme'}));
			case 'tpl':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'smarty'}));
			case 'sql':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'sql'}));
			case 'styl':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'stylus'}));
			case 'swift':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'swift'}));
			case 'tcl':
			case 'tbc':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'tcl'}));
			case 'textile':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'textile'}));
			case 'tsx':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'tsx'}));
			case 'twig':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'twig'}));
			case 'ts':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'typescript'}));
			case 'v':
			case 'vh':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'verilog'}));
			case 'vhdl':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'vhdl'}));
			case 'vb':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'visual-basic'}));
			case 'wat':
			case 'wasm':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'wasm'}));
			case 'xquery':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'xquery'}));
			case 'yaml':
			case 'yml':
				return provideData(TxtViewer, Object.assign({}, props, { defHigh:'yaml'}));
			case 'xlsx':
			case 'xlsm':
			case 'xlsb':
			case 'biff12':
			case 'xls':
			case 'biff8':
			case 'biff5':
			case 'biff4':
			case 'biff3':
			case 'biff2':
			case 'csv':
			case 'dif':
			case 'slk':
			case 'sylk':
			case 'prn':
			case 'ods':
			case 'odc':
			case 'fods':
			case 'uos1':
			case 'uos2':
			case 'dbf':
			case 'wks':
			case 'wk1':
			case 'wk2':
			case 'wk3':
			case 'wk4':
			case '123':
			case 'wq1':
			case 'wq2':
			case 'wb1':
			case 'wb2':
			case 'wb3':
			case 'qpw':
			case 'eth':
				return provideData(XlsxViewer, {responseType: 'arraybuffer',...props})
			case 'jpg':
			case 'jpeg':
			case 'gif':
			case 'bmp':
			case 'png':
			case 'svg':
			case 'ico':
				return PhotoViewerWrapper;
			case 'pdf':
				return PDFViewer;
			case 'docx':
				return DocxViewer;
			case 'mp4':
			case 'webm':
			case 'ogg':	//webm & ogg not supported in IE & Safari
				return VideoViewer;
			case 'mp3':
			case 'wav':	//not supported in IE & Edge 
// 			case 'ogg':	//not supported in IE, Edge & Safari
			case 'aac':
				return AudioViewer;
// 			case 'wexbim':
				//return XBimViewer;
			case 'ppt':
			case 'pptx':
			case 'doc':
			case 'xls'://other solution already found, see ../FileTypes.js, but will implement in the future
					return OfficeViewer
			default:
				return UnsupportedViewer;
		}
	}
	
	const Driver = getDriver(fileType);


	return (
		<Styles>
			<div className="pg-viewer-wrapper">
				<div className="pg-viewer" id="pg-viewer">
					<Driver filePath={filePath} fileData={fileData} fileType={fileType} {...props} width={dimensions.width} height={dimensions.height} />
				</div>
			</div>
		</Styles>
	);
}

export default FileViewer;
