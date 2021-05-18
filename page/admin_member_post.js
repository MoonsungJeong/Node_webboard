const time = require('../lib/time.js');
const sanitizeHtml = require("sanitize-html");

module.exports = function(results){
    let info;
    let list = '';
    let i;
    for(i=0; i < results.length; i++){
        info = results[i];
        list += `
        <li class="post_item">
            <a href="/board/total/1/${info.pcode}">
                <div>
                    <div>${sanitizeHtml(info.btitle)}</div>
                    <div class="font_gray f_size_1">
                        <span>${time.formatDate_1(info.bdate)} | </span>
                        <span>view ${info.bcount}</span>
                    </div>
                </div>
            </a>
        </li>
        `
    }
    return `
    <div>
        <h2 class="flex_between">
            <a class="font_gray">Post ${results.length}</a>
            <span class="font_gray"></span>
        </h2>
    </div>
        <ul class="post_top">
            ${list}
        </ul>
    `;
}