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

