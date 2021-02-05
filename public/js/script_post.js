// import const 'init' from script init.js
function _UPDATE_POST(postId){
    _AJAX_UPDATE_SEND(postId);
    return false;
}
function _AJAX_UPDATE_SEND(postId){
    var oReq = new XMLHttpRequest();
    oReq.open("POST",`${init.hostname}/board/review/${postId}`,true);  // Ajax connect
    oReq.send();
    
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        let pw;
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "password"){
                pw = prompt("Input Password!");
                if(pw != null && pw != ''){
                    oReq.open("POST",`${init.hostname}/board/review/${postId}`,true);  // Ajax connect
                    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
                    oReq.send(JSON.stringify({                                  // Ajax send with JSON
                        'pw' : pw
                    }));
                }  
            }
            if(oReq.responseText === "ok"){
                location.href=`${init.hostname}/board/review/${postId}`;
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
    oReq.open("DELETE",`${init.hostname}/board/list/${postId}`,true);  // Ajax connect
    oReq.send();
    //console.log(document.referrer);
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        let pw;
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "password"){
                pw = prompt("Input Password!");
                if(pw != null && pw != ''){
                    oReq.open("DELETE",`${init.hostname}/board/list/${postId}`,true);  // Ajax connect
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
    oReq.open("DELETE",`${init.hostname}/board/comment/${comId}`,true);  // Ajax connect
    oReq.send();
    
    oReq.onreadystatechange = function(){           // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText == "no"){
                alert("Not your Comment!");
                return;
            }
            var box = document.getElementById("comment_area");
            box.innerHTML = oReq.responseText;
            window.scrollTo({top: box.offsetTop-10, behavior: 'smooth'});
        }
    }
}
function _COMMENT_CHECK(form){
    if(form.content.value == null || form.content.value == ""){
        return false;
    }
    var oReq = new XMLHttpRequest();
    if(form.class.value == '0'){      // first comment
        oReq.open("POST",`${init.hostname}/board/comment/new`);  // Ajax connect
        oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
        oReq.send(JSON.stringify({                                  // Ajax send with JSON
            'post' : `${form.post.value}`,
            'class' : `${form.class.value}`,
            'content': `${form.content.value}`
        }));
    }else{
        oReq.open("POST",`${init.hostname}/board/comment/${form.ccode.value}`);  // Ajax connect
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
            var box = document.getElementById("comment_area");
            box.innerHTML = oReq.responseText;
            window.scrollTo({top: box.offsetTop-10, behavior: 'smooth'});
            form.content.value="";
        }
    }
    return false;
}
function _COMMENT_PAGE_CHANGE(postId,page){
    var oReq = new XMLHttpRequest();
    oReq.open("GET",`${init.hostname}/board/comment/${postId}/${page}`,true);  // Ajax connect
    oReq.send();
    oReq.onreadystatechange = function(){           // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            var box = document.getElementById("comment_area");
            box.innerHTML = oReq.responseText;
            window.scrollTo({top: box.offsetTop-10, behavior: 'smooth'});
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