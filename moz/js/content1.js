/*
 * content1.js
 * Copyright (C) 2023 Element Davv<elementdavv@hotmail.com>
 *
 * Distributed under terms of the GPL3 license.
 */

export default function(){
    'use strict';

    function showDownload() {
        const items = document.getElementsByClassName('items');
        if (items.length > 0) {
            const itemlist = items[0].children;
            for (var i = 0; i < itemlist.length; i++) {
                showForItem(itemlist[i]);
            }
        }
        else {
            showForBook();
        }
    }

    async function showForBook() {
        const blues = document.getElementsByClassName('ui four column grid');
        if (blues.length == 0) return;

        const blue = blues[0];
        const links = await getDownloadLinks(document.URL);
        links.forEach((link, i) => {
            addButton(link, blue, 'afterend');
        });
    }

    async function showForItem(item) {
        const headers = item.getElementsByClassName('header');
        const metas = item.getElementsByClassName('meta');
        if (headers.length == 0) return;
        if (metas.length == 0) return;

        const header = headers[0];
        const meta = metas[0];
        const href = header.getAttribute('href');
        const links = await getDownloadLinks(href);
        links.forEach((link, i) => {
            addButton(link, meta, 'beforeend');
        });
    }

    const base = 'https://taiwanebook.ncl.edu.tw/';
    const classList = ['ui','blue', 'button']

    function addButton(link, node, pos) {
        const a = document.createElement('a');
        a.href = base + link;
        const fname = link.substring(link.lastIndexOf('/') + 1)
        a.download = fname;
        a.textContent = chrome.i18n.getMessage('download') + fname;
        classList.forEach((cls, j) => {
            a.classList.add(cls);
        });
        node.insertAdjacentElement(pos, a);
        const br = document.createElement('br');
        node.insertAdjacentElement(pos, br);
    }

    async function getDownloadLinks(url) {
        const response = await fetch(url+ '/reader');
        if (response.ok) {
            const text = await response.text();
            const re = /ebkFiles.*?PDF/g;
            const files = text.match(re);

            var links = [];
            if (files.length > 1) {
                for (var i = 0; i < files.length - 1; i++) {
                    links.push(files[i]);
                }
            }
            else {
                links.push(files[0]);
            }
        }
        return links;
    }

    console.log('Taiwanebook Downloader v0.1.0 in action');
    showDownload();
};
