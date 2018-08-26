(($) => {
  const $SIDEBAR = $('.c-sidebar');
  const $MENU_ITEM = $SIDEBAR.find('.c-sidebar__menu-item');
  const $MENU_LINK = $SIDEBAR.find('.c-sidebar__menu-link');
  const $PARENT_MENU_ITEM = $SIDEBAR.find('.c-sidebar__menu > .c-sidebar__menu-list > .c-sidebar__menu-item');
  const ms = window.ClnHelper.isTouchScreen ? 200 : 0;

  /**
  * Collapse and mobile
  * Store current event to `bubbling` to fix issue where `mouseenter` and `click`
  * are both triggered on mobile
  */
  let bubbling;

  const isSidebarCollapse = () => $SIDEBAR.hasClass('c-sidebar--collapse');
  const resizeContent = () => window.ClnHelper.resizeContent();

  /**
   * Search for the current link and add `active` and `selected` class to parent menu item
   * Please note that this is ideally handle by server side rendering
   */
  $MENU_LINK
    .filter((index, element) => element.href === window.location.href.split('#')[0].split('?')[0])
    .parents('.c-sidebar__menu-item:eq(0), .c-sidebar__menu-item:eq(1), .c-sidebar__menu-item:eq(2)')
    .addClass('c-sidebar__menu-item--active c-sidebar__menu-item--selected');

  // Add arrow if multilevel menu
  $MENU_ITEM.has('.c-sidebar__menu-list').addClass('c-sidebar__menu-item--arrow');

  $MENU_ITEM.on('click touchstart', (e) => {
    e.stopPropagation();

    clearTimeout(bubbling);

    bubbling = setTimeout(() => {
      const $element = $(e.currentTarget);
      const $submenu = $element.children('.c-sidebar__menu-list');

      if (!$submenu.length) return;

      const isParentMenuItem = $element.parents(':eq(1)').hasClass('c-sidebar__menu');

      if ($submenu.is(':visible')) {
        if (isSidebarCollapse() && isParentMenuItem) return;

        $element.removeClass('c-sidebar__menu-item--active');

        $element.children('.c-sidebar__menu-list').slideUp();

        $submenu.slideUp(resizeContent);
      } else {
        if (!isSidebarCollapse() && isParentMenuItem) {
          $MENU_ITEM.removeClass('c-sidebar__menu-item--active');
          $MENU_ITEM.children('.c-sidebar__menu-list').slideUp(resizeContent);
        }

        $element.addClass('c-sidebar__menu-item--active');

        if (!isSidebarCollapse() || !isParentMenuItem) {
          $submenu.slideDown(resizeContent);
        }
      }
    }, ms);
  });

  $PARENT_MENU_ITEM.on('mouseenter click touchstart', (e) => {
    e.stopPropagation();
    if (!isSidebarCollapse()) return;

    clearTimeout(bubbling);

    bubbling = setTimeout(() => {
      const $element = $(e.currentTarget);

      if ($element.hasClass('c-sidebar__menu-item--toggle')) {
        $element.removeClass('c-sidebar__menu-item--toggle');
      } else {
        const $submenu = $element.children('.c-sidebar__menu-list');
        const $SIDEBAR_MENU_ITEM_ACTIVE = $PARENT_MENU_ITEM.filter('.c-sidebar__menu-item--active').not($element);

        if ($SIDEBAR_MENU_ITEM_ACTIVE.length) {
          $MENU_ITEM.removeClass('c-sidebar__menu-item--active  c-sidebar__menu-item--toggle');
          $MENU_ITEM.children('.c-sidebar__menu-list').css('display', 'none');
        }

        $element.addClass('c-sidebar__menu-item--active c-sidebar__menu-item--toggle');

        if ($submenu.length) {
          $submenu.css('display', 'block');
        }
      }
    }, ms);
  });

  $PARENT_MENU_ITEM.on('mouseleave', (e) => {
    if (!isSidebarCollapse()) return;

    $(e.currentTarget).removeClass('c-sidebar__menu-item--toggle');
  });

  $(window).on('touchstart', () => {
    if (!isSidebarCollapse() || !window.ClnHelper.isTouchScreen) return;

    $MENU_ITEM.filter('.c-sidebar__menu-item--toggle').removeClass('c-sidebar__menu-item--toggle');
  });

  /**
   * Resize content on load and when resizing window
   */
  resizeContent();

  $(window).resize(resizeContent);
})(jQuery)
