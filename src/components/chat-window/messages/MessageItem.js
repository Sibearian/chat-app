import React from "react";
import TimeAgo from "timeago-react";

import PresenceDot from "../../PresenceDot";
import ProfileInfoBtnModal from "./ProfileInfoBtnModal";
import ProfileAvatar from "../../ProfileAvatar";

const MessageItem = ({ message }) => {
	const { author, createdAt, text } = message;

	return (
		<li className="padded md-1">
			<div className="d-felx align-item-center font-bolder mb-1">

				<PresenceDot uid={author.uid}/>

				<ProfileAvatar
					src={author.avatar}
					name={author.name}
					className="ml-1"
					size="xs"
				/>
				<ProfileInfoBtnModal
					profile={author}
					appearance="link"
					className="p-0 ml-1 text-black"
				/>
				<TimeAgo datetime={createdAt} className="font-normal text-black-45 ml-2" />
			</div>
			<div> 
				<span className="word-breal-all">{text}</span>
			</div>
		</li>
	);
};

export default MessageItem;
