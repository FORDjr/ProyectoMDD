/**
 * Middleware para verificar si el usuario es administrador
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función de middleware
 */
async function isAdmin(req, res, next) {
  try {
    // Verifica si hay un usuario autenticado en la sesión
    if (!req.session.user) {
      return res.status(401).json({ message: 'No estás autenticado' });
    }
    
    // Obtiene el rol del usuario de la sesión
    const userRole = req.session.user.rolName;

    // Verifica si el usuario tiene el rol de administrador
    if (userRole === 'administrador') {
      // El usuario tiene el rol adecuado, continua con la siguiente función de middleware
      next();
      return;
    } else {
      // El usuario no tiene el rol adecuado, devuelve un error de acceso denegado
      return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
    }
  } catch (error) {
    console.log("Error en auth.middleware.js -> isAdmin(): ", error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
async function isEncargado(req, res, next) {
  try {
    // Verifica si hay un usuario autenticado en la sesión
    if (!req.session.user) {
      return res.status(401).json({ message: 'No estás autenticado' });
    }
    
    // Obtiene el rol del usuario de la sesión
    const userRole = req.session.user.rolName;

    // Verifica si el usuario tiene el rol de administrador
    if (userRole === 'encargado') {
      // El usuario tiene el rol adecuado, continua con la siguiente función de middleware
      next();
      return;
    } else {
      // El usuario no tiene el rol adecuado, devuelve un error de acceso denegado
      return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
    }
  } catch (error) {
    console.log("Error en auth.middleware.js -> isEncargado(): ", error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

async function checkRole(req, res, rolesToCheck, next) {
  try {
    const userRole = req.session.user.rolName;
    const hasRole = rolesToCheck.includes(userRole);

    if (hasRole) {
      return next();
    }

    return res.status(401).json({
      message: "No tienes los permisos necesarios para realizar esta acción"
    });
  } catch (error) {
    return res.status(500).json({
      message: "authorization.middleware -> checkRole()"
    });
  }
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    const rolesToCheck = roles.map(roleFn => {
      if (roleFn === isAdmin) return "administrador";
      if (roleFn === isEncargado) return "encargado";
      return null;
    }).filter(Boolean);

    checkRole(req, res, rolesToCheck, next);
  };
}
export { isAdmin, isEncargado, authorizeRoles};
