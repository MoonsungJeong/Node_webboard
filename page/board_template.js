const ad_1 = require('../parts/ad_1.js');
const time = require('../lib/time.js');

module.exports = function(board,results, page){
    let info;
    let perPage = 10;
    let start = (page-1)*perPage;
    let end = start+perPage;
    let list = '';
    // list
    for(;start<end; start++){
        info = results[start]; 
        if(info === undefined)
            break;
        list = list +`  
        <li class="post_item">
            <a href="/board/list/${info.pcode}">
                <div>
                    <div>${info.btitle}<!--<span>[3]</span>--></div>
                    <div class="font_gray f_size_1">
                        <span>${info.author} | </span>
                        <span>${time.formatDate(info.bdate)} | </span>
                        <span>count ${info.bcount} | </span>
                        <span class="font_skyblue">likes ${info.blikes}</span>
                    </div>
                </div>
            </a>
        </li>
        `
    } 
    let pagination = '';
    let pageMax = 5;
    let totalPage = Math.ceil(results.length/perPage);
    let i = 1 + (Math.ceil(page/pageMax) - 1)*5;
    let j = i+4;
    
    if(page != 1) pagination += `<a href="/board/${board}/1"><i class="fas fa-angle-double-left"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-double-left"></i></a> `;
    if((Math.ceil(page/pageMax)-1) != 0) pagination += `<a href="/board/${board}/${i-1}"><i class="fas fa-angle-left"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-left"></i></a> `;

    for(; i <= j ; i++){
        if(i > totalPage) break;
        if(i == page){
            pagination += `<a class="font_orange" href="/board/${board}/${i}">${i}</a> `; 
            continue;
        }
        pagination += `<a href="/board/${board}/${i}">${i}</a> `;
    }

    if(Math.ceil(page/pageMax)-1 != Math.ceil(totalPage/pageMax)-1) pagination += `<a href="/board/${board}/${i}"><i class="fas fa-angle-right"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-right"></i></a> `;
    if(page != totalPage) pagination += `<a href="/board/${board}/${totalPage}"><i class="fas fa-angle-double-right"></i></a> `;
    else pagination += `<a class="font_gray"><i class="fas fa-angle-double-right"></i></a> `;
    
    return `
    <main>
        ${ad_1}
        <section class="board">
            <h2 class="flex_between">
                <a class="font_gray" href="/board/${board}/1">${board} board</a>
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
                <form>
                    <input type="hidden">
                    <select>
                        <option>title</option>
                        <option>content</option>
                        <option>author</option>
                    </select>
                    <span>
                        <input type="text">
                    </span>
                    <button type="submit">search</button>
                </form>
                <div>
                    <button>list</button>
                    <button><a href="/board/new">write</a></button>
                </div>
            </div>
        </section>
        ${ad_1}
    </main>
    `;
}