let socket=io()
if(document.querySelector('#BroadCastForm')){
const formulario =document.querySelector('#BroadCastForm')
const mensaje = formulario.querySelector('#MensajeCordinador')
const chat =document.querySelector('#Mensaje')
formulario.addEventListener('submit',(datos)=>{
    datos.preventDefault()

    socket.emit("MensajeBroadcast",mensaje.value,()=>{
                               
                                mensaje.value=''
                                mensaje.focus()
                                chat.innerHTML ="Mensaje Enviado"
                            })
})}


socket.on("MensajeBroadcast",(text)=>{
    alert(text)
    console.log(text)
})