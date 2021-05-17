const time = require('../lib/time.js');
const codec = require("../lib/codec");
const msgbox = require("../parts/msgbox");

module.exports = function(results){
    let info;
    let list = '';
    let i;
    for(i=0; i < results.length; i++){
        info = results[i];
        list += `
        <li class="post_item">
            <a href="#" onclick="_ADMIN_MEMBER_PANEL(${codec.code_num(info.mcode)})">
                <div>
                    <div>${info.unickname}(${info.uid})</div>
                    <div class="font_gray f_size_1">
                        <span>Member | </span>
                        <span>RegDate ${time.formatDate_2(info.udate)}</span>
                    </div>
                </div>
            </a>
        </li>
        `
    }
    return `
    <div>
        <section class="board">
            <h2 class="flex_between">
                <a class="font_gray">Total Member ${results.length}</a>
                <span class="font_gray"></span>
            </h2>
        </section>
        <section>
            <ul class="post_top margin_side_1">
                ${list}
            </ul>
        </section>
        ${msgbox}
    </div>
    `;
}