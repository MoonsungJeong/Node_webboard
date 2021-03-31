module.exports = function(authStatusScreenBtn='<button><a href="/account/login">Login</a></button>'){
    return `
    <aside class="side_menu">
        <div class="side_menu_Screen">
        </div>
        <div class="side_menu_List">
            <ul class="sm_list_box">
                <li class="sm_list"><a href="/board/total" class="font_white">Total Board</a></li>
                <li class="sm_list"><a href="/board/free" class="font_white">Free Board</a></li>
                <li class="sm_list"><a href="/board/info" class="font_white">Info Board</a></li>
            </ul>
            <div class="sm_btn_box">
                ${authStatusScreenBtn}
            </div>
        </div>
    </aside>
    <aside class="side_menu_2">
        <div class="side_menu_Screen_2">
        </div>
        <div class="side_menu_List_2">
            <ul class="sm_list_box_2 center">
                <br><br>
                <li><a href="/account/info/page" class="font_white"><i class="far fa-address-card fa-2x"></i><br>Page</a></li><br>
                <li><a href="/account/info/post" class="font_white"><i class="far fa-file-alt fa-2x"></i><br>Post</a></li><br>
                <li><a href="/account/info/comment" class="font_white"><i class="far fa-comment-dots fa-2x"></i><br>Comm</a></li><br>
                <li><a href="/account/info/message" class="font_white"><i class="far fa-envelope fa-2x"></i><br>Msg</a></li><br>
                <li><a href="/account/info/info" class="font_white"><i class="far fa-user-circle fa-2x"></i><br>Info</a></li><br>
                <li><a href="/account/info/pw" class="font_white"><i class="fas fa-unlock-alt fa-2x"></i><br>PW</a></li><br>
                <li><a href="/account/logout" class="font_white"><i class="fas fa-user fa-2x"></i><br>Logout</a></li><br>
            </ul>
        </div>
    </aside>
    `
}