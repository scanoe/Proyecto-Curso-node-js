// const { argv }= require('./yargs');
 const modeloIngresoCurso= require('./../Model/IngresarCursoModel')
 const modelIngresoUsuario = require('./../Model/IngresarUsuarioModel')
 const ModelCursoXUsuario = require('./../Model/CursoXUsuarioModel')
 const express = require('express')
 const app = express()
 const path= require('path')
 const hbs = require('hbs')
 const bodyParser = require("body-parser")
 const helpers = require('./Helpers')

 const dirartials=path.join(__dirname,'../partials');
 console.log(dirartials)
 console.log('C:/Users/Sebastian/Desktop/node/proyecto curso/partials')
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

  let  existe = consulta.find(C => (C.usuario == datos.user && C.password ==datos.password));

  if(existe){
    console.log(existe)
    if(existe.rol=='coordinador'){

    res.render('PaginaPrincipalCoordinador.hbs',{usuario :existe})
    }else if(existe.rol=='aspirante'){

      console.log('documento del aspirante'+ existe.documento)
      res.render("PaginaPrincipalAspirante.hbs",{UsuarioID : existe.documento})
    }

  }else{

  
    res.render("Login.hbs",{mensaje: 'ususario invalido'})
  }

  

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
     res.send(resp)
  })

  app.get('/IngresarUsuario', function (req, res) {
    console.log(req.query)
    let resp = modelIngresoUsuario.CrearUsuario(req.query)
    res.send(resp)
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
    UsuarioID: req.query.UsuarioID
    

  })
})


app.post('/InscribirCurso', function (req, res) {
  let datos = req.body
  console.log(datos)
  let resp = ModelCursoXUsuario.inscribirCurso(datos.Curso,datos.UsuarioID)

  console.log (resp)
  

})



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
