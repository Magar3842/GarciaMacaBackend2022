//Servidor************
const express = require('express');
const { Router } = express;
const aplication = express();

const routeProductos = Router();

const port = 8080;

//***** Hacemos la carpeta public visible
aplication.use('/static', express.static(__dirname + '/public'));
//****************

class Contenedor {
  constructor(productos) {
    this.productos = productos;
  }

  save(objeto) {
    let id = 1;
    this.productos.forEach((element, index) => {
      if (element.id >= id) {
        id = element.id + 1;
      }
    });
    objeto.id = id;
    this.productos.push(objeto);
    return id;
  }

  getById(id) {
    let objetoSeleccionado = null;
    this.productos.forEach(element => {
      if (element.id == id) {
        objetoSeleccionado = element;
      }
    });
    return objetoSeleccionado;
  }

  getAll() {
    return this.productos;
  }

  deleteById(id) {
    let indexSeleccionado = -1;
    this.productos.forEach((element, index) => {
      if (element.id == id) {
        indexSeleccionado = index;
      }
    });
    if (indexSeleccionado != -1) {
      this.productos.splice(indexSeleccionado, 1);
    }
    
  }

  deleteAll() {
    this.productos = [];
  }
}

const productos = new Contenedor([]);

//Datos de prueba
productos.save({
  title: 'Heladera',
  price: '150000',
  thumbnail: 'image1'
});

productos.save({
  title: 'Lavarropa',
  price: '120000',
  thumbnail: 'image2'
});

//Endpoints***

//Get by id
routeProductos.get('/:id', (peticion, respuesta) => {
  const id = parseInt(peticion.params.id);
  const producto = productos.getById(id);
  if (producto) {
    respuesta.json(producto);
  } else {
    respuesta.status(404);
    respuesta.json({ error : 'producto no encontrado' });
  }
  
});

routeProductos.get('/', (peticion, respuesta) => {
  const listaProductos = productos.getAll();
  respuesta.json(listaProductos);
});

routeProductos.post('/', (peticion, respuesta) => {
});

routeProductos.put('/:id', (peticion, respuesta) => {
});

routeProductos.delete('/:id', (peticion, respuesta) => {
});

aplication.use('/api/productos', routeProductos);

//***********


//Servidor************
const servidor = aplication.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));
//****************