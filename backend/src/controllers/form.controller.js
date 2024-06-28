import Form from "../models/form.model.js";

export async function createForm(req, res) {
  try {
    const formData = req.body;
    const newForm = new Form(formData);
    await newForm.save();

    res.status(201).json({
        message: "Formulario creado exitosamente",
        data: newForm
    })

  } catch (error) {
    res.status(500).json({
        message: "Error al crear el formulario",
        error: error.message
    });
  }
}

export async function getForm(req, res) {
 try {
    const id = req.params.id;

    const form = await Form.findById(id);
    
    if (!form) {
        return res.status(404).json({
            message: `Formulario con id ${id} no encontrado`,
            data: null
        });
    }

    res.status(200).json({
        message: "Formulario encontrado exitosamente",
        data: form
    })

  } catch (error) {
    res.status(500).json({
        message: "Error al encontrar el formulario",
        error: error.message
    });
  }
}

export async function updateForm(req, res) {
  try {
    const id = req.params.id;
    const formData = req.body;
    const formUpdated = await Form.findByIdAndUpdate(id, formData, {new: true});

    if (!formUpdated) {
        return res.status(404).json({
            message: `Formulario con id ${id} no encontrado`,
            data: null
        });
    }

    res.status(200).json({
        message: "Formulario actualizado exitosamente",
        data: formUpdated
    })

  } catch (error) {
    res.status(500).json({
        message: "Error al crear el formulario",
        error: error.message
    });
  }
}

export async function deleteForm(req, res) {
  try {
    const id = req.params.id;
    const formDeleted = await Form.findByIdAndDelete(id);

    if (!formDeleted) {
        return res.status(404).json({
            message: `Formulario con id ${id} no encontrado`,
            data: null
        });
    }

    res.status(200).json({
        message: "Formulario eliminado exitosamente",
        data: formDeleted
    })
    
  } catch (error) {
    res.status(500).json({
        message: "Error al crear el formulario",
        error: error.message
    });    
  }
}
