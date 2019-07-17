let socket=io()
socket.on("mensaje",(informacion)=>{

    console.log(informacion)
})

socket.emit('mensaje','estoy conectado')

socket.emit('contador')

socket.on('contador',(contador)=>{
    console.log(contador)
})

const formulario =document.querySelector('#formularioChat')
const mensaje = formulario.querySelector('#text')
const chat =document.querySelector('#chat')
formulario.addEventListener('submit',(datos)=>{
    datos.preventDefault()
    const nombre = datos.target.elements.nombre.value
    const texto = datos.target.elements.text.value
    socket.emit("texto",{nombre:nombre,
                            mensaje:texto},()=>{
                               
                                mensaje.value=''
                                mensaje.focus()
                            })
})

socket.on("texto",(text)=>{
    chat.innerHTML = chat.innerHTML + text.nombre +" dice: "+text.mensaje +"<br>"
    console.log(text)
})