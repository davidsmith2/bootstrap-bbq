jQuery(function ($, window, document) {
    var selectors,
        $modal,
        $modalCloseButton,
        $modalLinks,
        lastFocus,
        events;

    selectors = {
        modal:              "#modal",
        modalBodies:        ".modal-body > div",
        modalCloseButton:   ".modal-header .close",
        modalLinks:         "#modal-links"
    };

    $modal                   = $(selectors.modal);
    $modalCloseButton        = $(selectors.modalCloseButton);
    $modalLinks              = $(selectors.modalLinks);

    events = {
        click:              "click",
        hashchange:         "hashchange"
    };

    $modal
        .attr("tabindex", -1).focus();

    $modalLinks
        .on(events.click, "a", handleModalShow);

    $modalCloseButton
        .on(events.click, handleModalHide);

    $(window)
        .on(events.hashchange, handleHashChange)
        .trigger(events.hashchange);

    $(document).on("focus", handleDocumentFocus);

    function handleModalShow (e) {
        var index = $(e.target).index();

        e.preventDefault();
        setLastFocus();
        showModal(index);
        pushState(index);
    }

    function showModal (index) {
        var $modalBodies = $(selectors.modalBodies);

        $modalBodies.not(":eq(index)").hide();
        $modalBodies.eq(index).show();
        $modal.modal({
            keyboard: true,
            show: true
        });
    }

    function pushState (index) {
        var state = {};

        state[getModalId()] = index;
        $.bbq.pushState(state);
    }

    function handleModalHide (e) {
        e.preventDefault();
        restoreLastFocus();
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

    function handleDocumentFocus (e) {
        if (isModalOpen() && !isElementInModal(e.target)) {
            e.stopPropagation();
            $modal.focus();
        }
    }

    function isModalOpen () {
        return $modal.hasClass("in");
    }

    function isElementInModal (target) {
        $.contains($modal, target);
    }

    function setLastFocus () {
        lastFocus = document.activeElement;
    }

    function restoreLastFocus () {
        if (typeof lastFocus !== "undefined") {
            lastFocus.focus();
        }
    }

}(jQuery, this, document));
