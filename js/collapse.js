;(function ($, window, document, undefined) {

    var pluginName = 'accessify',
        target = $('.' + pluginName),
        defaults = {
            selectors: {
                accordion:              '.accordion',
                accordionGroup:         '.accordion-group',
                accordionHeading:       '.accordion-heading',
                accordionBody:          '.accordion-body',
                accordionInner:         '.accordion-inner',
                accordionToggle:        '.accordion-toggle',
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
            var that = this;

            this.$element.on({
                hidden: function (e) {
                    that.setInnerVisibility(that.getHiddenBodies(), 'hidden');
                },
                shown: function (e) {
                    that.setInnerVisibility(that.getShownBodies(), 'visible');
                }
            });
            this.setInners(this.$element.find(this.settings.selectors.accordionBody));
            this.setInnerVisibility(this.getHiddenBodies(), 'hidden');
        },

        setInners: function (bodies) {
            var that = this;
            $.each(bodies, function () {
                var body = $(this),
                    inner = '<div class="' + that.settings.selectors.accordionInner.slice(1) + '" />';

                if (!body.find(that.settings.selectors.accordionInner)[0]) {
                    body.children().wrapAll(inner);
                }
            });
        },

        getHiddenBodies: function () {
            return this.$element.find(this.settings.selectors.accordionBody).not(this.settings.selectors.accordionBodyShown);
        },

        getShownBodies: function () {
            return this.$element.find(this.settings.selectors.accordionGroup + ' > ' + this.settings.selectors.accordionBodyShown);
        },

        setInnerVisibility: function (bodies, value) {
            bodies.find(this.settings.selectors.accordionInner).css('visibility', value);
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

    $(document).on('ready', function (e) {
        var accessify, option;

        if (target[0]) {
            accessify = target.data(pluginName);
            option = (accessify) ? true : target.data();
            target[pluginName](option);
        } else {
            console.log("You've decided not to " + pluginName + " this accordion.");
        }
    });

}(jQuery, window, document));
