$(function () {

    var sels, accs;

    sels = {
        acc:            '.accordion',
        accGroup:       '.accordion-group',
        accHeading:     '.accordion-heading',
        accBody:        '.accordion-body',
        accInner:       '.accordion-inner'
    };

    accs = $(sels.acc);

    setAccInners(accs.find(sels.accBody));
    initAcc();

    accs.on({
        hidden: function () {
            var accBodies = getAccBodiesHidden($(this)),
                accInners = getAccInners(accBodies);

            setVisibility(accInners, 'hidden');
        },
        shown: function () {
            var accBodies = getAccBodiesShown($(this)),
                accInners = getAccInners(accBodies);

            setVisibility(accInners, 'visible');
        }
    });

    function setAccInners (els) {
        $.each(els, function () {
            var el = $(this);
            if (el.find(sels.accInner).length === 0) {
                el.children().wrapAll('<div class="' + sels.accInner.slice(1) + '" />');
            }
        });
    }

    function initAcc () {
        var accBodies = getAccBodiesHidden(accs),
            accInners = getAccInners(accBodies);

        setVisibility(accInners, 'hidden');
    }

    function getAccBodiesHidden (els) {
        return els.find(sels.accBody).not('.in');
    }

    function getAccBodiesShown (els) {
        return els.find(sels.accGroup + ' > .in');
    }

    function getAccInners (els) {
        return els.find(sels.accInner);
    }

    function setVisibility (els, val) {
        els.css('visibility', val);
    }

});
