const codec = {
    code_num : function(num){
        if(num==null || num <= 0) return 0;
        return num + 111;
    },
    decode_num : function(num){
        if(num==null || num<=0) return 0;
        return num - 111;
    }   
}
module.exports = codec;