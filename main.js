//make prev and next buttons cycle between the cards
//make the cards look like the github projects
//use api.github.com/users/youthhalo to get my repositories and display them in cards

var github = 'https://api.github.com/users/YouthHalo/repos';
var githubTemplate = $('#github-template').html();
var compiledGithubTemplate = Handlebars.compile(githubTemplate);
$.getJSON(github).done(function(data) {
    var githubData = data;
    var githubHtml = compiledGithubTemplate(githubData);
    $('.github').html(githubHtml);
});

//make the buttons cycle between the cards
var card = $('.card');
var prev = $('#prev');
var next = $('#next');
var cardCount = 0;
prev.on('click', function() {
  cardCount--;
  if (cardCount < 0) {
    cardCount = card.length - 1;
  }
  card.hide();
  card.eq(cardCount).show();
});
next.on('click', function() {
  cardCount++;
  if (cardCount > card.length - 1) {
    cardCount = 0;
  }
  card.hide();
  card.eq(cardCount).show();
});