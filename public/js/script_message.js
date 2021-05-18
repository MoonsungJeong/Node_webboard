const msg_btn = document.querySelector("#msg_btn");
const msg_box = document.querySelector("#msg_box");
const msg_x_btn = document.querySelector("#msg_x_btn");

const msg_content = document.querySelector("#msg_content");
const msg_send_btn = document.querySelector("#msg_sent_btn");

const msg_dlt_btn = document.querySelector("#msg_dlt_btn");
const msg_list = document.querySelector("#msg_list");

if(msg_btn){
    msg_btn.addEventListener("click",function(){msg_box.style.display = "block"; msg_box.style.zIndex = "5"; msg_content.id.focus()})
}
msg_x_btn.addEventListener("click",function(){
    msg_content.id.readOnly=false;
    msg_content.id.disabled=false;
    msg_content.id.value="";
    msg_content.content.value="";
    msg_box.style.display = "none";   
    msg_box.style.zIndex = "-1";     
    
})
msg_send_btn.addEventListener("click",function(){
    if(msg_content.content.value === ""){return;}
    _AJAX_MSG_SEND(msg_content.id.value,msg_content.content.value,msg_content.hidden_id.value);
})
if(msg_dlt_btn){
    msg_dlt_btn.addEventListener("click",function(){
        let i,arr=[];
        let item = msg_list.delete_list;
        for(i=0; i<item.length; i++){
            if(item[i].checked){arr.push(item[i].value);}
        }
        if(arr.length){
            if(confirm("Are you sure?"))_AJAX_MSG_DELETE_SEND(Object.assign({},arr));
            return;
        }else{
            alert("There isn't checked message");
            return;
        }
    })
}
function _AJAX_MSG_DELETE_SEND(arr){
    var oReq = new XMLHttpRequest();
    oReq.open("DELETE",`${init.hostname}/account/info/message/delete`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    oReq.send(JSON.stringify(arr));                             // Ajax send with JSON
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "true"){
                location.href= "/account/info/message/recv/1";
            }
        }
    }
}
function _MSG_USER_CODE(code){
    var oReq = new XMLHttpRequest();
    oReq.open("POST",`${init.hostname}/account/info/message/user`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    oReq.send(JSON.stringify({                                  // Ajax send with JSON
        'code' : `${code}`
    }));
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "false"){ alert("login first!"); return;}
            let res = JSON.parse(oReq.responseText);
            msg_box.style.display = "block";
            msg_box.style.zIndex = "5";
            msg_content.content.focus()
            msg_content.id.value=res[0];
            msg_content.id.readOnly=true;
            msg_content.id.disabled=true;
            msg_content.hidden_id.value=res[1];
            
        }
    }
}
function _AJAX_MSG_SEND(ID,CONTENT,hidden){
    var oReq = new XMLHttpRequest();
    oReq.open("POST",`${init.hostname}/account/info/message`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    oReq.send(JSON.stringify({                                  // Ajax send with JSON
        'id' : `${ID}`,
        'content': `${CONTENT}`,
        'hidden_id':`${hidden}`
    }));
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            if(oReq.responseText === "false"){
                alert("Failed! Wrong ID");  
            }else{
                alert("Message sent!");
            }
            msg_content.id.value="";
            msg_content.content.value="";
            msg_box.style.display = "none";
        }
    }
}
function _MSG_STATUS_CHANGE(val){
    location.href= `/account/info/message/${val}/1`;
}
