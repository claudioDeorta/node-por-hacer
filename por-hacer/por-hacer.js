const fs = require('fs');
const color = require('colors')

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar ', err);
    });

}

const cargarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json');

    } catch (error) {

        listadoPorHacer = [];

    }


}


const crear = (descipcion) => {

    cargarDB();

    let porHacer = {
        descipcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

const getListado = () => {

    cargarDB();

    for (let tarea of listadoPorHacer) {
        console.log('=========Por Hacer====='.green);
        console.log(tarea.descipcion);
        console.log('Estado', tarea.completado);
        console.log('======================'.green);
    }

}

const actualizar = (descipcion, completado) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descipcion === descipcion
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;

    } else {
        return false;
    }
}

const borrar = (descipcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descipcion !== descipcion
    });

    if (listadoPorHacer.length === nuevoListado.length) {

        return false;

    } else {

        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}