$(document).ready(function(){
  $('.new-choice').on('click', function() {
    appendChoiceField();
  });
});

function appendChoiceField() {
  var number = $('.choice').length + 1;
  var newChoice = '<p class="lead"> Poll Choice '
                    + number + ':</p><input class="choice'
                    + ' form-control form-field" type="text"'
                    + 'name="poll[choices][choice'
                    + number + ']" placeholder="Enter a choice">';
  $('.choice').last().after(newChoice);
}
