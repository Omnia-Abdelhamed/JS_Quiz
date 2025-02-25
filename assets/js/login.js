onload=function(){
    const regForm=document.forms['RegForm'];
    const _name=regForm['name'];
    let username = localStorage.getItem("username") || "";
    if(username){
        location.assign("quiz.html");
    }
    function checkPattern(pattern,value){
        return pattern.test(value);
    }
    regForm.onsubmit=function(){
        if(!checkPattern(/^[A-za-z ]{2,}$/,_name.value)){
            document.getElementById("name-error").innerText="Invalid Name";
            return false;
        }
        localStorage.setItem("username", _name.value);
        return true;
    }
}