
document.getElementById("darkCss").disabled = true;
var logo2 = document.getElementById("logo2");

function dark() {
    document.getElementById("lightCss").disabled = true;
    document.getElementById("darkCss").disabled = false;
    logo.removeAttribute("src");
    logo.setAttribute("src","gifOS_UI/assets/logoDark.png");
    localStorage.setItem('dark_mode', 'true')

}
function day() {
    document.getElementById("lightCss").disabled = false;
    document.getElementById("darkCss").disabled = true;
    logo.removeAttribute("src");
    logo.setAttribute("src",'gifOS_UI/assets/logo.png')
    localStorage.setItem('dark_mode', 'false')
 
}

//guardar el modo ocsuro con local storage
if (localStorage.getItem('dark_mode') === 'true') {
    dark();
} else {
    day();   
}
