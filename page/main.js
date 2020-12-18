const ad_1 = require('../parts/ad_1.js');

module.exports = function(res_1,res_2){
    let list_1 = '';
    let list_2 = '';
    res_1.forEach(function(item,index){
       list_1 += `<li class="line-bottom-dot"><div><a href="/board/free/1/${item.pcode}">${item.btitle}</a></div></li>`;
    })
    res_2.forEach(function(item,index){
        list_2 += `<li class="line-bottom-dot"><div><a href="/board/info/1/${item.pcode}">${item.btitle}</a></div></li>`;
     })
    return `
    <main>
        ${ad_1}
        <article class="flex_col">
            <section class="board">
                <h2 class="post_header flex_between">
                    <a href="/board/free/1">Free Board</a>
                    <a href="/board/free/1">+</a>
                </h2>
                <ul>
                    ${list_1}
                </ul>
            </section>
            <section class="board">
                <h2 class="post_header flex_between">
                    <a href="/board/info/1">Info Board</a>
                    <a href="/board/info/1">+</a>
                </h2>
                <ul>
                    ${list_2}
                </ul>
            </section>
        </article>
    </main>
    <aside>
        <section>
            <div>
                <dl class="space_1 margin">
                </dl>
                <div class="left">
                    <input class="size_20" placeholder="ID" type="text" />
                    <input class="size_55" type="text" />
                    <input type="submit" value="submit" />
                </div>
            </div>    
        </section>
        ${ad_1}
    </aside>
    `;
}