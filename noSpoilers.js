var spoilersList;

chrome.storage.sync.get("spoiler", function(results){
    spoilersList = results;
    if(spoilersList['spoiler'] == null) {
        spoilersList = {
            'spoiler': []
        };
        SaveSpoilersList();
    }
});

function saveSpoilersList() {
    chrome.storage.sync.set({
        'spoiler': spoilersList["spoiler"]
    }, function (result) {
        if (chrome.runtime.error) {
            console.log(chrome.runtime.error);
        }
    });
}

function updateView() {
    if(spoilersList["spoiler"] != null){
        $('#listview').empty();
        var unorderedList = '<ul>', i;
        for(i = 0; i < spoilersList["spoiler"].length; i++){
            unorderedList += '<li><a class="spoilerListItem" href="#">' + spoilersList['spoiler'][i] + '</a></li>';
        }
        unorderedList += '<ul>';
        $('#listView').append(unorderedList);
    }
}

function searchForSpoilers() {
    if(spoilersList["spoiler"] != null){
        var search = '';
        spoilersList["spoiler"].forEach(function(item){
            search = search + "p:contains('" + item + "', ";
        });
        search = search.substring(0, search.length - 2);
        $(search).parents('.userContentWrapper').css('-webkit-filter', 'blur(6px)');
    }
}