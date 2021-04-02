const time = require("../lib/time");
module.exports = function(data,data_2,data_3,data_4,user_info){
    let post = '';
    let comment = '';
    let comment_post = '';
    let comment_comm = '';
    let NickName = user_info[0].unickname;
    let SignIn_Date = time.formatDate_2(user_info[0].udate);
    let Days_Ago = Math.floor(time.timeDifference(user_info[0].udate));
    
    data.forEach(function(item,index){
        post+=`<li><div>ㆍ<a href="/board/total/1/${item.pcode}">${item.btitle}</a></div></li>`;
    })
    data_2.forEach(function(item,index){
        comment+=`<li><div>ㆍ<a href="/board/total/1/${item.pcode}">${item.comment}</a></div></li>`;
    })
    data_3.forEach(function(item,index){
        comment_post+=`<li><div>ㆍ<a href="/board/total/1/${item.pcode}">${item.comment}</a></div></li>`;
    })
    data_4.forEach(function(item,index){
        comment_comm+=`<li><div>ㆍ<a href="/board/total/1/${item.pcode}">${item.comment}</a></div></li>`;
    })
    return `
    <section>
        <div class="margin_bottom_2">
            <div class="margin_tb_1">
                <div class="margin_bottom">
                    <span>This is <span class="f_size_a">${NickName}</span>'s page</span>
                </div>
                <div class="margin_bottom">
                    <span>SignIn: <span class="f_size_1">${SignIn_Date} (${Days_Ago} days ago)</span> </span>
                </div>
            </div>
            <div>
                <h2 class="post_header flex_between">
                    <span class="f_size_2"><a>My Post</a></span>
                </h2>
                <ul class="margin_bottom_1">
                    ${post}
                </ul>
            </div>
            <div>
                <h2 class="post_header flex_between">
                    <span class="f_size_2"><a>My Comment</a></span>
                </h2>
                <ul class="margin_bottom_1">
                    ${comment}
                </ul>
            </div>
            <div>
                <h2 class="post_header flex_between">
                    <span class="f_size_2"><a>Comment In my post</a></span>
                </h2>
                <ul class="margin_bottom_1">
                    ${comment_post}
                </ul>
            </div>
            <div>
                <h2 class="post_header flex_between">
                    <span class="f_size_2"><a>Comment In my comment</a></span>
                </h2>
                <ul class="margin_bottom_1">
                    ${comment_comm}
                </ul>
            </div>
        </div>
    </section>
    `;
}