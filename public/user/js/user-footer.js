$(document).ready(function(){
    const footer = $('<div>').addClass('footer');
        const footerWrapper = $('<div>').addClass('footer-wrapper');
            const footerLogo = $('<div>').addClass('footer-logo').append('newsMK');
        footerWrapper.append(footerLogo);

            const footerRightWrapper = $('<div>').addClass('footer-right-wrapper');
                const followUs = $('<div>').addClass('follow-us');
            footerRightWrapper.append(followUs);
                const socialMedia = $('<div>').addClass('social-media');
                    const fbIcon = $('<div>').addClass('social-media-icon');
                        const fbIconImg = $('<img>').attr({ 'src':'client/facebook-icon' });
                    fbIcon.append(fbIconImg);
                socialMedia.append(fbIcon);
                    const instaIcon = $('<div>').addClass('social-media-icon');
                        const instaIconImg = $('<img>').attr({ 'src':'client/insta-icon' });
                    instaIcon.append(instaIconImg);
                socialMedia.append(instaIcon);
                    const twitIcon = $('<div>').addClass('social-media-icon');
                        const twitIconImg = $('<img>').attr({ 'src':'client/twitter-icon' });
                    twitIcon.append(twitIconImg);
                socialMedia.append(twitIcon);
            footerRightWrapper.append(socialMedia);
        footerWrapper.append(footerRightWrapper);
    footer.append(footerWrapper);
        
    $('#footer-place').append(footer);

})