const http = require('http');
const express = require('express');

const {infoCursos} = require('./datos/cursos.js');

const app =  express();

const PORT = 3000;


//routers
const routerProgramacion = require('./routers/programacion.js');
app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas', routerMatematicas);

//servidor
app.listen(3000, () => {
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`)
})

//rutas
app.get('/', (req, res) => {
    res.send('Mi primer servidor. Cursos')
});

app.get('/api/cursos', (req, res) => {
    res.send(infoCursos)
});
