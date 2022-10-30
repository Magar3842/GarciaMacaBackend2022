//Desafio 1 clases

class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    (this.nombre = nombre),
      (this.apellido = apellido),
      (this.libros = libros || []),
      (this.mascotas = mascotas || []);
  }
//retorna nombre completo usuario usando template string
  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
//agrega a un array de mascotas
  addMascota(mascota) {
    this.mascotas.push(mascota);
  }
//cuenta cantidad de mascotas
  countMascotas() {
    return this.mascotas.length;
  }
//recibe nombre y autor y lo agrega al array
  addBook(nombre, autor) {
    this.libros.push({ nombre, autor });
  }
//retorna un array de los libros del usuario
  getBookNames() {
    return this.libros.map(({ nombre }) => nombre).join(", ");
  }
}

let usuario = new Usuario("Macarena", "Garcia");
console.log(`El nombre de usuario es: ${usuario.getFullName()}.`);
usuario.addMascota("Perro");
usuario.addMascota("Pajaro");
console.log(`Este usuario tiene ${usuario.countMascotas()} mascotas.`);
usuario.addBook("La Ley de la Atraccion", "La Iliada");
usuario.addBook("Filosofia", "Grecia");
console.log(`Libros del usuario: ${usuario.getBookNames()}`);