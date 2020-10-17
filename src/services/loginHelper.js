function isLogged(){
    let authJSON = localStorage.getItem("auth")
    if(authJSON==null){
        localStorage.setItem("auth",JSON.stringify({
            token:"",
            logged:false
        }))
        return false;
    } else {
        return JSON.parse(authJSON).logged
    }
}

module.exports = {
    isLogged
}