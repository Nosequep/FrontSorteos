class ModificarSorteoForm extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback() {
        
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
                <div class="formulario">
                <div class="card z-index-0 fadeIn3 fadeInBottom mb-4">
                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                            <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">Modificar Sorteo</h4>
                        </div>
                    </div>
                    <div class="card-body">
                    <form id="formulario" role="form" class="text-center" onsubmit="return false;">
                        <div class=" input-group  input-group-outline  w-50 is-focused">
                            <label class="form-label" for="nombre">Imagen:</label>
                            <input class="form-control" type="file" id="file" accept=".jpg, .png">
                        </div>
                        <div class=" input-group  input-group-outline my-3 w-50 is-focused">
                            <label class="form-label" for="nombre">Título:</label>
                            <input class="form-control" type="text" id="nombre" name="nombre" maxlength="40" required="required">
                        </div>
                        <div class="input-group input-group-outline mb-3 w-50 is-focused">
                            <label class="form-label" for="descripcion">Descripcion:</label>
                            <input class="form-control" type="text" id="descripcion" name="descripcion" maxlength="500" >
                        </div>
                        <div class="input-group input-group-outline mb-3 w-50 is-focused">
                            <label class="form-label" for="numMin">Número mínimo de Numeros:</label>
                            <input class="form-control" type="number" id="numMin" name="numMin" min="1" max="10000" pattern="[0-9]" value="1" required="required" onkeydown="javascript: return event.keyCode == 69 ? false : true" />
                        </div>
                        <div class="input-group input-group-outline mb-3 w-50 is-focused">
                            <label class="form-label" for="numMax">Número máximo de Numeros:</label>
                            <input class="form-control" type="number" id="numMax" name="numMax" min="1" max="10000" pattern="[0-9]" value="1" required="required" onkeydown="javascript: return event.keyCode == 69 ? false : true" />
                        </div>
                        <div class="input-group input-group-outline mb-3 w-50 is-focused">
                            <label class="form-label" for="precioNumeros">Precio del boleto:</label>
                            <input class="form-control" type="number" id="precioNumeros" name="precioNumeros" pattern="[0-9]" value="1"  min="1" max="10000" required onkeydown="javascript: return event.keyCode == 69 ? false : true" />
                        </div>
                        <div class="input-group input-group-outline mb-3 w-50 is-focused">
                            <label class="form-label" for="fechaSorteo">Fecha sorteo:</label>
                            <input class="form-control" type="date" id="fechaSorteo" name="fechaSorteo" required="required" />
                        </div>
                        <div class="input-group input-group-outline mb-3 w-50 is-focused">
                            <label class="form-label" for="inicioVenta">Fecha inicial de la venta:</label>
                            <input class="form-control" type="date" id="inicioVenta" name="inicioVenta" required="required" />
                        </div>
                        <div class="input-group input-group-outline mb-3 w-50 is-focused">
                            <label class="form-label" for="finalVenta">Fecha final de la venta:</label>
                            <input class="form-control" type="date" id="finalVenta" name="finalVenta" required="required" />
                        </div>
                        <div class="input-group input-group-outline mb-3 w-50 is-focused">
                            <label class="form-label" for="tiempoApartado">Tiempo de apartado (días):</label>
                            <input class="form-control" type="number" id="tiempoApartado" name="tiempoApartado" value="1" min="1" max="30" pattern="[0-9]" required="required" onkeydown="javascript: return event.keyCode == 69 ? false : true" />
                        </div>
                        <div class="input-group input-group-outline mb-3 w-50 is-focused">
                            <label class="form-label" for="tiempoNotificaciones">Tiempo de notificaciones (días):</label>
                            <input class="form-control" type="number" id="tiempoNotificaciones" name="tiempoNotificaciones" value="1" min="1" max="30" pattern="[0-9]" required="required" onkeydown="javascript: return event.keyCode == 69 ? false : true"/>
                        </div>

                        <div class="text-center">
                            <input type="submit" class="btn bg-gradient-primary shadow-primary w-30 my-4 mb-2" id="button" value="Modificar Sorteo"/>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        `
        this.#agregarEstilo();
        this.#modificarSorteo()
        this.#llenarForm();
    }

    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("id", "pagestyle");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../assets/css/material-dashboard.css?v=3.0.0");
        this.shadowRoot.appendChild(link);
    }

    #llenarForm(){
        document.addEventListener('DOMContentLoaded', (e) =>  {
            e.preventDefault();
            let url = new URL(window.location.href);
            let id = url.searchParams.get("id");            
            fetch(`http://localhost:3000/sorteo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/${id}`)
            .then((response) => response.json())
            .then((json) => {                        

                let sorteo = json['data']    
        
                let titulo = sorteo['titulo'];
                let descripcion = sorteo['descripcion']
                let numMin = sorteo['numMin'];
                let numMax = sorteo['numMax'];
                let precioNumeros = sorteo['precioNumeros'];
                let diasLimiteApartado = sorteo['diasLimiteApartado'];
                let tiempoRecordatorio = sorteo['tiempoRecordatorio'];
                let fechaSorteo = sorteo['fechaSorteo'].substring(0,10);
                let fechaInicioVenta = sorteo['fechaInicioVenta'].substring(0,10);       
                let fechaFinal = sorteo['fechaFinVenta'].substring(0,10);

                this.shadowRoot.querySelector('#nombre').value = titulo;
                this.shadowRoot.querySelector('#descripcion').value = descripcion;
                this.shadowRoot.querySelector('#numMin').value = numMin;
                this.shadowRoot.querySelector('#numMax').value = numMax;
                this.shadowRoot.querySelector('#precioNumeros').value = precioNumeros;
                this.shadowRoot.querySelector('#tiempoApartado').value = diasLimiteApartado;
                this.shadowRoot.querySelector('#tiempoNotificaciones').value = tiempoRecordatorio;
                this.shadowRoot.querySelector('#inicioVenta').value = fechaInicioVenta;
                this.shadowRoot.querySelector('#fechaSorteo').value = fechaSorteo;
                this.shadowRoot.querySelector('#finalVenta').value = fechaFinal;
            });
        
        }),false;
    }

    #modificarSorteo() {        
        const form = this.shadowRoot.querySelector("#formulario");
        const btn = this.shadowRoot.querySelector("#button");
        const titulo = this.shadowRoot.querySelector('#nombre');
        const descripcion = this.shadowRoot.querySelector('#descripcion');
        let numMin = this.shadowRoot.querySelector('#numMin');
        let numMax = this.shadowRoot.querySelector('#numMax');
        const precioNumeros = this.shadowRoot.querySelector('#precioNumeros');
        const fechaSorteo = this.shadowRoot.querySelector('#fechaSorteo');
        const fechaInicioVenta = this.shadowRoot.querySelector('#inicioVenta');
        const fechaFinVenta = this.shadowRoot.querySelector('#finalVenta');
        let diasLimiteApartado = this.shadowRoot.querySelector('#tiempoApartado');
        let tiempoRecordatorio = this.shadowRoot.querySelector('#tiempoNotificaciones');
        const imagen = "asdfasdf";
        const fecha = new Date();
        const fechaCreacion = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
        const estado = "vigente"


        const validateNumbers = (numMin, numMax, diasRecordatorio, diasPeriodo) => {
            if (numMin > numMax) {
                alert("El número mínimo de boletos debe ser menor que el máximo")
                return false;
            }

            if (numMin >= 10000 || numMax >= 10000 || diasRecordatorio >= 30 || diasPeriodo >= 30) {
                return false;
            }

            if (numMin < 1 || numMax < 1 || diasRecordatorio < 1 || diasPeriodo < 1) {
                return false;
            }
            return true;
        }

        const validateFechas = (fechaInicioVenta, fechaFinVenta, fechaSorteo, fechaCreacion) => {
            if (fechaInicioVenta == "" || fechaFinVenta == "" || fechaSorteo == "" || fechaCreacion == "") {
                return false;
            }
            if (fechaCreacion > fechaSorteo || fechaCreacion > fechaInicioVenta || fechaCreacion > fechaFinVenta) {
                alert("Las fechas deben de ser superiores a la fecha actual")
                return false;
            }
            if (fechaInicioVenta > fechaFinVenta) {
                alert("La fecha de inicio de la venta debe ser anterior a la fecha final de la venta");
                return false;
            }
            if (fechaSorteo < fechaFinVenta) {
                alert("La fecha de sorteo debe ser despues a la fecha final de la venta");
                return false;
            }
            return true;
        }

        const validateEmpty = (titulo, descripcion) => {
            if (titulo.trim() === "" || descripcion.trim() === "") {
                alert("El título y la descripción no pueden estar vacíos");
                return false;
            }
            return true;
        }

        btn.addEventListener('click', function () {

            const validarNumeros = validateNumbers(numMin.value, numMax.value, diasLimiteApartado.value, tiempoRecordatorio.value);
            const validacionFechas = validateFechas(fechaInicioVenta.value, fechaFinVenta.value, fechaSorteo.value, fechaCreacion);    
            let url = new URL(window.location.href);
            let id = url.searchParams.get("id");      

            if (validarNumeros && validacionFechas && validateEmpty(titulo.value, descripcion.value)) {
                fetch(`http://localhost:3000/sorteo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                    {
                        "titulo": titulo.value,
                        "descripcion": descripcion.value,
                        "numMin": numMin.value,
                        "numMax": numMax.value,
                        "precioNumeros": precioNumeros.value,
                        "fechaCreacion": fechaCreacion,
                        "fechaSorteo": fechaSorteo.value,
                        "fechaInicioVenta": fechaInicioVenta.value,
                        "fechaFinVenta": fechaFinVenta.value,
                        "diasLimiteApartado": diasLimiteApartado.value,
                        "tiempoRecordatorio": tiempoRecordatorio.value,
                        "imagen": imagen,
                        "estadoSorteo": estado
                    })

                })
                .then(response => response.json())
                .then(function (data) { 
                    alert("Se ha actualizado con éxito el sorteo.")
                    form.reset();
                }).catch(function (error) {
                    console.warn('Something went wrong.', error);
                });
            }
        });

    }
}

window.customElements.define("modificar-sorteo-form", ModificarSorteoForm);