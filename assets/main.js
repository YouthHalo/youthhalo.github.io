//move the gradient background found in main.css back and forth to give the illusion of infinite scrolling
var scrollSpeed = 1;
var current = 0;
var direction = 'h';
function bgscroll(){
    current -= scrollSpeed;
    $('.gradient').css("background-position", (direction == 'h') ? current+"px 0" : "0 " + current+"px");
}
setInterval("bgscroll()", 20);

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
