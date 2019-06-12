const fs = require('fs')

let listaUsuarios=[];

const CrearUsuario =(usuario)=>{
    preparar();
    let  existeid =listaUsuarios.find(C => C.documento ==usuario.documento);
    if(existeid){console.log('El Documento de identidad ya existe')
    return 'El id existe'
    }
     user ={
    documento:usuario.documento,
    nombre :usuario.nombre,
    usuario :usuario.usuario,
    correo: usuario.correo,
    password:usuario.password,
    telefono:usuario.telefono,
    rol:'aspirante'
     }
     if(!(usuario.documento) || !(usuario.nombre)|| !(usuario.correo)|| !(usuario.telefono) || !(usuario.usuario)|| !(usuario.password) ){


    return 'Datos obligatorios faltantes';
     }

     listaUsuarios.push(user)
    guardar();
    return 'ingreso exitoso'
}

const preparar=()=>{
    try{
        listaUsuarios=JSON.parse(fs.readFileSync('usuarios.json'))
    }catch(error){

        listaUsuarios=[];
    }
 
}


const guardar =()=>
{
    let datos = JSON.stringify(listaUsuarios)
    fs.writeFile('usuarios.json',datos,(err)=>{
        if(err) throw (err);
        console.log('creacion exitosa')
    })
}

const ConsultarUsuarios =() =>{
preparar();

return listaUsuarios

}





module.exports={CrearUsuario,ConsultarUsuarios};