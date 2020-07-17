$(document).ready(function(){
    /// add new post request ///
    $('.save-btn').click(function(event){
        // event.preventDefault();
        const title = $('#title').val();
        const text = $('#text').html();
        const category = $('#post-category').find(":selected").text();

        // console.log(text);

        var input = $('#real-file')[0];
        var file = input.files[0];
        var fileName = file.name;

        $.ajax({
            url: 'admins/new-post',
            method: 'post',
            data: {
                title: title,
                text: text,
                category: category,
                image: fileName
            },
            success: function(data){
                console.log(data);
            }, error: function(error){
                console.log(error);
            }
        })
    })

    /// get all categories for dropdown ///
    $.ajax({
        url: 'admins/categories',
        success: function(data){
            console.log(data);
            const categories = data.categories;
            console.log(categories);

            var i = 0;
            while(i < categories.length){
                const categoryOption = $('<option>').attr({ 'value':categories[i].ID }).append(categories[i].name);
                    $('#post-category').append(categoryOption);
                i++;
            }

        }, error: function(error){
            console.log(error);
        }
    })
})