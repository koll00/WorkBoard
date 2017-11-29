$(document).ready(function(){
    $("#date").datepicker({
    	dateFormat: "yy/mm/dd"
    });
    //set today
    var newDate = new Date();
    $("#date").datepicker( "setDate",newDate.toLocaleDateString());
});

