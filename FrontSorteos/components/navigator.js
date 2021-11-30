class SorteoNavigator extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = ` 
        <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
        <div class="sidenav-header">
          <i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
          </a>
        </div>
        <hr class="horizontal light mt-0 mb-2">
        <div class="collapse navbar-collapse  w-auto  max-height-vh-100" id="sidenav-collapse-main">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link text-white active bg-gradient-primary" href="./views/crearSorteo.html">
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i class="material-icons opacity-10">dashboard</i>
                </div>
                <span class="nav-link-text ms-1">Crear sorteos</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white " href="./views/consultarSorteo.html">
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i class="material-icons opacity-10">dashboard</i>
                </div>
                <span class="nav-link-text ms-1">Consultar sorteos</span>
              </a>
          </ul>
        </div>

      </aside>
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

window.customElements.define("sorteo-navigator", SorteoNavigator);