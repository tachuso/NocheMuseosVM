

//#region DataSources

//#endregion

function createMap() {
    $("#mapRoute").kendoMap({
        center: [-33.6722822, -65.4682765],
        zoom: 13,
        layers: [{
            type: "tile",
            urlTemplate: "http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"]
        }],
        markers: [
            { location: [-33.690763, -65.471527], shape: "nm-pin pin-1", tooltip: { content: "Museo Nativista Hector Aubert" } },
            { location: [-33.688663, -65.469443], shape: "nm-pin pin-2", tooltip: { content: "Museo Santiago Betbeder" } },
            { location: [-33.688040, -65.467066], shape: "nm-pin pin-3", tooltip: { content: "Parroquia Nuestra Sra de la Merced" } },
            { location: [-33.661558, -65.456940], shape: "nm-pin pin-4", tooltip: { content: "Museo Ferroviario" } },
            { location: [-33.674614, -65.461651], shape: "nm-pin pin-5", tooltip: { content: "Municipalidad de Villa Mercedes" } },
            { location: [-33.682334, -65.465873], shape: "nm-pin pin-6", tooltip: { content: "Casa de la Cultura" } }
        ],
        controls: {
            attribution: false,
            navigator: false,
            zoom: false
        },
        markerCreated: function (e) {
            e.preventDefault();
            console.log(e);
        }

    });
    
}

function startRoute() {
    $("#mapViewBtn").unbind("click").click(function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        changeView("map");
    });

    $("#listViewBtn").unbind("click").click(function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        changeView("list");
    });
    createMap();
    resizeRoute();
    $("#mapViewBtn").click();

}

function changeView(view) {
    switch (view) {
        case "map":
            $("#routeListContainer").fadeOut(function () {
                $("#routeMapContainer").fadeIn();
            });
            
            break;
        case "list":
            $("#routeMapContainer").fadeOut(function () {
                $("#routeListContainer").fadeIn();
            });
            break;
    }
}

function resizeRoute() {
    if ($("#routePage")) {
        setTimeout(function () { $("#mapRoute").data("kendoMap").resize() }, 500);
    }
}

$(window).resize(resizeRoute);


$(document).ready(function () {
    startRoute();
});