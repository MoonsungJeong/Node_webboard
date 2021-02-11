// import const 'init' from script init.js
const form = document.getElementById("reset_form");

function _PRE_CHECK_RESET(e){
    if(form.password.value == null || form.password.value == ""){
        alert("Please write your password");
        form.password.focus();
        return false;
    }
    if(form.password_check.value == null || form.password_check.value == ""){
        alert("Please write your password-re");
        form.password_check.focus();
        return false;
    }
    if(form.password.value !== form.password_check.value){
        alert("PW-re isn't same!!");
        form.password_check.focus();
        return false;
    }
    _AJAX_RESET_SEND(form);
    return false;
}
function _AJAX_RESET_SEND(form){
    var oReq = new XMLHttpRequest();
    oReq.open("POST",`${init.hostname}/account/lost`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    oReq.send(JSON.stringify({                                  // Ajax send with JSON
        'password': `${form.password.value}`,
        'key': `${form.key.value}`,
        'code': `${form.code.value}`
    }));
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "true"){
                alert("Password Reset Success!!");
                location.href="/account/login";
            }else if(oReq.responseText === "false"){
                alert("The link is strange. Try new process!");
                location.href="/account/lost";
            }
        }
    }
}