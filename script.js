//variables de Botones
const btnSwitch = document.querySelector("#tema");
const btnDropdown = document.querySelector("#dropdown")
var btnDay = document.querySelector("#day");
var btnNight = document.querySelector("#night");


//variables de divs con estilos globales
var sailor = document.querySelector("#sailor");
var encabezado = document.getElementById("encabezado");
var lofi = document.querySelectorAll(".lofi")

// //cambiar los temas de la pagina

// var logo = document.getElementById("logo2");
// function dark() {
//     document.getElementById("lightCss").disabled = true;
//     document.getElementById("darkCss").disabled = false;
//     logo.removeAttribute("src");
//     logo.setAttribute("src","gifOS_UI/assets/logoDark.png");
//     localStorage.setItem('dark_mode', 'true')

// }
// function day() {
//     document.getElementById("lightCss").disabled = false;
//     document.getElementById("darkCss").disabled = true;
//     logo.removeAttribute("src");
//     logo.setAttribute("src",'gifOS_UI/assets/logo.png')
//     localStorage.setItem('dark_mode', 'false')
 
// }

 btnNight.addEventListener('click', () =>{
 dark();
 });
 btnDay.addEventListener('click', () =>{
     day();
 });

// //guardar el modo ocsuro con local storage
// if (localStorage.getItem('dark_mode') === 'true') {
//     dark();
// } else {
//     day();   
// }


//mostrar los temas disponibles
sailor.style.display="none";
function toggleDisplay() {
    if (sailor.style.display === "none") {
        sailor.style.display = "block"
        sailor.style.display = "flex"
    }else{
        sailor.style.display = "none"
    }
}
    btnDropdown.addEventListener("click", e => {
        toggleDisplay()
    });
   
    btnSwitch.addEventListener('click', e =>{
        toggleDisplay()
    });

    
 
//barra de busqueda
var btnDeBusqueda = document.querySelector("#searchBoton");
var gifs = document.getElementById("sugerencia");
var y = 0
var maxWidthGif = 500
var inpu = document.getElementById("placeholder");
var input= inpu.value;



function buscar(input) {
var input = inpu.value;
const tendenciaGifs = document.getElementById("tendenciaGifs").getElementsByTagName("img")[y];
    const found = 
    fetch('http://api.giphy.com/v1/gifs/search?q='+input+'&api_key=oydPUIN3T46GWi9KuEFkFtrECpKjrbRw&limit=20|&rating=R')
    .then((response) => {
        return response.json()
    })
    .then(data => {
        let myArray = data.data
        if (data.data.length>0) {
        myArray.forEach(i => {
            if (i.images.original.width>maxWidthGif) {
                document.getElementById("tendenciaGifs").getElementsByTagName("img")[y].removeAttribute("src");
                document.getElementById("tendenciaGifs").getElementsByTagName("img")[y].setAttribute("src", i.images.original.url);
                document.getElementById("tendenciaGifs").getElementsByTagName("img")[y].removeAttribute("class");
                document.getElementById("tendenciaGifs").getElementsByTagName("img")[y].setAttribute("class", "gifsThicc");
                y++;
        
            } else {
                document.getElementById("tendenciaGifs").getElementsByTagName("img")[y].removeAttribute("src");
                document.getElementById("tendenciaGifs").getElementsByTagName("img")[y].setAttribute("src", i.images.original.url );
                if (document.getElementById("tendenciaGifs").getElementsByTagName("img")[y].classList.contains("gifsThicc")
                ) {
                    document.getElementById("tendenciaGifs").getElementsByTagName("img")[y].removeAttribute("class");
                    document.getElementById("tendenciaGifs").getElementsByTagName("img")[y].setAttribute("class", "gifs");
    
                }
                y++;         
            }


        });
            
            return data
        }else{
           var travolta = document.createElement("img");
           travolta.setAttribute("src", "https://media2.giphy.com/media/hEc4k5pN17GZq/giphy.gif?cid=cd057afbda415dbb6261f088cb35ab7fe24bcd8b8768ddab&rid=giphy.gif");
           travolta.setAttribute("class", "travolta")
           document.getElementById("tendenciasDiv").innerText="No se encontraron resultados";
           document.getElementById("sugerencia").style.display="none"
           document.getElementById("recomendaciones").style.display="none"
           document.getElementById("tendencias").style.gridRow= "5";
           document.getElementById("tendenciaGifs").style.gridRow= "6";
           display.display="none"
           document.getElementById("tendenciaGifs").innerHTML="";
           document.getElementById("tendenciaGifs").appendChild(travolta);
        }
        })
        .catch((error) => {
        return error
        })
        return found
};

function search() {
    buscar(input);
    document.getElementById("tendenciasDiv").innerText="Resultados de "+"''"+document.getElementById("placeholder").value+"''";
    document.getElementById("sugerencia").style.display="none"
    document.getElementById("recomendaciones").style.display="none"
    document.getElementById("tendencias").style.gridRow= "5";
    document.getElementById("tendenciaGifs").style.gridRow= "6";
    display.display="none"
}
btnDeBusqueda.addEventListener('click', () => {
    search();
    });

