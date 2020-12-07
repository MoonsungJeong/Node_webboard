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
    }
}