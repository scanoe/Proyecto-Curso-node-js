// const { argv }= require('./yargs');
 const modeloIngresoCurso= require('./../Model/IngresarCursoModel')
 const modelIngresoUsuario = require('./../Model/IngresarUsuarioModel')
 const express = require('express')
 const app = express()
 const path= require('path')
 const hbs = require('hbs')
 const bodyParser = require("body-parser")
 const helpers = require('./Helpers')

 const dirartials=path.join(__dirname+'../partials');
hbs.registerPartials('C:/Users/Sebastian/Desktop/node/proyecto curso/partials');
 app.set('view engine','hbs')
 app.use(bodyParser.urlencoded({extended :false}))
console.log( __dirname)


 const dirpublico = path.join(__dirname,'../public')
app.use(express.static(dirpublico))


app.get('/', function (req, res) {
  
  res.render("Login.hbs")
})

app.post('/login',function (req,res) {
  let datos = req.body
  
  let consulta = modelIngresoUsuario.ConsultarUsuarios()

  let  existe = consulta.find(C => (C.usuario == datos.user && C.password ==datos.password));

  if(existe){
    console.log(existe)
    if(existe.rol=='coordinador'){

    res.render('PaginaPrincipalCoordinador.hbs')
    }else if(existe.rol=='aspirante'){
      res.send('pagina del aspirante')
    }

  }else{

    res.send('ususario invalido')
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
