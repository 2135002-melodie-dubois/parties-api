 
import moduleAlias from 'module-alias';

// Mettre en commentaire
// // Configure "dotenv"
// const result2 = dotenv.config({
//   path: path.join(__dirname, `./config/.env.${NODE_ENV}`),
// });
// if (result2.error) {
//   throw result2.error;
// }

// Configure moduleAlias
if (__filename.endsWith('js')) {
  moduleAlias.addAlias('@src', __dirname + '/dist');
}
