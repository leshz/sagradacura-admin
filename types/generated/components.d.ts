import type { Attribute, Schema } from '@strapi/strapi';

export interface CartEmptyCart extends Schema.Component {
  collectionName: 'components_cart_empty_carts';
  info: {
    displayName: 'empty_cart';
    icon: 'brush';
  };
  attributes: {
    button: Attribute.String;
    description: Attribute.String;
    image: Attribute.Media<'images'> & Attribute.Required;
    title: Attribute.String;
  };
}

export interface CartSummary extends Schema.Component {
  collectionName: 'components_cart_summaries';
  info: {
    description: '';
    displayName: 'summary';
    icon: 'restaurant';
  };
  attributes: {
    cart_total: Attribute.String;
    go_checkout: Attribute.String;
    summary: Attribute.String;
    total: Attribute.String;
  };
}

export interface CartTable extends Schema.Component {
  collectionName: 'components_cart_tables';
  info: {
    displayName: 'table';
    icon: 'bulletList';
  };
  attributes: {
    price: Attribute.String;
    product: Attribute.String;
    quantity: Attribute.String;
    total: Attribute.String;
  };
}

export interface CategoriesCategories extends Schema.Component {
  collectionName: 'components_categories_categories';
  info: {
    displayName: 'categories';
    icon: 'cloud';
  };
  attributes: {
    all_products: Attribute.String;
    title: Attribute.String;
  };
}

export interface MenuCart extends Schema.Component {
  collectionName: 'components_menu_carts';
  info: {
    displayName: 'cart';
    icon: 'cast';
  };
  attributes: {
    continue_shopping: Attribute.String & Attribute.Required;
    discount: Attribute.String & Attribute.Required;
    got_checkout: Attribute.String & Attribute.Required;
    sub_total: Attribute.String & Attribute.Required;
  };
}

export interface MenuMultipleItem extends Schema.Component {
  collectionName: 'components_menu_multiple_items';
  info: {
    description: '';
    displayName: 'multiple';
    icon: 'bulletList';
  };
  attributes: {
    multiple: Attribute.Component<'ui-utility.link', true>;
  };
}

export interface MenuSingleItem extends Schema.Component {
  collectionName: 'components_menu_single_items';
  info: {
    description: '';
    displayName: 'single';
    icon: 'filter';
  };
  attributes: {
    single: Attribute.Component<'ui-utility.link'>;
  };
}

export interface MercadopagoShipping extends Schema.Component {
  collectionName: 'components_mercadopago_shippings';
  info: {
    description: '';
    displayName: 'Shipping';
    icon: 'exit';
  };
  attributes: {
    address: Attribute.String & Attribute.Required;
    city: Attribute.String & Attribute.Required;
    department: Attribute.String & Attribute.Required;
    message: Attribute.Text;
    postal_code: Attribute.BigInteger;
  };
}

export interface MercadopagoShopper extends Schema.Component {
  collectionName: 'components_mercadopago_shoppers';
  info: {
    description: '';
    displayName: 'Shopper';
    icon: 'emotionHappy';
  };
  attributes: {
    dni: Attribute.BigInteger & Attribute.Required;
    email: Attribute.Email & Attribute.Required;
    last_name: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    phone: Attribute.BigInteger & Attribute.Required;
  };
}

export interface ProductInformation extends Schema.Component {
  collectionName: 'components_product_information';
  info: {
    description: '';
    displayName: 'information';
    icon: 'bell';
  };
  attributes: {
    information: Attribute.Blocks & Attribute.Required;
    title: Attribute.String & Attribute.Required;
  };
}

export interface ProductPromises extends Schema.Component {
  collectionName: 'components_product_promises';
  info: {
    description: '';
    displayName: 'Promises';
  };
  attributes: {
    icon: Attribute.Enumeration<['bi-truck', 'bi-box2-heart']>;
    message: Attribute.Blocks;
    type: Attribute.Enumeration<['producto', 'servicio']> &
      Attribute.Required &
      Attribute.DefaultTo<'producto'>;
  };
}

export interface PromotionsPromotion extends Schema.Component {
  collectionName: 'components_promotions_promotions';
  info: {
    description: '';
    displayName: 'Promotion';
    icon: 'walk';
  };
  attributes: {
    best_seller: Attribute.Boolean & Attribute.DefaultTo<false>;
    discount_tag: Attribute.String;
    new: Attribute.Boolean & Attribute.DefaultTo<false>;
    price_with_discount: Attribute.Integer;
    recommended: Attribute.Boolean & Attribute.DefaultTo<false>;
    with_discount: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media<'images' | 'files' | 'videos'>;
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Attribute.String;
    keywords: Attribute.Text;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Attribute.Media<'images' | 'files' | 'videos'>;
    metaRobots: Attribute.String;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Attribute.String;
    structuredData: Attribute.JSON;
  };
}

