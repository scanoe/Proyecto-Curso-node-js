// const { argv }= require('./yargs');
const modeloIngresoCurso= require('./../Model/IngresarCursoModel')
const modelIngresoUsuario = require('./../Model/IngresarUsuarioModel')
const modelCursoXUsuario = require('./../Model/CursoXUsuarioModel')
const express = require('express')
const app = express()
const path= require('path')
const hbs = require('hbs')
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const helpers = require('./Helpers')

const dirartials=path.join(__dirname,'../partials');
console.log(dirartials)
//console.log('C:/Users/Sebastian/Desktop/node/proyecto curso/partials')
hbs.registerPartials(dirartials);
app.set('view engine','hbs')
app.use(bodyParser.urlencoded({extended :false}))



const dirpublico = path.join(__dirname,'../public')
console.log(dirpublico)
app.use(express.static(dirpublico))


app.get('/', function (req, res) {  
  res.render("Login.hbs",{mensaje: ''})
})

app.post('/login',function (req,res) {
  let datos = req.body
    
  let consulta = modelIngresoUsuario.ConsultarUsuarios()

 
  //let  existe = consulta.find(C => (C.usuario == datos.user && C.password == datos.password));
  let existe
 modelIngresoUsuario.Usuario.findOne({usuario: datos.user, password : datos.password })
.exec((err,existe)=>{

  if (err){console.log(err)}
  else{

    if(existe){
      //console.log(existe)
      if(existe.rol=='coordinador'){
        res.render('PaginaPrincipalCoordinador.hbs',{usuario :existe})
      }else if(existe.rol=='aspirante'){
        console.log('documento del aspirante'+ existe.documento)
        res.render("PaginaPrincipalAspirante.hbs",{UsuarioID : existe.documento})
      }
      }else{  
        res.render("Login.hbs",{mensaje: 'usuario invalido'})
      }


  }
})

 

})

app.get('/NuevoCurso', function (req, res) {
  res.render("NuevoCurso.hbs")
})

app.get('/NuevoUsuario', function (req, res) {
  res.render('NuevoUsuario.hbs')
})

app.get('/IngresarCurso', function (req, res) {
  console.log(req.query)
  let resp = modeloIngresoCurso.CrearCurso(req.query)
  let curso = new modeloIngresoCurso.curso(
    {
    id:req.query.id,
    nombre :req.query.nombre,
    descripcion: req.query.descripcion,
    valor : req.query.valor,
    modalidad : req.query.modalidad,
    Intensidad: req.query.Intensidad,
    estado:'disponible'
  })
  curso.save((err,resp)=>{

    if (err){
      console.log("Error de acceso a la base de datos")
      res.send("Error de insercion de curso")
    } else(
      modeloIngresoCurso.curso.find({}).exec((err,resp)=>{
        console.log(res)
        res.render('ListarCursos',{
          Cursos: resp
        })

      })

    )
  })
/*
  res.render('ListarCursos',{
    Cursos: modeloIngresoCurso.ConsultarCursos()
  })
*/
})

app.get('/IngresarUsuario', function (req, res) {
  console.log(req.query)
  let resp = modelIngresoUsuario.CrearUsuario(req.query)
  let estudiante = new modelIngresoUsuario.Usuario({
    documento:req.query.documento,
    nombre :req.query.nombre,
    usuario :req.query.usuario,
    correo: req.query.correo,
    password:req.query.password,
    telefono:req.query.telefono,
    rol:'aspirante'
     })
     estudiante.save((err,resul)=>{
       if (err){
         console.log("Error de insercion")
       }
       else{
        res.render("Login.hbs", {mensaje: 'Su Registro fue Exitoso ahora puede ingresar con su usuario y contraseña'})
       }
     });
  //res.send(resp)
 // res.render("Login.hbs", {mensaje: 'Su Registro fue Exitoso ahora puede ingresar con su usuario y contraseña'})
})

app.get('/ListaCursos', function (req, res) {
  res.render('ListarCursos',{
    Cursos: modeloIngresoCurso.ConsultarCursos()
  })
})

app.get('/ListaCursosDisponibles', function (req, res) {
  console.log(req.query)
  res.render('ListarCursosDisponibles',{
    Cursos: modeloIngresoCurso.ConsultarCursos(),
    UsuarioID: req.query.UsuarioID,
    mensaje:''
  })
})

app.post('/InscribirCurso', function (req, res) {
  let datos = req.body
  
  console.log()
  let resp = modelCursoXUsuario.inscribirCurso(datos.curso,datos.UsuarioID)

  console.log (resp)
  
  res.render('ListarCursosDisponibles',{
    Cursos: modeloIngresoCurso.ConsultarCursos(),
    UsuarioID: req.body.UsuarioID,
    mensaje:resp
  })
})

app.get('/ListaCursosInscritos', function (req, res) {
  //console.log(req.query)
  res.render('ListarCursosInscritos',{
    CursosUsuario: modelCursoXUsuario.ConsultarCursosXususario(),
    UsuarioID: req.query.UsuarioID,
    mensaje:''
  })
})

app.get('/EliminaCursoInscrito', function (req, res) {
  let lista = modelCursoXUsuario.eliminar(req.query.idCuso, req.query.UsuarioID)
  res.render('ListarCursosInscritos',{
    CursosUsuario: lista,
    UsuarioID: req.query.UsuarioID,
    mensaje:''
  })
})

app.get('/EliminaUsuarioCurso', function (req, res) {
  res.render('EliminarUsuarioxCurso')
})

app.get('/EliminaUsuarioDeCurso', function (req, res) {
  let lista = modelCursoXUsuario.eliminar(req.query.idCuso, req.query.UsuarioID)
  console.log('-------')
  console.log(lista)
  res.render('ListarInscritosEnCurso',{
    UsuariosxCurso: lista.filter(filtro => filtro.idCuso == req.query.idCuso),
    UsuarioID: req.query.UsuarioID,
    mensaje:''
  })
})

app.get('/ListaInscritosxCursos', function (req, res) {
  res.render('ListarInscritosxCursos',{
    Cursos: modeloIngresoCurso.ConsultarCursos(),
  })
})

app.get('/CierraCurso', function (req, res) {
  let cerrar = modeloIngresoCurso.CerrarCurso(req.query.id)
  res.render('ListarInscritosxCursos',{
    Cursos: cerrar,
  })
})

app.get('/EditaUsuario', function (req, res) {    
  res.render('EditarUsuario')
})

app.get('/VistaActualizarUsuario', function (req, res) {    
  let usuario = modelIngresoUsuario.ConsultarUsuarios().find(f => f.documento == req.query.UsuarioID)
  console.log(req.query.UsuarioID)
  console.log('.....')
  console.log(usuario)
  res.render('ActualizarUsuario',{
    usuario: usuario
  })

})

app.get('/ActualizarUser', function (req, res) {
  console.log(req.query)   
  let resp = modelIngresoUsuario.actualizarUsuario(req.query)
  res.render('ResultadoActualizacion', {
    resultado: resp
  })
})

app.get('/CursosOfrecidos', function (req, res) {    
  res.render('CursosOfrecidos', {
    Cursos : modeloIngresoCurso.ConsultarCursos()
  })
})

mongoose.connect('mongodb://localhost:27017/EducacionContinua', {useNewUrlParser: true},(err,resultado)=>{


if(err){

  console.log(err)
}else{

    console.log("Conectado a mongo")
}
});
app.listen(3000)



/*
 let comando = argv._[0];

 switch (comando){
    case'crear':
    model.CrearCurso(argv)
        
    

    break
    default:
        console.log(comando);
        


 }*/
