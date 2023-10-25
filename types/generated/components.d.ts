import type { Schema, Attribute } from '@strapi/strapi';

export interface PaymentPlatformsMercadopago extends Schema.Component {
  collectionName: 'components_platform_mercadopagos';
  info: {
    displayName: 'mercadopago';
    icon: 'shoppingCart';
    description: '';
  };
  attributes: {
    token: Attribute.String & Attribute.Required & Attribute.Private;
    active: Attribute.Boolean &
      Attribute.Required &
      Attribute.Private &
      Attribute.DefaultTo<true>;
    notification_url: Attribute.String & Attribute.Private;
    default_currency: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        maxLength: 3;
      }> &
      Attribute.DefaultTo<'COP'>;
    back_urls: Attribute.String;
    effecty: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'payment-platforms.mercadopago': PaymentPlatformsMercadopago;
    }
  }
}
