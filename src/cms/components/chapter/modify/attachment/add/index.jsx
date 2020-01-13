import React from 'react';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';
import auth from '../../../../../utils/Auth';
import notification from '../../../../../utils/Notification';
import './style.scss';

function AttachmentAdd(props) {
	const {getRootProps, getInputProps} = useDropzone({
		accept: 'image/*',
		onDrop: acceptedFiles => {
			acceptedFiles.map(file => {
				const data = new FormData();
				data.append('file', file);
				fileUploadHandler(data);
			});
		}
	});

	function fileUploadHandler(data) {
		axios.post(`/api/chapter/${props.id}/upload`, data, {
			headers: {'x-auth': auth.getToken()}
		}).then(res => {
			notification.create('Attachment added', 'success');
		}).catch(err => {
			notification.create('Problem with adding attachment', 'error');
		})
	}

	return (
		<section className="attachment-add sub-container">
			<h2>Add attachments</h2>
			<div {...getRootProps({className: 'dropzone'})}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
			</div>
		</section>
	);
}

export default AttachmentAdd