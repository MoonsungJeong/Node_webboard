const codec = {
    code_num : function(num){
        return num + 111;
    },
    decode_num : function(num){
        return num - 111;
    }   
}
module.exports = codec;