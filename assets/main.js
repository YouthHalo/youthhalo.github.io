//move the gradient background found in main.css back and forth like a parralax effect to the scroll

$document.ready(function() {
    $window.scroll(function() {
        var scroll = $window.scrollTop();
        var slowScroll = scroll / 2;
        $('.main').css('background-position', 'center -' + slowScroll + 'px');
    });
});
//Import my github repositories and give them a nice box with a link to the repository and a link to the live site

var github = 'https://api.github.com/users/YouthHalo/repos';
var githubTemplate = $('#github-template').html();
var compiledGithubTemplate = Handlebars.compile(githubTemplate);
$.getJSON(github).done(function(data) {
    var githubData = data;
    var githubHtml = compiledGithubTemplate(githubData);
    $('.github').html(githubHtml);
});


//Give my repositories a nice box featuring the readme and a link to the repository
