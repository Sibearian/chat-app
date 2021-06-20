import React, { useEffect, useRef, useState } from "react";
import { Divider } from "rsuite";

import CreateRoomBtnModal from "./CreateRoomBtnModal";
import DashboardToggle from "./dashboard/DashboardToggle";
import ChatRoomsList from "./rooms/ChatRoomsList";

const Sidebar = () => {
	const topSidebarRef = useRef();
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (topSidebarRef.current){
			setHeight(topSidebarRef.current.scrollHeight)
		}
	}, [topSidebarRef])

	return (
		<div className="h-100 pt-2">
			<div>
				<DashboardToggle />
				<CreateRoomBtnModal />
				<Divider>Join Conversation</Divider>
			</div>
			<ChatRoomsList aboveElementHeight={height}/>
		</div>
	);
};

export default Sidebar;
