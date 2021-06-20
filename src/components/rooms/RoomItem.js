import React from "react";
import Timeago from "timeago-react";

const RoomItem = () => {
	return (
		<div>
			<div className="d-flux justify-content-between align-items-center">
				<h3 className="text-disappear">Room name</h3>
				<Timeago datetime={new Date()} className="font-normal text-black-45" />
			</div>
			<div className="d-flex align-items-center text-black-70">
				<span>No message yet...</span>
			</div>
		</div>
	);
};

export default RoomItem;
