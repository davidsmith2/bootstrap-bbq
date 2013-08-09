$(function () {
    var modals = $('.modal'),
        state = {},
        lastFocus;
    modals
        .on({
            show: function () {
                // save a reference to the current modal
                var modal = $(this);
                // update the state object for history tracking
                // key = id of modal, value = modal's position in DOM in relation to its siblings
                state[modal.attr('id')] = modal.index();
                // add the state to history tracking
                $.bbq.pushState(state);
                // save a reference to the element that toggled the modal
                lastFocus = document.activeElement;
                // make the modal focusable and focus on it
                $(this).attr('tabindex', -1).focus();
            },
            hide: function () {
                // remove the state from history tracking
                $.bbq.removeState($(this).attr('id'));
                // empty the state object
                state = {};
                // return focus to the element that toggled the modal
                if (typeof lastFocus !== 'undefined') {
                    lastFocus.focus();
                }
                // make the modal unfocusable
                $(this).removeAttr('tabindex');
            }
        })
        .trap();
    $(window)
        .on('hashchange', function (e) {
            console.log(e);
            // cycle through all modals
            $.each(modals, function () {
                // save a reference to the current modal
                var modal = $(this);
                // if a valid history state is found, show the modal, otherwise hide it
                if ($.bbq.getState(modal.attr('id'))) {
                    modal.modal('show');
                } else {
                    modal.modal('hide');
                }
            });
        })
        .trigger('hashchange');
});
