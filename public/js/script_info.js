const form = document.getElementById("info_form");
const form_2 = document.getElementById("pw_form");
const form_3 = document.getElementById("dlt_form");

function _PRE_CHECK_INFO(e){
    const name = form.name.value;
    const nickname = form.nickname.value;
    const birth = form.birth.value;
    const email = form.email.value;

    if(name == null || name == ""){
        alert("Please write your Name");
        form.name.focus();
        return false;
    }
    if(nickname == null || nickname == ""){
        alert("Please write your Nickname");
        form.nickname.focus();
        return false;
    }
    if(birth == null || birth == ""){
        alert("Please write your Birth");
        form.birth.focus();
        return false;
    }
    if(email == null || email == ""){
        alert("Please write your Email");
        form.email.focus();
        return false;
    }  
    if(!confirm("Are you sure?")){
        return false;
    }
    _AJAX_INFO_SEND(form);
    return false;
}
function _AJAX_INFO_SEND(form){
    var oReq = new XMLHttpRequest();
    oReq.open("POST",`${init.hostname}/account/info/info`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    oReq.send(JSON.stringify({                                  // Ajax send with JSON
        'name': `${form.name.value}`,
        'nickname': `${form.nickname.value}`,
        'birth': `${form.birth.value}`,
        'email': `${form.email.value}`,
        'id': `${form.id.value}`
    }));
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "true"){
                alert("Info Change Success!!");
                location.href="/account/info/info";
            }
        }
    }
}
function _PRE_CHECK_PW(e){
    const pw = form_2.pw.value;
    const new_pw = form_2.new_pw.value;
    const new_pw_re = form_2.new_pw_re.value;
    if(pw == null || pw == ""){
        alert("Please write your Password");
        form_2.pw.focus();
        return false;
    }
    if(new_pw == null || new_pw == ""){
        alert("Please write your New Password");
        form_2.new_pw.focus();
        return false;
    }
    if(new_pw_re == null || new_pw_re == ""){
        alert("Please write your New Password-Re");
        form_2.new_pw_re.focus();
        return false;
    }
    if(new_pw !== new_pw_re){
        alert("Password isn't same!!");
        form_2.new_pw_re.focus();
        return false;
    }
    if(!confirm("Are you sure?")){
        return false;
    }
    _AJAX_PW_SEND(form_2);
    return false;
}
function _AJAX_PW_SEND(form_2){
    var oReq = new XMLHttpRequest();
    oReq.open("POST",`${init.hostname}/account/info/pw`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    oReq.send(JSON.stringify({                                  // Ajax send with JSON
        'pw': `${form_2.pw.value}`,
        'new_pw': `${form_2.new_pw.value}`,
        'new_pw_re': `${form_2.new_pw_re.value}`,
        'id':`${form_2.id.value}`
    }));
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "true"){
                alert("PW Change Success!!");
                location.href="/account/info/pw";
            }
            if(oReq.responseText === "false"){
                alert("Password is wrong !!");
            }
        }
    }
}
function _PRE_CHECK_DLT(e){
    const pw = form_3.pw.value;
    const pw_re = form_3.pw_re.value;
    if(pw == null || pw == ""){
        alert("Please write your Password");
        form_3.pw.focus();
        return false;
    }
    if(pw_re == null || pw_re == ""){
        alert("Please write your Password-Re");
        form_3.pw_re.focus();
        return false;
    }
    if(pw !== pw_re){
        alert("Password isn't same!!");
        form_3.pw_re.focus();
        return false;
    }
    if(!confirm("Are you sure?")){
        return false;
    }
    _AJAX_DLT_SEND(form_3);
    return false;
}
function _AJAX_DLT_SEND(form_3){
    var oReq = new XMLHttpRequest();
    oReq.open("POST",`${init.hostname}/account/info/dlt`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    oReq.send(JSON.stringify({                                  // Ajax send with JSON
        'pw': `${form_3.pw.value}`,
        'pw_re': `${form_3.pw_re.value}`,
        'id':`${form_3.id.value}`
    }));
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "true"){
                alert("Delete Success!!");
                location.href="/";
            }
            if(oReq.responseText === "false"){
                alert("Password is wrong !!");
            }
        }
    }
}