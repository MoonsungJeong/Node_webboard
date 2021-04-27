const btn = document.querySelector("#msg_btn");
const box = document.querySelector("#msg_box");
const x_btn = document.querySelector("#msg_x_btn");

const msg = document.querySelector("#msg_content");
const msg_btn = document.querySelector("#msg_content_box");

const msg_list = document.querySelector("#msg_list");

btn.addEventListener("click",function(){box.style.display = "block";})
x_btn.addEventListener("click",function(){box.style.display = "none";})
msg_btn.addEventListener("click",function(){_AJAX_MSG_SEND(msg.id.value,msg.content.value);})

function _AJAX_MSG_SEND(ID,CONTENT){
    var oReq = new XMLHttpRequest();
    oReq.open("POST",`${init.hostname}/account/info/message`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    oReq.send(JSON.stringify({                                  // Ajax send with JSON
        'id' : `${ID}`,
        'content': `${CONTENT}`
    }));
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "false"){
                alert("Failed! Wrong ID");  
            }else{
                alert("Message sent!");
            }
            msg.id.value="";
            msg.content.value="";
            box.style.display = "none";
        }
    }
}
function _AJAX_MSG_DELETE_CHECK(e){
    let i;
    let item = msg_list.delete_list;
    for(i=0; i<item.length; i++){
        if(item[i].checked && confirm("Are you sure?")) return true;
    }
    alert("There isn't checked message");
    return false;
}
function _MSG_STATUS_CHANGE(val){
    location.href= `/account/info/message/${val}/1`;
}
