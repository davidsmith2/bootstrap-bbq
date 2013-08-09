$(function () {

    var selectors, a, ab, ai;

    selectors = {
        a: '.accordion',
        ag: '.accordion-group',
        ah: '.accordion-heading',
        ab: '.accordion-body',
        ai: '.accordion-inner',
        'in': '.in'
    };

    a = $(selectors.a);
    setInners(a.find(selectors.ab));
    ab = getHiddenBodies(a);
    ai = getInners(ab);

    setVisibility(ai, 'hidden');

    a.on({
        hidden: function () {
            var ab = getHiddenBodies($(this)),
                ai = getInners(ab);

            setVisibility(ai, 'hidden');
        },
        shown: function () {
            var ab = getShownBodies($(this)),
                ai = getInners(ab);

            setVisibility(ai, 'visible');
        }
    });

    function setInners (els) {
        $.each(els, function () {
            var el = $(this);
            if (el.find(selectors.ai).length === 0) {
                el.children().wrapAll('<div class="' + selectors.ai.slice(1) + '" />');
            }
        });
    }

    function getHiddenBodies (els) {
        return els.find(selectors.ab).not(selectors['in']);
    }

    function getShownBodies (els) {
        return els.find(selectors.ag + ' > ' + selectors['in']);
    }

    function getInners (els) {
        return els.find(selectors.ai);
    }

    function setVisibility (els, val) {
        els.css('visibility', val);
    }

});
