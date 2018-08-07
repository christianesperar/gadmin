(($) => {
  const $SIDEBAR = $('.c-sidebar');
  const $MENU_ITEM = $SIDEBAR.find('.c-sidebar__menu-item');
  const $PARENT_MENU_ITEM = $SIDEBAR.find('.c-sidebar__menu > .c-sidebar__menu-list > .c-sidebar__menu-item');

  window.ClnHelper.resizeContent();

  $MENU_ITEM.on('click', (e) => {
    const $element = $(e.currentTarget);
    const $submenu = $element.children('.c-sidebar__menu-list');

    if (!$submenu.length) {
      e.stopPropagation();
      return;
    }

    const $arrow = $element.find('.c-sidebar__menu-arrow').first();
    const isParentMenuItem = $element.parents(':eq(1)').hasClass('c-sidebar__menu');

    if ($submenu.is(':visible')) {
      const isSidebarCollapse = $SIDEBAR.hasClass('c-sidebar--collapse');

      if (isSidebarCollapse && isParentMenuItem) return;

      $element.removeClass('c-sidebar__menu-item--active');
      $arrow.removeClass('c-sidebar__menu-arrow--up');

      $element.find('.c-sidebar__menu-list').slideUp();
      $element.find('.c-sidebar__menu-arrow').removeClass('c-sidebar__menu-arrow--up');

      $submenu.slideUp(() => {
        window.ClnHelper.resizeContent();
      });
    } else {
      if (isParentMenuItem) {
        $MENU_ITEM.removeClass('c-sidebar__menu-item--active');
      }

      $element.addClass('c-sidebar__menu-item--active');
      $arrow.addClass('c-sidebar__menu-arrow--up');

      $submenu.slideDown(() => {
        window.ClnHelper.resizeContent();
      });
    }

    e.stopPropagation();
  });

  // Collapse
  $PARENT_MENU_ITEM.on('mouseenter', (e) => {
    const $element = $(e.currentTarget);

    if (!$SIDEBAR.hasClass('c-sidebar--collapse') || $element.hasClass('c-sidebar__menu-item--active')) return;

    const $submenu = $element.children('.c-sidebar__menu-list');
    const $arrow = $element.find('.c-sidebar__menu-arrow').first();
    const $SIDEBAR_MENU_ITEM_ACTIVE = $SIDEBAR.find('.c-sidebar__menu-item--active');

    $SIDEBAR_MENU_ITEM_ACTIVE.removeClass('c-sidebar__menu-item--active');
    $SIDEBAR_MENU_ITEM_ACTIVE.find('.c-sidebar__menu-arrow').removeClass('c-sidebar__menu-arrow--up');
    $SIDEBAR_MENU_ITEM_ACTIVE.find('.c-sidebar__menu-list').css('display', 'none');

    $element.addClass('c-sidebar__menu-item--active');

    if ($submenu.length) {
      $arrow.addClass('c-sidebar__menu-arrow--up');
      $submenu.css('display', 'block');
    }
  });

  $(window).resize(() => {
    window.ClnHelper.resizeContent();
  });
})(jQuery)
