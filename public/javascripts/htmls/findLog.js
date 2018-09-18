$(document).ready(function(){
    $("#date").datepicker({
        dateFormat: "yymmdd",
        maxDate: 0,
        minDate: -4
    });
    if($('#date').val()=="")
        $("#date").datepicker('setDate',new Date());

    choose=[{"name":"CES", "env":["PL2","PL3","PL4"],"system":{"name":"新龙网","value":"CES"}},
	 {"name":"NCUPS", "env":["PL2","PL3","PL4"],"system":{"name":"中德","value":"NCUPS"}},
	 {"name":"CUPSHK", "env":["PL2","PL4"],"system":{"name":"海外","value":"CUPSHK"}}, 
	 {"name":"TY","env": ["TY"],"system":{"name":"同业","value":"TY"}}
	]; 

    for( key in choose){
         $('#systemID').append("<option value='"+ choose[key]["system"]["value"]+ "' >" + choose[key]["system"]["name"]+" </option>");
    }

    $('#systemID').val($("#systemIDValue").val()==""?"CES":$("#systemIDValue").val());




    ch=0
    for( key in choose){
       if(choose[key]["system"]["value"] == $('#systemID').val()){
		ch=key
       }
    }

    for(index in choose[ch]["env"]){
        $('#envID').append("<option value='"+ choose[ch]["env"][index]+ "' >" + choose[ch]["env"][index]+" </option>");
    }


    $('#envID').val($("#envIDValue").val()==""?choose[0]["env"][0]:$("#envIDValue").val());

    $('#systemID').change(function(){
    	$('#envID').empty();
    	ch=0;
    	for( key in choose){
       		if(choose[key]["system"]["value"] == $('#systemID').val()){
			ch=key;
       	   	}
    	}
    	for(index in choose[ch]["env"]){
        	$('#envID').append("<option value='"+ choose[ch]["env"][index]+ "' >" + choose[ch]["env"][index]+" </option>");
    	}
    });

});

