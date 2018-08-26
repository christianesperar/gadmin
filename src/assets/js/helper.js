(($) => {
  const $MAIN = $('.c-main');
  const $SIDEBAR = $('.c-sidebar');
  const $HEADER = $('.c-header');
  const $FOOTER = $('.c-footer');

  window.ClnHelper = {
    resizeContent: () => {
      const height = $SIDEBAR.outerHeight() - $HEADER.outerHeight() - $FOOTER.outerHeight();

      $MAIN.css('min-height', height);
    },

    isTouchScreen: 'ontouchstart' in document.documentElement,
  };
})(jQuery)
