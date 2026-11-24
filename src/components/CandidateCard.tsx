import { Link } from 'react-router';
import type { Candidate } from '../types/candidate';
import { formatExperience } from '../utils/formatExperience';
import './CandidateCard.css';

// Las props: los datos que recibe la tarjeta. La tarjeta NO guarda estado.
interface CandidateCardProps {
  candidate: Candidate;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const CandidateCard = ({ candidate, isFavorite, onToggleFavorite }: CandidateCardProps) => {
  return (
    <article className="candidate-card">
      <h3 className="candidate-card-title">
        {/* El nombre es un enlace al detalle: cambia de página sin recargar el navegador. */}
        <Link className="candidate-card-link" to={`/candidates/${candidate.id}`}>
          {candidate.name}
        </Link>
      </h3>
      <p className="candidate-card-city">{candidate.city}</p>
      <p className="candidate-card-email">{candidate.email}</p>
      <p className="candidate-card-experience">{formatExperience(candidate.experienceYears)}</p>

      {candidate.skills.length > 0 ? (
        <ul className="candidate-card-skills">
          {candidate.skills.map((skill) => (
            <li key={skill} className="candidate-card-skill">
              {skill}
            </li>
          ))}
        </ul>
      ) : (
        <p className="candidate-card-no-skills">Sin habilidades registradas</p>
      )}

      {/* La tarjeta solo avisa del clic: la función viene de la página. */}
      <button
        type="button"
        className={isFavorite ? 'candidate-card-favorite candidate-card-favorite-active' : 'candidate-card-favorite'}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(candidate.id)}
      >
        {isFavorite ? 'En favoritos' : 'Agregar a favoritos'}
      </button>
    </article>
  );
};
