(($) => {
  const $CONTAINER = $('.g-container');
  const $SIDEBAR = $('.g-sidebar');
  const $SIDEBAR_TOGGLE = $('.g-header__sidebar-toggle');
  const $FOOTER = $('.g-footer');

  $SIDEBAR_TOGGLE.on('click', () => {
    $SIDEBAR.toggleClass('g-sidebar--collapse');
    $CONTAINER.toggleClass('g-container--collapse');
    $FOOTER.toggleClass('g-footer--collapse');

    window.GadminHelper.resizeContent();
  });
})(jQuery);
