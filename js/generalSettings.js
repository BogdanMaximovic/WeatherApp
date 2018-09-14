function reLoad(){
    location.reload();
};
function getBackground(){
    let documentBody = document.body;
    documentBody.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(bkg/back.png)";
    documentBody.style.fontFamily = "sans-serif";
    documentBody.style.height = "100vh";
    // for other browsers
    documentBody.style.backgroundImage = "-webkit-gradient(linear,left top, left bottom,from(rgba(0,0,0,0.7)),to(rgba(0,0,0,0.7))),url(bkg/back.png)";
    documentBody.style.backgroundImage = "-moz-linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(bkg/back.png)";
    documentBody.style.backgroundImage = "-o-linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(bkg/back.png)";
}