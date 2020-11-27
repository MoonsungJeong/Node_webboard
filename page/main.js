const ad_1 = require('../parts/ad_1.js');

module.exports = function(){
    return `
    <main>
        ${ad_1}
        <article class="flex_col">
            <section class="board">
                <h2 class="post_header flex_between">
                    <a href="/board/free">Free Board</a>
                    <a href="/board/free">+</a>
                </h2>
                <ul>
                    <li><div><a href="/board/5">this is free board notice</a></div></li>
                    <li><div><a href="/board/3">hello this is free board</a></div></li>
                    <li><div><a href="/board/1">today is sunny day wow~~</a></div></li>
                </ul>
            </section>
            <section class="board">
                <h2 class="post_header flex_between">
                    <a href="/board/info">Info Board</a>
                    <a href="/board/info">+</a>
                </h2>
                <ul>
                    <li><div><a href="/board/6">this is info board notice</a></div></li>
                    <li><div><a href="/board/4">hello this is info board</a></div></li>
                    <li><div><a href="/board/2">today is rainy day wow~~</a></div></li>
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