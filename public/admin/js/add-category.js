$(document).ready(function(){
    $('#add-new-cat').click(function(event){
        console.log('leo');
        const title = $('#name').val();

        $.ajax({
            url: 'admins/new-cat',
            method: 'post',
            data: { title: title },
            success: function(data){
                console.log(data.message);
                if(data.message == 'cat added'){
                    location.href = 'admin/categories'
                }
            }, error: function(error){
                console.log(error);
            }
        })
    })
})