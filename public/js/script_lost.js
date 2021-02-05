// import const 'init' from script init.js
const form_1 = document.getElementById("lost_form_id");
const form_2 = document.getElementById("lost_form_pw");

function _PRE_CHECK_LOST_ID(e){
    const name = form_1.name.value;
    const email = form_1.email.value;

    if(name == null || name == ""){
        alert("Please write your Name");
        form_1.name.focus();
        return false;
    }
    if(email == null || email == ""){
        alert("Please write your Email");
        form_1.email.focus();
        return false;
    }
    _AJAX_LOST_ID_SEND(name,email);
    return false;
}
function _PRE_CHECK_LOST_PW(e){
    const name = form_2.name.value;
    const id = form_2.id.value;

    if(name == null || name == ""){
        alert("Please write your Name");
        form_2.name.focus();
        return false;
    }
    if(id == null || id == ""){
        alert("Please write your Id");
        form_2.id.focus();
        return false;
    }
    _AJAX_LOST_PW_SEND(name,id);
    return false;
}
function _AJAX_LOST_ID_SEND(NAME, EMAIL){
    var oReq = new XMLHttpRequest();
    oReq.open("POST",`${init.hostname}/account/lost/id`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    oReq.send(JSON.stringify({                                  // Ajax send with JSON
        'name' : `${NAME}`,
        'email': `${EMAIL}`
    }));
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "false"){
                alert("There is no Account!!");  
                form_1.name.value = '';
                form_1.email.value= '';
            }else{
                var box = document.getElementById("lost_form_id");
                box.innerHTML = oReq.responseText;
            }
        }
    }
}
function _AJAX_LOST_PW_SEND(NAME, ID){
    var oReq = new XMLHttpRequest();
    oReq.open("POST",`${init.hostname}/account/lost/pw`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    oReq.send(JSON.stringify({                                  // Ajax send with JSON
        'name' : `${NAME}`,
        'id': `${ID}`
    }));
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "false"){
                alert("There is no Account!!");  
                form_2.name.value = '';
                form_2.id.value= '';
            }else{
                var box = document.getElementById("lost_form_pw");
                box.innerHTML = oReq.responseText;
            }
        }
    }
}