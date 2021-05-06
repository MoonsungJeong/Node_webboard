const search_btn = document.querySelector("#search_btn");
const search_bar_wrapper = document.querySelector(".search_bar_wrapper");
const search_bar = document.querySelector(".search_bar");


search_bar_wrapper.style.display="none";
search_btn.addEventListener("click",function(){
    if(search_bar_wrapper.style.display=="block"){search_bar_wrapper.style.display = "none"; return;};
    if(search_bar_wrapper.style.display=="none"){search_bar_wrapper.style.display = "block"; search_bar.focus(); return;};
})
function search_test(ob){
    alert(ob.keyword.value);
}