export interface ShippingShipping extends Schema.Component {
  collectionName: 'components_shipping_shippings';
  info: {
    description: '';
    displayName: 'Shipping';
    icon: 'wheelchair';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    price: Attribute.Integer & Attribute.Required;
    type: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.DefaultTo<'SW00'>;
  };
}

export interface UiUtilityFooterDescription extends Schema.Component {
  collectionName: 'components_ui_utility_footer_descriptions';
  info: {
    description: '';
    displayName: 'FooterDescription';
    icon: 'stack';
  };
  attributes: {
    description: Attribute.String & Attribute.Required;
    footer_title: Attribute.String & Attribute.Required;
  };
}

export interface UiUtilityLink extends Schema.Component {
  collectionName: 'components_ui_utility_links';
  info: {
    displayName: 'Link';
    icon: 'attachment';
  };
  attributes: {
    icon: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
    link: Attribute.String;
    text: Attribute.String;
  };
}

export interface UiUtilityNewsLetter extends Schema.Component {
  collectionName: 'components_ui_utility_news_letters';
  info: {
    displayName: 'news_letter';
  };
  attributes: {
    label: Attribute.String;
    title: Attribute.String;
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
    image: Attribute.Media<'images'>;
    link: Attribute.String;
    second_line: Attribute.String;
  };
}

export interface UiDinamicBanner extends Schema.Component {
  collectionName: 'components_ui_dinamic_banners';
  info: {
    displayName: 'dinamic_banner';
    icon: 'check';
  };
  attributes: {
    image: Attribute.Media<'images'> & Attribute.Required;
    text: Attribute.Blocks;
  };
}

export interface UiFixedBanner extends Schema.Component {
  collectionName: 'components_ui_fixed_banners';
  info: {
    description: '';
    displayName: 'fixed_banner';
  };
  attributes: {
    dynamic_banner: Attribute.Component<'ui.dinamic-banner', true>;
    image: Attribute.Media<'images'> & Attribute.Required;
    link: Attribute.Component<'ui-utility.link'>;
    title: Attribute.Blocks;
  };
}

export interface UiFooter extends Schema.Component {
  collectionName: 'components_ui_footers';
  info: {
    description: '';
    displayName: 'footer';
    icon: 'hashtag';
  };
  attributes: {
    botton: Attribute.Component<'ui.bottom'>;
    columns: Attribute.Component<'utility.column-links', true>;
    news_letter: Attribute.Component<'ui-utility.news-letter'>;
  };
}

export interface UiHightlightSlider extends Schema.Component {
  collectionName: 'components_ui_hightlight_sliders';
  info: {
    displayName: 'hightlight_slider';
    icon: 'command';
  };
  attributes: {
    button: Attribute.String;
    description: Attribute.Blocks;
    image: Attribute.Media<'images'>;
    link: Attribute.String;
    title: Attribute.String;
  };
}

export interface UiHightlightsProducts extends Schema.Component {
  collectionName: 'components_ui_hightlights_products';
  info: {
    description: '';
    displayName: 'hightlights_products';
    icon: 'bell';
  };
  attributes: {
    highlight_slider: Attribute.Component<'ui.hightlight-slider', true>;
    title: Attribute.String;
  };
}

export interface UiInstagram extends Schema.Component {
  collectionName: 'components_ui_instagrams';
  info: {
    displayName: 'instagram';
    icon: 'crown';
  };
  attributes: {
    feed: Attribute.Media<'images', true> & Attribute.Required;
    profile_url: Attribute.String & Attribute.Required;
    subtitle: Attribute.String & Attribute.Required;
    title: Attribute.String & Attribute.Required;
  };
}

export interface UiLastBlogposts extends Schema.Component {
  collectionName: 'components_ui_last_blogposts';
  info: {
    description: '';
    displayName: 'last_blogposts';
    icon: 'archive';
  };
  attributes: {
    get_last: Attribute.Integer & Attribute.DefaultTo<2>;
    read_more: Attribute.String;
    sub_title: Attribute.String;
    title: Attribute.String;
  };
}

