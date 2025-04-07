/**
 * pagina-contacto router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::pagina-contacto.pagina-contacto', {
  config: {
    find: {
      middlewares: ["api::pagina-contacto.populating"],
    },
  }
});
