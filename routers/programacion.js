const express = require('express');
const {programacion} = require('../datos/cursos.js').infoCursos;

const routerProgramacion = express.Router();

routerProgramacion.use(express.json());

//solicitudes GET
routerProgramacion.get('/', (req, res) => {
    res.send(JSON.stringify(programacion))
});

routerProgramacion.get('/:nivel', (req, res) => {
    const nivel = req.params.nivel;
    console.log(nivel);
    
    const resultados = programacion.filter(curso => curso.nivel === nivel)

    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron cursos de programacion de  nivel ${nivel}`);
    }

    res.send(JSON.stringify(resultados));
});

routerProgramacion.get('/:nivel/:vistas', (req, res) => {
    const nivel = req.params.nivel;
    const vistas = req.params.vistas;
    console.log(nivel);
    console.log(vistas);
    
    
    const resultados = programacion.filter(curso => curso.nivel === nivel && curso.vistas == vistas)

    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron cursos de programacion de nivel ${nivel} con vistas ${vistas}`);
    }

    res.send(JSON.stringify(resultados));
});

//solicitudes POST
routerProgramacion.post('/', (req, res) => {
    let cursoNuevo = req.body;
    console.log(req.body);
    
    programacion.push(cursoNuevo);
    res.send(JSON.stringify(programacion));
})

//solicitudes PUT
routerProgramacion.put('/:id', (req, res) => {
    let cursoActualizado = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);
    if (indice >= 0) {
        programacion[indice] = cursoActualizado;
    }
    res.send(JSON.stringify(programacion));
})

//solicitudes DELETE
routerProgramacion.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0) {
        programacion.splice(indice, 1);
    }
    res.send(JSON.stringify(programacion));
})

routerProgramacion.patch('/:id', (req, res) => {
    const infoActualizada= req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);
    if (indice >= 0) {
        const cursoModificar = programacion[indice];
        Object.assign(cursoModificar, infoActualizada);
    }
    res.send(JSON.stringify(programacion));
})

//Exportacion del modulo
module.exports = routerProgramacion;
