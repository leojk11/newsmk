$(document).ready(function(){
	const leftMenuWrapper = $('<div>').addClass('left-menu');
		const leftMenuTitle = $('<div>').addClass('left-menu-title').append('newsMK Admin');
	leftMenuWrapper.append(leftMenuTitle);
		const loggedInAdmin = $('<div>').addClass('logged-in-admin');
			const adminImageDiv = $('<div>').addClass('admin-image');
				const adminImage = $('<img>').attr({ 'id':'admin-img' });
			adminImageDiv.append(adminImage);
		loggedInAdmin.append(adminImageDiv);
	leftMenuWrapper.append(loggedInAdmin);
		const adminNameWrapper = $('<div>').addClass('admin-name-wrapper');
			const adminName = $('<div>').addClass('admin-name');
		adminNameWrapper.append(adminName);
			const adminStatusWrapper = $('<div>').addClass('admin-status');
				const adminStatusIndicator = $('<span>').addClass('indicator indicator-color');
				const adminStatus = $('<span>').addClass('online-status');
			adminStatusWrapper.append(adminStatusIndicator);
			adminStatusWrapper.append(adminStatus);
		adminNameWrapper.append(adminStatusWrapper);
	leftMenuWrapper.append(adminNameWrapper);
		const dashboardLink = $('<a>').attr({ 'href':'admin/dashboard' });
			const dashboardWrapper = $('<div>').addClass('menu-item');
				const dashboardIcon = $('<img>').attr({ 'src':'admin/home-icon' }).css({ 'wwidth':'50' });
				const dashboardLabel = $('<div>').addClass('menu-item-text').append('Home');
			dashboardWrapper.append(dashboardIcon);
			dashboardWrapper.append(dashboardLabel);
		dashboardLink.append(dashboardWrapper);
	leftMenuWrapper.append(dashboardLink);
		const usersMenuLabel = $('<div>').addClass('label').append('Users');
	leftMenuWrapper.append(usersMenuLabel);
		const usersLink = $('<a>').attr({ 'href':'admin/users' });
			const usersWrapper = $('<div>').addClass('menu-item');
				const usersIcon = $('<img>').attr({ 'src':'admin/users-icon' }).css({ 'filter':'invert(100%)' });
				const usersLabel = $('<div>').addClass('menu-item-text').append('Users');
			usersWrapper.append(usersIcon);
			usersWrapper.append(usersLabel);
		usersLink.append(usersWrapper);
	leftMenuWrapper.append(usersLink);
		const newUserLink = $('<a>').attr({ 'href':'admin/new-user' });
			const newUserWrapper = $('<div>').addClass('menu-item');
				const newUserIcon = $('<img>').attr({ 'src':'admin/add-new-icon' }).css({ 'filter':'invert(100%)' });
				const newUserLabel = $('<div>').addClass('menu-item-text').append('Add new user');
			newUserWrapper.append(newUserIcon);
			newUserWrapper.append(newUserLabel);
		newUserLink.append(newUserWrapper);
	leftMenuWrapper.append(newUserLink);
		const editUserLink = $('<a>').attr({ 'id':'edit-user' });
			const editUserWrapper = $('<div>').addClass('menu-item');
				const editUserIcon = $('<img>').attr({ 'src':'admin/edit-svg' }).css({ 'filter':'invert(100%)' });
				const editUserLabel = $('<div>').addClass('menu-item-text').append('Edit user');
			editUserWrapper.append(editUserIcon);
			editUserWrapper.append(editUserLabel);
		editUserLink.append(editUserWrapper);
	leftMenuWrapper.append(editUserLink);
		const postsMenuLabel = $('<div>').addClass('label').append('Posts');
	leftMenuWrapper.append(postsMenuLabel);
		const postsLink = $('<a>').attr({ 'href':'admin/posts' });
			const postsWrapper = $('<div>').addClass('menu-item');
				const postsIcon = $('<img>').attr({ 'src':'admin/calendar-icon' }).css({ 'filter':'invert(100%)' });
				const postsLabel = $('<div>').addClass('menu-item-text').append('Manage posts');
			postsWrapper.append(postsIcon);
			postsWrapper.append(postsLabel);
		usersLink.append(postsWrapper);
	leftMenuWrapper.append(usersLink);
		const newPostLink = $('<a>').attr({ 'href':'admin/new-post' });
			const newPostWrapper = $('<div>').addClass('menu-item');
				const newPostIcon = $('<img>').attr({ 'src':'admin/add-new-icon' }).css({ 'filter':'invert(100%)' });
				const newPostLabel = $('<div>').addClass('menu-item-text').append('Add new post');
			newPostWrapper.append(newPostIcon);
			newPostWrapper.append(newPostLabel);
		newPostLink.append(newPostWrapper);
	leftMenuWrapper.append(newUserLink);
		const categoriesMenuLabel = $('<div>').addClass('label').append('Categories');
	leftMenuWrapper.append(categoriesMenuLabel);
		const categoriesLink = $('<a>').attr({ 'href':'admin/categories' });
			const categoriesWrapper = $('<div>').addClass('menu-item');
				const categoriesIcon = $('<img>').attr({ 'src':'admin/calendar-icon' }).css({ 'filter':'invert(100%)' });
				const categoriesLabel = $('<div>').addClass('menu-item-text').append('Manage categories');
			categoriesWrapper.append(categoriesIcon);
			categoriesWrapper.append(categoriesLabel);
		categoriesLink.append(categoriesWrapper);
	leftMenuWrapper.append(categoriesLink);
		const newCategoriesLink = $('<a>').attr({ 'href':'admin/new-categories' });
			const newCategoriesWrapper = $('<div>').addClass('menu-item');
				const newCategoriesIcon = $('<img>').attr({ 'src':'admin/add-new-icon' }).css({ 'filter':'invert(100%)' });
				const newCategoriesLabel = $('<div>').addClass('menu-item-text').append('Add new category');
			newCategoriesWrapper.append(newCategoriesIcon);
			newCategoriesWrapper.append(newCategoriesLabel);
		newCategoriesLink.append(newCategoriesWrapper);
	leftMenuWrapper.append(newCategoriesLink);
		const editCategoryLink = $('<a>').attr({ 'id':'edit-category' });
			const editCategoryWrapper = $('<div>').addClass('menu-item');
				const editCategoryIcon = $('<img>').attr({ 'src':'admin/edit-svg' }).css({ 'filter':'invert(100%)' });
				const editCategoryLabel = $('<div>').addClass('menu-item-text').append('Edit category');
			editCategoryWrapper.append(editCategoryIcon);
			editCategoryWrapper.append(editCategoryLabel);
		editCategoryLink.append(editCategoryWrapper);
	leftMenuWrapper.append(editCategoryLink);

	$('#left-menu-wrapper').append(leftMenuWrapper);


})