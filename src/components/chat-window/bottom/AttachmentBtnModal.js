import React, { useState } from "react";
import { useParams } from "react-router";
import { InputGroup, Icon, Modal, Button, Uploader, Alert } from "rsuite";

import { useModalState } from "../../../misc/custom-hooks";
import { storage } from "../../../misc/firebase";

const MAX_FILE_SIZE = 1000 * 1025 * 5;

const AttachmentBtnModal = ({ afterUpload }) => {
	const { isOpen, open, close } = useModalState();
	const { chatId } = useParams();

	const [isLoading, setIsLoading] = useState(false);
	const [fileList, setFileList] = useState([]);

	const onChange = (fileArr) => {
		const filtered = fileArr
			.filter((el) => el.blobFile.size <= MAX_FILE_SIZE)
			.slice(0, 5);

		setFileList(filtered);
	};

	const onUpload = async () => {
		try {
			const uploadPromises = fileList.map((f) => {
				return storage
					.ref(`/chat/${chatId}`)
					.child(Date.now() + f.name)
					.put(f.blobFile, {
						cacheControl: `public, max-age-${3600 * 24 * 3}`,
					});
			});

			const uploadSnapshots = await Promise.all(uploadPromises);

			const shapePromises = uploadSnapshots.map(async (snap) => {
				return {
					contentType: snap.metadata.contentType,
					name: snap.metadata.name,
					url: await snap.ref.getDownloadURL(),
				};
			});

			const files = await Promise.all(shapePromises);

			await afterUpload(files);

			setIsLoading(false);

			close();
		} catch (error) {
			setIsLoading(false);
			Alert.error(error.message, 4000);
		}
	};

	return (
		<>
			<InputGroup.Button onClick={open}>
				<Icon icon="attachment" />
			</InputGroup.Button>

			<Modal show={isOpen} onHide={close}>
				<Modal.Header>
					<Modal.Title>Upload files</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Uploader
						fileList={fileList}
						autoUpload={false}
						action=""
						onChange={onChange}
						multiple
						listType="picture-text"
						className="w-100"
						disabled={isLoading}
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button block disabled={isLoading} onClick={onUpload}>
						Send To Chat
					</Button>
					<div className="text-right mt-2">
						<small>* only files less than 5 mb are allowed</small>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AttachmentBtnModal;
