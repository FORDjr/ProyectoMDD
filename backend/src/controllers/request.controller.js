//El usuario puede ver disponibilidad, crear una peticion de implemento, eliminar una peticion de implemento 
//y puede editar su peticion de implemento utilizando sus credenciales de alumno
import request from "../models/request.model.js";

export async function createRequest(req, res) {
  try {
    const RequestData = req.body;
    const newRequest = new Request(RequestData);
    await newRequest.save();

    res.status(201).json({
        message: "peticion creada exitosamente",
        data: newRequest
    })

  } catch (error) {
    res.status(500).json({
        message: "Error al crear la peticion",
        error: error.message
    });
  }
}

export async function getRequest(req, res) {
 try {
    const id = req.params.id;

    const Request = await Request.findById(id);
    
    if (!Request) {
        return res.status(404).json({
            message: `peticion con id ${id} no encontrado`,
            data: null
        });
    }

    res.status(200).json({
        message: "peticion encontrada exitosamente",
        data: Request
    })

  } catch (error) {
    res.status(500).json({
        message: "Error al encontrar el peticion",
        error: error.message
    });
  }
}

export async function updateRequest(req, res) {
  try {
    const id = req.params.id;
    const RequestData = req.body;
    const RequestUpdated = await Request.findByIdAndUpdate(id, RequestData, {new: true});

    if (!RequestUpdated) {
        return res.status(404).json({
            message: `peticion con id ${id} no encontrado`,
            data: null
        });
    }

    res.status(200).json({
        message: "peticion actualizada exitosamente",
        data: RequestUpdated
    })

  } catch (error) {
    res.status(500).json({
        message: "Error al actualizar la peticion",
        error: error.message
    });
  }
}

export async function deleteRequest(req, res) {
  try {
    const id = req.params.id;
    const RequestDeleted = await Request.findByIdAndDelete(id);

    if (!RequestDeleted) {
        return res.status(404).json({
            message: `peticion con id ${id} no encontrado`,
            data: null
        });
    }

    res.status(200).json({
        message: "peticion eliminada exitosamente",
        data: RequestDeleted
    })
    
  } catch (error) {
    res.status(500).json({
        message: "Error al eliminar la peticion",
        error: error.message
    });    
  }
}
