export default {
  Base: '/api',
  Parties: {
    Base: '/parties',
    getAll: '/',
    getByJoueur: '/joueur/:joueur',
    getByMort: '/mort/:mort',
    getByScore: '/score',
    getInvalide: '/invalide',
    add: '/',
    invalider: '/invalider/:id',
    valider: '/valider/:id',
    delete: '/',
  },
  GenerateToken: {
    Base: '/generatetoken',
    Get: '/',
  },
} as const;
