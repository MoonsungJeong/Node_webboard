module.exports = {
    isUser : function (req,res){
        if(req.session.is_logined){
            return true;
        }else{
            return false;
        }
    },
    statusUI : function (req,res){
        let authStatusUI = '<a href="/account/login" class="font_white pointer"><i class="far fa-user fa-2x"></i></a>';
        if(this.isUser(req,res)){
            authStatusUI = `${req.session.nickname} &nbsp  <a class="btn_sidemenu_right font_white pointer"><i class="fas fa-user fa-2x"></i></a>`;
        }
        return authStatusUI;
    },
    statusWrite : function(req,res){
        let authStatusWrite = '<div>Author<input type="text" name="author"></div><div>PW &nbsp;<input type="password" name="password"></div>';
        if(this.isUser(req,res)){
            authStatusWrite = `<div><input type="hidden" name="author" value="NULL"></div><div><input type="hidden" name="password" value="NULL"></div>`;
        }
        return authStatusWrite;
    },
    statusReadBtn : function(req,res,data){
        let authStatusReadBtn = `<button><a href="/board/${req.params.boardId}/${req.params.pageId}">list</a></button>`;
        if(this.isUser(req,res)){           // login O
            if(data.mcode != 0){                // guest post X 
                if(req.session.code == data.mcode)  // author == user => UI O
                    authStatusReadBtn = `<button><a href="/board/review/${data.pcode}" onclick="return _UPDATE_POST(${data.pcode});">update</a></button> <button><a href="/board/list/${data.pcode}" onclick="return _DELETE_POST(${data.pcode});">delete</a></button> <button><a href="/board/${req.params.boardId}/${req.params.pageId}">list</a></button>`;
            }
        }else{                              // login X
            if(data.mcode == 0)                 // guest post O => UI O
                authStatusReadBtn = `<button><a href="/board/review/${data.pcode}" onclick="return _UPDATE_POST(${data.pcode});">update</a></button> <button><a href="/board/list/${data.pcode}" onclick="return _DELETE_POST(${data.pcode});">delete</a></button> <button><a href="/board/${req.params.boardId}/${req.params.pageId}">list</a></button>`;
        }
        return authStatusReadBtn;
    },
    statusComment : function(req,res,data){
        let statusComment = '<div class="comment_new"><div>comment <span class="font_gray f_size_1">- you can write comment after login <a href="/account/login"><button>login</button></a></span></div></div>';
        if(this.isUser(req,res)){
            statusComment = `<div class="comment_new">
                                <div>comment</div>
                                <form class="comment_form" method="POST" action="/" onsubmit="return _COMMENT_CHECK(this)";>
                                    <textarea class="comment_box" name="content"></textarea>
                                    <input type="submit" class="comment_btn" value="submit">
                                    <input type="hidden" name="post" value="${data.pcode}">
                                    <input type="hidden" name="class" value="0">
                                </form>
                            </div>`;
        }
        return statusComment;
    },
    statusScreenBtn : function(req,res){
        let statusScreenBtn = '<button><a href="/account/login">Login</a></button>';
        if(this.isUser(req,res)){ 
            statusScreenBtn = `<button><a href="/account/info/page">MyPage</a></button><button><a href="/account/logout">Logout</a></button>`
        }
        return statusScreenBtn;
    },
    statusChatId : function(req,res){
        let authStatusChatId = '<input id="chat_id" class="size_20" placeholder="ID" type="text" disabled readonly/>';
        if(this.isUser(req,res)){
            authStatusChatId = `<input id="chat_id" class="size_20" value="${req.session.nickname}" type="text" disabled readonly/>`;
        }
        return authStatusChatId;
    }
}