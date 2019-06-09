const fs = require('fs')

let listaCursosXusuario=[];

const inscribirCurso =(curso,usuario)=>{
preparar();

console.log(curso)
console.log(usuario)
let  existeid =listaCursosXusuario.find(C => (C.idCuso ==curso && C.idUsuario == usuario  ));
if(existeid){console.log('El id existe')
return 'El curso ya fue registrado pára este usuario'
}
 cursoXusuario ={
idCuso:curso,
idUsuario :usuario,

 }
 if(!(curso) || !(usuario) ){


return 'Datos obligatorios faltantes';
 }

 listaCursosXusuario.push(cursoXusuario)
guardar();
return 'ingreso exitoso'
}

const preparar=()=>{
    try{
    listaCursosXusuario=JSON.parse(fs.readFileSync('CursosXusuario.json'))
    }catch(error){

        listaCursosXusuario=[];
    }
 
}


const guardar =()=>
{
    let datos = JSON.stringify(listaCursosXusuario)
    fs.writeFile('CursosXusuario.json',datos,(err)=>{
        if(err) throw (err);
        console.log('creacion exitosa')
    })
}

const ConsultarCursosXususario =() =>{
preparar();

return listaCursosXusuario

}





module.exports={inscribirCurso,ConsultarCursosXususario};