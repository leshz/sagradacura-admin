import type { Schema, Attribute } from '@strapi/strapi';

export interface CartEmptyCart extends Schema.Component {
  collectionName: 'components_cart_empty_carts';
  info: {
    displayName: 'empty_cart';
    icon: 'brush';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    image: Attribute.Media & Attribute.Required;
    button: Attribute.String;
  };
}

export interface CartSummary extends Schema.Component {
  collectionName: 'components_cart_summaries';
  info: {
    displayName: 'summary';
    icon: 'restaurant';
    description: '';
  };
  attributes: {
    cart_total: Attribute.String;
    summary: Attribute.String;
    total: Attribute.String;
    go_checkout: Attribute.String;
  };
}

export interface CartTable extends Schema.Component {
  collectionName: 'components_cart_tables';
  info: {
    displayName: 'table';
    icon: 'bulletList';
  };
  attributes: {
    product: Attribute.String;
    quantity: Attribute.String;
    price: Attribute.String;
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
    title: Attribute.String;
    all_products: Attribute.String;
  };
}

export interface MenuCart extends Schema.Component {
  collectionName: 'components_menu_carts';
  info: {
    displayName: 'cart';
    icon: 'cast';
  };
  attributes: {
    sub_total: Attribute.String & Attribute.Required;
    discount: Attribute.String & Attribute.Required;
    continue_shopping: Attribute.String & Attribute.Required;
    got_checkout: Attribute.String & Attribute.Required;
  };
}

export interface MenuMultipleItem extends Schema.Component {
  collectionName: 'components_menu_multiple_items';
  info: {
    displayName: 'multiple';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    multiple: Attribute.Component<'ui-utility.link', true>;
  };
}

export interface MenuSingleItem extends Schema.Component {
  collectionName: 'components_menu_single_items';
  info: {
    displayName: 'single';
    icon: 'filter';
    description: '';
  };
  attributes: {
    single: Attribute.Component<'ui-utility.link'>;
  };
}

export interface ProductInformation extends Schema.Component {
  collectionName: 'components_product_information';
  info: {
    displayName: 'information';
    icon: 'bell';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    information: Attribute.Blocks & Attribute.Required;
  };
}

export interface ProductPromises extends Schema.Component {
  collectionName: 'components_product_promises';
  info: {
    displayName: 'Promises';
    description: '';
  };
  attributes: {
    icon: Attribute.Enumeration<['bi-truck', 'bi-box2-heart']>;
    message: Attribute.Blocks;
  };
}

export interface PromotionsPromotion extends Schema.Component {
  collectionName: 'components_promotions_promotions';
  info: {
    displayName: 'Promotion';
    icon: 'walk';
    description: '';
  };
  attributes: {
    with_discount: Attribute.Boolean & Attribute.DefaultTo<false>;
    price_with_discount: Attribute.Integer;
    recommended: Attribute.Boolean & Attribute.DefaultTo<false>;
    best_seller: Attribute.Boolean & Attribute.DefaultTo<false>;
    new: Attribute.Boolean & Attribute.DefaultTo<false>;
    discount_tag: Attribute.String;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
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

export interface UiHightlightSlider extends Schema.Component {
  collectionName: 'components_ui_hightlight_sliders';
  info: {
    displayName: 'hightlight_slider';
    icon: 'command';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Blocks;
    image: Attribute.Media;
    link: Attribute.String;
    button: Attribute.String;
  };
}

export interface UiHightlightsProducts extends Schema.Component {
  collectionName: 'components_ui_hightlights_products';
  info: {
    displayName: 'hightlights_products';
    icon: 'bell';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    highlight_slider: Attribute.Component<'ui.hightlight-slider', true>;
  };
}

export interface UiInstagram extends Schema.Component {
  collectionName: 'components_ui_instagrams';
  info: {
    displayName: 'instagram';
    icon: 'crown';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    subtitle: Attribute.String & Attribute.Required;
    profile_url: Attribute.String & Attribute.Required;
    feed: Attribute.Media & Attribute.Required;
  };
}

export interface UiLastBlogposts extends Schema.Component {
  collectionName: 'components_ui_last_blogposts';
  info: {
    displayName: 'last_blogposts';
    icon: 'archive';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    get_last: Attribute.Integer & Attribute.DefaultTo<2>;
    sub_title: Attribute.String;
    read_more: Attribute.String;
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
    mobile: Attribute.Component<'ui.mobile-information'>;
    cart_menu: Attribute.Component<'menu.cart'>;
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
    displayName: 'topMain';
    icon: 'database';
    description: '';
  };
  attributes: {
    title: Attribute.String;
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
    displayName: 'single';
    description: '';
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
      'product.information': ProductInformation;
      'product.promises': ProductPromises;
      'promotions.promotion': PromotionsPromotion;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
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
