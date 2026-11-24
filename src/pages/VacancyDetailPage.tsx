import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { isAxiosError } from 'axios';
import type { Vacancy } from '../types/vacancy';
import { getVacancyById } from '../services/vacancyService';
import './VacancyDetailPage.css';

export const VacancyDetailPage = () => {
  const { id = '' } = useParams();

  const [vacancy, setVacancy] = useState<Vacancy | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const loadVacancy = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        setVacancy(await getVacancyById(id));
      } catch (error) {
        const status = isAxiosError(error) ? error.response?.status : undefined;
        setErrorMessage(
          status === 404 || status === 400
            ? 'La vacante que busca no existe.'
            : 'No se pudo cargar la vacante. Intente de nuevo más tarde.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadVacancy();
  }, [id]);

  const renderContent = () => {
    if (isLoading) {
      return <p className="vacancies-page-status">Cargando vacante...</p>;
    }

    if (errorMessage || !vacancy) {
      return (
        <p className="vacancies-page-status vacancies-page-error" role="alert">
          {errorMessage}
        </p>
      );
    }

    return (
      <article className="vacancy-detail">
        <h2>{vacancy.title}</h2>
        <p>{vacancy.companyName}</p>
      </article>
    );
  };

  return (
    <section className="vacancy-detail-page">
      <Link to="/vacancies" className="vacancy-detail-back">
        ← Volver a las vacantes
      </Link>
      {renderContent()}
    </section>
  );
};