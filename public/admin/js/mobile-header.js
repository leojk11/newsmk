$(document).ready(function(){
	const mobileMenu = $('<div>').addClass('mobile-menu');
		const mobileTitle = $('<a>').addClass('mobile-title').attr({ 'href':'admin/dashboard' }).append('newsMK Admin');
		const menuDrop = $('<div>').addClass('hamb').attr({ 'id':'menu-drop' });
			const hambIcon = $('<img>').attr({ 'src':'client/hamb-icon' });
		menuDrop.append(hambIcon);
	mobileMenu.append(mobileTitle);
	mobileMenu.append(menuDrop);

	$('#mobile-menu-wrapper').append(mobileMenu);

	const dropdown = $('<div>').addClass('dropdown').attr({ 'id':'dropdown' });
		const dropdownWrapper = $('<div>').addClass('dropdown-wrapper');
			const dashboardLink = $('<a>').attr({ 'href':'admin/dashboard' });
				const dashboardLabel = $('<div>').addClass('menu_label').append('Dashboard');
			dashboardLink.append(dashboardLabel);
		dropdownWrapper.append(dashboardLink);

			const usersLabel = $('<div>').addClass('menu_label').attr({ 'id':'users-activity' }).append('Users');
				const usersDownArrow = $('<div>').addClass('more-down').attr({ 'id':'live-activity-arrow' });
					const usersDownArrowImg = $('<img>').attr({ 'src':'client/down-arrow-icon' }).css({ 'filter':'invert(100%)' });
				usersDownArrow.append(usersDownArrowImg);
			usersLabel.append(usersDownArrow);
		dropdownWrapper.append(usersLabel);

			const usersUnderMenu = $('<div>').addClass('menu_label-under').attr({ 'id':'users-drop' });
				const viewUsersLink = $('<a>').attr({ 'href':'admin/users' });
					const viewUsersLabel = $('<div>').addClass('menu_item_more').append('View users');
				viewUsersLink.append(viewUsersLabel);
			usersUnderMenu.append(viewUsersLink);
				const addNewUserLink = $('<a>').attr({ 'href':'admin/new-user' });
					const addNewUserLabel = $('<div>').addClass('menu_item_more').append('Add new user');
				addNewUserLink.append(addNewUserLabel);
			usersUnderMenu.append(addNewUserLink);
				const editUserLink = $('<a>').attr({ 'id':'edit-user' });
					const editUserLabel = $('<div>').addClass('menu_item_more').append('Edit user');
				editUserLink.append(editUserLabel);
			usersUnderMenu.append(editUserLink);
		dropdownWrapper.append(usersUnderMenu);

			const postsLabel = $('<div>').addClass('menu_label').attr({ 'id':'posts' }).append('Posts');
				const postsDownArrow = $('<div>').addClass('more-down');
					const postsDownArrowImg = $('<img>').attr({ 'src':'client/down-arrow-icon' }).css({ 'filter':'invert(100%)' });
				postsDownArrow.append(postsDownArrowImg);
			postsLabel.append(postsDownArrow);
		dropdownWrapper.append(postsLabel);

			const postsUnderMenu = $('<div>').addClass('menu_label-under').attr({ 'id':'posts-drop' });
				const managePostsLink = $('<a>').attr({ 'href':'admin/posts' });
					const managePostsLabel = $('<div>').addClass('menu_item_more').append('Manage posts');
				managePostsLink.append(managePostsLabel);
			postsUnderMenu.append(managePostsLink);
				const addNewPostLink = $('<a>').attr({ 'href':'admin/new-post' });
					const addNewPostLabel = $('<div>').addClass('menu_item_more').append('Add new post');
				addNewPostLink.append(addNewPostLabel);
			postsUnderMenu.append(addNewPostLink);
				const editPostLink = $('<a>').attr({ 'id':'edit-post' });
					const editPostLabel = $('<div>').addClass('menu_item_more').append('Edit post');
				editPostLink.append(editPostLabel);
			postsUnderMenu.append(editPostLink);
		dropdownWrapper.append(postsUnderMenu); 

		const sliderPostsLabel = $('<div>').addClass('menu_label').attr({ 'id':'posts' }).append('Slider posts');
				const sliderPostsDownArrow = $('<div>').addClass('more-down');
					const sliderPostsDownArrowImg = $('<img>').attr({ 'src':'client/down-arrow-icon' }).css({ 'filter':'invert(100%)' });
				sliderPostsDownArrow.append(sliderPostsDownArrowImg);
			sliderPostsLabel.append(sliderPostsDownArrow);
		dropdownWrapper.append(sliderPostsLabel);

			const sliderPostsUnderMenu = $('<div>').addClass('menu_label-under').attr({ 'id':'posts-drop' });
				const manageSliderPostsLink = $('<a>').attr({ 'href':'admin/slider-posts' });
					const manageSliderPostsLabel = $('<div>').addClass('menu_item_more').append('Manage slider posts');
				manageSliderPostsLink.append(manageSliderPostsLabel);
			sliderPostsUnderMenu.append(manageSliderPostsLink);
				const addNewSliderPostLink = $('<a>').attr({ 'href':'admin/new-slider-post' });
					const addNewSliderPostLabel = $('<div>').addClass('menu_item_more').append('Add new slider post');
				addNewSliderPostLink.append(addNewSliderPostLabel);
			sliderPostsUnderMenu.append(addNewSliderPostLink);
		dropdownWrapper.append(sliderPostsUnderMenu);

		const postCategoriesLabel = $('<div>').addClass('menu_label').attr({ 'id':'post-categories' }).append('Categories');
				const postCategoriesDownArrow = $('<div>').addClass('more-down');
					const postCategoriesDownArrowImg = $('<img>').attr({ 'src':'client/down-arrow-icon' }).css({ 'filter':'invert(100%)' });
				postCategoriesDownArrow.append(postCategoriesDownArrowImg);
			postCategoriesLabel.append(postCategoriesDownArrow);
		dropdownWrapper.append(postCategoriesLabel);

			const postCategoriesUnderMenu = $('<div>').addClass('menu_label-under').attr({ 'id':'categories-drop' });
				const managePostCategoriesLink = $('<a>').attr({ 'href':'admin/categories' });
					const managePostCategoriesLabel = $('<div>').addClass('menu_item_more').append('Post categories');
				managePostCategoriesLink.append(managePostCategoriesLabel);
			postCategoriesUnderMenu.append(managePostCategoriesLink);
				const addNewCategoryLink = $('<a>').attr({ 'href':'admin/new-category' });
					const addNewCategoryLabel = $('<div>').addClass('menu_item_more').append('Add new category');
				addNewCategoryLink.append(addNewCategoryLabel);
			postCategoriesUnderMenu.append(addNewCategoryLink);
				const editCategoryLink = $('<a>').attr({ 'id':'edit-category' });
					const editCategoryLabel = $('<div>').addClass('menu_item_more').append('Edit category');
				editCategoryLink.append(editCategoryLabel);
			postCategoriesUnderMenu.append(editCategoryLink);
		dropdownWrapper.append(postCategoriesUnderMenu);

		const postSubCategoriesLabel = $('<div>').addClass('menu_label').attr({ 'id':'post-sub-categories' }).append('Sub Categories');
				const postSubCategoriesDownArrow = $('<div>').addClass('more-down');
					const postSubCategoriesDownArrowImg = $('<img>').attr({ 'src':'client/down-arrow-icon' }).css({ 'filter':'invert(100%)' });
				postSubCategoriesDownArrow.append(postSubCategoriesDownArrowImg);
			postSubCategoriesLabel.append(postSubCategoriesDownArrow);
		dropdownWrapper.append(postSubCategoriesLabel);

			const postSubCategoriesUnderMenu = $('<div>').addClass('menu_label-under').attr({ 'id':'sub-categories-drop' });
				const manageSubPostCategoriesLink = $('<a>').attr({ 'href':'admin/sub-cats' });
					const manageSubPostCategoriesLabel = $('<div>').addClass('menu_item_more').append('Sub categories');
				manageSubPostCategoriesLink.append(manageSubPostCategoriesLabel);
			postSubCategoriesUnderMenu.append(manageSubPostCategoriesLink);
				const addNewSubCategoryLink = $('<a>').attr({ 'href':'admin/new-sub-category' });
					const addNewSubCategoryLabel = $('<div>').addClass('menu_item_more').append('Add new sub category');
				addNewSubCategoryLink.append(addNewSubCategoryLabel);
			postSubCategoriesUnderMenu.append(addNewSubCategoryLink);
				const editSubCategoryLink = $('<a>').attr({ 'id':'edit-category' });
					const editSubCategoryLabel = $('<div>').addClass('menu_item_more').append('Edit sub category');
				editSubCategoryLink.append(editSubCategoryLabel);
			postSubCategoriesUnderMenu.append(editSubCategoryLink);
		dropdownWrapper.append(postSubCategoriesUnderMenu);

	dropdown.append(dropdownWrapper);

	$('#mobile-drop-wrapper').append(dropdown);


	// clicks //
	$('#menu-drop').click(function(event){
		$('#dropdown').slideToggle(500);
	})

	$('#users-activity').click(function(){
		$('#users-drop').slideToggle();
	})

	$('#posts').click(function(){
		$('#posts-drop').slideToggle();
	})

	$('#business-app').click(function(){
		$('#business-app-drop').slideToggle();
	})

	$('#post-categories').click(function(){
		$('#categories-drop').slideToggle();
	})

	$('#post-sub-categories').click(function(){
		$('#sub-categories-drop').slideToggle();
	})
})