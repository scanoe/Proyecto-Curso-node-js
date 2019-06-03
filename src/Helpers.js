const hbs = require('hbs');
let i =1
hbs.registerHelper('ListarCursos',(Cursos)=>{
    let texto = "<div class='accordion' id='accordionExample'>"
    
Cursos.forEach(curso => {

    texto = texto+`
    <div class="card">
    <div class="card-header" id="heading${1}">
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${1}" aria-expanded="true" aria-controls="collapse${1}">
          ${curso.nombre}
        </button>
      </h2>
    </div>

    <div id="collapse${1}" class="collapse" aria-labelledby="heading${1}" data-parent="#accordionExample">
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
});
return texto
})