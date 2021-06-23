import React from "react";
import Timeago from "timeago-react";
import ProfileAvatar from "../ProfileAvatar";

const RoomItem = ({ room }) => {
	const { createdAt, name, lastMessage } = room;
	return (
		<div>
			<div className="d-flux justify-content-between align-items-center">
				<h3 className="text-disappear">{name}</h3>
				<Timeago
					datetime={
						lastMessage ? new Date(lastMessage.createdAt) : new Date(createdAt)
					}
					className="font-normal text-black-45"
				/>
			</div>
			<div className="d-flex align-items-center text-black-70">
				{lastMessage ? (
					<>
						<div className="d-flex align-items-center text-black-70">
							<ProfileAvatar
								name={lastMessage.author.name}
								src={lastMessage.author.avatar}
								size="sm"
							/>
						</div>
						<div className="text-disappear ml-2">
							<div className="italic">{lastMessage.author.name}</div>
							<span>{lastMessage.text}</span>
						</div>
					</>
				) : (
					<span>No message yet...</span>
				)}
			</div>
		</div>
	);
};

export default RoomItem;
