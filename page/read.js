const ad_1 = require('../parts/ad_1.js');
const time = require('../lib/time.js');

module.exports = function(results, referer){
    const title = results[0].btitle;
    const author = results[0].author;
    const count = results[0].bcount;
    const date = results[0].bdate;
    const content = results[0].bcontent;
    const like = results[0].blikes;
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
                    <button>update</button>
                    <button>delete</button>
                    <button><a href="/board/${referer.boardId}/${referer.pageId}">list</a></button>
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