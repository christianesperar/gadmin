($ => {
  const $MAIN = $('.g-main');
  const $SIDEBAR = $('.g-sidebar');
  const $HEADER = $('.g-header');
  const $FOOTER = $('.g-footer');
  const CURRENT_URL = window.location.href.split('#')[0].split('?')[0];

  window.GadminHelper = {
    resizeContent: () => {
      const height = $SIDEBAR.outerHeight() - $HEADER.outerHeight() - $FOOTER.outerHeight();

      $MAIN.css('min-height', height);
    },

    isTouchScreen: 'ontouchstart' in document.documentElement,

    trimUrl: href =>
      href
        .replace('.html', '')
        .replace('index', '')
        .replace(/\/$/, ''),

    isCurrentUrl: href => {
      const trimHref = window.GadminHelper.trimUrl(href);
      const trimCurrentUrl = window.GadminHelper.trimUrl(CURRENT_URL);

      return trimHref === trimCurrentUrl;
    }
  };
})(jQuery);
