var spoilersList;

chrome.storage.sync.get("spoiler", function(results){
    spoilersList = results;
    if(spoilersList['spoiler'] == null) {
        spoilersList = {
            'spoiler': []
        };
        saveSpoilersList();
    }
});

$(function (){
    updateView();
    searchForSpoilers();

    $('#submit-button').click(function(evt){
        item = $('#block-item').val().toLowerCase();
        spoilersList['spoiler'].push(item);
        saveSpoilersList();
        $('#block-item').val('');
        updateView();
        searchForSpoilers();
    });

    $('#clear-button').click(function(evt){
        spoilersList = {
            'spoiler': []
        };
        saveSpoilersList();
        $('#block-item').val('');
        updateView();
        searchForSpoilers();
    });

    //when a spoilerListItem is clicked, remove it from the list
    $(document).on('click', '.spoilerListItem', function(item){
        $('p:contain(' + item.currentTarget.innerHTML + ')').parents('.userContentWrapper').css('-webkit-filter', '');
        spoilersList["spoiler"].splice($.inArray(item.currentTarget.innerHTML, spoilersList["spoiler"]), 1);
        saveSpoilersList();
        updateView();
        searchForSpoilers();
    })
    //observer used for when facebook loads more content without refreshing the page
    var observer = new MutationObserver(function (mutations, observer){
        searchForSpoilers();
    });
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
            search = search + "p:contains('" + item + "'), ";
        });
        search = search.substring(0, search.length - 2);
        $(search).parents('.userContentWrapper').css('-webkit-filter', 'blur(6px)');
    }
}
