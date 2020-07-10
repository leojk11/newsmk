$(document).ready(function(){
    $.ajax({
        url: 'admins/admin-info',
        success: function(data){
            console.log(data);
            const admin = data.admin;

            $('.admin-name').append(admin[0].firstname + ' ' + admin[0].lastname);
            $('.online-status').append(admin[0].status.toUpperCase());

            $('#admin-img').attr({ 'src':'admin/admin-image?image=' + admin[0].image });

            if(admin[0].ID == 1){
                const adminOptionsLabel = $('<div>').addClass('label').append('Head admin options');

                const manageAdminsItem = $('<a>').attr({ 'href':'admin/admins' });
                    const manageAdminsMenuItem = $('<div>').addClass('menu-item');
                        const manageAdminsMenuItemIcon = $('<img>').attr('src', 'admin/user-icon').css({ 'filter':'invert(100%)' });
                        const manageAdminsMenuItemText = $('<div>').addClass('menu-item-text').append('Admins');
                    manageAdminsMenuItem.append(manageAdminsMenuItemIcon);
                    manageAdminsMenuItem.append(manageAdminsMenuItemText);
                manageAdminsItem.append(manageAdminsMenuItem);

                const newMenuItemAdd = $('<a>').attr({ 'href': 'admin/new-admin' });
                    const menuItem = $('<div>').addClass('menu-item');
                        const menuItemIcon = $('<img>').attr('src', 'admin/add-new-icon').css({ 'filter':'invert(100%)' });
                        const menuItemText = $('<div>').addClass('menu-item-text').append('Add new admin');
                    menuItem.append(menuItemIcon);
                    menuItem.append(menuItemText);
                newMenuItemAdd.append(menuItem);

                $('.add-new-admin-func').append(adminOptionsLabel);
                $('.add-new-admin-func').append(manageAdminsItem);
                $('.add-new-admin-func').append(newMenuItemAdd);
            }
        }
    })
})