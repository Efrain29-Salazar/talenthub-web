import type { Candidate } from '../types/candidate';
import { apiClient } from './apiClient';

// GET /candidates: la lista de candidatos.
export const getCandidates = async (): Promise<Candidate[]> => {
  const response = await apiClient.get<Candidate[]>('/candidates');

  return response.data;
};

// GET /candidates/<id>: un candidato. El id llega como texto (así lo entrega la dirección de la página).
export const getCandidateById = async (id: string): Promise<Candidate> => {
  const response = await apiClient.get<Candidate>(`/candidates/${id}`);

  return response.data;
};