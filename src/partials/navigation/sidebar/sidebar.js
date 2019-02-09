(($) => {
  const $SIDEBAR = $('.g-sidebar');
  const $MENU_ITEM = $SIDEBAR.find('.g-sidebar__menu-item');
  const $MENU_LINK = $SIDEBAR.find('.g-sidebar__menu-link');
  const $PARENT_MENU_ITEM = $SIDEBAR.find('.g-sidebar__menu > .g-sidebar__menu-list > .g-sidebar__menu-item');
  const MS = window.GadminHelper.isTouchScreen ? 200 : 0;

  const isSidebarCollapse = () => $SIDEBAR.hasClass('g-sidebar--collapse');
  const resizeContent = () => window.GadminHelper.resizeContent();

  /**
   * Remove the active state of the menu items except the menu that has the current url
   */
  const removeActiveMenuItems = () => {
    $MENU_LINK
      .filter((index, element) => !window.GadminHelper.isCurrentUrl(element.href))
      .parent()
      .removeClass('g-sidebar__menu-item--active g-sidebar__menu-item--toggle');
  };

  /**
  * Collapse and mobile
  * Store current event to `bubbling` to fix issue where `mouseenter` and `click`
  * are both triggered on mobile
  */
  let bubbling;

  /**
   * Search for the current link and add `active` and `selected` class to parent menu item
   * Please note that this is ideally handle by server side rendering
   */
  $MENU_LINK
    .filter((index, element) => {
      if (!element.href) {
        return false;
      }

      return window.GadminHelper.isCurrentUrl(element.href);
    })
    .parents('.g-sidebar__menu-item:eq(0), .g-sidebar__menu-item:eq(1), .g-sidebar__menu-item:eq(2)')
    .addClass('g-sidebar__menu-item--active g-sidebar__menu-item--selected');

  // Add arrow if multilevel menu
  $MENU_ITEM.has('.g-sidebar__menu-list').addClass('g-sidebar__menu-item--arrow');

  $MENU_ITEM.on('click touchstart', (e) => {
    e.stopPropagation();

    clearTimeout(bubbling);

    bubbling = setTimeout(() => {
      const $element = $(e.currentTarget);
      const $submenu = $element.children('.g-sidebar__menu-list');

      if (!$submenu.length) return;

      const isParentMenuItem = $element.parents(':eq(1)').hasClass('g-sidebar__menu');

      if ($submenu.is(':visible')) {
        if (isSidebarCollapse() && isParentMenuItem) return;

        $element.removeClass('g-sidebar__menu-item--active');

        $element.children('.g-sidebar__menu-list').slideUp();

        $submenu.slideUp(resizeContent);
      } else {
        if (!isSidebarCollapse() && isParentMenuItem) {
          removeActiveMenuItems();
          $MENU_ITEM.children('.g-sidebar__menu-list').slideUp(resizeContent);
        }

        $element.addClass('g-sidebar__menu-item--active');

        if (!isSidebarCollapse() || !isParentMenuItem) {
          $submenu.slideDown(resizeContent);
        }
      }
    }, MS);
  });

  $PARENT_MENU_ITEM.on('mouseenter click touchstart', (e) => {
    e.stopPropagation();
    if (!isSidebarCollapse()) return;

    clearTimeout(bubbling);

    bubbling = setTimeout(() => {
      const $element = $(e.currentTarget);

      if ($element.hasClass('g-sidebar__menu-item--toggle')) {
        $element.removeClass('g-sidebar__menu-item--toggle');
      } else {
        const $submenu = $element.children('.g-sidebar__menu-list');
        const $SIDEBAR_MENU_ITEM_ACTIVE = $PARENT_MENU_ITEM.filter('.g-sidebar__menu-item--active').not($element);

        if ($SIDEBAR_MENU_ITEM_ACTIVE.length) {
          removeActiveMenuItems();
          $MENU_ITEM.children('.g-sidebar__menu-list').css('display', 'none');
        }

        $element.addClass('g-sidebar__menu-item--active g-sidebar__menu-item--toggle');

        if ($submenu.length) {
          $submenu.css('display', 'block');
        }
      }
    }, MS);
  });

  $PARENT_MENU_ITEM.on('mouseleave', (e) => {
    if (!isSidebarCollapse()) return;

    $(e.currentTarget).removeClass('g-sidebar__menu-item--toggle');
  });

  $(window).on('touchstart', () => {
    if (!isSidebarCollapse() || !window.GadminHelper.isTouchScreen) return;

    $MENU_ITEM.filter('.g-sidebar__menu-item--toggle').removeClass('g-sidebar__menu-item--toggle');
  });

  /**
   * Resize content on load and when resizing window
   */
  resizeContent();

  $(window).resize(resizeContent);
})(jQuery);
