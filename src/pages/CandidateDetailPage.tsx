import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { Link, useParams } from 'react-router';
import { getCandidateById } from '../services/candidateService';
import type { Candidate } from '../types/candidate';
import { formatExperience } from '../utils/formatExperience';
import './CandidateDetailPage.css';

export const CandidateDetailPage = () => {
  // El id viene de la dirección (/candidates/:id). useParams siempre lo entrega como TEXTO.
  const { id } = useParams<{ id: string }>();

  // Los estados de la petición: el candidato, si está cargando, si no existe y el error general.
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Pide el candidato a la API cada vez que cambia el id de la dirección.
  useEffect(() => {
    const loadCandidate = async () => {
      try {
        setCandidate(await getCandidateById(id ?? ''));
      } catch (error) {
        // Se distingue "no existe" de "falló la conexión" por el código de estado de la respuesta:
        // 404 (no existe) y 400 (id no válido) significan "no existe". Cualquier otro caso es un fallo general.
        if (isAxiosError(error) && (error.response?.status === 404 || error.response?.status === 400)) {
          setIsNotFound(true);
        } else {
          setErrorMessage('No se pudo cargar el candidato. Intente de nuevo más tarde.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadCandidate();
  }, [id]);

  return (
    <section className="candidate-detail">
      <Link className="candidate-detail-back" to="/candidates">
        ← Volver a los candidatos
      </Link>

      {isLoading && <p className="candidate-detail-loading">Cargando candidato...</p>}

      {isNotFound && <p className="candidate-detail-message">El candidato que busca no existe.</p>}

      {errorMessage !== '' && (
        <p className="candidate-detail-error" role="alert">
          {errorMessage}
        </p>
      )}

      {candidate && (
        <article className="candidate-detail-card">
          <h2 className="candidate-detail-name">{candidate.name}</h2>
          <p className="candidate-detail-city">{candidate.city}</p>
          <p className="candidate-detail-email">{candidate.email}</p>
          <p className="candidate-detail-experience">{formatExperience(candidate.experienceYears)}</p>

          {candidate.skills.length > 0 ? (
            <ul className="candidate-detail-skills">
              {candidate.skills.map((skill) => (
                <li key={skill} className="candidate-detail-skill">
                  {skill}
                </li>
              ))}
            </ul>
          ) : (
            <p className="candidate-detail-no-skills">Sin habilidades registradas</p>
          )}
        </article>
      )}
    </section>
  );
};
