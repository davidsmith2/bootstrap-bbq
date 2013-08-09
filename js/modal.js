$(function () {
    var modals = $('.modal'),
        state = {},
        lastFocus;

    modals.on({
        show: function () {
            var modal = $(this);
            state[modal.attr('id')] = modal.index();
            $.bbq.pushState(state);
            lastFocus = document.activeElement;
            $(this).attr('tabindex', -1).focus();
        },
        hide: function () {
            $.bbq.removeState($(this).attr('id'));
            state = {};
            if (typeof lastFocus !== 'undefined') {
                lastFocus.focus();
            }
            $(this).removeAttr('tabindex');
        }
    }).trap();

    $(window).on('hashchange', function (e) {
        $.each(modals, function () {
            var modal = $(this);
            if ($.bbq.getState(modal.attr('id'))) {
                modal.modal('show');
            } else {
                modal.modal('hide');
            }
        });
    }).trigger('hashchange');

});
