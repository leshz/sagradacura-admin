import type { Attribute, Schema } from '@strapi/strapi';

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Attribute.String;
    registrationToken: Attribute.String & Attribute.Private;
    resetPasswordToken: Attribute.String & Attribute.Private;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    username: Attribute.String;
  };
}

export interface ApiAboutUsAboutUs extends Schema.SingleType {
  collectionName: 'about_uses';
  info: {
    description: '';
    displayName: 'Nosotros';
    pluralName: 'about-uses';
    singularName: 'about-us';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    article: Attribute.Blocks &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    blogs_title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::about-us.about-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::about-us.about-us',
      'oneToMany',
      'api::about-us.about-us'
    >;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'shared.seo'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::about-us.about-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogBlog extends Schema.CollectionType {
  collectionName: 'blogs';
  info: {
    description: '';
    displayName: 'Blogs';
    pluralName: 'blogs';
    singularName: 'blog';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    article: Attribute.Blocks;
    author: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    image: Attribute.Media<'images'>;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'shared.seo'>;
    short_description: Attribute.Text;
    slug: Attribute.UID<'api::blog.blog', 'title'> & Attribute.Required;
    tags: Attribute.Relation<'api::blog.blog', 'oneToMany', 'api::tag.tag'>;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiCartCart extends Schema.SingleType {
  collectionName: 'carts';
  info: {
    description: '';
    displayName: 'Carrito de compras';
    pluralName: 'carts';
    singularName: 'cart';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::cart.cart', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    empty: Attribute.Component<'cart.empty-cart'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::cart.cart',
      'oneToMany',
      'api::cart.cart'
    >;
    summary: Attribute.Component<'cart.summary'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    table: Attribute.Component<'cart.table'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::cart.cart', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiComunidadComunidad extends Schema.CollectionType {
  collectionName: 'comunidads';
  info: {
    displayName: 'Comunidad';
    pluralName: 'comunidads';
    singularName: 'comunidad';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::comunidad.comunidad',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    email: Attribute.Email & Attribute.Required;
    fecha_nacimiento: Attribute.Date & Attribute.Required;
    genero: Attribute.Enumeration<
      ['masculino', 'femenino', 'prefiero_no_decir', 'otro']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'otro'>;
    nombre: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::comunidad.comunidad',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCondicionesDeEnvioCondicionesDeEnvio
  extends Schema.SingleType {
  collectionName: 'condiciones_de_envios';
  info: {
    displayName: 'Condiciones de envio';
    pluralName: 'condiciones-de-envios';
    singularName: 'condiciones-de-envio';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    content: Attribute.Blocks &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::condiciones-de-envio.condiciones-de-envio',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::condiciones-de-envio.condiciones-de-envio',
      'oneToMany',
      'api::condiciones-de-envio.condiciones-de-envio'
    >;
    publishedAt: Attribute.DateTime;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::condiciones-de-envio.condiciones-de-envio',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactoContacto extends Schema.CollectionType {
  collectionName: 'contactos';
  info: {
    description: '';
    displayName: 'Contacto';
    pluralName: 'contactos';
    singularName: 'contacto';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    asunto: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contacto.contacto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    email: Attribute.Email & Attribute.Required;
    nombre: Attribute.String & Attribute.Required;
    nota: Attribute.Text;
    telefono: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::contacto.contacto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDerechoDeRetractoDerechoDeRetracto
  extends Schema.SingleType {
  collectionName: 'derecho_de_retractos';
  info: {
    description: '';
    displayName: 'Derecho de retracto';
    pluralName: 'derecho-de-retractos';
    singularName: 'derecho-de-retracto';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    content: Attribute.Blocks &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::derecho-de-retracto.derecho-de-retracto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::derecho-de-retracto.derecho-de-retracto',
      'oneToMany',
      'api::derecho-de-retracto.derecho-de-retracto'
    >;
    publishedAt: Attribute.DateTime;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::derecho-de-retracto.derecho-de-retracto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGeneralGeneral extends Schema.SingleType {
  collectionName: 'generals';
  info: {
    description: '';
    displayName: 'Web General';
    pluralName: 'generals';
    singularName: 'general';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::general.general',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    footer: Attribute.Component<'ui.footer'>;
    menu: Attribute.Component<'ui.menu'>;
    seo: Attribute.Component<'shared.seo'>;
    top: Attribute.Component<'ui.top-main'> & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::general.general',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomeHome extends Schema.SingleType {
  collectionName: 'homes';
  info: {
    description: '';
    displayName: 'Pagina principal';
    pluralName: 'homes';
    singularName: 'home';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    banners: Attribute.Component<'ui.fixed-banner'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    highlight_products: Attribute.Component<'ui.hightlights-products'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    instagram: Attribute.Component<'ui.instagram'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    last_blogs: Attribute.Component<'ui.last-blogposts'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::home.home',
      'oneToMany',
      'api::home.home'
    >;
    product_categories: Attribute.Component<'ui.product-categories'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    publishedAt: Attribute.DateTime;
    testimonial: Attribute.Component<'ui.testimonial'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::home.home', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPaginaContactoPaginaContacto extends Schema.SingleType {
  collectionName: 'pagina_contactos';
  info: {
    description: '';
    displayName: 'Pagina Contacto';
    pluralName: 'pagina-contactos';
    singularName: 'pagina-contacto';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    banner: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::pagina-contacto.pagina-contacto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::pagina-contacto.pagina-contacto',
      'oneToMany',
      'api::pagina-contacto.pagina-contacto'
    >;
    seo: Attribute.Component<'shared.seo'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::pagina-contacto.pagina-contacto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPlanesCorporativoPlanesCorporativo
  extends Schema.SingleType {
  collectionName: 'planes_corporativos';
  info: {
    displayName: 'Planes corporativos';
    pluralName: 'planes-corporativos';
    singularName: 'planes-corporativo';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    content: Attribute.Blocks &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::planes-corporativo.planes-corporativo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::planes-corporativo.planes-corporativo',
      'oneToMany',
      'api::planes-corporativo.planes-corporativo'
    >;
    publishedAt: Attribute.DateTime;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::planes-corporativo.planes-corporativo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPoliticasDeDevolucionPoliticasDeDevolucion
  extends Schema.SingleType {
  collectionName: 'politicas_de_devoluciones';
  info: {
    description: '';
    displayName: 'Politicas de devolucion';
    pluralName: 'politicas-de-devoluciones';
    singularName: 'politicas-de-devolucion';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    content: Attribute.Blocks &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::politicas-de-devolucion.politicas-de-devolucion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::politicas-de-devolucion.politicas-de-devolucion',
      'oneToMany',
      'api::politicas-de-devolucion.politicas-de-devolucion'
    >;
    publishedAt: Attribute.DateTime;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::politicas-de-devolucion.politicas-de-devolucion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductDetailProductDetail extends Schema.SingleType {
  collectionName: 'product_details';
  info: {
    description: '';
    displayName: 'Detalle de producto';
    pluralName: 'product-details';
    singularName: 'product-detail';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-detail.product-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::product-detail.product-detail',
      'oneToMany',
      'api::product-detail.product-detail'
    >;
    no_stock: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    payment_message: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    promises: Attribute.Component<'product.promises', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::product-detail.product-detail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiShopShop extends Schema.SingleType {
  collectionName: 'shops';
  info: {
    description: 'Pagina de la tienda online';
    displayName: 'Tienda';
    pluralName: 'shops';
    singularName: 'shop';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    add_to_cart: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    categories: Attribute.Component<'categories.categories'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::shop.shop', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::shop.shop',
      'oneToMany',
      'api::shop.shop'
    >;
    out_of_stock: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    publishedAt: Attribute.DateTime;
    request_stock: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    seo: Attribute.Component<'shared.seo'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::shop.shop', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTagTag extends Schema.CollectionType {
  collectionName: 'tags';
  info: {
    description: '';
    displayName: 'Tags';
    pluralName: 'tags';
    singularName: 'tag';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    name: Attribute.String;
    slug: Attribute.UID<'api::tag.tag', 'name'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTestimonialTestimonial extends Schema.CollectionType {
  collectionName: 'testimonials';
  info: {
    description: '';
    displayName: 'Testimonios';
    pluralName: 'testimonials';
    singularName: 'testimonial';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    job_title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToMany',
      'api::testimonial.testimonial'
    >;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    publishedAt: Attribute.DateTime;
    starts: Attribute.Integer &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Attribute.DefaultTo<4>;
    testimonial: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTratamientoDeDatoTratamientoDeDato
  extends Schema.SingleType {
  collectionName: 'tratamiento_de_datos';
  info: {
    displayName: 'Tratamiento de datos';
    pluralName: 'tratamiento-de-datos';
    singularName: 'tratamiento-de-dato';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    content: Attribute.Blocks &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tratamiento-de-dato.tratamiento-de-dato',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::tratamiento-de-dato.tratamiento-de-dato',
      'oneToMany',
      'api::tratamiento-de-dato.tratamiento-de-dato'
    >;
    publishedAt: Attribute.DateTime;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::tratamiento-de-dato.tratamiento-de-dato',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    timezone: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    isEntryValid: Attribute.Boolean;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginMenusMenu extends Schema.CollectionType {
  collectionName: 'menus';
  info: {
    displayName: 'Menu';
    name: 'Menu';
    pluralName: 'menus';
    singularName: 'menu';
    tableName: 'menus';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::menus.menu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    items: Attribute.Relation<
      'plugin::menus.menu',
      'oneToMany',
      'plugin::menus.menu-item'
    >;
    slug: Attribute.UID<'plugin::menus.menu', 'title'> & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::menus.menu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginMenusMenuItem extends Schema.CollectionType {
  collectionName: 'menu_items';
  info: {
    displayName: 'Menu Item';
    name: 'MenuItem';
    pluralName: 'menu-items';
    singularName: 'menu-item';
    tableName: 'menu_items';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::menus.menu-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    order: Attribute.Integer;
    parent: Attribute.Relation<
      'plugin::menus.menu-item',
      'oneToOne',
      'plugin::menus.menu-item'
    >;
    root_menu: Attribute.Relation<
      'plugin::menus.menu-item',
      'manyToOne',
      'plugin::menus.menu'
    > &
      Attribute.Required;
    target: Attribute.Enumeration<['_blank', '_parent', '_self', '_top']>;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::menus.menu-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    url: Attribute.String;
  };
}

export interface PluginStrapiEcommerceMercadopagoCategory
  extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    description: '';
    displayName: 'Categorias';
    pluralName: 'categories';
    singularName: 'category';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::strapi-ecommerce-mercadopago.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'plugin::strapi-ecommerce-mercadopago.category',
      'oneToMany',
      'plugin::strapi-ecommerce-mercadopago.category'
    >;
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    publishedAt: Attribute.DateTime;
    slug: Attribute.UID<
      'plugin::strapi-ecommerce-mercadopago.category',
      'name'
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::strapi-ecommerce-mercadopago.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginStrapiEcommerceMercadopagoConfiguration
  extends Schema.SingleType {
  collectionName: 'configurations';
  info: {
    displayName: 'Mercadopago Config';
    pluralName: 'configurations';
    singularName: 'configuration';
  };
  options: {
    comment: '';
    draftAndPublish: false;
  };
  attributes: {
    active: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
    back_urls: Attribute.String & Attribute.Required & Attribute.Private;
    bussiness_description: Attribute.String &
      Attribute.Required &
      Attribute.Private;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::strapi-ecommerce-mercadopago.configuration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    default_currency: Attribute.String & Attribute.Required & Attribute.Private;
    email: Attribute.String & Attribute.Required & Attribute.Private;
    notification_url: Attribute.String & Attribute.Required & Attribute.Private;
    send_emails: Attribute.Boolean & Attribute.Required & Attribute.Private;
    token: Attribute.String & Attribute.Required & Attribute.Private;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::strapi-ecommerce-mercadopago.configuration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    webhook_pass: Attribute.String & Attribute.Required & Attribute.Private;
  };
}

export interface PluginStrapiEcommerceMercadopagoInvoice
  extends Schema.CollectionType {
  collectionName: 'invoices';
  info: {
    description: '';
    displayName: 'Facturas';
    pluralName: 'invoices';
    singularName: 'invoice';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-tags': {
      defaultTag: 'initial';
      fieldName: 'payment_status';
      tags: {
        approved: {
          color: 'success';
        };
        authorized: {
          color: 'primary';
        };
        cancelled: {
          color: 'danger';
        };
        charged_back: {
          color: 'danger';
        };
        in_mediation: {
          color: 'primary';
        };
        in_process: {
          color: 'primary';
        };
        initial: {
          color: 'neutral';
        };
        pending: {
          color: 'primary';
        };
        refunded: {
          color: 'danger';
        };
        rejected: {
          color: 'danger';
        };
      };
    };
  };
  attributes: {
    collector_id: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::strapi-ecommerce-mercadopago.invoice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    paid_with: Attribute.String;
    payment_id: Attribute.String;
    payment_link: Attribute.String;
    payment_status: Attribute.Text &
      Attribute.Required &
      Attribute.CustomField<'plugin::content-tags.content-tags'>;
    preference_id: Attribute.String;
    products: Attribute.JSON;
    shipping: Attribute.Component<'mercadopago.shipping'> & Attribute.Required;
    shipping_status: Attribute.Enumeration<
      [
        'initial',
        'in_process',
        'on_delivery',
        'delivered',
        'cancelled',
        'refunded'
      ]
    >;
    shopper: Attribute.Component<'mercadopago.shopper'> & Attribute.Required;
    total: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<0>;
    total_discount: Attribute.Integer & Attribute.DefaultTo<0>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::strapi-ecommerce-mercadopago.invoice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginStrapiEcommerceMercadopagoProduct
  extends Schema.CollectionType {
  collectionName: 'products';
  info: {
    description: '';
    displayName: 'Productos';
    pluralName: 'products';
    singularName: 'product';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    categories: Attribute.Relation<
      'plugin::strapi-ecommerce-mercadopago.product',
      'oneToMany',
      'plugin::strapi-ecommerce-mercadopago.category'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::strapi-ecommerce-mercadopago.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    information: Attribute.Component<'product.information', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'plugin::strapi-ecommerce-mercadopago.product',
      'oneToMany',
      'plugin::strapi-ecommerce-mercadopago.product'
    >;
    middle_description: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    pictures: Attribute.Media<'images', true> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    price: Attribute.Integer &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMax<
        {
          min: 1000;
        },
        number
      >;
    promotion: Attribute.Component<'promotions.promotion'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    publishedAt: Attribute.DateTime;
    short_description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sku: Attribute.UID<
      undefined,
      undefined,
      {
        'disable-regenerate': true;
        'uuid-format': '^SGWP[A-Z]{2}\\d{5}$';
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'disable-regenerate': true;
          'uuid-format': '^SGWP[A-Z]{2}\\d{5}$';
        }
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    slug: Attribute.UID<
      'plugin::strapi-ecommerce-mercadopago.product',
      'name'
    > &
      Attribute.Required;
    stock: Attribute.Integer &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Attribute.SetMinMax<
        {
          max: 100;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    type: Attribute.Enumeration<['producto', 'servicio']> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Attribute.DefaultTo<'producto'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::strapi-ecommerce-mercadopago.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginStrapiEcommerceMercadopagoShipment
  extends Schema.CollectionType {
  collectionName: 'shipments';
  info: {
    displayName: 'Envios';
    pluralName: 'shipments';
    singularName: 'shipment';
  };
  options: {
    comment: '';
    draftAndPublish: false;
  };
  attributes: {
    code: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::strapi-ecommerce-mercadopago.shipment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String;
    price: Attribute.Integer;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::strapi-ecommerce-mercadopago.shipment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Attribute.String;
    caption: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    ext: Attribute.String;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    height: Attribute.Integer;
    mime: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    size: Attribute.Decimal & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    url: Attribute.String & Attribute.Required;
    width: Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    type: Attribute.String & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    profile_pic: Attribute.Media<'images'>;
    provider: Attribute.String;
    resetPasswordToken: Attribute.String & Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::about-us.about-us': ApiAboutUsAboutUs;
      'api::blog.blog': ApiBlogBlog;
      'api::cart.cart': ApiCartCart;
      'api::comunidad.comunidad': ApiComunidadComunidad;
      'api::condiciones-de-envio.condiciones-de-envio': ApiCondicionesDeEnvioCondicionesDeEnvio;
      'api::contacto.contacto': ApiContactoContacto;
      'api::derecho-de-retracto.derecho-de-retracto': ApiDerechoDeRetractoDerechoDeRetracto;
      'api::general.general': ApiGeneralGeneral;
      'api::home.home': ApiHomeHome;
      'api::pagina-contacto.pagina-contacto': ApiPaginaContactoPaginaContacto;
      'api::planes-corporativo.planes-corporativo': ApiPlanesCorporativoPlanesCorporativo;
      'api::politicas-de-devolucion.politicas-de-devolucion': ApiPoliticasDeDevolucionPoliticasDeDevolucion;
      'api::product-detail.product-detail': ApiProductDetailProductDetail;
      'api::shop.shop': ApiShopShop;
      'api::tag.tag': ApiTagTag;
      'api::testimonial.testimonial': ApiTestimonialTestimonial;
      'api::tratamiento-de-dato.tratamiento-de-dato': ApiTratamientoDeDatoTratamientoDeDato;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::menus.menu': PluginMenusMenu;
      'plugin::menus.menu-item': PluginMenusMenuItem;
      'plugin::strapi-ecommerce-mercadopago.category': PluginStrapiEcommerceMercadopagoCategory;
      'plugin::strapi-ecommerce-mercadopago.configuration': PluginStrapiEcommerceMercadopagoConfiguration;
      'plugin::strapi-ecommerce-mercadopago.invoice': PluginStrapiEcommerceMercadopagoInvoice;
      'plugin::strapi-ecommerce-mercadopago.product': PluginStrapiEcommerceMercadopagoProduct;
      'plugin::strapi-ecommerce-mercadopago.shipment': PluginStrapiEcommerceMercadopagoShipment;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
