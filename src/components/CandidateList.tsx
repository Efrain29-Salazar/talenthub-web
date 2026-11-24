import type { Candidate } from '../types/candidate';
import { CandidateCard } from './CandidateCard';
import './CandidateList.css';

// Las props: la lista, los ids favoritos y la función para alternar (todo viene de la página).
interface CandidateListProps {
  candidates: Candidate[];
  favoriteIds: number[];
  onToggleFavorite: (id: number) => void;
}

export const CandidateList = ({ candidates, favoriteIds, onToggleFavorite }: CandidateListProps) => {
  return (
    <div className="candidate-list">
      {/* map dibuja una tarjeta por candidato. La key es el id, nunca la posición. */}
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          isFavorite={favoriteIds.includes(candidate.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};
