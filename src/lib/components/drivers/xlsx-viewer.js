// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component, Suspense} from 'react';

import * as XLSX from 'xlsx/xlsx.mjs';
import styled from 'styled-components'
import ReactDataGrid from 'react-data-grid';
import Loading from '../Loading';

import { copyToClipboard } from '../../utils/copyToClipboard'
import _ from 'lodash'

const types = {
	b : 'boolean', 
	e : 'error: \'v\' shows error code, \'w\' shows error label',
	n : 'number',
	d : 'date',
	s : 'text',
	z : 'stub: empty value but has data'
}

class XlxsViewer extends Component {
	constructor(props) {
		super(props);
		this.state = this.parse();
	}
	
	parse() {
		const dataArr = new Uint8Array(this.props.data);
		const arr = [];
		
		for (let i = 0; i !== dataArr.length; i += 1) {
			arr.push(String.fromCharCode(dataArr[i]));
		}
		
		const workbook = XLSX.read(arr.join(''), { type: 'binary', cellStyles:true, cellDates:true });
		const names = Object.keys(workbook.Sheets);
		const sheets = names.map(name => (
			XLSX.utils.sheet_to_csv(workbook.Sheets[name])
		));
		
		return { workbook, sheets, names, curSheetIndex: 0, cursorCell: {idx:0, rowIdx:0}, viewType: 'v'};
	}
	
	render() {
		const { workbook, names, sheets, curSheetIndex, cursorCell, viewType } = this.state;
		const { height } = this.props
		
		const currentCell = workbook.Sheets[names[curSheetIndex]][XLSX.utils.encode_cell({c:cursorCell.idx,r:cursorCell.rowIdx})]
// 		const sheet = workbook.Sheets[names[curSheetIndex]]
		
// 		console.log(sheet)
// 		console.log(Object.keys(sheet).map(key=>({s:sheet[key].s, key}))/*.filter(item=>!!item.s)*/)
// 		const defViewType = !currentCell ? '' : currentCell.t === 's' ? !!currentCell.f ? 'f' : !!currentCell.l ? 'l' : 'v' : 'v'
		
		const {rows, columns} = parse(sheets[curSheetIndex || 0])
		
		return (
			<div className="spreadsheet-viewer">
				<div className="sheet-names">
				{
					names.map((name, index)=><input key={name} type="button" value={name} onClick={()=>this.setState({curSheetIndex:index})}/>)//
				}
					<select defaultValue='v' onChange={e=>{console.log("he");this.setState({viewType:e.target.value})}}>
						<option value="v">v: raw value</option>
						<option value="w">w: formatted text</option>
						<option value="t">t: type</option>
						<option value="f">f: formula</option>
						<option value="r">r: rtf encoding</option>
						<option value="c">c: comments</option>
						<option value="l">l: link</option>
						
					</select>
					<p style={{margin:0,display:'inline-block'}}>{
						!currentCell ? '' :
						viewType === 'l' ? !currentCell.l ? '' :
							<a href={currentCell.l.target} title={currentCell.l.Tooltip}>{currentCell.l.target}</a>
						:
						viewType === 't' ?
							types[currentCell[viewType]]
						:
						viewType === 'c' ?
							!currentCell.c ? "" : currentCell.c.map((c,key)=><span key={key}>Author: {c.a}; Text: {c.t}</span>)
						:
							currentCell[viewType]
					}</p>
				</div>
				<CsvViewer {...this.props} rows={rows} columns={columns} height={!!names.length ? height/100*95 : height} setCursor={(cursorCell)=>this.setState({cursorCell})}/>
			</div>
		);//
	}
}

class CsvViewer extends Component {
	
	constructor(props){
		super(props);
		console.log("constructor")
		document.addEventListener("keydown", this.copySelection)
	}
	
	componentWillUnmount(){
		document.removeEventListener("keydown", this.copySelection)
	}
	
	copySelection=(e)=>{
		//https://stackoverflow.com/a/2906254
		
		e = e || window.event // IE support
		var c = e.keyCode
		var ctrlDown = e.ctrlKey || e.metaKey // Mac support
		
		// Check for Alt+Gr (http://en.wikipedia.org/wiki/AltGr_key)
		if (ctrlDown && !e.altKey && c===67) // c
			copyToClipboard(this.state.selectedData)
	}
	
	shouldComponentUpdate(nextProps,nextState){
		console.log("shouldupdate")
		return !_.isEqual(nextProps.rows, this.props.rows)
	}
	
