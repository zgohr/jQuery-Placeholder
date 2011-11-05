(function() {
  describe("jQuery Placeholder", function() {
    var input, placeholder;
    input = $('<input type="text" class="test" id="test" placeholder="carrots">');
    ($('body')).append(input);
    placeholder = new Placeholder($(input));
    describe("origin", function() {
      it("should be hidden if it has no value", function() {
        (input.val("")).change();
        return (expect(input.is(":hidden"))).toBeTruthy();
      });
      it("should be visible if it has a value", function() {
        (input.val("test")).change();
        return (expect(input.is(":visible"))).toBeTruthy();
      });
      return describe("on blur", function() {
        describe("if it has no value", function() {
          beforeEach(function() {
            (input.val("")).change();
            return input.blur();
          });
          it("should be hidden", function() {
            return (expect(placeholder.origin.is(":hidden"))).toBeTruthy();
          });
          return it("should show the decoy", function() {
            return (expect(placeholder.decoy.is(":visible"))).toBeTruthy();
          });
        });
        return describe("if it has a value", function() {
          beforeEach(function() {
            (input.val("test")).change();
            return input.blur();
          });
          it("should not be hidden", function() {
            return (expect(placeholder.origin.is(":hidden"))).toBeFalsy();
          });
          return it("should not show the decoy", function() {
            return (expect(placeholder.decoy.is(":visible"))).toBeFalsy();
          });
        });
      });
    });
    return describe("decoy", function() {
      it("should exist and be a input element", function() {
        return (expect(placeholder.decoy.is("input"))).toBeTruthy();
      });
      it("should copy the origin placeholder and set as it's value", function() {
        return (expect(placeholder.decoy.val())).toEqual("carrots");
      });
      it("should have a 'placeholder' class", function() {
        return (expect(placeholder.decoy.attr("class"))).toEqual("placeholder");
      });
      it("should be added in the DOM next to origin", function() {
        return (expect(input.next().is(placeholder.decoy))).toBeTruthy();
      });
      it("should not be visible if the origin has a value", function() {
        (input.val("test")).change();
        return (expect(placeholder.decoy.is(":hidden"))).toBeTruthy();
      });
      it("should be visible if the origin has no value", function() {
        (input.val("")).change();
        return (expect(placeholder.decoy.is(":visible"))).toBeTruthy();
      });
      return describe("on click", function() {
        beforeEach(function() {
          return placeholder.decoy.click();
        });
        it("should be hidden on user click", function() {
          return (expect(placeholder.decoy.is(":hidden"))).toBeTruthy();
        });
        return it("should show and focus the origin", function() {
          (expect(placeholder.origin.is(":visible"))).toBeTruthy();
          return (expect(placeholder.origin.is(":focus"))).toBeTruthy();
        });
      });
    });
  });
}).call(this);
