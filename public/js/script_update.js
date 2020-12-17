const form = document.getElementById("update_form");

function _PRE_CHECK_UPDATE(e){
    const author = form.author.value;
    const password = form.password.value;
    const title = form.title.value;
    const content = form.content.value;
    
    if(author == null || author == ""){
        alert("Please write author");
        form.author.focus();
        return false;
    }
    if(password == null || password == ""){
        alert("Please write password");
        form.password.focus();
        return false;
    }
    if(title == null || title == ""){
        alert("Please write title");
        form.title.focus();
        return false;
    }
    if(content == null || content == ""){
        alert("Please write content");
        form.content.focus();
        return false;
    }
    _AJAX_UPDATE_SEND(form);
    return false;
}
function _AJAX_UPDATE_SEND(form){
    var oReq = new XMLHttpRequest();
    oReq.open("PUT",`http://192.168.1.223:3000/board/review/${form.code.value}`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    
    oReq.send(JSON.stringify({                                  // Ajax send with JSON
        'title' : `${form.title.value}`,
        'content' : `${form.content.value}`,
        'board' : `${form.board.value}`,
    }));
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "true"){
                alert("Update success!!");
                location.href=`http://192.168.1.223:3000/board/total/1/${form.code.value}`;
            }
        }
    }

}
function _UPDATE_CANCEL_CHECK(e){
    if(confirm("Are you sure?")){
        var oReq = new XMLHttpRequest();
        oReq.open("GET",`http://192.168.1.223:3000/board/cancel`,true);  // Ajax connect
        oReq.send();
        history.back();
        return false;
    }    
    return false;
}