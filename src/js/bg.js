/*
 * bg.js
 * Copyright (C) 2023 Element Davv<elementdavv@hotmail.com>
 *
 * Distributed under terms of the GPL3 license.
 */

(function(){
    'use strict';

    chrome.action.onClicked.addListener(tab => {
        const url = "https://taiwanebook.ncl.edu.tw";
        chrome.tabs.create({ url: url })
    });

    chrome.tabs.onUpdated.addListener((tabid, changeinfo, tab) => {
        const re = /https:\/\/taiwanebook.ncl.edu.tw\/(zh-tw|en)\/(category|time|collection|search|book)\/.+/;
        const re1 = /reader/;
        if (changeinfo.status == 'complete') {
            if (!tab.url.match(re) || tab.url.match(re1)) return;
            chrome.scripting.executeScript({
                files: ['js/content.js']
                , target: {tabId: tabid}
            });
        }
    });

})();
