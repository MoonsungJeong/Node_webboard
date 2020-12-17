const ad_1 = require('../parts/ad_1.js');
const time = require('../lib/time.js');

module.exports = function(data, authStatusReadBtn = '<button><a href="/board/new">write</a></button><button><a href="/board/total/1">list</a></button>'){
    const post = data.pcode;
    const title = data.btitle;
    const author = data.author;
    const count = data.bcount;
    const date = data.bdate;
    const content = data.bcontent;
    const like = data.blikes;
    return `
    <main>
        ${ad_1}
        <section class="margin_side_05">
            <div class="flex_col_2">
                <h1 class="line-bottom-dot"> ${title}</h1>
                <div>
                    <span>${author} | </span>
                    <span>${time.formatDate(date)} | </span>
                    <span>view ${count} | </span>
                    <span>like ${like}</span>
                </div>
            </div>
            <div>
                <div>
                    ${content}
                </div>
            </div>
            <div>
                <div class="right">
                    ${authStatusReadBtn}
                    <!--
                    <button><a href="/board/new">write</a></button>
                    <button><a href="/board/review/${post}">update</a></button>
                    <button>delete</button>
                    <button><a href="/board/${data.boardId}/${data.pageId}">list</a></button>
                    -->
                </div>
                <br>
                comments
                <div>
                    <div>
                        <span>ID</span>
                        <span>IP</span>
                        <span>Date</span>
                    </div>
                    <p>
                        This is Test comment@!!!EFEF
                    </p>
                </div>
                <div>
                    <div>
                        <span>ID</span>
                        <span>IP</span>
                        <span>Date</span>
                    </div>
                    <p>
                        Brisbane is goooooooooooood!
                    </p>
                </div>
                <div>
                    <div>
                        <span>ID</span>
                        <span>IP</span>
                        <span>Date</span>
                    </div>
                    <p>
                        Australia is goooooooooooooooood!
                    </p>
                </div>
            </div>
        </section>
    </main>
    `;
}