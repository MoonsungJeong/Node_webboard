const time = require("../lib/time");

module.exports = function(data, pageNum){
    // ---------------------list--------------------------
    let perPage = 10;
    let start = (pageNum-1)*perPage;
    let end = start+perPage;
    let list = '';
    
    for(;start<end; start++){
        if(data[start] === undefined)
            break;
        list += `
        <li class="post_item">
            <a href="/board/total/1/${data[start].pcode}">
                <div>
                    <div>${data[start].comment}</div>
                    <div class="font_gray f_size_1">
                        <span>${time.formatDate(data[start].cdate)}</span>
                    </div>
                </div>
            </a>
        </li>        
        `
    }
    // ----------------------pagination-------------------------- 
    let pagination = '';
    let pageMax = 5;
    let totalPage = Math.ceil(data.length/perPage);
    let i = 1 + (Math.ceil(pageNum/pageMax) - 1)*5;
    let j = i+4;
    
    if(pageNum != 1) pagination += `<a href="/account/info/comment/1"><i class="fas fa-angle-double-left"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-double-left"></i></a> `;
    if((Math.ceil(pageNum/pageMax)-1) != 0) pagination += `<a href="/account/info/comment/${i-1}"><i class="fas fa-angle-left"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-left"></i></a> `;

    for(; i <= j ; i++){
        if(i > totalPage) break;
        if(i == pageNum){
            pagination += `<a class="font_orange" href="/account/info/comment/${i}">${i}</a> `; 
            continue;
        }
        pagination += `<a href="/account/info/comment/${i}">${i}</a> `;
    }
    if(Math.ceil(pageNum/pageMax)-1 != Math.ceil(totalPage/pageMax)-1) pagination += `<a href="/account/info/comment/${i}"><i class="fas fa-angle-right"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-right"></i></a> `;
    if(pageNum != totalPage) pagination += `<a href="/account/info/comment/${totalPage}"><i class="fas fa-angle-double-right"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-double-right"></i></a> `;
    
    if(data[0] == undefined) pagination = '';            // if no post, no pagination

    return `
    <section>
        <div class="board">
            <h2>
                <span class="font_gray">${data.length} comment (${pageNum}/${totalPage} page)</span>
            </h2>
        </div>
        <div>
            <ul class="post_top margin_side_1">
                <li class="line-bottom"></li>
                ${list}
            </ul>
        </div>
        <div>
            <div class="center">
                ${pagination}
            </div>
        </div>
    </section>
    `;
}