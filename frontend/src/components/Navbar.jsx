import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from '../services/auth.service.js';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const storedUser = JSON.parse(sessionStorage.getItem('usuario'));
    const userRole = storedUser?.data?.rolName;

    const logoutSubmit = () => {
        try {
            logout();
            navigate('/'); 
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <img
                        src="/sports.png"
                        alt="Logo metodología de desarrollo"
                    />
                </li>
                <li className={location.pathname === "/inicio" ? "active" : ""}>
                    <NavLink to="/home">Inicio</NavLink>
                </li>
                {userRole === 'administrador' && (
                    <li className={location.pathname === "/usuarios" ? "active" : ""}>
                        <NavLink to="/users">Usuarios</NavLink>
                    </li>
                )}

                {(userRole === 'administrador' || userRole === 'encargado') && (
                    <li className={location.pathname === "/create" ? "active" : ""}>
                        <NavLink to="/implement-create">Crear Implementos</NavLink>
                    </li>
                )}

                {(userRole === 'administrador' || userRole === 'encargado') && (
                    <li className={location.pathname === "/implement-edit" ? "active" : ""}>
                        <NavLink to="/implement-edit">Editar Implementos</NavLink>
                    </li>
                )}

                <li className={location.pathname === "/implement" ? "active" : ""}>
                    <NavLink to="/implement">Implementos</NavLink>
                </li>
                
                <li className={location.pathname === "/request" ? "active" : ""}>
                    <NavLink to="/request">Peticiones</NavLink>
                </li>
                {(userRole === 'administrador' || userRole === 'encargado') && (
                    <li className={location.pathname === "/req-all" ? "active" : ""}>
                    <NavLink to="/req-all">Todas las peticiones</NavLink>
                    </li>
                )}

                <li className={location.pathname === "/perfil" ? "active" : ""}>
                    <NavLink to="/profile">Perfil</NavLink>
                </li>

                <li className={location.pathname === "/" ? "active" : ""}>
                    <NavLink to="/" onClick={logoutSubmit}>Cerrar</NavLink>
                </li>
                
            </ul>
        </nav>
    );
};

export default Navbar;
