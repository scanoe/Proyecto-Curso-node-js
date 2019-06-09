const hbs = require('hbs');

hbs.registerHelper('ListarCursos', (Cursos) => {
 
  let texto = "<div class='accordion' id='accordionExample'>"
  let i = 1
    Cursos.forEach(curso => {

      texto = texto + `
    <div class="card">
    <div class="card-header" id="heading${i}">
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
        <div class="text-left">  
        ${curso.nombre} <br>
          valor: ${curso.valor} <br>
          Descripcion: ${curso.descripcion} 
          </div>
        </button>
      </h2>
    </div>

    <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
      <div class="card-body">
      <p>ID: ${curso.id} </p>
      <p>Descripcion: ${curso.descripcion} </p>
      <p>valor: ${curso.valor} </p>
      <p>modalidad: ${curso.modalidad} </p>
      <p>Intensidad: ${curso.Intensidad} </p>
      <p>estado: ${curso.estado} </p>
      </div>
    </div>
  </div>
   `
      i++;
    })
   
  return texto
})

hbs.registerHelper('ListarCursosDisponibles', (Cursos) => {
  let i = 1
  let texto = "<div class='accordion' id='accordionExample'>"
  Cursos.forEach(curso => {
    if (curso.estado == 'disponible') {
      texto = texto + `
      <div class="card">
      <div class="card-header" id="heading${i}">
        <h2 class="mb-0">
          <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
          <div class="text-left">  
          ${curso.nombre} <br>
            valor: ${curso.valor} <br>
            Descripcion: ${curso.descripcion} 
            </div>
          </button>
        </h2>
      </div>
  
      <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
        <div class="card-body">
        <p>ID: ${curso.id} </p>
        <p>Descripcion: ${curso.descripcion} </p>
        <p>valor: ${curso.valor} </p>
        <p>modalidad: ${curso.modalidad} </p>
        <p>Intensidad: ${curso.Intensidad} </p>
        <p>estado: ${curso.estado} </p>
        </div>
      </div>
    </div>
     `
    }
    i++;
  })
  return texto



})


hbs.registerHelper('NavbarAspirante', (UsuarioID) => {

  texto =`            <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Opciones</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
          <li class="nav-item active">
              <a class="nav-link" href="/?UsuarioID=${UsuarioID}">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Cursos
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="/ListaCursosDisponibles?UsuarioID=${UsuarioID}"c>ListaCursos</a>
                  
              </div>
          </li>
          
      </ul>
  </div>
</nav>`


return texto

})

hbs.registerHelper('SelectCursos', (cursos,UsuarioID) => {

texto =` <form action="/InscribirCurso" method="post">`+
'<div class="form-group">'+
'<label for="curso">ID del curso </label>' +
' <select class="form-control" id="curso" name ="curso">'



cursos.forEach((curso)=> {

  if (curso.estado =='disponible'){

  texto = texto +`<option>${curso.id}</option>`

}



})
texto= texto+`</select>
<input type = "text" name = "UsuarioID" value = '${UsuarioID}' />
<input type="submit" class="form-group" value="Registrar" name="submit" id="submit">
</div>
</form>`
return texto
})