$(document).ready(function(){

    $('#search').keyup(function(){
        $('#result').html('');
        
        var searchField = $('#search').val();
        var regex = new RegExp(searchField, "i");

        $.getJSON('data/data.json', function(data){
            $.each(data, function(key, value){
                if(value.title.search(regex) != -1 || value.body.search(regex) != -1){
                    $('#result').append(`
                        <div class="result card card-body mb-1">
                            <h4>${this.title}</h4>
                            <h6>${this.body}</h6>
                        </div>
                    `);
                }
            });
        });
    });
});