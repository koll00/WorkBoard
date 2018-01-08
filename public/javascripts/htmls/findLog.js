$(document).ready(function(){
    $("#date").datepicker({
        dateFormat: "yymmdd",
        maxDate: 0,
        minDate: -4
    });
    if($('#date').val()=="")
        $("#date").datepicker('setDate',new Date());

    $('#envID').val($("#envIDValue").val()==""?"2":$("#envIDValue").val());
    $('#systemID').val($("#systemIDValue").val()==""?"1":$("#systemIDValue").val());
    $('#systemID').attr('disabled',true);
});

