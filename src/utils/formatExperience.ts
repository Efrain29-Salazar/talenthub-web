// Redacta los años de experiencia: 0, 1 (singular) u otro valor (plural).
// Lo usan la tarjeta de la lista y la página de detalle.
export const formatExperience = (years: number): string => {
  if (years === 0) {
    return 'Sin experiencia';
  }

  if (years === 1) {
    return '1 año de experiencia';
  }

  return `${years} años de experiencia`;
};
