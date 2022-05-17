$(document).ready(function(){
    $('input[type="checkbox"]').on('click', function(){
        var data = {};
       
     
        data.key = $(this).attr('name');
        data.checked = $(this).is(':checked') ? true : false;
        $.ajax({
            type: "POST",
            url: `${this.id}/input`,
            data: data,
        }).done(function(data) {
            console.log(data);
        });
    });
})