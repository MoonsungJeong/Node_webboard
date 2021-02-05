// import const 'init' from script init.js
const form = document.getElementById("sign_form");
const id_check = form.id;
const nick_check = form.nickname;

function _PRE_CHECK_SIGNUP(e){
    const id = form.id.value;
    const password = form.password.value;
    const password_check = form.password_check.value;
    const name = form.name.value; 
    const birth = form.birth.value;
    const nickname = form.nickname.value;
    const email = form.email.value;
    const id_validation = form.id.nextSibling.innerText;
    const nickname_validation = form.nickname.nextSibling.innerText;
    
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
    if(password_check == null || password_check == ""){
        alert("Please write your password_check");
        form.password_check.focus();
        return false;
    }
    if(name == null || name == ""){
        alert("Please write your Name");
        form.name.focus();
        return false;
    }
    if(birth == null || birth == ""){
        alert("Please write your Birth");
        form.birth.focus();
        return false;
    }
    if(nickname == null || nickname == ""){
        alert("Please write your Nickname");
        form.nickname.focus();
        return false;
    }
    if(email == null || email == ""){
        alert("Please write your Email");
        form.email.focus();
        return false;
    }
    if(password !== password_check){
        alert("PW-re isn't same!!");
        form.password_check.focus();
        return false;
    }
    if(id_validation != ""){
        alert("Please write other ID");
        form.id.focus();
        return false;
    }
    if(nickname_validation != ""){
        alert("Please write other Nickname");
        form.nickname.focus();
        return false;
    }   
    //return true;
    _AJAX_SIGNIN_SEND(form);
    return false;
}
function _AJAX_SIGNIN_SEND(form){
    var oReq = new XMLHttpRequest();
    oReq.open("POST",`${init.hostname}/account/sign-up`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    oReq.send(JSON.stringify({                                  // Ajax send with JSON
        'id' : `${form.id.value}`,
        'password': `${form.password.value}`,
        'name': `${form.name.value}`,
        'nickname': `${form.nickname.value}`,
        'email': `${form.email.value}`,
        'birth': `${form.birth.value}`
    }));
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "true"){
                alert("SIGN In Success!!");
                location.href="/account/login";
            }
        }
    }
}
id_check.addEventListener("focusout",function(event){
    _AJAX_FORM_CHECK(event.target.value,"uid",this);
})
nick_check.addEventListener("focusout",function(event){
    _AJAX_FORM_CHECK(event.target.value, "unickname",this);
})
function _AJAX_FORM_CHECK(value, column, node){
    var oReq = new XMLHttpRequest();
    oReq.open("POST",`${init.hostname}/account/form-check/`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    oReq.send(JSON.stringify({                                  // Ajax send with JSON
        'value' : `${value}`,
        'column': `${column}`
    }));
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "true"){
                node.style.border="2px solid red";
                node.nextSibling.innerText="Choose Other!";
                node.nextSibling.style.color="red";
            }else{
                node.style.border="";
                node.nextSibling.innerText="";
            }
        }
    }
}