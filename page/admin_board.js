const time = require('../lib/time.js');
const sanitizeHtml = require("sanitize-html");

module.exports = function(results){
    let info;
    let list = '';
    let i;
    for(i=0; i < results.length; i++){
        info = results[i];
        list += `
        <li class="post_item flex">
            <a href="/board/total/1/${info.pcode}" class="flex_item_1">
                <div>
                    <div>${sanitizeHtml(info.btitle)}</div>
                    <div class="font_gray f_size_1">
                        <span>${sanitizeHtml(info.author)} | </span>
                        <span>${time.formatDate_1(info.bdate)} | </span>
                        <span>view ${info.bcount}</span>
                    </div>
                </div>
            </a>
            <button onclick="_ADMIN_POST_DELETE(${info.pcode})">dlt</button>
        </li>
        `
    }
    return `
    <div>
        <section class="board">
            <h2 class="flex_between">
                <a class="font_gray">Total Post ${results.length}</a>
                <span class="font_gray"></span>
            </h2>
        </section>
        <section>
            <ul class="post_top margin_side_1">
                ${list}
            </ul>
        </section>
    </div>
    `;
}