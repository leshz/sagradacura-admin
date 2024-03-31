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

export interface UiUtilityFooterDescription extends Schema.Component {
  collectionName: 'components_ui_utility_footer_descriptions';
  info: {
    displayName: 'FooterDescription';
    icon: 'stack';
  };
  attributes: {
    footerTitle: Attribute.String & Attribute.Required;
    description: Attribute.String & Attribute.Required;
  };
}

export interface UiUtilityLink extends Schema.Component {
  collectionName: 'components_ui_utility_links';
  info: {
    displayName: 'Link';
    icon: 'attachment';
  };
  attributes: {
    link: Attribute.String;
    icon: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
    text: Attribute.String;
  };
}

export interface UiFooter extends Schema.Component {
  collectionName: 'components_ui_footers';
  info: {
    displayName: 'footer';
    icon: 'hashtag';
    description: '';
  };
  attributes: {
    NewsletterTitle: Attribute.String;
    description: Attribute.Component<'ui-utility.footer-description'>;
    Column: Attribute.Component<'utility.column-links', true>;
  };
}

export interface UiMainBanner extends Schema.Component {
  collectionName: 'components_ui_main_banners';
  info: {
    displayName: 'MainBanner';
    icon: 'shirt';
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Description: Attribute.String;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface UiMenu extends Schema.Component {
  collectionName: 'components_ui_menus';
  info: {
    displayName: 'menu';
    icon: 'filter';
    description: '';
  };
  attributes: {
    icon: Attribute.Media & Attribute.Required;
    Home: Attribute.Component<'ui-utility.link'>;
    nuestraMarca: Attribute.Component<'ui-utility.link'>;
    Productos: Attribute.Component<'ui-utility.link', true>;
    cart: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
  };
}

export interface UiTopMain extends Schema.Component {
  collectionName: 'components_ui_top_mains';
  info: {
    displayName: 'topMain';
    icon: 'database';
    description: '';
  };
  attributes: {
    phone: Attribute.String & Attribute.Required;
    title: Attribute.RichText;
    socialLink: Attribute.Component<'ui-utility.link', true>;
  };
}

export interface UtilityColumnLinks extends Schema.Component {
  collectionName: 'components_utility_column_links';
  info: {
    displayName: 'columnLinks';
    icon: 'stack';
    description: '';
  };
  attributes: {
    Title: Attribute.String;
    column: Attribute.Blocks;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'payment-platforms.mercadopago': PaymentPlatformsMercadopago;
      'ui-utility.footer-description': UiUtilityFooterDescription;
      'ui-utility.link': UiUtilityLink;
      'ui.footer': UiFooter;
      'ui.main-banner': UiMainBanner;
      'ui.menu': UiMenu;
      'ui.top-main': UiTopMain;
      'utility.column-links': UtilityColumnLinks;
    }
  }
}
