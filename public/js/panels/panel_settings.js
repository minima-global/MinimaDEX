
const notifytrade 	= document.getElementById('id_settings_notify_trade');
const notifychat 	= document.getElementById('id_settings_notify_chat');
const animatechart 	= document.getElementById('id_settings_animate_chart');

notifytrade.addEventListener('click', () => {
	USER_SETTINGS.notifytrade = notifytrade.checked;
	if(USER_SETTINGS.notifytrade){
		requestNotifications();
	}
	saveUserSettings();
});

notifychat.addEventListener('click', () => {
	USER_SETTINGS.notifychat = notifychat.checked;
	if(USER_SETTINGS.notifychat){
		requestNotifications();
	}
	saveUserSettings();
});

animatechart.addEventListener('click', () => {
	USER_SETTINGS.animatechart = animatechart.checked;
	
	CHART_ANIMATION = USER_SETTINGS.animatechart;
	
	saveUserSettings();
});

function initSettings(){
	notifytrade.checked 	= USER_SETTINGS.notifytrade;
	notifychat.checked 		= USER_SETTINGS.notifychat;
	animatechart.checked 	= USER_SETTINGS.animatechart;
}

function loadUserSettings(){
	//Load
	USER_SETTINGS = STORAGE.getData("**USER_SETTINGS**");
	
	//Check if exists
	var needsave= false;
	if(USER_SETTINGS == null){
		needsave= true;
		
		//Default settings..
		USER_SETTINGS = {};
		USER_SETTINGS.notifytrade 	= false;
		USER_SETTINGS.notifychat 	= false;
		USER_SETTINGS.animatechart 	= true;
	}
	
	if(typeof(USER_SETTINGS.notifytrade) == "undefined"){
		needsave = true;
		USER_SETTINGS.notifytrade = false;
	}
	
	if(typeof(USER_SETTINGS.notifychat) == "undefined"){
		needsave = true;
		USER_SETTINGS.notifychat = false;
	}
	
	if(typeof(USER_SETTINGS.animatechart) == "undefined"){
		needsave = true;
		USER_SETTINGS.animatechart = true;
	}
	
	//Save them..
	if(needsave){
		saveUserSettings();	
	}
	
	/**
	 * Global Settings
	 */
	
	//The USER picks a random UID - that is not shared.. this is for the server
	var user_global = STORAGE.getDataGlobal("**USER_GLOBAL**");
	if(user_global == null){
		
		//Default global..
		user_global 		= {};
		user_global.uuid 	= getRandomHexString();
		
		STORAGE.setDataGlobal("**USER_GLOBAL**",user_global);
	}
	
	//And set
	USER_SETTINGS.uuid_rate = user_global.uuid;
}

function saveUserSettings(){
	STORAGE.setData("**USER_SETTINGS**",USER_SETTINGS);
}
