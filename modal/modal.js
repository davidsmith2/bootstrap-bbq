$(function ($, window) {

    var selectors,
        $modal,
        $modalBodies,
        $modalLinks,
        $modalCloseButton,
        events;

    selectors = {
        modal:              "#modal",
        modalBodies:        ".modal-body > div",
        modalCloseButton:   ".modal-header .close",
        modalLinks:         "#modal-links"
    };

    $modal                   = $(selectors.modal);
    $modalBodies             = $(selectors.modalBodies);
    $modalLinks              = $(selectors.modalLinks);
    $modalCloseButton        = $(selectors.modalCloseButton);

    events = {
        hashchange:         "hashchange"
    };

    $modalLinks
        .on("click", "a", handleModalShow);

    $modalCloseButton
        .on("click", handleModalHide);

    $(window)
        .on(events.hashchange, handleHashChange)
        .trigger(events.hashchange);

    function handleModalShow (e) {
        var index = $(e.target).index();

        e.preventDefault();
        showModal(index);
        pushState(index);
    }

    function showModal (index) {
        var $modalBody;

        $modalBodies.not(":eq(index)").hide();
        $modalBody = $modalBodies.eq(index).show();
        $modal.modal("show");
    }

    function pushState (index) {
        var state = {};

        state[getModalId()] = index;
        $.bbq.pushState(state);
    }

    function handleModalHide (e) {
        e.preventDefault();
        hideModal();
        removeState();
    }

    function hideModal () {
        $modal.modal("hide");
    }

    function removeState () {
        $.bbq.removeState(getModalId());
    }

    function handleHashChange () {
        if (typeof $.bbq.getState(getModalId()) !== "undefined") {
            $modalLinks.each(function () {
                var index = $.bbq.getState(getModalId(), true) || 0;
                $(this).find("a").eq(index).trigger("click");
            });
        } else {
            $modalCloseButton.trigger("click");
        }
    }

    function getModalId () {
        return selectors.modal.slice(1);
    }

}($, window));
