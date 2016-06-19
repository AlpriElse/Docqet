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
Clock.init(_UI_IDs, calendarFilepath);

var options = {
        valueNames: ['headline', 'desc','meta'],
        item: '<li><h3 class="headline"></h3><p class="desc"></p><p class="meta"></p></li>'
};
var nowList = new List('nowList', options);
    upcomingList = new List('upcomingList',options);

Events.init(_UI_IDs, calendarFilepath,{
    now: nowList,
    upcoming: upcomingList
});
