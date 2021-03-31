const ad_1 = require('../parts/ad_1.js');

const info_page = require("../page/info_page.js");
const info_post = require("../page/info_post.js");
const info_comment = require("../page/info_comment.js");
const info_message = require("../page/info_message.js");
const info_info = require("../page/info_info.js");
const info_pw = require("../page/info_pw.js");
const info_dlt = require("../page/info_dlt.js");

module.exports = function(page,data){
    let section;
    let list = [];
    if(page === "page")     {section = info_page(data);}
    if(page === "post")     {section = info_post(data); list[0]="line_selected";}
    if(page === "comment")  {section = info_comment(data); list[1]="line_selected";}
    if(page === "message")  {section = info_message(data); list[2]="line_selected";}
    if(page === "info")     {section = info_info(data); list[3]="line_selected";}
    if(page === "pw")       {section = info_pw(data); list[4]="line_selected";}
    if(page === "dlt")      {section = info_dlt(data); list[5]="line_selected";}
    return `
    ${ad_1}
    <section>
        <div>
            <div>
                <span class="f_size_2"><a href="/account/info/page">MyPage</a></span>
            </div>
            <div>
                <div>
                    <ul class="flex">
                        <li class="line_mypage ${list[0]} padding_side pointer"><a href="/account/info/post">post</a></li>
                        <li class="line_mypage ${list[1]} padding_side pointer"><a href="/account/info/comment">comment</a></li>
                        <li class="line_mypage ${list[2]} padding_side pointer"><a href="/account/info/message">message</a></li>
                        <li class="line_mypage ${list[3]} padding_side pointer"><a href="/account/info/info">info</a></li>
                        <li class="line_mypage ${list[4]} padding_side pointer"><a href="/account/info/pw">pw</a></li>
                        <li class="line_mypage ${list[5]} padding_side pointer"><a href="/account/info/dlt">dlt</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    ${section}
    `;
}