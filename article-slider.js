jQuery(document).ready(function () {
    var currentIndex = 0,
            items = jQuery('.article-slider div.individual-slide'),
            itemAmt = items.length;

    function cycleItems() {
        var item = jQuery('.article-slider div.individual-slide').eq(currentIndex);
        items.hide();
        item.css('display', 'inline-block');
    }

    function pauseVideos() {
        try {
            var state = jwplayer('jwplayer-video-' + currentIndex).getState();
            if (state === 'playing') {
                jwplayer('jwplayer-video-' + currentIndex).pause();
            }
        } catch (e) {
            console.log(e);
            //browser does not support doing this, so catch error and continue
        }
    }
    cycleItems();

    jQuery('.next').click(function () {
        console.log('next item');
        pauseVideos();
        currentIndex += 1;
        if (currentIndex > itemAmt - 1) {
            currentIndex = 0;
        }
        cycleItems();
    });

    jQuery('.prev').click(function () {
        console.log('previous item');
        pauseVideos();
        currentIndex -= 1;
        if (currentIndex < 0) {
            currentIndex = itemAmt - 1;
        }
        cycleItems();
    });

    jQuery('.image-info').on('click', function () { // Show caption on info icon click
        jQuery(this).next('span').toggleClass('image-caption-display');
    });

    jQuery('button.prev, button.next').show();
    jQuery('img.image-info').show();
    jQuery('span.slide-number').show();

});
