$(document).ready(function(){
    $('#logout-btn').click(function(event){
        $.ajax({
            url: 'admins/logout',
            success: function(data){
                if(data.message == 'logged out'){
                    location.href = 'admin';
                }
            }
        })
    })
})