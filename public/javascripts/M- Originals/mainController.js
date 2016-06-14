//  ============================
//
//  Maine Dashboard
//  Version 2.1
//
//  (c) 2016 by Alpri B. Else
//  Serenity Software
//  All Rights Reserved.
//
//  ============================

var dayType = 0,
	dayTypeSTR = "",
	//	Daytype - 0 = No School, 1 = Regular, 2 = Late-Start, 3 = Hawk Pride
	//  4 = Assembly, 5 = Testing Day, 6 = Finals Day 1, 7 = Finals Day 2, 8 = Finals Day 3

	//	Time Related Variables
	twelveHrPeriod = "",
	currentMinuteOfDay = 0,

	//	Date Related Variables
	currentDayOfMonth = 0,
	currentMonth = 0,
	currentYear = 0,
	currentDayOfWeek = 0,

	//	Schedule related variables
	period = "",
	index = 0,
	scheduleType,

	//	Utility Variables
	visible = false,
	U = new Util(),

	//	Event related variables
	upcomingEvents = [],
	countdowns = [],
	indexes = [];

	//	Data set variables
var calendar,
	schedule;

	//	UI Variables
var size = 10,
	mode = 0; // 0 --> Dark, 1 --> Light

function init()
{
	calendar = U.getCalendarJSON();
	schedule = U.getScheduleJSON();
	loop();
	clockStart();
}

function loop()
{
	variableUpdator();
	currentMinuteOfDay+=1;
	setTimeout(function() { loop(); }, 1000);
}

function variableUpdator()
{
	//	Variableupdator() updates global variables used by all other functions
	var d = new Date();

	//	Time Variables
	currentHour = d.getHours();
	currentMinute = d.getMinutes();
	currentMinuteOfDay = currentHour * 60 + currentMinute;

	//	Date Variables
	currentDayOfMonth = d.getDate(); 	//	1st = 1...31st = 31
	currentMonth = d.getMonth() + 1; 	//	Jan = 1...Dec = 12
	currentYear = d.getFullYear();
	currentDayOfWeek = d.getDay(); 		//	Sun = 0...Sat = 6
}
init();