export interface UiMainBanner extends Schema.Component {
  collectionName: 'components_ui_main_banners';
  info: {
    displayName: 'MainBanner';
    icon: 'shirt';
  };
  attributes: {
    Description: Attribute.String;
    image: Attribute.Media<'images'> & Attribute.Required;
    Title: Attribute.String & Attribute.Required;
  };
}

export interface UiMenu extends Schema.Component {
  collectionName: 'components_ui_menus';
  info: {
    description: '';
    displayName: 'menu';
    icon: 'filter';
  };
  attributes: {
    cart_menu: Attribute.Component<'menu.cart'>;
    logo: Attribute.Media<'images'> & Attribute.Required;
  };
}

export interface UiMobileInformation extends Schema.Component {
  collectionName: 'components_ui_mobile_informations';
  info: {
    description: '';
    displayName: 'mobile-information';
    icon: 'cog';
  };
  attributes: {
    email: Attribute.String;
    phone: Attribute.String;
  };
}

export interface UiProductCategories extends Schema.Component {
  collectionName: 'components_ui_product_categories';
  info: {
    displayName: 'product_categories';
    icon: 'alien';
  };
  attributes: {
    categories: Attribute.Component<'ui.categories', true>;
    title: Attribute.String;
  };
}

export interface UiTestimonial extends Schema.Component {
  collectionName: 'components_ui_testimonials';
  info: {
    displayName: 'testimonial';
    icon: 'emotionHappy';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
  };
}

export interface UiTopMain extends Schema.Component {
  collectionName: 'components_ui_top_mains';
  info: {
    description: '';
    displayName: 'topMain';
    icon: 'database';
  };
  attributes: {
    social_links: Attribute.Component<'ui-utility.link', true>;
    title: Attribute.String;
  };
}

export interface UtilityColumnLinks extends Schema.Component {
  collectionName: 'components_utility_column_links';
  info: {
    description: '';
    displayName: 'columnLinks';
    icon: 'stack';
  };
  attributes: {
    column: Attribute.Blocks;
    title: Attribute.String;
  };
}

export interface UtilityMultiLink extends Schema.Component {
  collectionName: 'components_utility_multi_links';
  info: {
    displayName: 'multi-link';
  };
  attributes: {
    label: Attribute.String;
    link: Attribute.String;
  };
}

export interface UtilityMultilink extends Schema.Component {
  collectionName: 'components_utility_multilinks';
  info: {
    displayName: 'multilink';
    icon: 'bulletList';
  };
  attributes: {
    multi_link: Attribute.Component<'utility.multi-link', true>;
  };
}

export interface UtilitySingle extends Schema.Component {
  collectionName: 'components_utility_singles';
  info: {
    description: '';
    displayName: 'single';
  };
  attributes: {
    label: Attribute.String;
    link: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'cart.empty-cart': CartEmptyCart;
      'cart.summary': CartSummary;
      'cart.table': CartTable;
      'categories.categories': CategoriesCategories;
      'menu.cart': MenuCart;
      'menu.multiple-item': MenuMultipleItem;
      'menu.single-item': MenuSingleItem;
      'mercadopago.shipping': MercadopagoShipping;
      'mercadopago.shopper': MercadopagoShopper;
      'product.information': ProductInformation;
      'product.promises': ProductPromises;
      'promotions.promotion': PromotionsPromotion;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
      'shipping.shipping': ShippingShipping;
      'ui-utility.footer-description': UiUtilityFooterDescription;
      'ui-utility.link': UiUtilityLink;
      'ui-utility.news-letter': UiUtilityNewsLetter;
      'ui.bottom': UiBottom;
      'ui.categories': UiCategories;
      'ui.dinamic-banner': UiDinamicBanner;
      'ui.fixed-banner': UiFixedBanner;
      'ui.footer': UiFooter;
      'ui.hightlight-slider': UiHightlightSlider;
      'ui.hightlights-products': UiHightlightsProducts;
      'ui.instagram': UiInstagram;
      'ui.last-blogposts': UiLastBlogposts;
      'ui.main-banner': UiMainBanner;
      'ui.menu': UiMenu;
      'ui.mobile-information': UiMobileInformation;
      'ui.product-categories': UiProductCategories;
      'ui.testimonial': UiTestimonial;
      'ui.top-main': UiTopMain;
      'utility.column-links': UtilityColumnLinks;
      'utility.multi-link': UtilityMultiLink;
      'utility.multilink': UtilityMultilink;
      'utility.single': UtilitySingle;
    }
  }
}
