;(function ($, window, document, undefined) {

    var pluginName = 'accessify',
        target = $('.' + pluginName),
        defaults = {
            selectors: {
                tabs:           '.tabs',
                nav:            '.nav',
                navTabs:        '.nav-tabs',
                navTab:         '.nav-tabs > li',
                tab:            '.nav-tabs a',
                tabContent:     '.tab-content',
                tabPane:        '.tab-pane',
                active:         '.active'
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
        this.init();
    }

    Plugin.prototype = {
        constructor: Plugin,

        init: function () {
            if (this.settings.focus) this.focus();
        },

        focus: function () {
            var that = this,
                $endMarker = $('<a href="#" />');

            $endMarker
                .on('focus', function (e) {
                    that.handleFocus(e);
                })
                .appendTo(this.settings.selectors.tabPane);

            this.$element
                .on('shown', this.settings.selectors.tab, function (e) {
                    that.handleShown(e);
                });
        },

        handleFocus: function () {
            var nextTab = that.getNextTab(that.getActiveTab())[0];

            if (nextTab) {
                nextTab.focus();
            }
        },

        handleShown: function (e) {
            var inactiveTabs = this.getInactiveTabs();
                that = this;

            this.detab(inactiveTabs, function () {
                that.retab(inactiveTabs);
            });
        },

        detab: function (inactiveTabs, retab) {
            this.setTabindex(inactiveTabs,  -1);
            retab();
        },

        retab: function (inactiveTabs) {
            var that = this;

            setTimeout(function () {
                that.setTabindex(inactiveTabs, 0);
            }, 5000);
        },

        getInactiveTabs: function () {
            return $(this.settings.selectors.navTab).not(this.settings.selectors.active).children('a');
        },

        getActiveTab: function () {
            return $(this.settings.selectors.navTabs).find(this.settings.selectors.active);
        },

        getNextTab: function (activeTab) {
            return activeTab.next('li').children('a');
        },

        setTabindex: function (elements, value) {
            elements.attr('tabindex', value);
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
            console.log("You've decided not to " + pluginName + " these tabs.");
        }
    });

}(jQuery, window, document));