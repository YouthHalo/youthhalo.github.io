var github = 'https://api.github.com/users/YouthHalo/repos';
var githubTemplate = $('#github-template').html();
var compiledGithubTemplate = Handlebars.compile(githubTemplate);
$.getJSON(github).done(function(data) {
    var githubData = data;
    var githubHtml = compiledGithubTemplate(githubData);
    $('.github').html(githubHtml);
});