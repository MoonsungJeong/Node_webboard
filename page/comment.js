const time = require('../lib/time.js');
const convert = require('../lib/convert.js');

module.exports = function(req,res,data){
    let list ='';
    let b_list = '';
    let c_list = '';
    let count = 0;
    let authColor = ""; 
    data.forEach(function(item,index){
        if(item.mcode == item.p_mcode) authColor = "font_green";
        if(item.mcode != item.p_mcode) authColor = "";
        if(item.cclass == 1){
            c_list = `
            <div class="cbox">
                <div class="comment_info">
                    <span class="f_size_b">${item.unickname}</span>
                    <span class="f_size_1">${convert.IP(item.cip)}</span>
                </div>
                <div class="memo ${authColor}">
                    ${item.comment}
                </div>                   
                <div class="comment_date">
                    <span class="font_gray f_size_1">${time.commentDate(item.cdate)}</span>
                    <button><a href="/board/comment/${item.ccode}" onclick="return _DELETE_COMMENT(${item.ccode})">delete</a></button>
                </div>
            </div>
            ` + c_list;
            count++;
            return;
        }
        if(item.cclass == 0){
            b_list = `
            <div class="comment">
                <div class="comment_info">
                    <span class="f_size_b">${item.unickname}</span>
                    <span class="f_size_1">${convert.IP(item.cip)}</span>
                    <span class="font_gray f_size_1">${time.commentDate(item.cdate)}</span>
                    <button><a href="/board/comment/${item.ccode}" onclick="return _DELETE_COMMENT(${item.ccode})">delete</a></button>
                </div>
                <div class="comment_content ${authColor}">
                    ${item.comment}
                </div>
                <div>
                    <a class="pointer f_size_1 font_gray" onclick="comOpen('${item.ccode}')">
                        comment
                        <span>${count}</span>
                    </a>
                    <div id="${item.ccode}" class="none">
                        ${c_list}
                        <div class="wbox">
                            <form class="comment_form" method="POST" action="/" onsubmit="return _COMMENT_CHECK(this)";>
                                <textarea class="comment_box" name="content"></textarea>
                                <input type="submit" class="comment_btn" value="submit">
                                <input type="hidden" name="post" value="${item.pcode}">
                                <input type="hidden" name="class" value="1">
                                <input type="hidden" name="ccode" value="${item.ccode}">
                            </form>            
                        </div>
                    </div>
                </div>
            </div>
            `;
            c_list = "";
            count = 0;
        }
        list = b_list + list;
    });
    list = `<span class="font_skyblue">comment ${data.length}</span><br>` + list;
    return list;
}