//busqueda predictiva

var display = document.getElementById("resultados_sugeridos").style;
display.display="none"
        function busquedaPredictiva(data){
            document.getElementById('resultado_sugerido1').innerHTML = data[1][0][0];
            document.getElementById('resultado_sugerido2').innerHTML = data[1][1][0];
            document.getElementById('resultado_sugerido3').innerHTML = data[1][3][0];
            console.log(data)
        }
        
        var myScript = '';
        var placeholder = document.getElementById("placeholder")
        

        var lupa = document.getElementById('lupa')

        placeholder.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                btnDeBusqueda.click();
            }
          });

        document.getElementById('placeholder').oninput = function(){

            
            lupa.removeAttribute("src") 
            lupa.setAttribute('src', "gifOS_UI/assets/lupa.svg")

            
            display.display="flex"
        
            var stuff_in_text_box = document.getElementById('placeholder').value;
        
            myScript = document.createElement('script');

            myScript.src = 'https://clients1.google.com/complete/search?client=youtube&hl=es&gl=ar&gs_rn=64&gs_ri=youtube&ds=v&cp=2&gs_id=w&q='+stuff_in_text_box+'&callback=busquedaPredictiva&gs_gbg=pqC4Id59n35xoBvFOoUbjSjdZ14SK';
        

            document.body.appendChild(myScript);
            if (document.getElementById("placeholder").value=="") {
                display.display="none";

                lupa.removeAttribute("src") 
                lupa.setAttribute('src', "gifOS_UI/assets/lupa_inactive.svg")
    

            }
        };
    if(myScript != myScript){
        document.body.removeChild(myScript);
    }
const sug1 = document.getElementById("resultado_sugerido1")
const sug2 = document.getElementById("resultado_sugerido2")
const sug3 = document.getElementById("resultado_sugerido3")

sug1.addEventListener('click', ()=>{
    var sug1text = sug1.innerText;
    document.getElementById("placeholder").value=sug1text;
    btnDeBusqueda.click();
})
sug2.addEventListener('click', ()=>{
    var sug2text = sug2.innerText;
    document.getElementById("placeholder").value=sug2text;
    btnDeBusqueda.click();
})
sug3.addEventListener('click', ()=>{
    var sug3text = sug3.innerText;
    document.getElementById("placeholder").value=sug3text;
    btnDeBusqueda.click();
})

//botones close.svg

    //botonCLose1
    document.getElementById("closeButton1").addEventListener('click', () =>{
        function randomReplace(en) {
            const found = 
            fetch('https://api.giphy.com/v1/gifs/random?api_key=oydPUIN3T46GWi9KuEFkFtrECpKjrbRw&tag=&rating=R')
            .then((response) => {
                return response.json()
            })
            .then(data => {
        
                let myArray = data.data
                let img1 = document.getElementById("img1");
                img1.removeAttribute('src');
                img1.setAttribute('src', data.data.images.downsized.url);
                
                let divMargenes = document.getElementById("title1");
                var str = data.data.title;
                var length = data.data.title.length
                if (data.data.title.length > 39){
                    return str.substring(0, length - 3) + "...";
                };
                divMargenes.firstChild.nodeValue="#"+data.data.title;
        

                let titleVM1 = document.getElementById("title1").innerText;


                return data
                })
                .catch((error) => {
                return error
                })
                return found
        }
        randomReplace()
    })

    //botonCLose2
    document.getElementById("closeButton2").addEventListener('click', () =>{
        function randomReplace(en) {
            const found = 
            fetch('https://api.giphy.com/v1/gifs/random?api_key=oydPUIN3T46GWi9KuEFkFtrECpKjrbRw&tag=&rating=R')
            .then((response) => {
                return response.json()
            })
            .then(data => {
        
                let myArray = data.data
                let img1 = document.getElementById("img2");
                img1.removeAttribute('src');
                img1.setAttribute('src', data.data.images.downsized.url);
                
                let divMargenes = document.getElementById("title2");
                var str = data.data.title;
                var length = data.data.title.length
                if (data.data.title.length > 39){
                    return str.substring(0, length - 3) + "...";
                };
                divMargenes.firstChild.nodeValue="#"+data.data.title;
        

                let titleVM2 = document.getElementById("title2").innerText;

                return data
                })
                .catch((error) => {
                return error
                })
                return found
        }
        randomReplace()
    })

        //botonCLose3
        document.getElementById("closeButton3").addEventListener('click', () =>{
            function randomReplace(en) {
                const found = 
                fetch('https://api.giphy.com/v1/gifs/random?api_key=oydPUIN3T46GWi9KuEFkFtrECpKjrbRw&tag=&rating=R')
                .then((response) => {
                    return response.json()
                })
                .then(data => {
            
                    let myArray = data.data
                    let img1 = document.getElementById("img3");
                    img1.removeAttribute('src');
                    img1.setAttribute('src', data.data.images.downsized.url);
                    
                    let divMargenes = document.getElementById("title3");
                    var str = data.data.title;
                    var length = data.data.title.length
                    if (data.data.title.length > 39){
                        return str.substring(0, length - 3) + "...";
                    };
                    divMargenes.firstChild.nodeValue="#"+data.data.title;
            

                    let titleVM3 = document.getElementById("title3").innerText;


                    return data
                    })
                    .catch((error) => {
                    return error
                    })
                    return found
            }
            randomReplace()
        })
    
    //botonCLose4
    document.getElementById("closeButton4").addEventListener('click', () =>{
        function randomReplace(en) {
            const found = 
            fetch('https://api.giphy.com/v1/gifs/random?api_key=oydPUIN3T46GWi9KuEFkFtrECpKjrbRw&tag=&rating=R')
            .then((response) => {
                return response.json()
            })
            .then(data => {
        
                let myArray = data.data
                let img1 = document.getElementById("img4");
                img1.removeAttribute('src');
                img1.setAttribute('src', data.data.images.downsized.url);

                let divMargenes = document.getElementById("title4");
                var str = data.data.title;
                var length = data.data.title.length
                if (data.data.title.length > 39){
                    return str.substring(0, length - 3) + "...";
                };
                divMargenes.firstChild.nodeValue="#"+data.data.title;
        

                let titleVM4 = document.getElementById("title4").innerText;

                return data
                })
                .catch((error) => {
                return error
                })
                return found
        }
        randomReplace()
    })

