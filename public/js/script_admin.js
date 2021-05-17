const nick = document.querySelector("#admin_box_nick");
const id = document.querySelector("#admin_box_id");
const name = document.querySelector("#admin_box_name");
const date = document.querySelector("#admin_box_regdate");
const email = document.querySelector("#admin_box_email");
const birth = document.querySelector("#admin_box_birth");
const admin_msg_btn = document.querySelector("#admin_msg_btn");
const admin_x_btn = document.querySelector("#admin_x_btn");
const admin_menu = document.querySelectorAll(".admin_menu");
const admin_board = document.querySelector("#admin_board");

function _ADMIN_MEMBER_PANEL(code){
    let frame = document.querySelector(".side_menu_3");
    let menu = document.querySelector(".side_menu_List_3");
    let screen = document.querySelector(".side_menu_Screen_3");
    menu.style.display = "block";
    if(!menu.classList.contains("animate-down")){
        menu.classList.remove("animate-up");
        menu.classList.add("animate-down");
        screen.style.display = "block";
        frame.style.zIndex = 4;
        _AJAX_ADMIN_MEMBER(code);
        return;
    }
};
function _AJAX_ADMIN_MEMBER(code){
    var oReq = new XMLHttpRequest();
    oReq.open("GET",`${init.hostname}/admin/member/${code}`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    oReq.send();
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
            let res = JSON.parse(oReq.responseText);
            nick.innerHTML = res.nick;
            id.innerHTML = res.id;
            name.innerHTML = res.name;
            date.innerHTML = res.date;
            email.innerHTML = res.email;
            birth.innerHTML = res.birth;
            admin_x_btn.value = res.code;
            admin_x_btn.addEventListener("click",_ADMIN_USER_DELETE,false);
            admin_msg_btn.value = res.code;
            admin_msg_btn.addEventListener("click",_ADMIN_MSG_BTN,false);
        }
    }
};
function _ADMIN_USER_DELETE(){
    if(confirm("Are you sure?")){
        var oReq = new XMLHttpRequest();
        oReq.open("GET",`${init.hostname}/admin/member/dlt/${admin_x_btn.value}`);  // Ajax connect
        oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
        oReq.send();
        oReq.onreadystatechange = function(){                   // Ajax result from Server
            if(oReq.readyState === 4 && oReq.status === 200){
                alert("Delete Success!!");
                location.reload();
            }
        }
    }
};
function _ADMIN_MSG_BTN(){
    _MSG_USER_CODE(admin_msg_btn.value); // Function is in "script_message.js"
};
const screen_side_top = document.querySelector(".side_menu_Screen_3");
screen_side_top.addEventListener("click",function(){
    let frame = document.querySelector(".side_menu_3");
    let menu = document.querySelector(".side_menu_List_3");
    let screen = document.querySelector(".side_menu_Screen_3");
    
    if(menu.classList.contains("animate-down")){
        menu.classList.remove("animate-down");
        menu.classList.add("animate-up");
        screen.style.display = "none";
        frame.style.zIndex = -1;
        admin_msg_btn.removeEventListener("click",_ADMIN_MSG_BTN,false);
        admin_msg_btn.value = "";
        admin_x_btn.removeEventListener("click",_ADMIN_USER_DELETE,false);
        admin_x_btn.value = "";
        admin_board.innerHTML="";
        admin_menu.forEach(function(item){item.classList.remove("line_selected");});
    }
});
admin_menu.forEach(function(item){
    item.addEventListener("click",_ADMIN_MENU_CHANGE,false);
})
function _ADMIN_MENU_CHANGE(e){
    admin_menu.forEach(function(item){
        item.classList.remove("line_selected");
        if(item.innerText === e.target.innerText){item.classList.add("line_selected");}
    });
    var oReq = new XMLHttpRequest();
    oReq.open("GET",`${init.hostname}/admin/member/${e.target.innerText}/${admin_msg_btn.value}`);  // Ajax connect
    oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
    oReq.send();
    oReq.onreadystatechange = function(){                   // Ajax result from Server
        if(oReq.readyState === 4 && oReq.status === 200){
           admin_board.innerHTML=oReq.responseText;
        }
    }
}
function _ADMIN_POST_DELETE(code){
    if(confirm("Are you sure?")){
        var oReq = new XMLHttpRequest();
        oReq.open("GET",`${init.hostname}/admin/board/dlt/${code}`);  // Ajax connect
        oReq.setRequestHeader('Content-Type', 'application/json');  // Ajax request header
        oReq.send();
        oReq.onreadystatechange = function(){                   // Ajax result from Server
            if(oReq.readyState === 4 && oReq.status === 200){
                if(oReq.responseText){
                    alert("Delete Success!!");
                    location.reload();
                }
            }
        }
    }
}