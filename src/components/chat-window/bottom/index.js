import React, { useCallback, useState } from "react";
import { InputGroup, Input, Icon, Alert } from "rsuite";
import { useParams } from "react-router";
import firebase from "firebase";

import { useProfile } from "../../../context/profile.context";
import { database } from "../../../misc/firebase";

function assembleMessage(profile, chatId) {
	return {
		roomId: chatId,
		author: {
			name: profile.name,
			uid: profile.uid,
			createdAt: profile.createdAt,
			...(profile.avatar ? { avatar: profile.avatar } : {}),
		},
		createdAt: firebase.database.ServerValue.TIMESTAMP,
	};
}

const Bottom = () => {
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { profile } = useProfile();
	const { chatId } = useParams();

	const onInputChange = useCallback((value) => {
		setInput(value);
	}, []);

	const onSendClick = async () => {
		if (input.trim() === "") {
			return;
		}
		const msgData = assembleMessage(profile, chatId);

		msgData.text = input;

		const updates = {};

		const messageId = database.ref("messages").push().key;

		updates[`/messages/${messageId}`] = msgData;
		updates[`/rooms/${chatId}/lastMessage`] = {
			...msgData,
			msgId: messageId,
		};

		setIsLoading(true);

		try {
			await database.ref().update(updates);

			setIsLoading(false);
			setInput("");
		} catch (error) {
			setIsLoading(false);
			Alert.error(error.message);
		}
	};

  const onKeyDown = (evt) => {
    if(evt.keyCode === 13){
      evt.preventDefault()
      onSendClick()
    }
  }

	return (
		<div>
			<InputGroup>
				<Input
					placeholder="Write a new message here..."
					value={input}
					onChange={onInputChange}
          onKeyDown={onKeyDown}
				/>
				<InputGroup.Button
					onClick={onSendClick}
					color="blue"
					appearance="primary"
          disabled={isLoading}
				>
					<Icon icon="send" />
				</InputGroup.Button>
			</InputGroup>
		</div>
	);
};

export default Bottom;
