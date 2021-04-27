// import const 'init' from script init.js
const btn_side = document.querySelector(".btn_sidemenu");
btn_side.addEventListener("click",function(){
    let frame = document.querySelector(".side_menu");
    let menu = document.querySelector(".side_menu_List");
    let screen = document.querySelector(".side_menu_Screen");
    menu.style.display = "block";  
    if(!menu.classList.contains("animate-right")){
        menu.classList.remove("animate-left");
        menu.classList.add("animate-right");
        screen.style.display = "block";
        frame.style.zIndex = 4;
        return;
    }
})
const screen_side = document.querySelector(".side_menu_Screen");
screen_side.addEventListener("click",function(){
    let frame = document.querySelector(".side_menu");
    let menu = document.querySelector(".side_menu_List");
    let screen = document.querySelector(".side_menu_Screen");
    
    if(menu.classList.contains("animate-right")){
        menu.classList.remove("animate-right");
        menu.classList.add("animate-left");
        screen.style.display = "none";
        frame.style.zIndex = -1;
    }
})
const screen_side_right = document.querySelector(".side_menu_Screen_2");
screen_side_right.addEventListener("click",function(){
    let frame = document.querySelector(".side_menu_2");
    let list = document.querySelector(".sm_list_box_2");
    let screen = document.querySelector(".side_menu_Screen_2");
    
    if(list.classList.contains("animate-left-2")){
        list.classList.remove("animate-left-2");
        list.classList.add("animate-right-2");
        screen.style.display = "none";
        setTimeout(function() {
            frame.style.zIndex = "";
           }, 300)
    }
})
if(document.querySelector(".btn_sidemenu_right") !== null){
    const btn_side_right = document.querySelector(".btn_sidemenu_right");
    btn_side_right.addEventListener("click",function(){
        let frame = document.querySelector(".side_menu_2");
        let list = document.querySelector(".sm_list_box_2");
        let screen = document.querySelector(".side_menu_Screen_2");
        //list.style.display = "block";  
        if(!list.classList.contains("animate-left-2")){
            list.classList.remove("animate-right-2");
            list.classList.add("animate-left-2");
            screen.style.display = "block";
            frame.style.zIndex = 4;
        }
    })
}
window.addEventListener("load",function(){
    let res = document.referrer.match(/review/g);
    if(res=='review'){
        var oReq = new XMLHttpRequest();
        oReq.open("GET",`${init.hostname}/board/cancel`,true);  // Ajax connect
        oReq.send();
    }
})