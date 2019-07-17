class Usuarios{

    constructor(){
        this.usuarios=[];
    }

    agregarUsuario(id,nombre){
        let usuario={id,nombre}
        this.usuarios.push(usuario)
        return this.usuarios
    }

    getUsuarios(){
        return this.usuarios
    }

    getUsuario(id){
       let usuario = this.usuarios.filter(user => usuario.id==id)
        return usuario
    }

    borrarUsuario(id){
        let usuarioBorrado =this.getUsuario(id)
        usuarios = this.usuarios.filter(user => user.id !=id)
        return usuarioBorrado
    }
  
}

exportsmodule.exports={Usuarios}