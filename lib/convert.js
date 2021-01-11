module.exports = {
    IP : function(ip){
        ip.lastIndexOf(".");
        ip = ip.slice(0,ip.lastIndexOf(".")+1);
        return ip+"♡";
    }
}