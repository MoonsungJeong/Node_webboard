const msg_box = require("../parts/msgbox.js");
const codec = require("../lib/codec");
const time = require("../lib/time");
const sanitizeHtml = require("sanitize-html");

module.exports = function(data,Status,pageNum){
    let select,button,person;
    if(Status === "recv"){select = "<option value='recv'selected>recv</option><option value='sent'>sent</option>"
                          button = "<button id='msg_dlt_btn' type='submit'>Delete</button> <button id='msg_btn'>Message</button>"
                          person = "Sender"}
    if(Status === "sent"){select = "<option value='recv'>recv</option><option value='sent' selected>sent</option>"
                          button = ""
                          person = "Receiver"}
    // ---------------------list--------------------------
    let perPage = 10;
    let start = (pageNum-1)*perPage;
    let end = start+perPage;
    let list = '';
    for(;start<end; start++){
        if(data[start] === undefined)
            break;
        list += `
        <tr class="line-bottom">
            <td class="padding_side"> <input type="checkbox" name="delete_list" value="${data[start].ncode}"/></td>
            <td class="font_gray">${sanitizeHtml(data[start].unickname)}</td>
            <td><a class="pointer" onclick="_MSG_USER_CODE(${codec.code_num(data[start].mcode)})">${sanitizeHtml(data[start].ncontent)}</a></td>
            <td class="font_gray">${time.formatDate_2(data[start].ndate)}</td>
        </tr>
        `
    }
    // ----------------------pagination-------------------------- 
    let pagination = '';
    let pageMax = 5;
    let totalPage = Math.ceil(data.length/perPage);
    let i = 1 + (Math.ceil(pageNum/pageMax) - 1)*5;
    let j = i+4;
    
    if(pageNum != 1) pagination += `<a href="/account/info/message/${Status}/1"><i class="fas fa-angle-double-left"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-double-left"></i></a> `;
    if((Math.ceil(pageNum/pageMax)-1) != 0) pagination += `<a href="/account/info/message/${Status}/${i-1}"><i class="fas fa-angle-left"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-left"></i></a> `;

    for(; i <= j ; i++){
        if(i > totalPage) break;
        if(i == pageNum){
            pagination += `<a class="font_orange" href="/account/info/message/${Status}/${i}">${i}</a> `; 
            continue;
        }
        pagination += `<a href="/account/info/message/${Status}/${i}">${i}</a> `;
    }
    if(Math.ceil(pageNum/pageMax)-1 != Math.ceil(totalPage/pageMax)-1) pagination += `<a href="/account/info/message/${Status}/${i}"><i class="fas fa-angle-right"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-right"></i></a> `;
    if(pageNum != totalPage) pagination += `<a href="/account/info/message/${Status}/${totalPage}"><i class="fas fa-angle-double-right"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-double-right"></i></a> `;
    
    if(data[0] == undefined) pagination = '';            // if no post, no pagination

                      
    return `
    <section>
        <div class="board flex_between test">
            <h2>
                <span class="font_gray">${data.length} message (${pageNum}/${totalPage} page)</span>
            </h2>
            <select onchange="_MSG_STATUS_CHANGE(this.value)" class="padding_right">
                ${select}
            </select>
        </div>
        <div class="flex_col h_size_57">
            <form id="msg_list" class="size_90" method="post" action="/account/info/message/delete" onsubmit="return false">
                <table class="center size_100">
                    <thead>
                        <tr class="line space_7">
                            <td class="padding_side">ⓥ</td>
                            <td>${person}</td>
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
                    ${pagination}
                </div>
                ${button}
            </form>
        </div>
        ${msg_box}
    </section>
    `;
}