document.addEventListener('DOMContentLoaded',()=>{
    spacexDatos()
    mostrarModalSpace()
})

const url = "https://api.spacexdata.com/v3/launches"

async function spacexDatos(){
    try{
        const imgSpaceX = await fetch(url)
        const result = await imgSpaceX.json()
        console.log(result);
        spacexData(result)
    }
    catch (error){
        console.log(error);
    }
}

function spacexData(data){
    const infoSpaceX = document.querySelector('#contenidoVuelos')
    data.forEach((inf) => {
        const {mission_name, launch_year, links, rocket, launch_success} = inf    
        const spaceCards = document.createElement('div')
        spaceCards.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${links.mission_patch_small}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${mission_name}</h5>
                <p class="card-text">${launch_year}</p>
                <a href="#" id="abrirModal" class="btn btn-primary" video="${links.youtube_id}" rocket="${rocket.rocket_name}" rocket-type="${rocket.rocket_type}" lanzamiento="${launch_success}" nombre="${mission_name}">Details(Video)</a>
            </div>
        </div>
        `
        infoSpaceX.appendChild(spaceCards)
    })
}

//Modal
const abrirModal = document.querySelector('#abrirModal')
const contenedorModal = document.querySelector('#contenidoVuelos')
const modalEspacex = document.querySelector('#modalSpace')
const cerrarModal = document.querySelector('#cerrarModal')

contenedorModal.addEventListener('click', crearModalSpace)

function crearModalSpace(e){
    e.preventDefault();
    if(e.target.getAttribute('id')){
        modalEspacex.showModal()
    }
}

cerrarModal.addEventListener('click',()=>{
    modalEspacex.close()
})

function mostrarModalSpace(){
    const llenar = document.querySelector('#contenidoVuelos')
    llenar.addEventListener('click', showInfo)
}

    const divModal = document.querySelector('.modalInfo')
    const tarjetaModal = document.createElement('div')
    
function showInfo(e){
    const nombre = e.target.getAttribute('nombre')
    const video = e.target.getAttribute('video')
    const rocket = e.target.getAttribute('rocket')
    const rocketType = e.target.getAttribute('rocket-type')
    const lanzamiento = e.target.getAttribute('lanzamiento')

    tarjetaModal.innerHTML=`
        <div>
        <h1 id="nombreMisionModal">${nombre}</h1>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <table class="table">
        <tbody>
            <tr>
                <th scope="row">Nombre del cohete</th>
                <td>${rocket}</td>
            </tr>
            <tr>
                <th scope="row">Tipo de cohete</th>
                <td>${rocketType}</td>
            </tr>
            <tr>
                <th scope="row">Exito de Lanzamiento</th>
                <td colspan="2">${lanzamiento}</td>
            </tr>
        </tbody>
        </table>
        </div>
    `;
    divModal.appendChild(tarjetaModal)
}