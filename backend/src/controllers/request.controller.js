import { request } from "express";
import Request from "../models/request.model.js";

export async function createRequest(req, res) {
  try {
    const RequestData = req.body;
    const newRequest = new Request(RequestData);
    await newRequest.save();

    res.status(201).json({
        message: "Petición creada exitosamente",
        data: newRequest
    });

  } catch (error) {
    res.status(500).json({
        message: "Error al crear la petición",
        error: error.message
    });
  }
}

export async function getRequest(req, res) {
 try {
    const id = req.params.id;
    const request = await Request.findById(id);
    
    if (!request) {
        return res.status(404).json({
            message: `Petición con id ${id} no encontrada`,
            data: null
        });
    }

    res.status(200).json({
        message: "Petición encontrada exitosamente",
        data: request
    });

  } catch (error) {
    res.status(500).json({
        message: "Error al encontrar la petición",
        error: error.message
    });
  }
}

export async function getRequestAll(req, res) {
  try {
     const requests = await Request.find();
     res.status(200).json({
         message: "Lista de formularios",
         data: requests
     });

   } catch (error) {
     res.status(500).json({
         message: "Error al encontrar los formularios",
         error: error.message
     });
   }
 }

export async function updateRequest(req, res) {
  try {
    const id = req.params.id;
    const RequestData = req.body;
    const requestUpdated = await Request.findByIdAndUpdate(id, RequestData, { new: true });

    if (!requestUpdated) {
        return res.status(404).json({
            message: `Petición con id ${id} no encontrada`,
            data: null
        });
    }

    res.status(200).json({
        message: "Petición actualizada exitosamente",
        data: requestUpdated
    });

  } catch (error) {
    res.status(500).json({
        message: "Error al actualizar la petición",
        error: error.message
    });
  }
}

export async function deleteRequest(req, res) {
  try {
    const id = req.params.id;
    const requestDeleted = await Request.findByIdAndDelete(id);

    if (!requestDeleted) {
        return res.status(404).json({
            message: `Petición con id ${id} no encontrada`,
            data: null
        });
    }

    res.status(200).json({
        message: "Petición eliminada exitosamente",
        data: requestDeleted
    });
    
  } catch (error) {
    res.status(500).json({
        message: "Error al eliminar la petición",
        error: error.message
    });
  }
}

export async function acceptRequestController(req, res) {
  const { id } = req.params;

  try {
    const request = await acceptRequest(id);
    res.status(200).json({ message: 'Petición aceptada', request });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const acceptRequest = async (requestId) => {
  const request = await Request.findByIdAndUpdate(     
      requestId,
      {
          expiresAt: null,
          status: 'Aceptado'
      },
      { new: true }
  );

  if (!request) {
      throw new Error('Petición no encontrada');
  }

  return request;
};