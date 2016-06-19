//  ============================
//
//  Sundial - home.js
//  Version 1.0.0
//
//  (c) 2016 by Alpri B. Else
//  Serenity Software
//  All Rights Reserved.
//
//  ============================

var Clock = function() {

};

Clock.init = function(UI, filepath) {
    var hr = new XMLHttpRequest();
    hr.open("GET", filepath, true);
    hr.setRequestHeader("Content-type", "apllication/json", true);
    hr.onreadystatechange = function ()
    {
    	if(hr.readyState == 4 && hr.status == 200)
    	{
    		calendar = JSON.parse(hr.responseText.toString());
    		Clock.callback(calendar, UI);
    	}
    }
    hr.send(null);
}
Clock.callback = function(data, UI) {
    $(UI.time).html(moment().format('LT'));
    $(UI.date).html(moment().format('dddd MMMM Do[,] YYYY'));

    var res = Clock.checkCalendar(data);
    $(UI.dayType).html(res.schedule)

    res = Clock.getSection(data, res);
    $(UI.section).html(res.section);
    $(UI.countdown).html(res.section + ' ends ' + res.countdown);

    setTimeout(function() { Clock.callback(data, UI);}, 1000);
}
Clock.getSection = function(data, res) {
    var schedule = data['Schedules'][res.schedule];
    output = {
        section: 'None',
        countdown: 'None',
        end: 'None'
    }
    schedule.forEach(function(currentValue, index, array) {
        if(moment().isBetween(moment(currentValue.start,'HH:mm'),moment(currentValue.end,'HH:mm'),'minute')) {
            output = {
                section: currentValue.name,
                countdown: moment().to(moment(currentValue.end,'HH:mm')),
                end: currentValue.end
            }
        }
    });
    return output
}
Clock.checkCalendar = function(data) {
    var calendar = data['Calendar'];
    var schedule = '';
    calendar.forEach(function(currentValue, index, array) {
        if(moment(currentValue.start).isSame(moment().format('YYYY[-]MM[-]DD'),'day')) {
            schedule = currentValue.schedule
        }
    });
    schedule = (schedule != '' ? schedule : "Regular Day");
    return {
        schedule: schedule
    }
}
