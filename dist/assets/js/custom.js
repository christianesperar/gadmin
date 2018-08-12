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
  var $PARENT_MENU_ITEM = $SIDEBAR.find('.c-sidebar__menu > .c-sidebar__menu-list > .c-sidebar__menu-item');

  window.ClnHelper.resizeContent();

  $MENU_ITEM.on('click', function (e) {
    var $element = $(e.currentTarget);
    var $submenu = $element.children('.c-sidebar__menu-list');

    if (!$submenu.length) {
      e.stopPropagation();
      return;
    }

    var $arrow = $element.find('.c-sidebar__menu-arrow').first();
    var isParentMenuItem = $element.parents(':eq(1)').hasClass('c-sidebar__menu');

    if ($submenu.is(':visible')) {
      var isSidebarCollapse = $SIDEBAR.hasClass('c-sidebar--collapse');

      if (isSidebarCollapse && isParentMenuItem) return;

      $element.removeClass('c-sidebar__menu-item--active');
      $arrow.removeClass('c-sidebar__menu-arrow--up');

      $element.find('.c-sidebar__menu-list').slideUp();
      $element.find('.c-sidebar__menu-arrow').removeClass('c-sidebar__menu-arrow--up');

      $submenu.slideUp(function () {
        window.ClnHelper.resizeContent();
      });
    } else {
      if (isParentMenuItem) {
        $MENU_ITEM.removeClass('c-sidebar__menu-item--active');
      }

      $element.addClass('c-sidebar__menu-item--active');
      $arrow.addClass('c-sidebar__menu-arrow--up');

      $submenu.slideDown(function () {
        window.ClnHelper.resizeContent();
      });
    }

    e.stopPropagation();
  });

  // Collapse
  $PARENT_MENU_ITEM.on('mouseenter', function (e) {
    var $element = $(e.currentTarget);

    if (!$SIDEBAR.hasClass('c-sidebar--collapse') || $element.hasClass('c-sidebar__menu-item--active')) return;

    var $submenu = $element.children('.c-sidebar__menu-list');
    var $arrow = $element.find('.c-sidebar__menu-arrow').first();
    var $SIDEBAR_MENU_ITEM_ACTIVE = $SIDEBAR.find('.c-sidebar__menu-item--active');

    $SIDEBAR_MENU_ITEM_ACTIVE.removeClass('c-sidebar__menu-item--active');
    $SIDEBAR_MENU_ITEM_ACTIVE.find('.c-sidebar__menu-arrow').removeClass('c-sidebar__menu-arrow--up');
    $SIDEBAR_MENU_ITEM_ACTIVE.find('.c-sidebar__menu-list').css('display', 'none');

    $element.addClass('c-sidebar__menu-item--active');

    if ($submenu.length) {
      $arrow.addClass('c-sidebar__menu-arrow--up');
      $submenu.css('display', 'block');
    }
  });

  $(window).resize(function () {
    window.ClnHelper.resizeContent();
  });
})(jQuery);