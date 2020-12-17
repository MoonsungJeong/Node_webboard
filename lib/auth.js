module.exports = {
    isUser : function (req,res){
        if(req.session.is_logined){
            return true;
        }else{
            return false;
        }
    },
    statusUI : function (req,res){
        let authStatusUI = '<a href="/account/login" class="font_white"><i class="far fa-user fa-2x"></i></a>';
        if(this.isUser(req,res)){
            authStatusUI = `${req.session.nickname} &nbsp  <a href="/account/logout" class="font_white"><i class="fas fa-user fa-2x"></i></a>`;
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
        let authStatusReadBtn = `<button><a href="/board/new">write</a></button> <button><a href="/board/${req.params.boardId}/${req.params.pageId}">list</a></button>`;
        if(this.isUser(req,res)){           // login O
            if(data.mcode != 0){                // guest post X 
                if(req.session.code == data.mcode)  // author == user => UI O
                    authStatusReadBtn = `<button><a href="/board/new">write</a></button> <button><a href="/board/review/${data.pcode}" onclick="return _UPDATE_POST(${data.pcode});">update</a></button> <button>delete</button> <button><a href="/board/${req.params.boardId}/${req.params.pageId}">list</a></button>`;
            }
        }else{                              // login X
            if(data.mcode == 0)                 // guest post O => UI O
                authStatusReadBtn = `<button><a href="/board/new">write</a></button> <button><a href="/board/review/${data.pcode}" onclick="return _UPDATE_POST(${data.pcode});">update</a></button> <button>delete</button> <button><a href="/board/${req.params.boardId}/${req.params.pageId}">list</a></button>`;
        }
        return authStatusReadBtn;
    },
    statusReadComment : function(req,res){
        let statusReadComment = '';
        if(this.isUser(req,res)){
            statusReadComment = ``;
        }
        return statusReadComment;
    }
}