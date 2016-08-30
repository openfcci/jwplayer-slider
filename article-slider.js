jQuery(document).ready(function() {
    var currentIndex = 0,
        items = jQuery('.article-slider div.individual-slide'),
        itemAmt = items.length;

    function cycleItems() {
        for (var index = 0; index < items.length; index++) {
            var i = jQuery('.article-slider div.individual-slide').eq(index);
            if (index === currentIndex) {
                i.css('width', '100%');
                i.css('display', 'inline-block');
                continue;
            }
            //JWPlayer derps out when hide() is used. set dimesions to 0 instead.
            var is_video = isVideo(index);
            if (is_video) {
                i.css('width', '0');
                i.css('height', '0');
            } else {
                i.hide();
            }
        }
    }

    function isVideo(index) {
        if ($('#jwplayer-video-' + index).length) {
            return true;
        }
        return false;
    }

    function pauseVideos() {
        try {
            if ($('#jwplayer-video-' + currentIndex).length) {
                var state = jwplayer('jwplayer-video-' + currentIndex).getState();
                if (state === 'playing') {
                    jwplayer('jwplayer-video-' + currentIndex).pause();
                }
            }
        } catch (e) {
            //browser does not support doing this, so catch error and continue
        }
    }
    cycleItems();

    jQuery('.next').click(function() {
        pauseVideos();
        currentIndex += 1;
        if (currentIndex > itemAmt - 1) {
            currentIndex = 0;
        }
        cycleItems();
    });

    jQuery('.prev').click(function() {
        pauseVideos();
        currentIndex -= 1;
        if (currentIndex < 0) {
            currentIndex = itemAmt - 1;
        }
        cycleItems();
    });

    jQuery('.image-info').on('click', function() { // Show caption on info icon click
        jQuery(this).next('span').toggleClass('image-caption-display');
    });

    jQuery('button.prev, button.next').show();
    jQuery('img.image-info').show();
    jQuery('span.slide-number').show();

});