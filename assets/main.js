//take the text found in <ul id="readme"> and format it like github's readme Markdown
//For example, turn #hello into big bold and *text* into italics
var readme = document.getElementById("readme");
if (readme) {
    var text = readme.innerHTML;
    text = text.replace(/#(.*)/g, "<h1>$1</h1>");
    text = text.replace(/\*\*(.*)\*\*/g, "<b>$1</b>");
    text = text.replace(/\*(.*)\*/g, "<i>$1</i>");
    text = text.replace(/\n/g, "<br>");
    readme.innerHTML = text;
}
