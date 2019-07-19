let socket=io()
/*
socket.on("mensaje",(informacion)=>{

    console.log(informacion)
})

socket.emit('mensaje','estoy conectado')

socket.emit('contador')

socket.on('contador',(contador)=>{
    console.log(contador)
})
*/
var param= new URLSearchParams(window.location.search)
var user =param.get('NuevoUsuario')
socket.on('connect',()=>{
socket.emit('usuarionuevo',user)
})
socket.on('usuarionuevo',(texto)=>{
    
    chat.innerHTML = chat.innerHTML + texto+"<br>"
})
socket.on('usuarioDesconectado',(texto)=>{
    
    chat.innerHTML = chat.innerHTML + texto+"<br>"
})
const formulario =document.querySelector('#formularioChat')
const mensaje = formulario.querySelector('#text')
const chat =document.querySelector('#chat')
formulario.addEventListener('submit',(datos)=>{
    datos.preventDefault()

    socket.emit("texto",mensaje.value,()=>{
                               
                                mensaje.value=''
                                mensaje.focus()
                            })
})

socket.on("texto",(text)=>{
    chat.innerHTML = chat.innerHTML + text +"<br>"
    console.log(text)
})


socket.on("MensajeBroadcast",(text)=>{
    alert(text)
    console.log(text)
})