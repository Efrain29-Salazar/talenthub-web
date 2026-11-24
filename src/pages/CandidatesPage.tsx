import { useEffect, useState } from 'react';
import { getCandidates } from '../services/candidateService';
import type { Candidate } from '../types/candidate';
import { SearchBar } from '../components/SearchBar';
import { CandidateList } from '../components/CandidateList';
import './CandidatesPage.css';

// Pasa a minúsculas y quita las tildes, para que "maria" encuentre a "María".
const normalizeText = (text: string): string =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const CandidatesPage = () => {
  // Los tres estados de una petición: los datos, si está cargando y el mensaje de error.
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // El estado del texto que el usuario escribió.
  const [searchTerm, setSearchTerm] = useState<string>('');

  // El estado de los favoritos vive AQUÍ (levantado a la página), no en cada tarjeta:
  // así no se pierde cuando una tarjeta desaparece al filtrar.
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  // Pide los candidatos a la API una sola vez, al abrir la página (por eso el [] al final).
  useEffect(() => {
    const loadCandidates = async () => {
      try {
        setCandidates(await getCandidates());
      } catch {
        setErrorMessage('No se pudieron cargar los candidatos. Intente de nuevo más tarde.');
      } finally {
        // Pase lo que pase (datos o error), deja de estar cargando.
        setIsLoading(false);
      }
    };

    void loadCandidates();
  }, []);

  // Alterna un favorito: si el id ya está, lo quita; si no, lo agrega.
  // Nunca se modifica el arreglo directamente (sin push): se crea uno nuevo.
  const handleToggleFavorite = (id: number) => {
    setFavoriteIds(
      favoriteIds.includes(id) ? favoriteIds.filter((favoriteId) => favoriteId !== id) : [...favoriteIds, id],
    );
  };

  // Limpia el texto: sin espacios y sin mayúsculas ni tildes.
  const normalizedTerm = normalizeText(searchTerm.trim());

  // La lista filtrada: queda el candidato cuyo nombre o ciudad contiene el texto.
  const filteredCandidates = candidates.filter(
    (candidate) =>
      normalizeText(candidate.name).includes(normalizedTerm) || normalizeText(candidate.city).includes(normalizedTerm),
  );

  // Los datos ya están listos: terminó de cargar y no hubo error.
  const hasData = !isLoading && errorMessage === '';

  return (
    <section>
      <div className="candidates-page-header">
        <h2 className="candidates-page-title">Candidatos</h2>
        {/* El contador solo se muestra cuando ya hay datos. */}
        {hasData && (
          <p className="candidates-page-count" aria-live="polite">
            {filteredCandidates.length} {filteredCandidates.length === 1 ? 'resultado' : 'resultados'}
          </p>
        )}
      </div>

      <div className="candidates-page-search">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar por nombre o ciudad"
          label="Buscar candidatos"
        />
      </div>

      {isLoading && <p className="candidates-page-loading">Cargando candidatos...</p>}

      {errorMessage !== '' && (
        <p className="candidates-page-error" role="alert">
          {errorMessage}
        </p>
      )}

      {hasData && filteredCandidates.length > 0 && (
        <CandidateList
          candidates={filteredCandidates}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* El mensaje de "sin resultados" solo se muestra cuando ya hay datos. */}
      {hasData && filteredCandidates.length === 0 && (
        <p className="candidates-page-empty">No se encontraron candidatos con ese término.</p>
      )}
    </section>
  );
};
