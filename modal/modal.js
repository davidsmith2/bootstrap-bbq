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
        click:              "click",
        hashchange:         "hashchange"
    };

    $modalLinks
        .on(events.click, "a", handleModalShow);

    $modalCloseButton
        .on(events.click, handleModalHide);

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
        var index;

        if (typeof $.bbq.getState(getModalId()) !== "undefined") {
            index = $.bbq.getState(getModalId(), true) || 0;
            $modalLinks.find("a").eq(index).trigger(events.click);
        } else {
            $modalCloseButton.trigger(events.click);
        }
    }

    function getModalId () {
        return selectors.modal.slice(1);
    }

}($, window));
