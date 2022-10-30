const Contenedor = require("./Contenedor.js")

const contenedor= new Contenedor("productos.txt")

let producto1 ={
    title:"notebook",
    price:251500,
    thumbnail:"https://medias.musimundo.com/medias/00476007-144936-144936-01-144936-01.jpg"

}
let producto2 ={
    title:"cafetera",
    price:108300,
    thumbnail:"https://medias.musimundo.com/medias/00558060-146480-146480-01-146480-01.jpg"

}
let producto3 ={
    title:"lavarropa",
    price:86200,
    thumbnail:"https://medias.musimundo.com/medias/00199039-135728-135728-01-135728-01.jpg"

}
metodos=async()=>{

    console.log( await contenedor.save(producto1))
    console.log( await contenedor.save(producto2))
    console.log( await contenedor.save(producto3))
    console.log( await contenedor.getAll())
    console.log( await contenedor.getById(2))
    console.log( await contenedor.deleteById(3))
    console.log( await contenedor.deleteAll())
}
 metodos()
