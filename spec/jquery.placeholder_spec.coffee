describe "jQuery Placeholder", ->

  # Setup (before all)
  input = ($ '<input type="text" class="test" id="test" placeholder="carrots">')
  ($ 'body').append(input)
  placeholder = new Placeholder(($ input))

  # Origin is the input or textarea that has a placeholder attribute
  describe "origin", ->

    it "should be hidden if it has no value", ->
      (input.val "").change()
      (expect input.is(":hidden")).toBeTruthy()

    it "should be visible if it has a value", ->
      (input.val "test").change()
      (expect input.is(":visible")).toBeTruthy()

    describe "on blur", ->

      describe "if it has no value", ->

        beforeEach ->
          (input.val "").change()
          input.blur()

        it "should be hidden", ->
          (expect placeholder.origin.is(":hidden")).toBeTruthy()

        it "should show the decoy", ->
          (expect placeholder.decoy.is(":visible")).toBeTruthy()

      describe "if it has a value", ->

        beforeEach ->
          (input.val "test").change()
          input.blur()

        it "should not be hidden", ->
          (expect placeholder.origin.is(":hidden")).toBeFalsy()

        it "should not show the decoy", ->
          (expect placeholder.decoy.is(":visible")).toBeFalsy()

  # Decoy is the overlying label that displays the placeholder attribute
  # on top of the origin.
  describe "decoy", ->

    it "should exist and be a input element", ->
      (expect placeholder.decoy.is "input").toBeTruthy()

    it "should copy the origin placeholder and set as it's value", ->
      (expect placeholder.decoy.val()).toEqual "carrots"

    it "should have a 'placeholder' class", ->
      (expect placeholder.decoy.attr("class")).toEqual "placeholder"

    it "should be added in the DOM next to origin", ->
      (expect input.next().is(placeholder.decoy)).toBeTruthy()

    it "should not be visible if the origin has a value", ->
      (input.val "test").change()
      (expect placeholder.decoy.is(":hidden")).toBeTruthy()

    it "should be visible if the origin has no value", ->
      (input.val "").change()
      (expect placeholder.decoy.is(":visible")).toBeTruthy()

    describe "on click", ->

      beforeEach ->
        placeholder.decoy.click()

      it "should be hidden on user click", ->
        (expect placeholder.decoy.is(":hidden")).toBeTruthy()

      it "should show and focus the origin", ->
        (expect placeholder.origin.is(":visible")).toBeTruthy()
        (expect placeholder.origin.is(":focus")).toBeTruthy()
