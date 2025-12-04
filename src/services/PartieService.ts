import { RouteError } from '@src/common/util/route-errors';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IPartie } from '@src/models/Partie';
import PartieRepo from '@src/repos/PartieRepo';

/******************************************************************************
                                Constants
******************************************************************************/

export const PARTIE_NON_TROUVE = 'Partie non trouvée';

/******************************************************************************
                                Functions
******************************************************************************/

function getAll(): Promise<IPartie[]> {
  return PartieRepo.getAll();
}

function getByJoueur(joueur: string): Promise<IPartie[]> {
  return PartieRepo.getByJoueur(joueur);
}

function getByMort(mort: string): Promise<IPartie[]> {
  return PartieRepo.getByMort(mort);
}

function getByScore(): Promise<IPartie[]> {
  return PartieRepo.getByScore();
}

function getInvalide(): Promise<IPartie[]> {
  return PartieRepo.getInvalide();
}

function add(partie: IPartie): Promise<void> {
  return PartieRepo.ajouter(partie);
}

async function invalider(id: string, raison: string): Promise<void> {
  const persists = await PartieRepo.getOne(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PARTIE_NON_TROUVE);
  }
  return PartieRepo.invalider(id, raison);
}

async function valider(id: string): Promise<void> {
  const persists = await PartieRepo.getOne(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PARTIE_NON_TROUVE);
  }
  return PartieRepo.valider(id);
}

async function _delete(id: string): Promise<void> {
  const persists = await PartieRepo.getOne(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PARTIE_NON_TROUVE);
  }
  return PartieRepo.supprimer(id);
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
  getByJoueur,
  getByMort,
  getByScore,
  getInvalide,
  add,
  invalider,
  valider,
  delete: _delete,
} as const;
