$(document).ready(function(){
    const headerWrapper = $('<div>').addClass('header-wrapper');
        const header = $('<div>').addClass('header');

            const catsWrapper = $('<div>').addClass('lg-cats-wrapper');
                const logo = $('<div>').addClass('logo').append('newsMK');
            catsWrapper.append(logo)

                const categories = $('<div>').addClass('categories');
                    const cat1 = $('<div>').addClass('single-cat').append('Македонија');
                    const cat2 = $('<div>').addClass('single-cat').append('Свет');
                    const cat3 = $('<div>').addClass('single-cat').append('Забава');
                    const cat4 = $('<div>').addClass('single-cat').append('Спорт');
                    const cat5 = $('<div>').addClass('single-cat').append('Магазин');
                categories.append(cat1);
                categories.append(cat2);
                categories.append(cat3);
                categories.append(cat4);
                categories.append(cat5);
                
            catsWrapper.append(categories);
        header.append(catsWrapper);

            const menu = $('<div>').addClass('menu');
                const search = $('<div>').addClass('menu-item');
                    const searchIcon = $('<img>').attr({ 'src':'client/search-icon' }).css({ 'filter':'invert(100%)' });
                search.append(searchIcon);
                const user = $('<div>').addClass('menu-item');
                    const menuIcon = $('<img>').attr({ 'src':'client/user-icon' }).css({ 'filter':'invert(100%)' });
                user.append(menuIcon);
                const hamb = $('<div>').addClass('menu-item');
                    const hambIcon = $('<img>').attr({ 'src':'client/hamb-icon' });
                hamb.append(hambIcon);
            menu.append(search);
            menu.append(user);
            menu.append(hamb);
        header.append(menu);
    headerWrapper.append(header);

    $('#header-place').append(headerWrapper);
})