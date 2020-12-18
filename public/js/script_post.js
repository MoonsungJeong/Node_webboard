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