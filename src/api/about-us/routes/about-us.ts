/**
 * about-us router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::about-us.about-us',{
    config:{
        find:{
            middlewares:['api::about-us.populating']
        }
    }
});
