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
    }

    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("id", "pagestyle");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../assets/css/material-dashboard.css?v=3.0.0");
        this.shadowRoot.appendChild(link);
    }
   
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/sorteo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJQYWNvIiwiY29ycmVvIjoiMTIzNEBob3RtYWkuY29tIiwiZGlyZWNjaW9uIjoiYXNkIiwidGVsZWZvbm8iOiIxMjI0MTEzIiwiY2l1ZGFkIjoiTmFybmlhIiwiZXN0YWRvIjoiZGUgbWV4aWNvIiwic29ydGVvcyI6W119.SiUEOo9A-9FyBoOC-Pdc4I3pTUjwM3sjmYddyfieEHg/6196ad25c19acb5f185f23c0')
    .then((response) => response.json())
    .then((json) => {
        let titulo = json[0].titulo;
        let descripcion = json[0].descripcion;
        let numMin = json[0].numMin;
        let numMax = json[0].numMax;
        let precioNumeros = json[0].precioNumeros;
        let diasLimiteApartado = json[0].diasLimiteApartado;
        let tiempoRecordatorio = json[0].tiempoRecordatorio;

        this.shadowRoot.querySelector('#nombre') = titulo;
        this.shadowRoot.querySelector('#descripcion') = descripcion;
        this.shadowRoot.querySelector('#numMin') = numMin;
        this.shadowRoot.querySelector('#numMax') = numMax;
        this.shadowRoot.querySelector('#precioBoletos') = precioNumeros;
        this.shadowRoot.querySelector('#tiempoApartado') = diasLimiteApartado;
        this.shadowRoot.querySelector('#tiempoNotificaciones') = tiempoRecordatorio;
    });

}),false;

window.customElements.define("modificar-sorteo-form", ModificarSorteoForm);