const fs= require('fs');

class Contenedor{
    constructor(archivo){
        this.archivo=archivo;
       
    }
    
    save=async(producto)=>{
       try {
        //generar el archivo
        if(fs.existsSync(this.archivo)){
           let productos= await this.getAll();
           if( productos.length>0){
            let lastiId=productos[productos.length-1].id+1
           let newProduct={
             id: lastiId ,
            ...producto
           }
           productos.push(newProduct);
            await fs.promises.writeFile(this.archivo,JSON.stringify(productos,null,2))
            return lastiId;
        }else{
            let lastiId=1
            let newProduct={
              id: lastiId,
             ...producto
            }
            productos.push(newProduct);
            await fs.promises.writeFile(this.archivo,JSON.stringify(productos,null,2))
            return lastiId;
        }
    
        }else{
        //generamos un producto con id 1 ya que es la creacion del archivo
        let newProduct={
        id:1,
        title: producto.title,
        price: producto.price,
        thumbnail: producto.thumbnail
        //... producto utilizamos el spread operator para copiar la informacion dentro del nuevo producto
        }
         await fs.promises.writeFile(this.archivo,JSON.stringify([newProduct],null,2));
        return 1;
        }
        } catch (error) {
        console.log(error)
      }
  }
    getAll=async()=>{ 
      try {
          if(fs.existsSync(this.archivo)){
          let info= await fs.promises.readFile(this.archivo, 'utf8');
          let result= JSON.parse(info);
          return result;
          }else{
            return "No se encontro el archivo"
          }  
      } catch (error) {
          console.log(error)
      }  
    }

}
module.exports = Contenedor