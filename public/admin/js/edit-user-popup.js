$(document).ready(function(){
    /// show edit user popup ///
    $('#edit-user').click(function(event){
        event.preventDefault();

        $('.page-mask').fadeIn('fast');
        $('#users-popup').fadeIn('fast');
    })

    /// edit user popup finctionality ///
    $('#edit-user-loc').click(function(event){
        event.preventDefault();
        // console.log('leo')

        const userId = $('#user-id').val();
        location.href = 'admin/edit-user?userId=' + userId;
    })
})