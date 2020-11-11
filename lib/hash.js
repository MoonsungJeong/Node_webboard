const bcrypt = require("bcrypt");

const hash_pwd = {
    generate : function(pwd){
        const salt = bcrypt.genSaltSync(5);
        return bcrypt.hashSync(pwd, salt);
    },
    check : function(pwd, hash){
        return bcrypt.compareSync(pwd,hash)
    }   
}
module.exports = hash_pwd;