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
        'spoiler': spoilerList["spoiler"]
    }, function (result) {
        if (chrome.runtime.error) {
            console.log(chrome.runtime.error);
        }
    });
}