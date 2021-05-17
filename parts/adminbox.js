module.exports =  adminbox =`
    <aside class="side_menu_3">
        <div class="side_menu_Screen_3">
        </div>
        <div class="side_menu_List_3 padding_1">
            <section>
                <div class="flex_between">
                    <div class="flex_col_2">
                        <div class="margin_bottom">
                            <span class="margin_right_s">Nick : </span>
                            <span id="admin_box_nick" class="margin_right_s">blackcat</span>
                        </div>
                        <div>
                            <span class="margin_right_s">ID : </span>
                            <span id="admin_box_id" class="margin_right_s">meow123</span>
                        </div>
                        <div>
                            <span><button id="admin_x_btn">user_delete</button></span>
                            <span><button id="admin_msg_btn" value=""><i class="fas fa-envelope"></i></button></span>
                        </div>
                    </div>
                    <div>                                    
                    </div>
                </div>
            </section>
            <section>
                <div class="post_header margin_bottom">
                    <span class="margin_right_s">Name : </span>
                    <span id="admin_box_name" class="margin_right_s">Omok</span>
                </div>
                <div class="post_header margin_bottom">
                    <span class="margin_right_s">RegDate : </span>
                    <span id="admin_box_regdate" class="margin_right_s">2021.05.12</span>
                </div>
                <div class="post_header margin_bottom">
                        <span class="margin_right_s">Email : </span>
                        <span id="admin_box_email" class="margin_right_s">cat123@gmail.com</span>
                </div>
                <div class="post_header margin_bottom">
                    <span class="margin_right_s">Birthday : </span>
                    <span id="admin_box_birth" class="margin_right_s">1999.11.13</span>
                </div>
            </section>
            <section>
                <ul class="flex">
                    <li class="admin_menu line_mypage padding_side pointer"><a>post</a></li>
                    <li class="admin_menu line_mypage padding_side pointer"><a>comment</a></li>
                </ul>
            </section>
            <section id="admin_board" class="margin_top_1">
                
            </section>
        </div>
    </aside>
`