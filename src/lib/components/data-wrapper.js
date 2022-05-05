// Copyright (c) 2017 PlanGrid, Inc.

import React, { useEffect, useState } from 'react';

import Error from './error';
import Loading from './Loading';

function provideData (WrappedComponent, props) {
	return function DataProvider ({filePath, fileData, ...wrappedProps}) {

		const [loading,  setLoading] = useState(true)
		const [error,  setError] = useState(false)
		const [data,  setData] = useState()

		useEffect(() => {
			setLoading(true)
			let xhr = new XMLHttpRequest();

			if ('withCredentials' in xhr) {
				// XHR for Chrome/Firefox/Opera/Safari.
				xhr.open('GET', filePath, true);
			} else if (typeof window.XDomainRequest !== 'undefined') {
				// XDomainRequest for IE.
				xhr = new window.XDomainRequest();
				xhr.open('GET', filePath);
			} else {
				// CORS not supported.
				xhr = null;
				setError('CORS not supported')
				return;
			}

			if (props.responseType) {
				xhr.responseType = props.responseType;
			}

			xhr.setRequestHeader( 'Accept', 'application/json');

			xhr.onload = () => {
				if (xhr.status >= 400) {
					setError(`fetch error with status ${xhr.status}`);
					return;
				}

				setData(props.responseType ? xhr.response : xhr.responseText);
				setLoading(false)
			};

			try{
				xhr.send()
			}
			catch (e) {
				props.onError(e);
				setError('fetch error');
			}

			return () => xhr.abort()
		}, [fileData, filePath])


		if (error)
			return <Error error={error}/>;

		if (loading)
			return <Loading />

		return <WrappedComponent {...wrappedProps} {...props} data={data}/>;

	};
}

export default provideData;
	
