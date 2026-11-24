import { Link, NavLink } from 'react-router';
import './Header.css';

// Muestra el nombre del sistema (enlace al inicio) y el enlace a Candidatos. No recibe props.
export const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <Link className="header-brand" to="/">
          TalentHub
        </Link>
        {/* NavLink sabe si es la página actual (isActive) y permite resaltarlo. */}
        <NavLink
          to="/candidates"
          className={({ isActive }) => (isActive ? 'header-link header-link-active' : 'header-link')}
        >
          Candidatos
        </NavLink>
      </div>
    </header>
  );
};
