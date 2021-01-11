function _UPDATE_POST(postId){
    _AJAX_UPDATE_SEND(postId);
    return false;
}
function _AJAX_UPDATE_SEND(postId){
    var oReq = new XMLHttpRequest();
    oReq.open("POST",`http://192.168.1.223:3000/board/review/${postId}`,true);  // Ajax connect
    oReq.send();
    
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        let pw;
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "password"){
                pw = prompt("Input Password!");
                if(pw != null && pw != ''){
                    oReq.open("POST",`http://192.168.1.223:3000/board/review/${postId}`,true);  // Ajax connect
                    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
                    oReq.send(JSON.stringify({                                  // Ajax send with JSON
                        'pw' : pw
                    }));
                }  
            }
            if(oReq.responseText === "ok"){
                location.href=`http://192.168.1.223:3000/board/review/${postId}`;
            }
            if(oReq.responseText === "no"){
                alert("Not your post!");
            }
        }
    }
}
function _DELETE_POST(postId){
    if(confirm("Are you sure?")){
        _AJAX_DELETE_SEND(postId);
        return false;
    }
    return false;
}
function _AJAX_DELETE_SEND(postId){
    var oReq = new XMLHttpRequest();
    oReq.open("DELETE",`http://192.168.1.223:3000/board/list/${postId}`,true);  // Ajax connect
    oReq.send();
    //console.log(document.referrer);
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        let pw;
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "password"){
                pw = prompt("Input Password!");
                if(pw != null && pw != ''){
                    oReq.open("DELETE",`http://192.168.1.223:3000/board/list/${postId}`,true);  // Ajax connect
                    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
                    oReq.send(JSON.stringify({                                  // Ajax send with JSON
                        'pw' : pw
                    }));
                }  
            }
            if(oReq.responseText === "ok"){
                alert("Delete success!!");
                location.href=document.referrer;
            }
            if(oReq.responseText === "no"){
                alert("Not your post!");
            }
        }
    }
}
function _DELETE_COMMENT(comId){
    if(confirm("Are you sure?")){
        _AJAX_DELETE_COMMENT_SEND(comId);
        return false;
    }
    return false;
}
function _AJAX_DELETE_COMMENT_SEND(comId){
    var oReq = new XMLHttpRequest();
    oReq.open("DELETE",`http://192.168.1.223:3000/board/comment/${comId}`,true);  // Ajax connect
    oReq.send();
    
    oReq.onreadystatechange = function(){           // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText == "no"){
                alert("Not your Comment!");
                return;
            }
            document.getElementById("comment_area").innerHTML = oReq.responseText;
            //form.content.value="";
        }
    }
}
function _COMMENT_CHECK(form){
    if(form.content.value == null || form.content.value == ""){
        return false;
    }
    var oReq = new XMLHttpRequest();
    if(form.class.value == '0'){      // first comment
        oReq.open("POST","http://192.168.1.223:3000/board/comment/new");  // Ajax connect
        oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
        oReq.send(JSON.stringify({                                  // Ajax send with JSON
            'post' : `${form.post.value}`,
            'class' : `${form.class.value}`,
            'content': `${form.content.value}`
        }));
    }else{
        oReq.open("POST",`http://192.168.1.223:3000/board/comment/${form.ccode.value}`);  // Ajax connect
        oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
        oReq.send(JSON.stringify({                                  // Ajax send with JSON
            'post' : `${form.post.value}`,
            'class' : `${form.class.value}`,
            'content': `${form.content.value}`
        }));
    }
    oReq.onreadystatechange = function(){           // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText == "no"){
                alert("Login First!");
                return;
            }
            document.getElementById("comment_area").innerHTML = oReq.responseText;
            form.content.value="";
        }
    }
    return false;
}
function comOpen(id){
    let list = document.getElementById(id);
    if(list.style.display == ""){
        list.style.display = "block";
    }else if(list.style.display == "block"){
        list.style.display = "none";
    }else if(list.style.display == "none"){
        list.style.display = "block";
    }
}