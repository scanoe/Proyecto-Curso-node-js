// const { argv }= require('./yargs');
 const model= require('./../Model/IngresarCursoModel')
 const express = require('express')
 const app = express()
 const path= require('path')
 const hbs = require('hbs')
 const helpers = require('./Helpers')
 console.log(__dirname)
 const dirartials=path.join(__dirname+'../partials');
hbs.registerPartials('C:/Users/Sebastian/Desktop/node/proyecto curso/partials');
 app.set('view engine','hbs')
console.log( __dirname)


 const dirpublico = path.join(__dirname,'../public')
app.use(express.static(dirpublico))


 app.get('/', function (req, res) {
   console.log(dirpublico)
   //res.sendfile(dirpublico+"/NuevoCurso.html")

   res.render("NuevoCurso.hbs")
 })


 app.get('/IngresarCurso', function (req, res) {
     console.log(req.query)
     let resp = model.CrearCurso(req.query)
     res.send(resp)
  })
  
  app.get('/ListaCursos', function (req, res) {
    
   // console.log("holi hello"+model.ConsultarCursos())
    res.render('ListarCursos',{
      Cursos: model.ConsultarCursos()

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
