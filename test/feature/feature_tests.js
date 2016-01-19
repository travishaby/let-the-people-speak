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
      .assert.containsText('#poll-url', '/poll/')
      .assert.containsText('#admin-url', '/admin/')
      .assert.containsText('#close-poll', 'Close Poll')
      .end();
  },
  'Vote from poll view, see results populate in poll and admin views': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 1000)
      .setValue('input[name="poll[question]"]', 'test question')
      .setValue('input[name="poll[choices][choice1]"]', 'test choice one')
      .setValue('input[name="poll[choices][choice2]"]', 'test choice two')
      .click('input[class="checkbox form-control"]')
      .waitForElementVisible('input[value="Create Poll"]', 1000)
      .click('input[value="Create Poll"]')
      .waitForElementVisible('#poll-url', 1000)
      .click('#poll-url')
      .assert.urlContains('/poll/')
      .assert.containsText('button[name="button"]', 'test choice one')
      .click('button[name="button"]')
      .waitForElementVisible('table[class="table table-striped"]', 1000)
      .assert.containsText('table[class="table table-striped"]', 'test choice one')
      .end();
  }
};
