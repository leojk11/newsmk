$(document).ready(function(){
    /// show edit cat popup ///
    $('#edit-category').click(function(event){
        event.preventDefault();

        $('.page-mask').fadeIn('fast');
        $('#category-popup').fadeIn('fast');
    })

    /// edit cat popupt functionality ///
    $('#edit-cat').click(function(event){
        event.preventDefault();
        const info = $('#category').val();

        $.ajax({
            url: 'admins/single-cat-edit?info=' + info,
            success: function(data){
                console.log(data);
                if(data.message !== 'not exist'){
                    const category = data.category;
                    const catId = category[0].ID;
                    
                    location.href = 'admin/edit-category?catId=' + catId;
                } else {
                    $('.cat-error-div').fadeIn('slow');
                    setTimeout(function(){
                        $('.cat-error-div').fadeOut("slow");
                    }, 5000);
                }
            }, error: function(error){
                console.log(error);
            }
        })
    })
})