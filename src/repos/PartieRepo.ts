import { IEnnemi, IPartie, Partie } from '@src/models/Partie';

/******************************************************************************
                                Functions
******************************************************************************/

//Recupere toutes les parties valides
async function getAll(): Promise<IPartie[]> {
  const parties = await Partie.find({ est_valide: true });
  return parties;
}

//Recupere toutes les parties valides d'un joueur
async function getByJoueur(identifiant: string): Promise<IPartie[]> {
  const parties = await Partie.find({
    'nom_joueur.identifiant': identifiant,
    est_valide: true,
  });
  return parties;
}

//Recupere toutes les parties valides par ordre de score final
async function getByScore(): Promise<IPartie[]> {
  const parties = await Partie.find({ est_valide: true }).sort({
    score_final: -1,
  });
  return parties;
}

//Recupere toutes les parties valides pour un type de mort
async function getByMort(mort: string): Promise<IPartie[]> {
  const parties = await Partie.find({ est_valide: true, cause_mort: mort });
  return parties;
}

//Recupere toutes les parties invalides
async function getInvalide(): Promise<IPartie[]> {
  const parties = await Partie.find({ est_valide: false });
  return parties;
}

//Ajoute une partie a la base de donnees.
async function ajouter(partie: IPartie): Promise<void> {
  const nouvellepartie = new Partie(partie);
  if (!nouvellepartie.nom_joueur.surnom) {
    nouvellepartie.nom_joueur.surnom = creerSurnom(
      nouvellepartie.nom_joueur.identifiant,
    );
  }
  nouvellepartie.date_partie = new Date(Date.now());
  nouvellepartie.score_final = calculerScore(
    nouvellepartie.nombre_cases,
    nouvellepartie.ennemis_rencontrés,
  );
  nouvellepartie.est_valide = true;
  nouvellepartie.raison_invalide = '';
  await nouvellepartie.save();
}

function calculerScore(nombreCases: number, ennemis: IEnnemi[]): number {
  let score: number = nombreCases;
  for (const e of ennemis) {
    if (e.estAggressif) {
      score += 5;
    }
    if (e.aGagne) {
      score += e.valeur;
    }
  }
  return score;
}

function creerSurnom(nomJoueur: string): string {
  let surnom = '';
  for (let i = 0; i < nomJoueur.length || surnom.length <= 5; i++) {
    if (/[A-z]/.test(nomJoueur[i])) {
      surnom = surnom.concat(nomJoueur[i]);
    }
  }
  if (surnom == '') {
    return 'PLYR';
  }
  return surnom;
}

//Rend une partie invalide
async function invalider(id: string, raison: string): Promise<void> {
  const partieAModifier = await Partie.findOne({ _id: id });
  if (partieAModifier === null) {
    throw new Error('Partie non trouvée');
  }
  partieAModifier.est_valide = false;
  partieAModifier.raison_invalide = raison;
  await partieAModifier.save();
}

//Revalide une partie invalide
async function valider(id: string): Promise<void> {
  const partieAModifier = await Partie.findOne({ _id: id });
  if (partieAModifier === null) {
    throw new Error('Partie non trouvée');
  }
  partieAModifier.est_valide = true;
  partieAModifier.raison_invalide = '';
  await partieAModifier.save();
}

//Supprime une partie
async function supprimer(id: string): Promise<void> {
  await Partie.deleteOne({ id: id });
}

//Recupere une partie
async function getOne(id: string): Promise<IPartie | null> {
  const partie = await Partie.findOne({ _id: id });
  return partie;
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getOne,
  getAll,
  getByJoueur,
  getByMort,
  getByScore,
  getInvalide,
  ajouter,
  invalider,
  valider,
  supprimer,
} as const;
