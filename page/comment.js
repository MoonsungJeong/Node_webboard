const time = require('../lib/time.js');
const convert = require('../lib/convert.js');

module.exports = function(req,res,data,page){
    let postId = data[0].pcode;
    let list ='';
    let storage = [];
    let b_list = '';    // parent comment list
    let c_list = '';    // child comment list
    let count = 0;      // comment count
    let pCount = 0;     // parent comment count
    let authColor = "";
    
    data.forEach(function(item,index){
        if(item.mcode == item.p_mcode) authColor = "font_green";
        if(item.mcode != item.p_mcode) authColor = "";
        
        if(item.cclass == 1){           // child comment  c_list
            if(item.cdlt == 1){             // deleted?
                c_list = `
                <div class="cbox">
                    <div class="memo comment_dlt ${authColor}">
                        Deleted Comment
                    </div>                   
                </div>
                ` + c_list;
                count++;
                return;
            }else{
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
        }
        if(item.cclass == 0){           // parent comment b_list
            if(item.cdlt == 1){             // // deleted?
                b_list = `
                <div class="comment">
                    <div class="comment_content ${authColor}">
                        Deleted Comment
                    </div>
                    <div>
                        <a class="pointer f_size_1 font_gray" onclick="comOpen('${item.ccode}')">
                            comment
                            <span>${count}</span>
                        </a>
                        <div id="${item.ccode}" class="none">
                            ${c_list}
                        </div>
                    </div>
                </div>
                `;
                c_list = "";
                count = 0;
            }else{
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
            pCount++;
        }
        storage.unshift(b_list);
    });
    /// pCount = n; 
    let perPage = 10; //total parent comment count
    let totalPage = Math.ceil(pCount/perPage);
    let start;
    if(page == "") {start = (totalPage-1)*perPage; page=totalPage;}
    if(page != "") {start = (page-1)*perPage;}
    let end = start + perPage;
    // ---------------------list--------------------------
    list += `<span class="font_skyblue">comment [${data.length}]</span><br>`;
    for(;start<end; start++){
        if(storage[start] == undefined) break;
        list += storage[start];
    }
    // ----------------------pagination--------------------------
    /// totalPage = n;
    /// page = n;
    let pagination = '';
    let pageMax = 5;
    let i = 1 + (Math.ceil(page/pageMax) - 1)*5;
    let j = i+4;
    // onsubmit="return _COMMENT_CHECK(this)";
    if(page != 1) pagination += `<a href="/board/comment/${postId}/1" onclick="return _COMMENT_PAGE_CHANGE(${postId},1)";><i class="fas fa-angle-double-left"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-double-left"></i></a> `;
    if((Math.ceil(page/pageMax)-1) != 0) pagination += `<a href="/board/comment/${postId}/${i-1}" onclick="return _COMMENT_PAGE_CHANGE(${postId},${i-1})";><i class="fas fa-angle-left"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-left"></i></a> `;

    for(; i<=j; i++){
        if(i >totalPage) break;
        if(i == page){
            pagination += `<a class="font_orange" href="/board/comment/${postId}/${i}" onclick="return _COMMENT_PAGE_CHANGE(${postId},${i})";>${i}</a> `; 
            continue;
        }
        pagination += `<a href="/board/comment/${postId}/${i}" onclick="return _COMMENT_PAGE_CHANGE(${postId},${i})";>${i}</a> `;
    }

    if(Math.ceil(page/pageMax)-1 != Math.ceil(totalPage/pageMax)-1) pagination += `<a href="/board/comment/${postId}/${i}" onclick="return _COMMENT_PAGE_CHANGE(${postId},${i})";><i class="fas fa-angle-right"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-right"></i></a> `;
    if(page != totalPage) pagination += `<a href="/board/comment/${postId}/${totalPage}" onclick="return _COMMENT_PAGE_CHANGE(${postId},${totalPage})";><i class="fas fa-angle-double-right"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-double-right"></i></a> `;
    
    if(storage[0] == undefined) pagination = '';
    pagination = `<div class="center">${pagination}</div>`;
    list += pagination;

    return list;
}