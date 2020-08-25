$(document).ready(function(){
    /// add new post request ///
    $('.save-btn').click(function(event){
        // event.preventDefault();
        const title = $('#title').val();
        const smallTitle = $('#small_title').val();
        const source = $('#source').val();
        const text = $('#text').html();
        const category = $('#post-category').find(":selected").text();
        const subCategory = $('#post-sub-category').find(":selected").text();

        // console.log(subCategory);

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
                subCat: subCategory,
                image: fileName,
                source: source,
                smallTitle: smallTitle
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

    // get all sub cats
    $.ajax({
        url: 'admins/sub-cats',
        success: function(data){
            // console.log(data)

            const subCats = data.subCats;
            // console.log(categories);

            var i = 0;
            while(i < subCats.length){
                const categoryOption = $('<option>').attr({ 'value':subCats[i].ID }).append(subCats[i].sub_cat);
                    $('#post-sub-category').append(categoryOption);
                i++;
            }
        }, error: function(error){
            console.log(error);
        }
    })
})