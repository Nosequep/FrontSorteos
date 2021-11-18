const { Router } = require('express');
const router = Router();

//Libreria para manejar arreglos
const _ =  require('underscore');

//Acceso a los datos
const sorteos = require('../sample.json');

router.get('/', (req, res) => {
    var headers = ['vary','access-control-allow-credentials'];
    var valores = ['Origin, Accept-Encoding', 'true'];
    console.log("Json respuesta: " + req.body)
    //res.header("Access-Control-Allow-Origin", "*").status(200).json(sorteos[1]);
    res.status(200).json(sorteos[1]);

});

router.post('/', (req, res) =>{
    console.log("entra al registro" + req.params.nombre)
    const {titulo, descripcion} = req.body
    console.log("Json respuesta: " + titulo + ", " + descripcion)
    res.header("Access-Control-Allow-Origin", "*").status(200).json(sorteos[1]);
    /*
    if(nombre && descripcion){
        const id = sorteos.length + 1;
        const newSorteo = {...req.body, id};
        sorteos.push(newSorteo);
        res.header("Access-Control-Allow-Origin", "*").status(200).json(sorteos[1])
    }else{  
        res.header("Access-Control-Allow-Origin", "*").status(200).json({"error": "Error en los datos"})
    }
    */
});

router.put('/:id', (req, res) =>{
    console.log("entra al registro")
    const {id} = req.params;
    const {nombre, descripcion} = req.body

    _.each(sorteos, (sorteo, i) =>{
        if(sorteo.id == id){
            sorteo.nombre = nombre;
            sorteo.descripcion = descripcion;
        }
    });
    res.json(sorteos);
});

router.delete('/:id', (req, res) =>{
    const {id} = req.params;
    _.each(sorteos, (sorteo, i) => {
        if(sorteo.id == id){
            sorteos.splice(i, 1);
        }
    })
    res.send(sorteos);
});

module.exports = router;