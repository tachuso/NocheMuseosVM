function helpersTemplate(d) {
    return '<span class="helper">'+d.name+'</span>';
}

function buildHelpers() {

    $("#helpersList").kendoListView({
        dataSource: {
            transport: {
                read: {
                    url: "./data/thanks.json",
                    dataType: "json",
                    type: "GET",
                    complete: function(a,b,c){
                        console.log(a,b,c);
                    }
                }
            }
        },
        template: helpersTemplate,
        dataBound: function () {
            $("#helpersList").append('<span class="helper"><i class="mdi mdi-thumb-up"></i></span>');
    }
    })

}

$(document).ready(function () {
    buildHelpers();
});