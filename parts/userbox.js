module.exports =  userbox =`
    <div id="user_box" class="space_6 size_5 user_box">
        <section>
            <div class="user_info">
                <span class="margin_right_s">Nick : </span>
                <span id="user_info_nick" class="margin_right_s"></span>
                <span><button id="user_msg_btn" value=""><i class="fas fa-envelope"></i></button></span>
                <span><button id="user_x_btn">x</button></span>
            </div>
            <div>
                <span>RegDate : </span>
                <span id="user_info_date"></span>
            </div>
        </section>
        <section class="board">
            <h2 class="post_header">
                <a>Post</a>
            </h2>
            <ul id="user_box_post">
            </ul>
        </section>
        <section class="board">
            <h2 class="post_header">
                <a>Comment</a>
            </h2>
            <ul id="user_box_comment">
            </ul>
        </section>
    </div>
`