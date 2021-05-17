const user_box = document.querySelector("#user_box");
const user_x_btn = document.querySelector("#user_x_btn");
const user_msg_btn = document.querySelector("#user_msg_btn");

const user_box_post = document.querySelector("#user_box_post");
const user_box_comment = document.querySelector("#user_box_comment");
const user_info_nick = document.querySelector("#user_info_nick");
const user_info_date = document.querySelector("#user_info_date");

function _CONVERT_STRING(str){
    var length = 23;
    if(str.length < length) return str;
    return str.substring(0,length)+"..."
}
function _AJAX_USER_INFO(code){
    var oReq = new XMLHttpRequest();
    oReq.open("POST",`${init.hostname}/account/user/info`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    oReq.send(JSON.stringify({                                  // Ajax send with JSON
        'code' : `${code}`
    }));
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            let res = JSON.parse(oReq.responseText);
            let i=0,j=0;
            let a,li;
            while(user_box_post.hasChildNodes()){user_box_post.removeChild(user_box_post.firstChild);}
            while(user_box_comment.hasChildNodes()){user_box_comment.removeChild(user_box_comment.firstChild);}
            user_msg_btn.addEventListener("click",_USER_MSG_BTN,false);
            user_info_nick.innerHTML = res[0][0].nick;
            user_info_date.innerHTML = res[0][0].date;
            user_msg_btn.value = res[0][0].code;
            while(res[1][i] !== undefined){
                a = document.createElement("a");
                a.href = `/board/total/1/${res[1][i].code}`
                a.innerHTML = `⊙ ${_CONVERT_STRING(res[1][i].title)}`    
                li = document.createElement("li");
                li.classList.add("margin_top");
                li.appendChild(a)
                user_box_post.appendChild(li);
                i++
            }
            while(res[2][j] !== undefined){
                a = document.createElement("a");
                a.href = `/board/total/1/${res[2][j].code}`
                a.innerHTML = `⊙ ${_CONVERT_STRING(res[2][j].comment)}`    
                li = document.createElement("li");
                li.classList.add("margin_top");
                li.appendChild(a)
                user_box_comment.appendChild(li);
                j++
            }
            user_box.style.display = "block";
        }
    }
}
function _USER_MSG_BTN(){
    _MSG_USER_CODE(user_msg_btn.value); // Function is in "script_message.js"
}
user_x_btn.addEventListener("click",function(){
    user_msg_btn.removeEventListener("click",_USER_MSG_BTN,false);
    while(user_box_post.hasChildNodes()){user_box_post.removeChild(user_box_post.firstChild);}
    while(user_box_comment.hasChildNodes()){user_box_comment.removeChild(user_box_comment.firstChild);}
    user_box.style.display = "none";
})