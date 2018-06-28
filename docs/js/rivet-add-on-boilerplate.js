(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.MyComponent = factory());
}(this, (function () { 'use strict';

  var init = function init() {
    console.log('Rivet Add-on Boilerplate!');
  };

  /**
   * Export the methods you want to make public inside of this object.
   */
  var rivetAddOnBoilerplate = { init: init };

  return rivetAddOnBoilerplate;

})));
//# sourceMappingURL=rivet-add-on-boilerplate.js.map
