(($) => {
  const $MAIN = $('.g-main');
  const $SIDEBAR = $('.g-sidebar');
  const $HEADER = $('.g-header');
  const $FOOTER = $('.g-footer');

  window.GadminHelper = {
    resizeContent: () => {
      const height = $SIDEBAR.outerHeight() - $HEADER.outerHeight() - $FOOTER.outerHeight();

      $MAIN.css('min-height', height);
    },

    isTouchScreen: 'ontouchstart' in document.documentElement,
  };
})(jQuery);
