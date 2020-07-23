$(document).ready(function(){

    $.ajax({
        url: 'admins/users',
        success: function(data){
            const todayUsers = data.todayUsers;
            // console.log(todayUsers);
            let todayUsersNumb = data.todayUsersNumb;
            if(todayUsersNumb < 1){
                todayUsersNumb = 0;
            }
            $('#today-users-numb').append(todayUsersNumb);

            const overallUsers = data.usersNumb;
            $('#overall-users-numb').append(overallUsers);

            const users = data.users;
            showUsers(users);

            $('#today-users').click(function(event){
                event.preventDefault();
                showUsers(todayUsers);
            })

            $('#overall-users').click(function(event){
                event.preventDefault();
                showUsers(users);
            })

        }, error: function(error){
            console.log(error);
        }
    })

    $('#search').keyup(function(event){
        if(event.keyCode == 13){
            const info = event.target.value;
            $.ajax({
                url: 'admins/search-users?info=' + info,
                success: function(data){
                    console.log(data);
                    const users = data.users;
                    if(users.length > 0){
                        showUsers(users);
                    }
                }, error: function(error){
                    console.log(error);
                }
            })
        }
    })
    
    showUsers = (users) => {
        $('.all-users').html('');

        var i = 0;
        while(i < users.length){
            const singleUser = $('<div>').addClass('single-user');
                const signupDate = $('<div>').addClass('signup-date').append(users[i].date_registered);
                const userId = $('<div>').addClass('user-id').append('#' + users[i].ID);
                const userName = $('<div>').addClass('user-name').append(users[i].firstname + ' ' + users[i].lastname);
                const userEmail = $('<div>').addClass('user-name').append(users[i].email);
            singleUser.append(signupDate);
            singleUser.append(userId);
            singleUser.append(userName);
            singleUser.append(userEmail);

            $('.all-users').append(singleUser);

            i++;
        }
    }
})