
const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = (resolve, reject) => {

  let data = JSON.stringify(listadoPorHacer);

  fs.writeFile(`db/data.json`, data, (err) => {

    if (err) {
      throw new Error('No se pudo grabar el archivo', err);
    }

  });

}

const cargarDB = () => {

  try {

    listadoPorHacer = require('../db/data.json');

  } catch (e) {
    listadoPorHacer = [];
  } finally {

  }

}

const getListado = () => {
  cargarDB();
  return listadoPorHacer;
}

const crear = (descripcion) => {

  cargarDB();

  let porHacer = {
    descripcion,
    completado: false
  };

  listadoPorHacer.push( porHacer );

  guardarDB();

  return porHacer;

}

const actualizar = (descripcion, completado = true) => {

  cargarDB();

  let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion );

  if ( index >= 0 ) {
    listadoPorHacer[index].completado = completado;
    guardarDB();
    return true;
  }

  return false;

}

const borrar = (descripcion) => {

  cargarDB();

  console.log(listadoPorHacer);
  console.log('=========');
  result = arrayRemove(listadoPorHacer, descripcion);
  console.log(result);

  listadoPorHacer = result;

  guardarDB();

  if (result.length < listadoPorHacer.length) {
    return true;
  }

  return false;

}

function arrayRemove(arr, value) {

   return arr.filter(function(ele){
       return ele.descripcion != value;
   });

}

module.exports = {
  crear,
  getListado,
  actualizar,
  borrar
}
