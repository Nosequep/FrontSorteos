

class SorteoTable extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <div class="container-fluid py-4">
          <div class="row">
            <div class="col-12">
              <div class="card my-4">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                    <h4 class="text-center text-white text-capitalize ps-3">Consultar sorteo</h4>
                  </div>
                </div>
                <div class="card-body px-0 pb-2">
                  <div class="table-responsive p-0">
                    <div class = "align-items-center mb-0">
                        <div class="ms-md-auto pe-md-3 d-flex align-items-center my-3 mx-3 w-50">
                            <div class="input-group input-group-outline is-focused">
                              <select name="select" id = "opciones-busqueda">
                                <option value="id" selected>ID</option>
                                <option value="titulo" >Título</option>
                              </select>
                              <input type="text" id="texto-busqueda" class="form-control" placeholder="Buscar"/>
                              <input type="button" id= "btn-busqueda"/>
                              
                            </div>
                        </div>    
                    </div> 
                    <table class="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
                          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Título</th>
                          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"">Cantidad de boletos</th>
                          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"">Costo por boleto</th>
                          <th class="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody id ="body-table">

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <!--   Core JS Files   -->
      <script src="../assets/js/core/popper.min.js"></script>
      <script src="../assets/js/core/bootstrap.min.js"></script>
      <script src="../assets/js/plugins/perfect-scrollbar.min.js"></script>
      <script src="../assets/js/plugins/smooth-scrollbar.min.js"></script>
      <script>
        var win = navigator.platform.indexOf('Win') > -1;
        if (win && document.querySelector('#sidenav-scrollbar')) {
          var options = {
            damping: '0.5'
          }
          Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
        }
      </script>
      <!-- Github buttons -->
      <script async defer src="https://buttons.github.io/buttons.js"></script>
      <!-- Control Center for Material Dashboard: parallax effects, scripts for the example pages etc -->
      <script src="../assets/js/material-dashboard.min.js?v=3.0.0"></script>
        `
      this.#agregarEstilo();
      this.#buscarSorteos();
      this.#buscarSorteosAtributo();
    }

  #agregarEstilo() {
    let link = document.createElement("link");
    link.setAttribute("id", "pagestyle");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "../assets/css/material-dashboard.css?v=3.0.0");
    this.shadowRoot.appendChild(link);
  }

  #buscarSorteos() {
    let elementTable = this.shadowRoot.querySelector("#body-table");
    fetch('http://localhost:3000/sorteos/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(function (data) { 
      
      let sorteos = data['data'];
      console.log(data);
      let contador = 1;
      for (let s of sorteos) {

        let cantBoletos = s['numMax']-(s['numMin']-1);
        elementTable.innerHTML += `
          <tr>
            <td>
              <div class="d-flex px-2 py-1">
                <p class="text-xs font-weight-bold mb-0">${s['_id']}</p>
              </div>
            </td>
            <td>
              <div class="d-flex px-2 py-1">
                <p class="text-xs font-weight-bold mb-0">${s['titulo']}</p>
              </div>
            </td>
            <td >
              <div class="d-flex px-2 py-1">
                <p class="text-xs font-weight-bold mb-0">${cantBoletos}</p>
              </div>
            </td>
            <td>
              <div class="d-flex px-2 py-1">
                <p class="text-xs font-weight-bold mb-0">${s['precioNumeros']}</p>
              </div>
            </td>
            <td class="align-middle">
              <a id="link-${contador}" href="../views/modificarSorteo.html?id=${s['_id']}" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                Edit
              </a>
            </td>
          </tr>
        `  
        contador++;
      }
      
    }).catch(function (error) {
      console.warn('Something went wrong.', error);
 
    });
  }

  #buscarSorteosAtributo() {
    const btn = this.shadowRoot.querySelector("#btn-busqueda");
    let elementTable = this.shadowRoot.querySelector("#body-table");
    let elementCombo = this.shadowRoot.querySelector("#opciones-busqueda")
    let elementTexto = this.shadowRoot.querySelector("#texto-busqueda")

    let mensajeSorteosVacios = `
      <tr>
        
        <div class="d-flex px-2 py-1 ">
          <h3>No se encontró sorteo</h3>
        </div>
      </tr>
    `  
    btn.addEventListener('click', () => {
      elementTable.innerHTML = ``  
      let peticion = 'http://localhost:3000/';
      let jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/'
      if(elementCombo.value == "id"){
        peticion += 'sorteo/'
    
      }else if(elementCombo.value == "titulo"){
        peticion += 'sorteoTitulo/'  
      }

      if(elementTexto.value){
        peticion += jwt + elementTexto.value;
      }else{
        this.#buscarSorteos();
        return;
      }
    
      fetch(peticion, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(function (data) { 
        
        let sorteos = [];
        if(elementCombo.value == "id"){
          sorteos.push(data['data']);
        }else if (elementCombo.value == "titulo"){
          sorteos = data['data'];
        }
        if(sorteos[0] != null){
          let contador = 1;
          for (let s of sorteos) {
            let cantBoletos = s['numMax']-(s['numMin']-1);
            elementTable.innerHTML += `
              <tr>
                <td>
                  <div class="d-flex px-2 py-1">
                    <p class="text-xs font-weight-bold mb-0">${s['_id']}</p>
                  </div>
                </td>
                <td>
                  <div class="d-flex px-2 py-1">
                    <p class="text-xs font-weight-bold mb-0">${s['titulo']}</p>
                  </div>
                </td>
                <td >
                  <div class="d-flex px-2 py-1">
                    <p class="text-xs font-weight-bold mb-0">${cantBoletos}</p>
                  </div>
                </td>
                <td>
                  <div class="d-flex px-2 py-1">
                    <p class="text-xs font-weight-bold mb-0">${s['precioNumeros']}</p>
                  </div>
                </td>
                <td class="align-middle">
                  <a id="link-${contador}" href="../views/modificarSorteo.html?id=${s['_id']}" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                    Edit
                  </a>
                </td>
              </tr>
            `  
            contador++;
          }
        }else{
          elementTable.innerHTML += mensajeSorteosVacios;
        }
        
      }).catch(function (error) {
        elementTable.innerHTML += mensajeSorteosVacios;
      });

    });
  
  }
}



window.customElements.define("sorteo-table", SorteoTable);