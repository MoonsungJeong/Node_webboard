const time = require('../lib/time.js');

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
                    <div>${info.comment}</div>
                    <div class="font_gray f_size_1 margin_tb_04">
                        <span>${time.formatDate_4(info.cdate)}</span>
                    </div>
                    <div class="f_size_1">${info.btitle}</div>
                </div>
            </a>
        </li>     
        `
    }
    return `
    <div>
        <h2 class="flex_between">
            <a class="font_gray">Comment ${results.length}</a>
            <span class="font_gray"></span>
        </h2>
    </div>
        <ul class="post_top">
            ${list}
        </ul>
    `;
}