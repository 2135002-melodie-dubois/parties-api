import { Request, Response, NextFunction, Router } from 'express';

import Paths from '@src/common/constants/Paths';
import PartieRoutes from './PartieRoutes';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IPartie, Partie } from '@src/models/Partie';
import JetonRoutes from './JetonRoutes';

/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();

// Init token router
const tokenRouter = Router();

// Generate Token
tokenRouter.get(Paths.GenerateToken.Get, JetonRoutes.generateToken);

// ** Add tokenRouter ** //
apiRouter.use(Paths.GenerateToken.Base, tokenRouter);

// ** Add AuteurRouter ** //
interface bodyPartie {
  partie: IPartie;
}
//Validation d'une partie pour l'ajout
function validerAjoutPartie(req: Request, res: Response, next: NextFunction) {
  if (req.body === null) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Partie requise' })
      .end();
    return;
  }
  if ((req.body as bodyPartie).partie === null) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Partie requise' })
      .end();
    return;
  }
  const nouvellePartie = new Partie((req.body as bodyPartie).partie);
  const error = nouvellePartie.validateSync();
  if (error !== null && error !== undefined) {
    res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
  } else {
    next();
  }
}
interface bodyRaison {
  raison: string;
}
//Validation pour l'invalidation d'une partie
function validerInvalidationPartie(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.body === null) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Raison requise' })
      .end();
    return;
  }
  if ((req.body as bodyRaison).raison === null) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Raison requise' })
      .end();
    return;
  }
  next();
}

// Init router
const partieRouter = Router();

partieRouter.get(Paths.Parties.getAll, PartieRoutes.getAll);
partieRouter.get(Paths.Parties.getByJoueur, PartieRoutes.getByJoueur);
partieRouter.get(Paths.Parties.getByMort, PartieRoutes.getByMort);
partieRouter.get(Paths.Parties.getByScore, PartieRoutes.getByScore);
partieRouter.get(Paths.Parties.getInvalide, PartieRoutes.getInvalide);
partieRouter.post(Paths.Parties.add, PartieRoutes.add, validerAjoutPartie);
partieRouter.put(
  Paths.Parties.invalider,
  PartieRoutes.invalider,
  validerInvalidationPartie,
);
partieRouter.put(Paths.Parties.valider, PartieRoutes.valider);
partieRouter.delete(Paths.Parties.delete, PartieRoutes.delete);

// Add AuteurRouter
apiRouter.use(Paths.Parties.Base, partieRouter);

/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