	render(){
		console.log("renderGrid")
		const { rows, columns, setCursor} = this.props;
		
		return (
			<Suspense fallback={<Loading/>}>
			{!!rows && !!columns &&
				<DataGridContainer>
				<ReactDataGrid
					columns={columns} minHeight={this.props.height || 650}
					rowGetter={i => rows[i]} rowsCount={rows.length}
					cellRangeSelection={{
// 						onStart: args => console.log(rows),
// 						onUpdate: args => console.log(rows),
						onComplete: args => {
							!!setCursor && setCursor(args.cursorCell)
							const extractKeys = range2Arr(args.topLeft.idx, args.bottomRight.idx).map(idx=>columns[idx].key)	//array of string w/ columns keys
							this.setState({selectedData: range2Arr( args.topLeft.rowIdx, args.bottomRight.rowIdx ).map( rowIdx => extractKeys.map( key => rows[rowIdx][key] ).join(',')).join(",\n")})
						}
					}}
					/>
			</DataGridContainer>}
			</Suspense>
		);//
	}
}

function range2Arr(start,end){
	var arr=[], diff=end-start
	for (let i=0;i<=diff;i++){
		arr[i]=start++
	}
	return arr
}

//https://stackoverflow.com/a/1293163
function CSVToArray( strData, strDelimiter ){
	// Check to see if the delimiter is defined. If not,
	// then default to comma.
	strDelimiter = (strDelimiter || ",");
	
	// Create a regular expression to parse the CSV values.
	var objPattern = new RegExp(
		(
			// Delimiters.
			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
			
			// Quoted fields.
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
			
			// Standard fields.
			"([^\"\\" + strDelimiter + "\\r\\n]*))"
		),
		"gi"
	);
	
	
	// Create an array to hold our data. Give the array
	// a default empty first row.
	var arrData = [[]];
	
	// Create an array to hold our individual pattern
	// matching groups.
	var arrMatches = null;
	
	
	// Keep looping over the regular expression matches
	// until we can no longer find a match.
	while (arrMatches = objPattern.exec( strData )){
		
		// Get the delimiter that was found.
		var strMatchedDelimiter = arrMatches[ 1 ];
		
		// Check to see if the given delimiter has a length
		// (is not the start of string) and if it matches
		// field delimiter. If id does not, then we know
		// that this delimiter is a row delimiter.
		if (
			strMatchedDelimiter.length &&
			strMatchedDelimiter !== strDelimiter
		){
			
			// Since we have reached a new row of data,
			// add an empty row to our data array.
			arrData.push( [] );
			
		}
		
		var strMatchedValue;
		
		// Now that we have our delimiter out of the way,
		// let's check to see which kind of value we
		// captured (quoted or unquoted).
		if (arrMatches[ 2 ]){
			
			// We found a quoted value. When we capture
			// this value, unescape any double quotes.
			strMatchedValue = arrMatches[ 2 ].replace(
				new RegExp( "\"\"", "g" ),
										"\""
			);
			
		} else {
			
			// We found a non-quoted value.
			strMatchedValue = arrMatches[ 3 ];
			
		}
		
		
		// Now that we have our value string, let's add
		// it to the data array.
		arrData[ arrData.length - 1 ].push( strMatchedValue );
	}
	
	if (!arrData[arrData.length])	//last row is empty
		arrData.pop()	//remove dat row
	
	// Return the parsed data.
	return( arrData );
}

function parse(data){
	const rows = [];
	const columns = [];
	console.log("parsing")
	CSVToArray(data).forEach((array, rowNum) => {
		
		if (columns.length < 1)	//prima riga, imposta colonne
			array.forEach((cell, idx)=>
			columns.push({
				key: `key-${idx}`,
				name: XLSX.utils.encode_col(idx),
				 resizable: true,
			}))
			
			const row = {};
			array.forEach((cell, idx) => {
				row[`key-${idx}`] = cell
			});
			rows.push(row);
			
			// 			columns.map((col, idx)=>({...col,width:Math.max(col.width, array[idx].length * 12 + 10)}))
	});
	
	return ({ rows, columns })
}	

const DataGridContainer = styled.div`
	.react-grid-Canvas { 
		overflow:auto !important;
		width:100.2% !important;	//to hide both scrollbars, increase this
		position:static !important;
		height:auto !important;
	}
	.react-grid-Viewport {
		position:relative !important;
		inset:0 !important;
	}
	.react-grid-Grid {
		min-height:auto !important;
	}
	.react-grid-HeaderCell, .react-grid-Cell, .rdg-selected, .rdg-selected-range {
		box-sizing:border-box !important;
	}
`

export default XlxsViewer;
