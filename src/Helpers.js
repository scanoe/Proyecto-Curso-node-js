const hbs = require('hbs');

hbs.registerHelper('ListarCursos', (Cursos) => {
 
  let texto = "<div class='accordion' id='accordionExample'>"
  let i = 1
    Cursos.forEach(curso => {

      texto = texto + `
    <div class="card">
    <div class="card-header" id="heading${i}">
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${1}" aria-expanded="true" aria-controls="collapse${1}">
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
          <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${1}">
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