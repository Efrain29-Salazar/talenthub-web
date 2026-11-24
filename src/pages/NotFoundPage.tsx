import { Link } from 'react-router';
import './NotFoundPage.css';

// Se muestra cuando la dirección no coincide con ninguna ruta.
export const NotFoundPage = () => {
  return (
    <section className="not-found-page">
      <h2 className="not-found-page-title">Página no encontrada</h2>
      <p className="not-found-page-text">La dirección que escribió no existe.</p>
      <Link className="not-found-page-link" to="/candidates">
        ← Volver a los candidatos
      </Link>
    </section>
  );
};
