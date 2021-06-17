import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
	apiKey: "AIzaSyAbt8iiZ-VWL2xa4Z-YpTGl0fRMINbNeC8",
	authDomain: "chat-web-app-97b27.firebaseapp.com",
	projectId: "chat-web-app-97b27",
	storageBucket: "chat-web-app-97b27.appspot.com",
	messagingSenderId: "394698411529",
	appId: "1:394698411529:web:127ccf36d104265cf5f2d8",
};

const app = firebase.initializeApp(config);

export const database = app.database();
export const auth = app.auth();
export const storage = app.storage()
