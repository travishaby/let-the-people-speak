$(document).ready(function(){
  $('.question').on('click', function() {
    appendQuestionField(this);
  });
});

function appendQuestionField(button) {
  var number = $('.question').length + 1;
  var newQuestion = '<br> Poll Question '
                    + number + ':<br><input class="question" data-id="'
                    + number + '" type="text" name="poll[questions][question'
                    + number + ']" placeholder="enter a question">';
  $(button).after(newQuestion).off();
  addClickListenerToLastButton();
}

function addClickListenerToLastButton() {
  var lastButton = $('.question').last();
  $(lastButton).on('click', function(){
    appendQuestionField(this);
  });
}
