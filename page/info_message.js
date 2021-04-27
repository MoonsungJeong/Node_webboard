const msg_box = require("../parts/msgbox.js");
const time = require("../lib/time");

module.exports = function(data,Status,pageNum){
    let select,button;
    let list="";
    if(Status === "recv"){select = "<option value='recv'selected>recv</option><option value='sent'>sent</option>"
                          button = "<button type='submit'>Delete</button> <button id='msg_btn'>Message</button>"}
    if(Status === "sent"){select = "<option value='recv'>recv</option><option value='sent' selected>sent</option>"
                          button = ""}
    data.forEach(function(item,index){
        list += `
            <tr class="line-bottom">
                <td class="padding_side"> <input type="checkbox" name="delete_list" value="${item.ncode}"/></td>
                <td class="font_gray">${item.unickname}</td>
                <td>${item.ncontent}</td>
                <td class="font_gray">${time.formatDate_4(item.ndate)}</td>
            </tr>
        `
    })                  
    return `
    <section>
        <div class="board flex_between test">
            <h2>
                <span class="font_gray">7 message (1/1 page)</span>
            </h2>
            <select onchange="_MSG_STATUS_CHANGE(this.value)" class="padding_right">
                ${select}
            </select>
        </div>
        <div class="flex_col h_size_57">
            <form id="msg_list" class="size_90" method="post" action="/account/info/message/delete" onsubmit="return _AJAX_MSG_DELETE_CHECK()">
                <table class="center size_100">
                    <thead>
                        <tr class="line space_7">
                            <td class="padding_side">ⓥ</td>
                            <td>Sender</td>
                            <td>Content</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody class="f_size_b">
                        <tr class="line-bottom none">
                            <td class="padding_side"> <input type="checkbox" name="delete_list" value="-1"/></td>
                            <td class="font_gray"></td>
                            <td></td>
                            <td class="font_gray"></td>
                        </tr>
                        ${list}
                    </tbody>
                </table>
                <div class="center">
                    <a class="font_gray"><i class="fas fa-angle-double-left"></i></a> 
                    <a class="font_gray"><i class="fas fa-angle-left"></i></a>
                    <a>1</a>
                    <a class="font_gray"><i class="fas fa-angle-right"></i></a>
                    <a class="font_gray"><i class="fas fa-angle-double-right"></i></a>
                </div>
                ${button}
            </form>
        </div>
        ${msg_box}
    </section>
    `;
}