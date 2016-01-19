module.exports = {
  'Assert form is on index page' : function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.container', 'Poll Question')
      .assert.containsText('#add-poll-choice', 'Add Poll Choice')
      .end();
  },
  'Fill out form and assert redirect to new poll page' : function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 1000)
      .setValue('input[name="poll[question]"]', 'test question')
      .setValue('input[name="poll[choices][choice1]"]', 'test choice 1')
      .setValue('input[name="poll[choices][choice2]"]', 'test choice 2')
      .waitForElementVisible('input[value="Create Poll"]', 1000)
      .click('input[value="Create Poll"]')
      .waitForElementVisible('#poll-question', 1000)
      .assert.containsText('#poll-question', 'test question')
      .end();
  }
};
