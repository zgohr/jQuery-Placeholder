/*!
 * jQuery Placeholder v0.9
 * http://webcloud.se/code/jQuery-placeholder/
 *
 * Copyright 2011, Daniel Stocks
 * Released under the MIT, BSD, and GPL Licenses.
 *
 */
(function($, window, undefined ) {

  window.Placeholder = function(origin) {

    var
      self = this,
      o = origin.get(0),
      decoy = $('<'+ o.tagName +'>', {
      val : origin.attr("placeholder"),
      click : function(e) {
        e.preventDefault();
        self.off();
        origin.focus();
      }
    }).addClass("placeholder");

    self.decoy = decoy;
    self.origin = origin;

    origin
      .after(decoy)
      .change($.proxy(self.on, self))
      .blur($.proxy(self.on, self));

    // Turn on the light
    self.on();

    // Copy origin styles
    var styles = (function() {
      if(window.getComputedStyle) {
        return window.getComputedStyle(o, null)
      }
      if(o.currentStyle) {
        return o.currentStyle;
      }
    })();

    // Apply styles to decoy
    $.each(styles, function(k, prop) {
      if(o.currentStyle) {
        decoy.css(k, prop);
      }
      if(window.getComputedStyle) {
        decoy.css(prop, styles.getPropertyValue(prop));
      }
    });
  }

  Placeholder.prototype = {

    // Turn the placeholder on
    on : function() {
      if(this.origin.val())
        return this.off();
      this.decoy.show();
      this.origin.hide();
    },

    // turn the placeholder off
    off : function() {
      this.decoy.hide();
      this.origin.show();
    }
  }
})(jQuery, this);
