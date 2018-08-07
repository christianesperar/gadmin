(($) => {
  const $CONTAINER = $('.c-container');
  const $SIDEBAR = $('.c-sidebar');
  const $SIDEBAR_TOGGLE = $('.c-header__sidebar-toggle');

  $SIDEBAR_TOGGLE.on('click', () => {
    $SIDEBAR.toggleClass('c-sidebar--collapse');
    $CONTAINER.toggleClass('c-container--collapse');

    window.ClnHelper.resizeContent();
  });
})(jQuery)
