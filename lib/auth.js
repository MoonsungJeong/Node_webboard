module.exports = {
    isUser : function (req,res){
        if(req.session.is_logined){
            return true;
        }else{
            return false;
        }
    },
    statusUI : function (req,res){
        let authStatusUI = '<a href="/login" class="font_white"><i class="far fa-user fa-2x"></i></a>';
        if(this.isUser(req,res)){
            authStatusUI = `${req.session.nickname} &nbsp  <a href="/logout" class="font_white"><i class="fas fa-user fa-2x"></i></a>`;
        }
        return authStatusUI;
    }
}