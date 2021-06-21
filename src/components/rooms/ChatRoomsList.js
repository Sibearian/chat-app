import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav, Loader } from "rsuite";
import { useRooms } from "../../context/rooms.context";
import RoomItem from "./RoomItem";

const ChatRoomsList = ({ aboveElementHeight }) => {
	const rooms = useRooms();
	const loaction = useLocation();

	return (
		<Nav
			appearance="subtle"
			vertical
			reversed
			className="overflow-y-scroll custom-scroll"
			style={{
				height: `calc(100%-${aboveElementHeight}px)`,
			}}
			activeKey={loaction.pathname}
		>
			{!rooms && (
				<Loader center vertical content="Loading" speed="slow" size="md" />
			)}
			{rooms &&
				rooms.length > 0 &&
				rooms.map((room) => {
					return (
						<Nav.Item
							componentClass={Link}
							to={`/chat/${room.id}`}
							key={room.id}
							eventKey={`/chat/${room.id}`}
						>
							<RoomItem room={room} />
						</Nav.Item>
					);
				})}
		</Nav>
	);
};

export default ChatRoomsList;
