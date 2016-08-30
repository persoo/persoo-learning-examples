/**
 * Adds functionality, which is common for all Demo cases. *
 *   - display Persoo Demo navigation
 *   - show Persoo Demo Console.
 *   - TODO show Persoo footer
 *
 * @author Michal
 */

$(function(){
		function fixNav(){
				if( $(window).scrollTop() > 50){
						$('#persooDemoNavigation').addClass('fixed');
						$('#persooDemoNavigation2').addClass('fixed');
				} else {
						$('#persooDemoNavigation').removeClass('fixed');
						$('#persooDemoNavigation2').removeClass('fixed');
				}
		}
		fixNav();
		$(window).scroll(function(){
        fixNav();
    });
});
