// import const 'init' from script init.js
const form = document.getElementById("write_form");

function _PRE_CHECK_WRITE(e){
    const author = form.author.value;
    const password = form.password.value;
    const title = form.title.value;
    const content = form.content.value;
    
    if(author == null || author == ""){
        alert("Please write author");
        form.author.focus();
        return false;
    }
    if(author.length > 30){
        alert("author is too long ( author < 30 )");
        form.author.focus();
        return false;
    }
    if(password == null || password == ""){
        alert("Please write password");
        form.password.focus();
        return false;
    }
    if(password.length > 20){
        alert("Password is too long ( Password < 20 )");
        form.password.focus();
        return false;
    }
    if(title == null || title == ""){
        alert("Please write title");
        form.title.focus();
        return false;
    }
    if(title.length > 100){
        alert("title is too long ( title < 100 )");
        form.title.focus();
        return false;
    }
    if(content == null || content == ""){
        alert("Please write content");
        form.content.focus();
        return false;
    }
    return true;
}
function _WRITE_CANCEL_CHECK(e){
    if(confirm("Are you sure?")){
        history.back();
        return false;
    }    
    return false;
}