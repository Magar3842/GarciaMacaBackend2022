const fs= require('fs');

// rehecho en base al codigo y modificado con mis variables pero no funciona, espero los comentarios del error///
class Contenedor{
    constructor(archivo){
        this.archivo=archivo;
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
    
    async getAll() {
    const producto = await fs.promises.readFile(this.archivo, 'utf-8');
    const productoParseado = JSON.parse(producto);
    return productoParseado;
  }
 
    async getById(id) {
    const producto = await fs.promises.readFile(this.archivo, 'utf-8');
    const productoParseado = JSON.parse(producto);
    let objetoSeleccionado = null;
        productoParseado.forEach(element => {
          if (element.id == id) {
            objetoSeleccionado = element;
          }
        });
        return objetoSeleccionado;
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

module.exports = Contenedor