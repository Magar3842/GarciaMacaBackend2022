const fs = require('fs');

//Servidor///////
const express = require('express');
const aplication = express();
const port = 8080;
//

//transcribimos el codigo del desafio 2 para probarlo en el servidor////
class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async save(objeto) {
    const producto = await fs.promises.readFile(this.archivo, 'utf-8');
    const productoParseado = JSON.parse(producto);
    let id = 1;
    productoParseado.forEach((element, index) => {
      if (element.id >= id) {
        id = element.id + 1;
      }
    });
    objeto.id = id;
    productoParseado.push(objeto);
    await fs.promises.writeFile(this.archivo, JSON.stringify(productoParseado, null, 2));
    return id;
  }

  async getById(id) {
    const producto = await fs.promises.readFile(this.archivo, 'utf-8');
    const productoParseado = JSON.parse(archivo);
    let objetoSeleccionado = null;
    productoParseado.forEach(element => {
      if (element.id == id) {
        objetoSeleccionado = element;
      }
    });
    return objetoSeleccionado;
  }

  async getAll() {
    const producto = await fs.promises.readFile(this.archivo, 'utf-8');
    const productoParseado = JSON.parse(producto);
    return productoParseado;
  }

  async deleteById(id) {
    const producto = await fs.promises.readFile(this.archivo, 'utf-8');
    const productoParseado = JSON.parse(producto);
    let indexSeleccionado = -1;
    productoParseado.forEach((element, index) => {
      if (element.id == id) {
        indexSeleccionado = index;
      }
    });
    if (indexSeleccionado != -1) {
      productoParseado.splice(indexSeleccionado, 1);
      await fs.promises.writeFile(this.archivo, JSON.stringify(productoParseado, null, 2));
    }
        
  }

  async deleteAll() {
    const arregloVacio = [];
    await fs.promises.writeFile(this.archivo, JSON.stringify(arregloVacio, null, 2));
  }
}

const implementacion = async () => {
  // const lista = new Contenedor('productos.txt');
};

const lista = new Contenedor('productos.txt');
//Inicializamos el contador de las visitas/clicks
let clicks = 0;

//***********Endpoints***
//Definimos la ruta principal en donde mostraremos el mensaje

aplication.get('/', (peticion, respuesta) => {
  respuesta.send(`<html>
  <head>
      <title>Servidor Express GarciaMacarena</title>
  </head>
  <body style="background-color: #3F7FBF">
      <h1 style="color:#0C1926">Gracias por conectarte con nosotros!!</h1>
  </body></head>
</html>`);
});

//Definimos la ruta de las vistas en donde mostraremos el contador
aplication.get('/clicks', (peticion, respuesta) => {
  clicks++;
  respuesta.send(`<html>
  <head>
      <title>Servidor Express GarciaMacarena</title>
  </head>
  <body style="background-color: #3F7FBF">
      <h1 style="color:#0C1926">La cantidad de vistas es: ${clicks}</h1>
  </body></head>
</html>`);
});

aplication.get('/productos', async (peticion, respuesta) => {
  const all = await lista.getAll();
  respuesta.json(all);
});

aplication.get('/indiceRandom', async (peticion, respuesta) => {

  const all = await lista.getAll();
  const random = Math.floor(Math.random() * all.length);
  //Llamado a la funcion para obtener el id
  respuesta.json({
    random: random
  });
});

//***********Servidor************
const servidor = aplication.listen(port, () => {
  console.log(`Servidor Http escuchando en el puerto: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error en servidor: ${error}`));
//****************
