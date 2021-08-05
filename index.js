const searchWikiButton = document.getElementById('wikiButton');
const randomWikiButton = document.getElementById('randomButton');
var linkDiv = document.getElementById('dyn_Div');


if (searchWikiButton) {
    searchWikiButton.addEventListener("click", () => {
        const searched = document.getElementById('searched').value;
        //console.log(linkDiv);
        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=100&srsearch=${searched}`;
        fetch(endpoint)
            .then(function (response) {
                return (response.json());
            })
            .then(function (data) {
                var resultsArray = data.query.search;
                //console.log(resultsArray);
                //console.log(resultsArray.length);
                if (resultsArray.length < 1) {
                    linkDiv.innerHTML = ``;
                    linkDiv.innerHTML += `<div><button type="button" class="btn btn-light">
                        <h1>No Results For ${searched} :(</h1>
                            </div> `;
                } else {
                    linkDiv.innerHTML = ``;
                    resultsArray.map(element => {
                        var itemTitle = element.title;
                        var itemUrl = encodeURI(`https://en.wikipedia.org/wiki/${element.title}`);
                        linkDiv.innerHTML += `<div><button type="button" class="btn btn-light">
                        <a href="${itemUrl}">${itemTitle}</a>
                    </button></div> `;
                    });
                }
            })
            .catch(function () {
                console.log('An error occurred');
            });
    })
}

if (randomWikiButton) {
    randomWikiButton.addEventListener("click", () => {
        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=info&generator=random&grnnamespace=0&grnlimit=100`;
        //console.log(endpoint);
        fetch(endpoint)
            .then(function (response) {
                return (response.json());
            })
            .then(function (data) {
                var ra = data.query.pages;
                var resultsArray = Object.values(ra);
                //console.log(resultsArray);
                //console.log(resultsArray.length);
                if (resultsArray.length < 1) {
                    linkDiv.innerHTML = ``;
                    linkDiv.innerHTML += `<div><button type="button" class="btn btn-light">
                        <h1>Couldn't Get Random Wiki Articles :(</h1>
                            </div> `;
                } else {
                    linkDiv.innerHTML = ``;
                    resultsArray.map(element => {
                        var itemTitle = element.title;
                        var itemUrl = encodeURI(`https://en.wikipedia.org/wiki/${element.title}`);
                        linkDiv.innerHTML += `<div><button type="button" class="btn btn-light">
                        <a href="${itemUrl}">${itemTitle}</a>
                    </button></div> `;
                    });
                }
            })
            .catch(function (r) {
                console.log('An error occurred: ' + r);
            });
    })
}