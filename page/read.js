const ad_1 = require('../parts/ad_1.js');
const time = require('../lib/time.js');

module.exports = function(data, comment,
    authStatusReadBtn = '<button><a href="/board/total/1">list</a></button>',
    authComment = '<div class="comment_new"><div>comment <span class="font_gray f_size_1">- you can write comment after login <a href="/account/login"><button>login</button></a></span></div></div>'
    ){
    return `
    <main>
        ${ad_1}
        <section class="margin_side_05">
            <div class="flex_col_2">
                <h1 class="line-bottom-dot"> ${data.btitle}</h1>
                <div>
                    <span>${data.author} | </span>
                    <span>${time.formatDate(data.bdate)} | </span>
                    <span>view ${data.bcount} | </span>
                    <span>like ${data.blikes}</span>
                </div>
            </div>
            <div>
                <div>
                    ${data.bcontent}
                </div>
            </div>
            <div>
                <div class="right">
                    ${authStatusReadBtn}
                </div>
                <div id="comment_area">
                    ${comment}
                </div>
                <div>
                    ${authComment}
                </div>
            </div>
        </section>
    </main>
    `;
}