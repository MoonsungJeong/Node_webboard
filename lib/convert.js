module.exports = {
    IP : function(ip){
        ip.lastIndexOf(".");
        ip = ip.slice(0,ip.lastIndexOf(".")+1);
        return ip+"♡";
    },
    STRING:function(str){
        var length = 21;
        if(str.length < length) return str;
        return str.substring(0,length)+"..."
    }
}