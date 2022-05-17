$(document).ready(function(){
    $('input[type="checkbox"]').on('click', function(e){
        var data = {};
        console.log("hello");
        data.key = $(this).attr('name');
        data.checked = $(this).is(':checked') ? true : false;
        $.ajax({
            type: "POST",
            url: `/${c_id}/${this.id}/input`,
            data: data,
        }).done(function(data) {
            console.log(data);
        });
    });
})