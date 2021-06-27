import React, { useCallback } from "react";
import { Button, Icon, Drawer, Alert } from "rsuite";
import { useModalState, useMediaQuery } from "../../misc/custom-hooks";
import Dashboard from "./Index";
import { auth, database } from "../../misc/firebase";
import { isOfflineForDatabase } from "../../context/profile.context";

const DashboardToggle = () => {
	const { isOpen, close, open } = useModalState();
	const isMobile = useMediaQuery("(max-width: 992px)");

	const onSignOut = useCallback(() => {
		database
			.ref(`/status/${auth.currentUser.uid}`)
			.set(isOfflineForDatabase)
			.then(() => {
				auth.signOut();
				Alert.info("Signed out", 4000); 
				close();
			}).catch(error => {
				Alert.error(error.message, 4000)
			});
	}, [close]);

	return (
		<>
			<Button block color="blue" onClick={open}>
				<Icon icon="dashboard" /> Dashboard
			</Button>
			<Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
				<Dashboard onSignOut={onSignOut} />
			</Drawer>
		</>
	);
};

export default DashboardToggle;
