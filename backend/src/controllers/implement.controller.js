import Implement from "../models/implement.model.js";//se importa el modelo de implementos

import { v4 as uuidv4 } from 'uuid';//*para generar un id unico


export async function createImplement(req, res) {
    try{
      const idRandom = uuidv4();//*se genera un id unico
      const { name, description, stock, status, category } = req.body;//se obtienen los datos del implemento
      
      const newImplement = new Implement({//se crea un nuevo implemento
        id: idRandom,
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

