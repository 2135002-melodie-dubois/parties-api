import { model, Schema } from 'mongoose';

/******************************************************************************
                                  Interfaces
******************************************************************************/
//Le nom du joueur
export interface INomJoueur {
  identifiant: string;
  surnom: string;
}

export interface ICauseMort {
  cause: string;
  description: string;
}

export interface IEnnemi {
  nom: string;
  estAggressif: boolean;
  aGagne: boolean;
  valeur: number;
}

export interface IPartie {
  nom_joueur: INomJoueur;
  nombre_cases: number;
  date_partie: Date;
  ennemis_rencontrés: IEnnemi[];
  score_final: number;
  cause_mort: ICauseMort;
  est_valide: boolean;
  raison_invalide: string;
}

/******************************************************************************
                                 Schemas
******************************************************************************/
const NomJoueurSchema = new Schema<INomJoueur>({
  identifiant: {
    type: String,
    required: [true, "L'identifiant du joueur est requis"],
    validate: {
      validator: function (v: string) {
        return /\w+/.test(v);
      },
      message:
        "L'identifiant doit etre seulment compose de lettres et de nombres",
    },
  },
  surnom: {
    type: String,
    validate: {
      validator: function (v: string) {
        return /[A-z]{1,5}/.test(v);
      },
      message:
        'Le surnom ne doit etre que des lettres et ne peut contenir plus de 5 caracteres',
    },
  },
});

const CauseMortSchema = new Schema<ICauseMort>({
  cause: {
    type: String,
    enum: {
      values: ['Faim', 'Ennemi', 'Fatigue'],
      message: "La cause de mort n'est pas une valeur connue",
    },
    required: [true, 'La cause de mort est requise'],
  },
  description: { type: String },
});

const EnnemiSchema = new Schema<IEnnemi>({
  nom: {
    type: String,
    required: [true, "Le nom de l'ennemi est requis"],
  },
  estAggressif: {
    type: Boolean,
    required: [true, "L'aggessivite de l'ennemi doit etre connue"],
  },
  aGagne: {
    type: Boolean,
    required: [true, 'La victoire du joueur doit etre connue'],
  },
  valeur: {
    type: Number,
    required: [true, "L'ennemi doit avoir une valeur en points"],
  },
});

const PartieSchema = new Schema<IPartie>({
  nom_joueur: {
    type: NomJoueurSchema,
    required: [true, 'Le nom du joueur est requis'],
  },
  nombre_cases: {
    type: Number,
    required: [true, 'Le nombre de cases completes est requis'],
  },
  date_partie: { type: Date },
  ennemis_rencontrés: {
    type: [EnnemiSchema],
    required: [true, 'Le nom du genre est requis'],
  },
  score_final: { type: Number },
  cause_mort: {
    type: CauseMortSchema,
    required: [true, 'La cause de mort est requise'],
  },
  est_valide: { type: Boolean },
  raison_invalide: { type: String },
});
/******************************************************************************
                                Export default
******************************************************************************/

export const Partie = model<IPartie>('partie', PartieSchema);
