import React, { useState } from "react";

import AvatarEditor from "react-avatar-editor";
import { Modal, Button, Alert } from "rsuite";
import { useModalState } from "../../misc/custom-hooks";


const fileInputTypes = ".png, .jpg, .jpeg";
const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjepg"];
const isValidFile = (file) => acceptedFileTypes.includes(file.type);

const AvatarUploadBtn = () => {
	const [img, setImg] = useState(null);
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

	return (
		<div className="mt-3 text-center">
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
              <div className="d-flex justify-content-center align-items-center h-100" >
              
              {img && 
                <AvatarEditor image={img} width={200} height={200} border={10} borderRadius={100} rotate={0} />
              }
              </div>
            </Modal.Body>

						<Modal.Footer>
							<Button appearance="ghost" block>
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
