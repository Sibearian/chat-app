import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Icon, ButtonToolbar } from "rsuite";

import EditRoomBtnDrawer from "./EditRoomBtnDrawer";
import { useCurrentRoom } from "../../../context/current-room.context";
import { useMediaQuery } from "../../../misc/custom-hooks";
import RoomInfoBtnModal from "./RoomInfoBtnModal";

const Top = () => {
	const name = useCurrentRoom((val) => val.name);
	const isAdmin = useCurrentRoom((val) => val.isAdmin);

	const isMobile = useMediaQuery("(max-width: 992px)");

	return (
		<div>
			<div className="d-flex justify-content-between align-items">
				<h4 className="text-disappear d-flex align-items-center">
					<Icon
						componentClass={Link}
						to="/"
						icon="arrow-circle-left"
						size="2x"
						className={
							isMobile
								? "d-inline-block p-0 mr-2 text-blue link-unstyled"
								: "d-none"
						}
					/>
					<span className="text-disappear">{name}</span>
				</h4>
				<ButtonToolbar className="ws-nowrap">
					{isAdmin && <EditRoomBtnDrawer />}
				</ButtonToolbar>
			</div>
			<div className="d-flex justify-content-between align-items-center">
				<span>todo</span>
				<RoomInfoBtnModal />
			</div>
		</div>
	);
};

export default memo(Top);
