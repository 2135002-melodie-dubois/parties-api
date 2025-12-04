import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

import { IReq, IRes } from './common/types';

import PartieService from '@src/services/PartieService';
import { IPartie } from '@src/models/Partie';

/******************************************************************************
                                Functions
******************************************************************************/

async function getAll(_: IReq, res: IRes) {
  const parties = await PartieService.getAll();
  res.status(HttpStatusCodes.OK).json({ parties });
}

async function getByJoueur(req: IReq, res: IRes) {
  const { joueur } = req.params;
  const parties = await PartieService.getByJoueur(joueur as string);
  res.status(HttpStatusCodes.OK).json({ parties });
}

async function getByMort(req: IReq, res: IRes) {
  const { mort } = req.params;
  const parties = await PartieService.getByMort(mort as string);
  res.status(HttpStatusCodes.OK).json({ parties });
}

async function getByScore(_: IReq, res: IRes) {
  const parties = await PartieService.getByScore();
  res.status(HttpStatusCodes.OK).json({ parties });
}

async function getInvalide(_: IReq, res: IRes) {
  const parties = await PartieService.getInvalide();
  res.status(HttpStatusCodes.OK).json({ parties });
}

async function add(req: IReq, res: IRes) {
  const { partie } = req.body;
  await PartieService.add(partie as IPartie);
  res.status(HttpStatusCodes.CREATED).end();
}

async function invalider(req: IReq, res: IRes) {
  const { id } = req.params;
  const { raison } = req.body;
  await PartieService.invalider(id as string, raison as string);
  res.status(HttpStatusCodes.OK).end();
}

async function valider(req: IReq, res: IRes) {
  const { id } = req.params;
  await PartieService.valider(id as string);
  res.status(HttpStatusCodes.OK).end();
}

async function delete_(req: IReq, res: IRes) {
  const { id } = req.params;
  await PartieService.delete(id as string);
  res.status(HttpStatusCodes.OK).end();
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
  delete: delete_,
} as const;
