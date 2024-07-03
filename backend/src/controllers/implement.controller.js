
import Implement from "../models/implement.model.js";//se importa el modelo de implementos



export async function createImplement(req, res) {
    try{
      const { name, description, stock, status, category } = req.body;//se obtienen los datos del implemento
      
      const newImplement = new Implement({//se crea un nuevo implemento
        name,
        description,
        stock,
        status,
        category,
      });

      await newImplement.save();//se guarda el implemento

      res.status(201).json({
          message: "Implemento creado exitosamente",
          data: newImplement
      });
    } catch(error) {
      console.log("Error en implement.controller.js -> createImplement(): ", error);
      res.status(500).json({message: error.message});
    }  
}


export async function getImplements(req, res) {
    try {
      const implement = await Implement.find().populate('name', 'Schema');//se obtienen todos los implementos
      res.status(200).json({
        message: "Lista de implementos",
        data: implement
      });
    } catch (error) {
      console.log("Error en implement.controller.js -> getImplements(): ", error);
      res.status(500).json({message: error.message});
    }
}

export async function getImplementByname(req, res) {
    try {
      const  nameImplement = req.query.name;//se obtiene el nombre del implemento

      if(!nameImplement) {
        res.status(400).json({
          message: "El parámetro 'name' es requerido.",
          data: null
        });
        return;
      }
      
      
      const implement = await Implement.find({ name: nameImplement });//se busca el implemento por nombre

      if(!implement){
        res.status(404).json({
          message: "Implemento no encontrado",
          data: null
        })
        return;
      }

      res.status(200).json({
        message: "Implemento  encontrado!",
        data: implement
      
      })

    } catch (error) {
      console.log("Error en implement.controller.js -> getImplementByname(): ", error);
      res.status(500).json({message: error.message});
    }
}


export async function updateImplement(req, res) {
    try {
      const idImplement = req.query.id;//se obtiene el id del implemento
      const updatedData = req.body;//se obtienen los datos a actualizar

      if (!idImplement) {
        res.status(400).json({
          message: "El parámetro 'id' es requerido.",
          data: null
        });
        return;
      }

      const implement = await Implement.findOneAndUpdate({id: idImplement}, updatedData, {new: true});//se actualiza el implemento

      if(!implement){
        res.status(404).json({
          message: "Implemento no encontrado",
          data: null
        })
        return;
      }

      res.status(200).json({
        message: "Implemento actualizado!",
        data: implement
      })
    } catch (error) {
      console.log("Error en implement.controller.js -> updateImplement(): ", error);
      res.status(500).json({message: error.message});
    }
}


export async function deleteImplement(req, res) {
    try {
      const id = req.params.id;//se obtiene el id del implemento
      const implementDeleted = await Implement.findByIdAndDelete(id);//se elimina el implemento

      if (!implementDeleted) {
        return res.status(404).json({
          message: `Formulario con id ${id} no encontrado`,
          data: null
        });
      }

      res.status(200).json({
        message: "Implemento eliminado correctamente",
        data: implementDeleted
      })
      
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar el implemento",
        error: error.message
      });
    }
    //se debe de usar la funcion deleteOne() para eliminar un implemento en la base de datos con el id que se le pase
}