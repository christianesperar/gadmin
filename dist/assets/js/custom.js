'use strict';

(function ($) {
  $('[data-toggle="tooltip"]').tooltip();
})(jQuery);
'use strict';

(function ($) {
  var $MAIN = $('.g-main');
  var $SIDEBAR = $('.g-sidebar');
  var $HEADER = $('.g-header');
  var $FOOTER = $('.g-footer');

  window.ClnHelper = {
    resizeContent: function resizeContent() {
      var height = $SIDEBAR.outerHeight() - $HEADER.outerHeight() - $FOOTER.outerHeight();

      $MAIN.css('min-height', height);
    },

    isTouchScreen: 'ontouchstart' in document.documentElement
  };
})(jQuery);
'use strict';

(function ($) {
  var $CONTAINER = $('.g-container');
  var $SIDEBAR = $('.g-sidebar');
  var $SIDEBAR_TOGGLE = $('.g-header__sidebar-toggle');
  var $FOOTER = $('.g-footer');

  $SIDEBAR_TOGGLE.on('click', function () {
    $SIDEBAR.toggleClass('g-sidebar--collapse');
    $CONTAINER.toggleClass('g-container--collapse');
    $FOOTER.toggleClass('g-footer--collapse');

    window.ClnHelper.resizeContent();
  });
})(jQuery);
'use strict';

(function ($) {
  var $SIDEBAR = $('.g-sidebar');
  var $MENU_ITEM = $SIDEBAR.find('.g-sidebar__menu-item');
  var $MENU_LINK = $SIDEBAR.find('.g-sidebar__menu-link');
  var $PARENT_MENU_ITEM = $SIDEBAR.find('.g-sidebar__menu > .g-sidebar__menu-list > .g-sidebar__menu-item');
  var ms = window.ClnHelper.isTouchScreen ? 200 : 0;

  /**
  * Collapse and mobile
  * Store current event to `bubbling` to fix issue where `mouseenter` and `click`
  * are both triggered on mobile
  */
  var bubbling = void 0;

  var isSidebarCollapse = function isSidebarCollapse() {
    return $SIDEBAR.hasClass('g-sidebar--collapse');
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
  }).parents('.g-sidebar__menu-item:eq(0), .g-sidebar__menu-item:eq(1), .g-sidebar__menu-item:eq(2)').addClass('g-sidebar__menu-item--active g-sidebar__menu-item--selected');

  // Add arrow if multilevel menu
  $MENU_ITEM.has('.g-sidebar__menu-list').addClass('g-sidebar__menu-item--arrow');

  $MENU_ITEM.on('click touchstart', function (e) {
    e.stopPropagation();

    clearTimeout(bubbling);

    bubbling = setTimeout(function () {
      var $element = $(e.currentTarget);
      var $submenu = $element.children('.g-sidebar__menu-list');

      if (!$submenu.length) return;

      var isParentMenuItem = $element.parents(':eq(1)').hasClass('g-sidebar__menu');

      if ($submenu.is(':visible')) {
        if (isSidebarCollapse() && isParentMenuItem) return;

        $element.removeClass('g-sidebar__menu-item--active');

        $element.children('.g-sidebar__menu-list').slideUp();

        $submenu.slideUp(resizeContent);
      } else {
        if (!isSidebarCollapse() && isParentMenuItem) {
          $MENU_LINK.filter(function (index, element) {
            return element.href !== window.location.href.split('#')[0].split('?')[0];
          }).parent().removeClass('g-sidebar__menu-item--active');

          $MENU_ITEM.children('.g-sidebar__menu-list').slideUp(resizeContent);
        }

        $element.addClass('g-sidebar__menu-item--active');

        if (!isSidebarCollapse() || !isParentMenuItem) {
          $submenu.slideDown(resizeContent);
        }
      }
    }, ms);
  });

  $PARENT_MENU_ITEM.on('mouseenter click touchstart', function (e) {
    e.stopPropagation();
    if (!isSidebarCollapse()) return;

    clearTimeout(bubbling);

    bubbling = setTimeout(function () {
      var $element = $(e.currentTarget);

      if ($element.hasClass('g-sidebar__menu-item--toggle')) {
        $element.removeClass('g-sidebar__menu-item--toggle');
      } else {
        var $submenu = $element.children('.g-sidebar__menu-list');
        var $SIDEBAR_MENU_ITEM_ACTIVE = $PARENT_MENU_ITEM.filter('.g-sidebar__menu-item--active').not($element);

        if ($SIDEBAR_MENU_ITEM_ACTIVE.length) {
          $MENU_ITEM.removeClass('g-sidebar__menu-item--active  g-sidebar__menu-item--toggle');
          $MENU_ITEM.children('.g-sidebar__menu-list').css('display', 'none');
        }

        $element.addClass('g-sidebar__menu-item--active g-sidebar__menu-item--toggle');

        if ($submenu.length) {
          $submenu.css('display', 'block');
        }
      }
    }, ms);
  });

  $PARENT_MENU_ITEM.on('mouseleave', function (e) {
    if (!isSidebarCollapse()) return;

    $(e.currentTarget).removeClass('g-sidebar__menu-item--toggle');
  });

  $(window).on('touchstart', function () {
    if (!isSidebarCollapse() || !window.ClnHelper.isTouchScreen) return;

    $MENU_ITEM.filter('.g-sidebar__menu-item--toggle').removeClass('g-sidebar__menu-item--toggle');
  });

  /**
   * Resize content on load and when resizing window
   */
  resizeContent();

  $(window).resize(resizeContent);
})(jQuery);