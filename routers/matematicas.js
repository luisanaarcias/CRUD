const express = require('express');
const {matematicas} = require('../datos/cursos.js').infoCursos;

//solicitudes GET
const routerMatematicas = express.Router();

routerMatematicas.get('/', (req, res) => {
    res.send(JSON.stringify(matematicas))
});

routerMatematicas.get('/:nivel', (req, res) => {
    const nivel = req.params.nivel;
    console.log(req.query);
   
    const resultados = matematicas.filter(curso => curso.nivel === nivel)

    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron cursos de matematicas de nivel ${nivel}`);
    }

    if (req.query.ordenar === 'vistas') {
       return res.send(JSON.stringify(resultados.sort((a, b) => a.vistas - b.vistas)));
   } else {
       res.send(JSON.stringify(resultados));
   }
});

routerMatematicas.get('/:nivel/:vistas', (req, res) => {
    const nivel = req.params.nivel;
    const vistas = req.params.vistas;
    console.log(nivel);
    console.log(vistas);
    
    
    const resultados = matematicas.filter(curso => curso.nivel === nivel && curso.vistas == vistas)

    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron cursos de matematicas de nivel ${nivel} con vistas ${vistas}`);
    }

    res.send(JSON.stringify(resultados));
});

//solicitudes POST
routerMatematicas.post('/', (req, res) => {
    let cursoNuevo = req.body;
    console.log(req.body);
    
    matematicas.push(cursoNuevo);
    res.send(JSON.stringify(matematicas));
})

//solicitudes PUT
routerMatematicas.put('/:id', (req, res) => {
    let cursoActualizado = req.body;
    const id = req.params.id;

    const indice = matematicas.findIndex(curso => curso.id == id);
    if (indice >= 0) {
        matematicas[indice] = cursoActualizado;
    }
    res.send(JSON.stringify(matematicas));
})

routerMatematicas.patch('/:id', (req, res) => {
    const infoActualizada= req.body;
    const id = req.params.id;

    const indice = matematicas.findIndex(curso => curso.id == id);
    if (indice >= 0) {
        const cursoModificar = matematicas[indice];
        Object.assign(cursoModificar, infoActualizada);
    }
    res.send(JSON.stringify(matematicas));
})

//solicitudes DELETE
routerMatematicas.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = matematicas.findIndex(curso => curso.id == id);

    if (indice >= 0) {
        matematicas.splice(indice, 1);
    }
    res.send(JSON.stringify(matematicas));
})

module.exports = routerMatematicas;