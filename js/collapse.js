(function ($, document) {

    $(document).ready(handleDocumentReady);

    function handleDocumentReady () {
        var accordions = $('.accessify'),
            accessify, option;

        if (accordions[0]) {
            accessify = accordions.data('accessify');
            option = (accessify) ? true : accordions.data();
            accordions.accessify(option);
        } else {
            console.log("You've decided not to accessify this accordion. Furry muff.");
        }
    }

    $.fn.accessify = function (option) {
        return this.each(handleAccessify);
    };

    $.fn.accessify.defaults = {
        selectors: {
            accordion:          '.concertina',
            accordionGroup:     '.accordion-group',
            accordionHeading:   '.accordion-heading',
            accordionBody:      '.accordion-body',
            accordionInner:     '.accordion-inner'
        },
        focus: true
    };

    function handleAccessify () {
        var $this = $(this),
            data = $this.data('accessify'),
            options = $.extend({}, $.fn.accessify.defaults, $this.data(), typeof option === 'object' && options);

        if (!data) {
            $this.data('accessify', (data = new Accessify(this, options)));
        }

        if (typeof options === 'string') {
            data[option]();
        }
    }

    function Accessify (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.accessify.defaults, options);

        if (this.options.focus) {
            this.focus();
        }
    }

    Accessify.prototype = {

        constructor: Accessify,

        focus: function () {
            var selectors = this.options.selectors,
                that = this,
                events, accordion, accordionBodies;

            events = {
                hidden: function () {
                    var accordionBodies = that.getHiddenAccordionBodies($(this)),
                        accordionInners = that.getAccordionInners(accordionBodies);

                    that.setVisibility(accordionInners, 'hidden');
                },
                shown: function () {
                    var accordionBodies = that.getShownAccordionBodies($(this)),
                        accordionInners = that.getAccordionInners(accordionBodies);

                    that.setVisibility(accordionInners, 'visible');
                }
            };

            accordion = this.$element.on(events);
            accordionBodies = accordion.find(selectors.accordionBody);
            this.setAccordionInners(accordionBodies, selectors);
            this.initAccordion(accordion);
        },

        setAccordionInners: function (accordionBodies) {
            var that = this;
            $.each(accordionBodies, function () {
                var accordionBody = $(this),
                    selectors = that.options.selectors;

                if (!accordionBody.find(selectors.accordionInner)[0]) {
                    accordionBody.children().wrapAll('<div class="' + selectors.accordionInner.slice(1) + '" />');
                }
            });
        },

        initAccordion: function (accordion) {
            var accordionBodies = this.getHiddenAccordionBodies(accordion),
                accordionInners = this.getAccordionInners(accordionBodies);

            this.setVisibility(accordionInners, 'hidden');
        },

        getHiddenAccordionBodies: function (accordion) {
            return accordion.find(this.options.selectors.accordionBody).not('.in');
        },

        getShownAccordionBodies: function (accordion) {
            return accordion.find(this.options.selectors.accordionGroup + ' > .in');
        },

        getAccordionInners: function (accordionBodies) {
            return accordionBodies.find(this.options.selectors.accordionInner);
        },

        setVisibility: function (accordionInners, value) {
            accordionInners.css('visibility', value);
        }

    };

}(jQuery, document));
