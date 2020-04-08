var video = document.getElementById('video');
var comenzar = document.getElementById('comenzar');
var miCamara
var cancelar = document.getElementById('cancelar');
var capturar = document.getElementById('capturar');
function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { height: { max: 480 }}
    })
        .then(stream=> {

            miCamara = stream
            video.srcObject = miCamara;
            video.play()
        })
        .catch(console.error)
}
var text = document.getElementById('crearGuifos');

function cambiosDOM(){
    
    text.innerText = "Un Chequeo Antes De Empezar"
    document.getElementById('windowImg').style.display="none"
    document.getElementById('aquiPodras').style.display="none"
    document.getElementById('instrucciones').style.display="none"
    document.getElementById('cancelar').style.display="none"
    let grid2 = document.getElementById('grid2');
    grid2.style.width="fit-content"
    grid2.style.display = "block"
    grid2.style.height= "auto"

    let comenzar = document.getElementById('comenzar');
    comenzar.style.display="none"

    capturar.style.display="block"
    capturar.style.marginBottom = "16px"
    capturar.style.marginRight = "16px"
    document.getElementById('camaraImg').style.display="block"
    document.getElementById('camaraImg').style.marginBottom = "16px"



}
comenzar.addEventListener('click', ()=> {
        cambiosDOM()
        getStreamAndRecord();
})

var listo = document.getElementById('listo');
var recording = document.getElementById('recording');
var cronometro = document.getElementById('cronometro');

function cambiosDOM2() {
    text.innerHTML="Capturando tu guifo"
    capturar.style.display="none";
    document.getElementById('camaraImg').style.display="none";
    listo.style.display = "block";
    recording.style.display = "block";
    recording.style.marginBottom = "16px";
    listo.style.marginBottom = "16px"
    listo.style.marginRight = "16px"
    cronometro.style.display="block"
    
    
}
var timer
function stopTimer() {
    clearInterval(timer);
}
function startTimer() {
    contador_s =00;
    contador_m =00;
    s = document.getElementById('segundos')
    m = document.getElementById('minutos')

    timer = setInterval(
        function () {
            if (contador_s==60) {
                contador_s=0;
                contador_m++;
            }
            s.innerHTML = contador_s;
            contador_s++;
            m.innerHTML = contador_m;
        }
        ,1000);
}


var recorder
var grabacion
function hi() {
    grabacion = grabar(miCamara);
    grabacion.startRecording();
}
capturar.addEventListener('click', ()=>{
    hi();
    cambiosDOM2();
    startTimer();
    
})
listo = document.getElementById('listo');

var blob

function cambiosDOM3() {
    text.innerHTML="Vista Previa"

}
var gifsCreados = [];
var form
var parametros
var url
var img = document.getElementById('test')
listo.addEventListener('click', () =>{
    stopTimer();

    grabacion.stopRecording();
    console.log(recorder)

    form = new FormData();
    form.append('file', grabacion.getBlob(),  'myGif.gif')
    console.log(form.get('file'))
    url = grabacion.toURL();
    parametros = {
        method: 'POST',
        body: form,
        //mode: 'no-cors'
}
    uploadEndpoint()
})


function uploadEndpoint() {
    const found = 
    fetch('https://upload.giphy.com/v1/gifs?&api_key=oydPUIN3T46GWi9KuEFkFtrECpKjrbRw&username=rodritazzi&source_image_url='+url, parametros)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        getGifUrl(data.data.id);
        return data
        })
        .catch((error) => {
        console.log(error);
        return error;
    });
    return found;
};



function grabar(transmision) {
    return RecordRTC(transmision, {
        disableLogs: true, //tiene logs automaticos
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        timeSlice: 1000,
    }); 
}
function getGifUrl(id) {
    const found = 
    fetch('https://api.giphy.com/v1/gifs/'+id+'?&api_key=oydPUIN3T46GWi9KuEFkFtrECpKjrbRw')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data.data)
        if (localStorage.getItem('gifList')) {
        gifsCreados = JSON.parse(localStorage.getItem('gifList'));
        console.log(gifsCreados)
        gifsCreados.push(data.data.images.original.url);
        localStorage.setItem('gifList', JSON.stringify(gifsCreados));
        }else{
            gifsCreados.push(data.data.images.original.url);
            localStorage.setItem('gifList',JSON.stringify(gifsCreados))
        }
        return data
        })
        .catch((error) => {
        console.log(error);
        return error;
    });    
    console.log("funciona")
    return found;
};
