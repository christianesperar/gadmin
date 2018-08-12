(($) => {
  const $CONTAINER = $('.c-container');
  const $SIDEBAR = $('.c-sidebar');
  const $SIDEBAR_TOGGLE = $('.c-header__sidebar-toggle');
  const $FOOTER = $('.c-footer');

  $SIDEBAR_TOGGLE.on('click', () => {
    $SIDEBAR.toggleClass('c-sidebar--collapse');
    $CONTAINER.toggleClass('c-container--collapse');
    $FOOTER.toggleClass('c-footer--collapse');

    window.ClnHelper.resizeContent();
  });
})(jQuery)
