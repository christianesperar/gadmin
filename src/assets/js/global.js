(($) => {
  $('[data-toggle="tooltip"]').tooltip({
    template: `<div class="c-sidebar__tooltip tooltip" role="tooltip">
                 <div class="arrow"></div><div class="tooltip-inner"></div>
               </div>`,
  });
})(jQuery)
