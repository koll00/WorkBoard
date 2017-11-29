$(document).ready(function(){
    $('#showLogTable').DataTable( {
        "order": [[ 1, "desc" ]],
        destroy:true
    } );
});
