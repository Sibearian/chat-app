import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { Modal, Button, Alert } from "rsuite";
import { useProfile } from "../../context/profile.context";
import { useModalState } from "../../misc/custom-hooks";
import { database, storage } from "../../misc/firebase";
import ProfileAvatar from "../ProfileAvatar";

const fileInputTypes = ".png, .jpg, .jpeg";
const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjepg"];

const isValidFile = (file) => acceptedFileTypes.includes(file.type);

const getBlob = (canvas) => {
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (blob) {
				resolve(blob);
			} else {
				reject(new Error("File process error"));
			}
		});
	});
};

const AvatarUploadBtn = () => {
	const [img, setImg] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const avatarEditorRef = useRef();

	const { profile } = useProfile();
	const { isOpen, open, close } = useModalState();

	const onFileInputChange = (event) => {
		const currentFiles = event.target.files;

		if (currentFiles.length === 1) {
			const file = currentFiles[0];

			if (isValidFile(file)) {
				setImg(file);
				open(file);
			} else {
				Alert.warning(`Wrong file type ${file.type}`, 4000);
			}
		}
	};

	const onUploadClick = async () => {
		const canvas = avatarEditorRef.current.getImageScaledToCanvas();

		setIsLoading(true);
		try {
			const blob = await getBlob(canvas);

			const avatarFileRef = storage
				.ref(`/profiles/${profile.uid}`)
				.child("avatar");

			const uploadAvatarResult = await avatarFileRef.put(blob, {
				cacheControl: `public, max-age-${3600 * 24 * 3}`,
			});

			const downloadURL = await uploadAvatarResult.ref.getDownloadURL();

			const userAvatarRef = database
				.ref(`/profiles/${profile.uid}`)
				.child("avatar");

			userAvatarRef.set(downloadURL);

			setIsLoading(false);

			Alert.info("Avatar has been uploaded", 4000);
		} catch (error) {
			setIsLoading(false);

			Alert.error(error.message, 4000);
		}
	};

	return (
		<div className="mt-3 text-center">
			<ProfileAvatar src={profile.avatar} name={profile.name} />

			<div>
				<label
					htmlFor="avatar-upload"
					className="d-block cursor-pointer padded"
				>
					Select new avatar
					<input
						id="avatar-upload"
						type="file"
						className="d-none"
						accept={fileInputTypes}
						onChange={onFileInputChange}
					/>
					<Modal show={isOpen} onHide={close}>
						<Modal.Header>
							<Modal.Title>Adjust and upload new avatar</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<div className="d-flex justify-content-center align-items-center h-100">
								{img && (
									<AvatarEditor
										ref={avatarEditorRef}
										image={img}
										width={200}
										height={200}
										border={10}
										borderRadius={100}
										rotate={0}
									/>
								)}
							</div>
						</Modal.Body>

						<Modal.Footer>
							<Button appearance="ghost" block onClick={onUploadClick}>
								Upload new avatar
							</Button>
						</Modal.Footer>
					</Modal>
				</label>
			</div>
		</div>
	);
};

export default AvatarUploadBtn;
