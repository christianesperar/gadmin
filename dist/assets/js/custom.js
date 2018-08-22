'use strict';

(function ($) {
  $('[data-toggle="tooltip"]').tooltip();
})(jQuery);
'use strict';

(function ($) {
  var $MAIN = $('.c-main');
  var $SIDEBAR = $('.c-sidebar');
  var $HEADER = $('.c-header');
  var $FOOTER = $('.c-footer');

  window.ClnHelper = {
    resizeContent: function resizeContent() {
      var height = $SIDEBAR.outerHeight() - $HEADER.outerHeight() - $FOOTER.outerHeight();

      $MAIN.css('min-height', height);
    }
  };
})(jQuery);
'use strict';

(function ($) {
  var $CONTAINER = $('.c-container');
  var $SIDEBAR = $('.c-sidebar');
  var $SIDEBAR_TOGGLE = $('.c-header__sidebar-toggle');
  var $FOOTER = $('.c-footer');

  $SIDEBAR_TOGGLE.on('click', function () {
    $SIDEBAR.toggleClass('c-sidebar--collapse');
    $CONTAINER.toggleClass('c-container--collapse');
    $FOOTER.toggleClass('c-footer--collapse');

    window.ClnHelper.resizeContent();
  });
})(jQuery);
'use strict';

(function ($) {
  var $SIDEBAR = $('.c-sidebar');
  var $MENU_ITEM = $SIDEBAR.find('.c-sidebar__menu-item');
  var $MENU_LINK = $SIDEBAR.find('.c-sidebar__menu-link');
  var $PARENT_MENU_ITEM = $SIDEBAR.find('.c-sidebar__menu > .c-sidebar__menu-list > .c-sidebar__menu-item');

  var isSidebarCollapse = function isSidebarCollapse() {
    return $SIDEBAR.hasClass('c-sidebar--collapse');
  };
  var resizeContent = function resizeContent() {
    return window.ClnHelper.resizeContent();
  };

  /**
   * Search for the current link and add `active` and `selected` class to parent menu item
   * Please note that this is ideally handle by server side rendering
   */
  $MENU_LINK.filter(function (index, element) {
    return element.href === window.location.href.split('#')[0].split('?')[0];
  }).parents('.c-sidebar__menu-item:eq(0), .c-sidebar__menu-item:eq(1), .c-sidebar__menu-item:eq(2)').addClass('c-sidebar__menu-item--active c-sidebar__menu-item--selected');

  // Add arrow if multilevel menu
  $MENU_ITEM.has('.c-sidebar__menu-list').addClass('c-sidebar__menu-item--arrow');

  $MENU_ITEM.on('click', function (e) {
    e.stopPropagation();

    var $element = $(e.currentTarget);
    var $submenu = $element.children('.c-sidebar__menu-list');

    if (!$submenu.length) return;

    var isParentMenuItem = $element.parents(':eq(1)').hasClass('c-sidebar__menu');

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
  });

  /**
   * Collapse and mobile
   * Store current event to `bubbling` to fix issue where `mouseenter` and `click`
   * are both triggered on mobile
   */
  var bubbling = void 0;

  $PARENT_MENU_ITEM.on('mouseenter click', function (e) {
    e.stopPropagation();

    if (!isSidebarCollapse()) return;

    clearTimeout(bubbling);

    bubbling = setTimeout(function () {
      var $element = $(e.currentTarget);

      if ($element.hasClass('c-sidebar__menu-item--toggle')) {
        $element.removeClass('c-sidebar__menu-item--toggle');
      } else {
        var $submenu = $element.children('.c-sidebar__menu-list');
        var $SIDEBAR_MENU_ITEM_ACTIVE = $PARENT_MENU_ITEM.filter('.c-sidebar__menu-item--active').not($element);

        if ($SIDEBAR_MENU_ITEM_ACTIVE.length) {
          $MENU_ITEM.removeClass('c-sidebar__menu-item--active  c-sidebar__menu-item--toggle');
          $MENU_ITEM.children('.c-sidebar__menu-list').css('display', 'none');
        }

        $element.addClass('c-sidebar__menu-item--active c-sidebar__menu-item--toggle');

        if ($submenu.length) {
          $submenu.css('display', 'block');
        }
      }
    }, 200);
  });

  $PARENT_MENU_ITEM.on('mouseleave', function (e) {
    if (!isSidebarCollapse()) return;

    $(e.currentTarget).removeClass('c-sidebar__menu-item--toggle');
  });

  /**
   * Resize content on load and when resizing window
   */
  resizeContent();

  $(window).resize(resizeContent);
})(jQuery);