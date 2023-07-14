/*
 * content.js
 * Copyright (C) 2023 Element Davv<elementdavv@hotmail.com>
 *
 * Distributed under terms of the GPL3 license.
 */

(async () => {
    if (typeof window.content1ted === 'undefined' ) {
        const src = chrome.runtime.getURL('js/content1.js');
        window.content1ted = await import(src);
        window.content1ted.default();
    }
})();
