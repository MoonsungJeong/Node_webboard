// import const 'init' from script init.js
const form = document.getElementById("login_form");
function _PRE_CHECK_LOGIN(e){
    const id = form.id.value;
    const password = form.password.value;

    if(id == null || id == ""){
        alert("Please write your ID");
        form.id.focus();
        return false;
    }
    if(password == null || password == ""){
        alert("Please write your password");
        form.password.focus();
        return false;
    }
    _AJAX_LOGIN_SEND(id,password);
    return false;
}

function _AJAX_LOGIN_SEND(ID, PW){
    var oReq = new XMLHttpRequest();
    oReq.open("POST",`${init.hostname}/account/login`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    oReq.send(JSON.stringify({                                  // Ajax send with JSON
        'id' : `${ID}`,
        'password': `${PW}`
    }));
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "false"){
                alert("ID or PW is Wrong!")  
            }else{
                alert("Log In Success!!");
                location.href="/";
            }
        }
    }
}