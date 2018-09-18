$(document).ready(function(){
    $('#showLogTable').DataTable( {
        "order": [[ 1, "desc" ]],
        destroy:true
    } );
    $('#showLogTable').DataTable().search(
    	$('#cardNo').val(),
    	$('#global_regex').prop('checked'),
        $('#global_smart').prop('checked')
    ).draw();
    
    if($("#refresh").attr('checked')){
    	setTimeout(function(){
    		$("#showLogForm").submit();
    	}, 10000)
    };
    
    $("#refresh").change(function() {
    	$("#showLogForm").submit();
    });
    
    var myLayout = $('body').layout();
    myLayout.hide("east");
    myLayout.hide("west");
    myLayout.hide("south");
    myLayout.hide("north");
});

