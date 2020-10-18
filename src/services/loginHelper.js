function isLogged(){
    let authJSON = localStorage.getItem("auth");
    if(authJSON==null){
        localStorage.setItem("auth",JSON.stringify({
            token:"",
            logged:false
        }));
        return false;
    } else {
        return JSON.parse(authJSON).logged;
    }
}

function logout(){
    localStorage.setItem("auth",JSON.stringify({
        token:"",
        logged:false
    }));
    Location.reload();
}

module.exports = {
    isLogged,
    logout
}