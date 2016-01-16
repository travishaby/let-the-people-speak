$(document).ready(function(){
  $('.new-choice').on('click', function() {
    appendChoiceField();
  });
});

function appendChoiceField() {
  var number = $('.choice').length + 1;
  var newChoice = '<br> Poll Choice '
                    + number + ':<br><input class="choice" type="text"'
                    + 'name="poll[choices][choice'
                    + number + ']" placeholder="enter a choice">';
  $('.choice').last().after(newChoice);
}
