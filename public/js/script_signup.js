const form = document.getElementById("sign_form");
function _PRE_CHECK(){
    const id = form.id.value;
    const password = form.password.value;
    const password_check = form.password_check.value;
    const name = form.name.value; 
    const birth = form.birth.value;
    const nickname = form.nickname.value;
    const email = form.email.value;
    if(id == null || id == ""){
        alert("Please write your ID");
        form.id.focus();
        return false;
    }
    if(password == null || password == ""){
        alert("Please write your password");
        form.password.focus();
        return false;
    }
    if(password_check == null || password_check == ""){
        alert("Please write your password_check");
        password_check.focus();
        return false;
    }
    if(name == null || name == ""){
        alert("Please write your ID");
        form.name.focus();
        return false;
    }
    if(birth == null || birth == ""){
        alert("Please write your ID");
        form.birth.focus();
        return false;
    }
    if(nickname == null || nickname == ""){
        alert("Please write your ID");
        form.nickname.focus();
        return false;
    }
    if(email == null || email == ""){
        alert("Please write your ID");
        form.email.focus();
        return false;
    }
    if(password !== password_check){
        alert("PW-re isn't same!!");
        form.password_check.focus();
        return false;
    }
    return true;
}