//botones ver mas

var btnVerMas1 = document.getElementById("verMas1")
var btnVerMas2 = document.getElementById("verMas2")
var btnVerMas3 = document.getElementById("verMas3")
var btnVerMas4 = document.getElementById("verMas4")

btnVerMas1.addEventListener('click', ()=>{
    let titleVM1 = document.getElementById("title1").innerText
    document.getElementById("placeholder").value=titleVM1;
    btnDeBusqueda.click();
})
btnVerMas2.addEventListener('click', ()=>{
    let titleVM2 = document.getElementById("title2").innerText
    document.getElementById("placeholder").value=titleVM2;
    btnDeBusqueda.click();
})
btnVerMas3.addEventListener('click', ()=>{
    let titleVM3 = document.getElementById("title3").innerText
    document.getElementById("placeholder").value=titleVM3;
    btnDeBusqueda.click();
})
btnVerMas4.addEventListener('click', ()=>{
    let titleVM4 = document.getElementById("title4").innerText
    document.getElementById("placeholder").value=titleVM4;
    btnDeBusqueda.click();
})

//El "hoy te sugerimos"

function random(sen) {
    const found = 
    fetch('https://api.giphy.com/v1/gifs/random?api_key=oydPUIN3T46GWi9KuEFkFtrECpKjrbRw&tag=&rating=R')
    .then((response) => {
        return response.json()
    })
    .then(data => {

        let myArray = data.data
        var div = document.getElementById("img"+sen);
        div.setAttribute("src", data.data.images.downsized.url);
        let divMargenes = document.querySelector(".title"+sen);
        var str = data.data.title;
        var length = data.data.title.length
        if (data.data.title.length > 39){
            return str.substring(0, length - 3) + "...";
        };
        divMargenes.firstChild.nodeValue="#"+data.data.title;
        console.log(data.data.title)
        return data
        })
        .catch((error) => {
        return error
        })
        return found
}
var nro = 1;
var sen = nro.toString();
function getNewRandom() {
    const found = 
    fetch('https://api.giphy.com/v1/gifs/random?api_key=oydPUIN3T46GWi9KuEFkFtrECpKjrbRw&tag=&rating=R')
    .then((response) => {
        return response.json()
    })
    .then(data => {
        data.data.images.downsized.url
        return data
        })
        .catch((error) => {
        return error
        })
        return found
}

for (let i = 1; i < 5; i++) {
    random(sen);
    sen = ++sen;
}


//se puede fetchear muchos links y concatenarlos en un array? sino se traba mucho

function tendencias() {
    const found = 
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=oydPUIN3T46GWi9KuEFkFtrECpKjrbRw&limit=20&rating=R')
    .then((response) => {
        return response.json()
    })
    .then(data => {
        console.log(data)
        let myArray = data.data
        myArray.forEach(i => {
            let embedd = document.createElement("img");
            if (i.images.original.width>maxWidthGif) {
                embedd.setAttribute("src", i.images.downsized.url);
                embedd.setAttribute("class", "gifsThicc");
                document.getElementById("tendenciaGifs").appendChild(embedd);
    
            } else {
                embedd.setAttribute("src", i.images.original.url);
                embedd.setAttribute("class", "gifs");
                document.getElementById("tendenciaGifs").appendChild(embedd);
     
            }
            
            let tendenciaGifs = document.getElementById('tendenciaGifs');
            let container = document.createElement('div');
            container.setAttribute('class', "container");
            let div = document.createElement('div');
            div.setAttribute('class', "divGifs");

            var hola = i.slug;
            var newStr = hola
            div.innerText=newStr
            div.classList.add("vaporwave")
            container.appendChild(embedd);
            container.appendChild(div);
            tendenciaGifs.appendChild(container)
            
        });
        return data
        
        
        })
        .catch((error) => {
        return error
        })
        console.log("funciona")
        return found
        
};
tendencias();