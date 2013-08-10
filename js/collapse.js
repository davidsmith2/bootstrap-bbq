;(function ($, window, document, undefined) {

    var pluginName = 'accessify',
        defaults = {
            selectors: {
                accordion:              '.accordion',
                accordionGroup:         '.accordion-group',
                accordionHeading:       '.accordion-heading',
                accordionBody:          '.accordion-body',
                accordionInner:         '.accordion-inner',
                accordionBodyShown:     '.in'
            },
            focus: true
        };

    /* PUBLIC CLASS DEFINITION
     * ======================= */

    function Plugin (element, options) {
        this.$element = $(element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        if (this.settings.focus) {
            this.focus();
        }
    }

    Plugin.prototype = {
        constructor: Plugin,

        focus: function () {
            var selectors = this.settings.selectors,
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
            this.setAccordionInners(accordionBodies);
            this.initAccordion(accordion);
        },

        setAccordionInners: function (accordionBodies) {
            var that = this;
            $.each(accordionBodies, function () {
                var accordionBody = $(this);

                if (!accordionBody.find(that.settings.selectors.accordionInner)[0]) {
                    accordionBody.children().wrapAll('<div class="' + that.settings.selectors.accordionInner.slice(1) + '" />');
                }
            });
        },

        initAccordion: function (accordion) {
            var accordionBodies = this.getHiddenAccordionBodies(accordion),
                accordionInners = this.getAccordionInners(accordionBodies);

            this.setVisibility(accordionInners, 'hidden');
        },

        getHiddenAccordionBodies: function (accordion) {
            return accordion.find(this.settings.selectors.accordionBody).not(this.settings.selectors.accordionBodyShown);
        },

        getShownAccordionBodies: function (accordion) {
            return accordion.find(this.settings.selectors.accordionGroup + ' > ' + this.settings.selectors.accordionBodyShown);
        },

        getAccordionInners: function (accordionBodies) {
            return accordionBodies.find(this.settings.selectors.accordionInner);
        },

        setVisibility: function (accordionInners, value) {
            accordionInners.css('visibility', value);
        }

    };

    /* PLUGIN DEFINITION
     * ================= */

    $.fn[pluginName] = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data(pluginName),
                options = $.extend({}, defaults, $this.data(), typeof option === 'object' && options);

            if (!data) {
                $this.data(pluginName, (data = new Plugin(this, options)));
            }

            if (typeof options === 'string') {
                data[option]();
            }
        });
    };

    /* ON DOM READY
     * ============ */

    $(document).ready(function () {
        var targets = $('.' + pluginName),
            accessify, option;

        if (targets[0]) {
            accessify = targets.data(pluginName);
            option = (accessify) ? true : targets.data();
            targets[pluginName](option);
        } else {
            console.log("You've decided not to " + pluginName + " this accordion.");
        }
    });

}(jQuery, window, document));
