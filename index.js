const randomWikiButton = document.getElementById('wikiButton');
if (randomWikiButton) {

    randomWikiButton.addEventListener("click", () => {
        const searched = document.getElementById('searched').value;
        var linkDiv = document.getElementById('dyn_Div');
        console.log(linkDiv);
        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=100&srsearch=${searched}`;
        fetch(endpoint)
            .then(function (response) {
                return (response.json());
            })
            .then(function (data) {
                var resultsArray = data.query.search;
                linkDiv.innerHTML = '';
                resultsArray.map(element => {
                    var itemTitle = element.title;
                    var itemUrl = encodeURI(`https://en.wikipedia.org/wiki/${element.title}`);
                    linkDiv.innerHTML += `<div><button type="button" class="btn btn-light">
                        <a href="${itemUrl}">${itemTitle}</a>
                    </button></div> `;
                });
            })
            .catch(function () {
                console.log('An error occurred');
            });
    })
}