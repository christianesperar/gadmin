(($) => {
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

    isCurrentUrl: href => href === CURRENT_URL || CURRENT_URL.indexOf(`${href}index`) > -1 || href.indexOf(`${CURRENT_URL}index`) > -1,
  };
})(jQuery);
