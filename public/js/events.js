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
var Events = new function() {
}

Events.nowList = {};
Events.upcomingList = {};
Events.calendar = {};

Events.init = function(UI,filepath, lists) {
    Events.nowList = lists.now;
    Events.upcomingList = lists.upcoming;

    var hr = new XMLHttpRequest();
    hr.open("GET", filepath, true);
    hr.setRequestHeader("Content-type", "apllication/json", true);
    hr.onreadystatechange = function () {
    	if(hr.readyState == 4 && hr.status == 200) {
    		calendar = JSON.parse(hr.responseText.toString());
            Events.calendar = calendar;
    		Events.callback(UI);
    	}
    }
    hr.send(null);
}
Events.callback = function(UI) {
    Events.fill(UI);
    setTimeout(function() { Events.update(UI); }, 1000);
}
Events.fill = function(UI) {
    var events = Events.calendar['Event List'];

    events.forEach(function(currentValue, index, array) {
        if(currentValue.isAllDay) {
            //  Whole Day Event Logic
            var eventDay = moment(currentValue.moment,'YYYY-MM-DD');
            if(moment().isSame(eventDay,'day')) {
                Event.nowListHandler({
                    event: currentValue,
                    index: index,
                });
            } else if(moment().isBefore(eventDay)) {
                Event.upcomingListHandler({
                    event: currentValue,
                    index: index
                });
            }
        } else {
            //  Constrainted Event Logic
            var eventStart = moment(currentValue.moment.start, 'YYYY-MM-DD HH:mm'),
                eventEnd = moment(currentValue.moment.end, 'YYYY-MM-DD HH:mm'),
                eventRange = moment.range(eventStart,eventEnd);
            if(moment().within(eventRange)) {
                Event.nowListHandler({
                    event: currentValue,
                    index: index
                });
            } else if(moment().isBefore(eventStart)) {
                Event.upcomingListHandler({
                    event: currentValue,
                    index: index
                });
            }
        }
    });
}
Event.nowListHandler = function(req) {
    Events.nowList.add({
        headline: req.event.name,
        desc: req.event.desc,
        meta: req.event
    });
}
Event.upcomingListHandler = function(req) {
    Events.upcomingList.add({
        headline: req.event.name + ' is ' + moment().to(moment(req.event.moment)),
        desc: req.event.desc,
        meta: req.event
    });
}
Events.prun = function () {
    //  Cycle Through Events nowList
    Events.nowList.items.forEach(function(currentValue, index, array) {
        var obj = currentValue._values.meta,
            thisMoment = currentValue._values.meta.moment;
        if(obj.isAllDay) {
            if(moment().isAfter(moment(thisMoment,'YYYY-MM-DD'), 'day')) {
                Events.nowList.remove('headline', obj.name);
            }
        } else {
            if(moment().isAfter(moment(thisMoment.end,'YYYY-MM-DD HH:mm'),'minute')) {
                Events.nowList.remove('headline', obj.name);
            }
        }
    });

    //  Cycle Through Events upcomingList
    Events.upcomingList.items.forEach(function(currentValue, index, array) {
        var obj = currentValue._values.meta,
            thisMoment = currentValue._values.meta.moment;
        if(obj.isAllDay) {
            if(moment().isSame(moment(thisMoment,'YYYY-MM-DD'), 'day')) {
                Events.upcomingList.remove('headline', obj.name);
                Events.nowList.add({
                    headline: obj.name,
                    desc: obj.desc,
                    meta: obj
                });
                return;
            }
        } else {
            if(moment().isAfter(moment(thisMoment.start,'YYYY-MM-DD HH:mm'),'minute')) {
                Events.upcomingList.remove('meta', obj);
                Events.nowList.add({
                    headline: obj.name,
                    desc: obj.desc,
                    meta: obj
                });
                return;
            }
        }

        //  Update Countdown
        var temp = obj.isAllDay ? [obj.moment,'YYYY-MM-DD'] : [obj.moment.start,'YYYY-MM-DD HH:mm'];
        currentValue.values({
            headline: obj.name + ' is ' + moment().to(moment(temp[0],temp[1]))
        });

    });
}
Events.update = function(UI) {
    //Events.nowList.add({name:'name',desc:'desc'});
    Events.prun();
    setTimeout(function() { Events.update(UI); }, 1000);
}
