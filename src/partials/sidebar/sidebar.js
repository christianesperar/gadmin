(($) => {
  const $SIDEBAR = $('.c-sidebar');
  const $MENU_ITEM = $SIDEBAR.find('.c-sidebar__menu-item');
  const $MENU_LINK = $SIDEBAR.find('.c-sidebar__menu-link');
  const $PARENT_MENU_ITEM = $SIDEBAR.find('.c-sidebar__menu > .c-sidebar__menu-list > .c-sidebar__menu-item');

  window.ClnHelper.resizeContent();

  // Search for the current link and add active and selected class to parent menu item
  $MENU_LINK
    .filter((index, element) => element.href === window.location.href.split('#')[0].split('?')[0])
    .parents(':eq(2), :eq(4)').addClass('c-sidebar__menu-item--active c-sidebar__menu-item--selected');

  $MENU_ITEM.on('click', (e) => {
    const $element = $(e.currentTarget);
    const $submenu = $element.children('.c-sidebar__menu-list');

    if (!$submenu.length) {
      e.stopPropagation();
      return;
    }

    const isParentMenuItem = $element.parents(':eq(1)').hasClass('c-sidebar__menu');

    if ($submenu.is(':visible')) {
      const isSidebarCollapse = $SIDEBAR.hasClass('c-sidebar--collapse');

      if (isSidebarCollapse && isParentMenuItem) return;

      $element.removeClass('c-sidebar__menu-item--active');

      $element.find('.c-sidebar__menu-list').slideUp();

      $submenu.slideUp(() => {
        window.ClnHelper.resizeContent();
      });
    } else {
      if (isParentMenuItem) {
        $MENU_ITEM.removeClass('c-sidebar__menu-item--active');
      }

      $element.addClass('c-sidebar__menu-item--active');

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
    const $SIDEBAR_MENU_ITEM_ACTIVE = $SIDEBAR.find('.c-sidebar__menu-item--active');

    $SIDEBAR_MENU_ITEM_ACTIVE.removeClass('c-sidebar__menu-item--active');
    $SIDEBAR_MENU_ITEM_ACTIVE.find('.c-sidebar__menu-list').css('display', 'none');

    $element.addClass('c-sidebar__menu-item--active');

    if ($submenu.length) {
      $submenu.css('display', 'block');
    }
  });

  $(window).resize(() => {
    window.ClnHelper.resizeContent();
  });
})(jQuery)
