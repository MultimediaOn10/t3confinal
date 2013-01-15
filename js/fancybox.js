$(document).ready(function() {
	$(".fancybox-media").fancybox({
		openEffect  : 'none',
		closeEffect : 'none',
		helpers : {
			media : {}
		}
	});

	$(".fancybox-images").attr('rel', 'gallery')
	$(".fancybox-images").fancybox({
        helpers: {
            thumbs: {
                width  : 70,
                height : 70,
                source  : function(current) {
                    return $(current.element).data('thumbnail');
                }
            }
        }
    });
});