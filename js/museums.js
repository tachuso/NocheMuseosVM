

//#region DataSources

//#endregion

function createMuseumsList() {
}

function startMuseums() {
    createMuseumsList();
    resizeRoute();
}

function resizeMuseums() {

    if ($("#museumsPage")) {
        
    }

    var toolbarW = $("#museumsListFilters .filterList").width();

    if (toolbarW > 768) {
        toolbarW = 768;
    }

}

$(window).resize(resizeRoute);


$(document).ready(function () {
    startMuseums();
});