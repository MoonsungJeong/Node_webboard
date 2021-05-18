const ad_1 = require('../parts/ad_1.js');
const time = require('../lib/time.js');
const sanitizeHtml = require("sanitize-html");

module.exports = function(option,keyword,page,post,results){// option, keyword, page, post, results
    let data;
    let perPage = 10;
    let start = (page-1)*perPage;
    let end = start+perPage;
    let list = '';
    // ---------------------list--------------------------
    for(;start<end; start++){
        data = results[start];
        if(data === undefined)
            break;
        if(data.pcode == post){
            list += `  
            <li class="post_item space_7">
                <a href="/search/${option}/${keyword}/${page}/${data.pcode}">
                    <div>
                        <div>${sanitizeHtml(data.btitle)}</div>
                        <div class="font_gray f_size_1">
                            <span>${sanitizeHtml(data.author)} | </span>
                            <span>${time.formatDate(data.bdate)} | </span>
                            <span>view ${data.bcount} | </span>
                            <span class="font_skyblue">likes ${data.blikes}</span>
                        </div>
                    </div>
                </a>
            </li>
            `
            continue;
        }
        list += `  
        <li class="post_item">
            <a href="/search/${option}/${keyword}/${page}/${data.pcode}">
                <div>
                    <div>${sanitizeHtml(data.btitle)}</div>
                    <div class="font_gray f_size_1">
                        <span>${sanitizeHtml(data.author)} | </span>
                        <span>${time.formatDate(data.bdate)} | </span>
                        <span>view ${data.bcount} | </span>
                        <span class="font_skyblue">likes ${data.blikes}</span>
                    </div>
                </div>
            </a>
        </li>
        `
    } 
    // ----------------------pagination-------------------------- 
    let pagination = '';
    let pageMax = 5;
    let totalPage = Math.ceil(results.length/perPage);
    let i = 1 + (Math.ceil(page/pageMax) - 1)*5;
    let j = i+4;
    
    if(page != 1) pagination += `<a href="/search/${option}/${keyword}/1"><i class="fas fa-angle-double-left"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-double-left"></i></a> `;
    if((Math.ceil(page/pageMax)-1) != 0) pagination += `<a href="/search/${option}/${keyword}/${i-1}"><i class="fas fa-angle-left"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-left"></i></a> `;

    for(; i <= j ; i++){
        if(i > totalPage) break;
        if(i == page){
            pagination += `<a class="font_orange" href="/search/${option}/${keyword}/${i}">${i}</a> `; 
            continue;
        }
        pagination += `<a href="/search/${option}/${keyword}/${i}">${i}</a> `;
    }
    if(Math.ceil(page/pageMax)-1 != Math.ceil(totalPage/pageMax)-1) pagination += `<a href="/search/${option}/${keyword}/${i}"><i class="fas fa-angle-right"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-right"></i></a> `;
    if(page != totalPage) pagination += `<a href="/search/${option}/${keyword}/${totalPage}"><i class="fas fa-angle-double-right"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-double-right"></i></a> `;
    
    if(results[0] == undefined) pagination = '';            // if no post, no pagination
    // ----------------------option selected-------------------------- 
    let select;
    if(option === "title"){select="<option value='title' selected>title</option><option value='content'>content</option><option value='author'>author</option>"}
    if(option === "content"){select="<option value='title'>title</option><option value='content' selected>content</option><option value='author'>author</option>"}
    if(option === "author"){select="<option value='title'>title</option><option value='content'>content</option><option value='author' selected>author</option>"}
    
    return `
    <div>
        ${ad_1}
        <section class="board">
            <h2 class="flex_between">
                <a class="font_gray">search board</a>
                <span class="font_gray">${results.length} post (${page}/${totalPage} page)</span>
            </h2>
        </section>
        <section>
            <ul class="post_top margin_side_1">
                ${list}
            </ul>
        </section>
        <section>
            <div class="center">
                ${pagination}
            </div>
            <div class="center flex_around">
                <form onsubmit="return _AJAX_SEARCH_SEND(this)">
                    <select name="option" class="size_03">
                        ${select}
                    </select>
                    <span>
                        <input class="size_08" name="keyword" type="text" value="${keyword}">
                    </span>
                    <button>search</button>
                </form>
                <div>
                    <button><a href="/search/${option}/${keyword}/${page}">list</a></button>
                    <button><a href="/board/new">write</a></button>
                </div>
            </div>
        </section>
        ${ad_1}
    </div>
    `;
}