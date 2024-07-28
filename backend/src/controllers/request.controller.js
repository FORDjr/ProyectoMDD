import Request from "../models/request.model.js";
import Implement from "../models/implement.model.js";

const checkRequestExpiration = async () => {
  const requests = await Request.find({ status: 'Pendiente' });
  requests.map(async (request) => {
    const currentTime = new Date();
    if (request.expiresAt && request.expiresAt < currentTime) {
        const implement = await Implement.findById(request.implementsRequested[0].implementId);
        if (implement) {
          console.log("Estoy aqui");
          implement.stockWaiting -= request.implementsRequested[0].quantity;
          implement.stock += request.implementsRequested[0].quantity;
          const data = await implement.save();
          console.log("Implemento guardado: ",data);
        }
        request.status = 'Expirado';
        const data1 = await request.save();
        console.log("Peticion expirada: ",data1);
        return;
    }
  });
};

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
        message: "Error al crear la petición, no existe el implemento en la base de datos",
        error: error.message
    });
  }
}
setInterval(() => {
  checkRequestExpiration();
}, 1000)

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


export async function getOwnRequests (req, res) {
  try {
    const rutUser = req.session.user.rut;
    const requests = await Request.find({userRut:rutUser});
    res.status(200).json({
      message: "Lista de formularios",
      data : requests
    })

  } catch (error) {
    res.status(500).json({
      message: "Error al encontrar al Usuario",
      error: error.message
    })
  }
}

export async function getRequestByRut (req, res) {
  try {
    const rut_a_buscar = req.body.userRut;
    
    if(rut_a_buscar){
      console.log("rut: ",rut_a_buscar);
      const requests2 = await Request.find({userRut:rut_a_buscar});
      if(!requests2){
        res.status(404).json({
          message: `No se encontraron peticiones creadas por ${rut_a_buscar}`
        })
      }
      res.status(200).json({
        message: "Lista de formularios",
        data : requests2
      })
      return;
    }
    res.status(400).json({
      message: "No hay rut ingresado"
    })

  } catch (error) {
    res.status(500).json({
      message: "Error al encontrar al Usuario",
      error: error.message
    })
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

// Función para aceptar una solicitud
export async function acceptRequestController(req, res) {
  const { id } = req.params;

  try {
    const request = await checkAndAcceptRequest(id);
    res.status(200).json({ message: 'Petición aceptada', request });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Función para verificar y aceptar la solicitud
export const checkAndAcceptRequest = async (requestId) => {
  const request = await Request.findById(requestId);

  if (!request) {
    throw new Error('Petición no encontrada');
  }

  // Comprueba si la solicitud ha expirado, pero no maneja la lógica de expiración aquí
  if (request.expiresAt && request.expiresAt < new Date()) {
    throw new Error('La solicitud ha expirado y no puede ser procesada');
  }

  // Procede con la aceptación si la solicitud no ha expirado
  for (let item of request.implementsRequested) {
    const implement = await Implement.findById(item.implementId);
    if (implement) {
      implement.stockWaiting -= item.quantity;
      implement.stockAccepted += item.quantity;
      await implement.save();
    }
  }

  const updatedRequest = await Request.findByIdAndUpdate(
    requestId,
    {
      expiresAt: null,
      status: 'Aceptado'
    },
    { new: true }
  );

  return updatedRequest;
};