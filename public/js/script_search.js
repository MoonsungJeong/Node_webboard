const search_btn = document.querySelector("#search_btn");
const search_bar_wrapper = document.querySelector(".search_bar_wrapper");
const search_bar = document.querySelector(".search_bar");

search_bar_wrapper.style.display="none";
search_btn.addEventListener("click",function(){
    if(search_bar_wrapper.style.display=="block"){search_bar_wrapper.style.display = "none"; return;};
    if(search_bar_wrapper.style.display=="none"){search_bar_wrapper.style.display = "block"; search_bar.focus(); return;};
})

function _AJAX_SEARCH_SEND(ob){
    if(ob.keyword.value === "") return false;
    location.href=`${init.hostname}/search/${ob.option.value}/${ob.keyword.value}/1`;
    return false;
}