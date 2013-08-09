var state = (function ($) {
    var params = {}, bbq = $.bbq;

    return {
        get: function (key, coerce) {
            return bbq.getState(key, coerce) || 0;
        },
        save: function () {
            bbq.pushState(params);
        },
        setParam: function (key, value) {
            params[key] = value;
        },
        removeParam: function (key) {
            bbq.removeState(key);
        },
        getParams: function () {
            return params;
        },
        resetParams: function () {
            params = {};
        }
    };

}($));

$(function ($, window, state) {
    var tabs,
        navTabs,
        config;

    config = {
        ids: {
            tabs: "#tabs-outer, #tabs-inner-1, #tabs-inner-4"
        },
        classNames: {
            tabs: ".tabs",
            navTabs: ".nav-tabs"
        }
    };

    tabs = getTabs(config.ids.tabs);
    navTabs = getNavTabs(tabs);
    attachClicks(navTabs);
    attachHashChanges(tabs);

    function getTabs(selector) {
        return $(selector);
    }

    function getNavTabs(tabs) {
        return tabs
            .children(config.classNames.navTabs)
            .children('li')
            .children('a');
    }

    function attachClicks(navTabs) {
        $.each(navTabs, function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                handleClick($(e.target));
            });
        });
    }

    function handleClick(navTab) {
        var paramKey,
            paramValue,
            tabPane,
            innerTabs,
            innerNavTabs;

        paramKey = getClosestTabs(navTab);
        paramValue = getNavTabIndex(navTab);
        state.resetParams();
        state.setParam(paramKey, paramValue);
        state.save();
        showTabPane(navTab);
    }

    function getClosestTabs(navTab) {
        return navTab.closest(config.classNames.tabs).attr('id');
    }

    function getNavTabIndex(navTab) {
        return navTab.parent().prevAll().length;
    }

    function showTabPane(navTab) {
        navTab.tab('show');
    }

    function attachHashChanges(tabs) {
        var eventName = 'hashchange';

        $(window)
            .on(eventName, function (e) {
                handleHashChange(tabs);
            })
            .trigger(eventName);
    }

    function handleHashChange(tabs) {
        $.each(tabs, function () {
            $(this)
                .find(getNavTabs(tabs))
                .eq(state.get(this.id, true))
                .triggerHandler('click');
        });
    }

}($, window, state));
