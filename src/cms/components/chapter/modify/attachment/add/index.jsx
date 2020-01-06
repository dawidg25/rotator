import React, {Component} from 'react';
import {useDropzone} from 'react-dropzone';
import './style.scss';

function AttachmentAdd(props) {
	const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

	const files = acceptedFiles.map(file => (
	<li key={file.path}>
		{file.path} - {file.size} bytes
	</li>
	));

	return (
		<section className="attachment-add sub-container">
			<h2>Add attachments</h2>
			<div {...getRootProps({className: 'dropzone'})}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
			</div>
			{/* <aside>
			<h4>Files</h4>
			<ul>{files}</ul>
			</aside> */}
		</section>
	);
}

export default AttachmentAdd