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
    description: '';
  };
  attributes: {
    footer_title: Attribute.String & Attribute.Required;
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

export interface UiUtilityNewsLetter extends Schema.Component {
  collectionName: 'components_ui_utility_news_letters';
  info: {
    displayName: 'news_letter';
  };
  attributes: {
    title: Attribute.String;
    label: Attribute.String;
  };
}

export interface UiBottom extends Schema.Component {
  collectionName: 'components_ui_bottoms';
  info: {
    displayName: 'bottom';
    icon: 'bold';
  };
  attributes: {
    copyright: Attribute.String & Attribute.Required;
    phone: Attribute.String;
  };
}

export interface UiCategories extends Schema.Component {
  collectionName: 'components_ui_categories';
  info: {
    displayName: 'categories';
    icon: 'bold';
  };
  attributes: {
    first_line: Attribute.String;
    second_line: Attribute.String;
    image: Attribute.Media;
    link: Attribute.String;
  };
}

export interface UiDinamicBanner extends Schema.Component {
  collectionName: 'components_ui_dinamic_banners';
  info: {
    displayName: 'dinamic_banner';
    icon: 'check';
  };
  attributes: {
    text: Attribute.Blocks;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface UiFixedBanner extends Schema.Component {
  collectionName: 'components_ui_fixed_banners';
  info: {
    displayName: 'fixed_banner';
    description: '';
  };
  attributes: {
    title: Attribute.Blocks;
    image: Attribute.Media & Attribute.Required;
    link: Attribute.Component<'ui-utility.link'>;
    dinamic_banner: Attribute.Component<'ui.dinamic-banner', true>;
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
    columns: Attribute.Component<'utility.column-links', true>;
    botton: Attribute.Component<'ui.bottom'>;
    news_letter: Attribute.Component<'ui-utility.news-letter'>;
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
    logo: Attribute.Media & Attribute.Required;
    home: Attribute.Component<'ui-utility.link'>;
    nuestra_marca: Attribute.Component<'ui-utility.link'>;
    productos: Attribute.Component<'ui-utility.link', true>;
    cart: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    mobile: Attribute.Component<'ui.mobile-information'>;
  };
}

export interface UiMobileInformation extends Schema.Component {
  collectionName: 'components_ui_mobile_informations';
  info: {
    displayName: 'mobile-information';
    icon: 'cog';
    description: '';
  };
  attributes: {
    phone: Attribute.String;
    email: Attribute.String;
  };
}

export interface UiProductCategories extends Schema.Component {
  collectionName: 'components_ui_product_categories';
  info: {
    displayName: 'product_categories';
    icon: 'alien';
  };
  attributes: {
    title: Attribute.String;
    categories: Attribute.Component<'ui.categories', true>;
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
    social_links: Attribute.Component<'ui-utility.link', true>;
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
    title: Attribute.String;
    column: Attribute.Blocks;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'payment-platforms.mercadopago': PaymentPlatformsMercadopago;
      'ui-utility.footer-description': UiUtilityFooterDescription;
      'ui-utility.link': UiUtilityLink;
      'ui-utility.news-letter': UiUtilityNewsLetter;
      'ui.bottom': UiBottom;
      'ui.categories': UiCategories;
      'ui.dinamic-banner': UiDinamicBanner;
      'ui.fixed-banner': UiFixedBanner;
      'ui.footer': UiFooter;
      'ui.main-banner': UiMainBanner;
      'ui.menu': UiMenu;
      'ui.mobile-information': UiMobileInformation;
      'ui.product-categories': UiProductCategories;
      'ui.top-main': UiTopMain;
      'utility.column-links': UtilityColumnLinks;
    }
  }
}
