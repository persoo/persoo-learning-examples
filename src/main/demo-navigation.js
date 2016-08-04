/**
 * Adds functionality, which is common for all Demo cases. *
 *   - display Persoo Demo navigation
 *   - show Persoo Demo Console.
 *   - TODO show Persoo footer
 *
 * @author kuba
 */

// Returns true, if filename matches URL.
// Used for finding active links in navigation.
function matchFilenameInUrl(url, filename){
	return (new RegExp('/' + filename + '([#?][^#?]*)?$')).test(url);
}

/**
 * Find script element with given filename and return URL to its containing folder.
 * @param scriptFilename
 * @returns {String} URL to folder containing scriptFilename
 */
function getScriptHomePath( scriptFilename ) {
	var urlPath = './';
	var scripts = document.getElementsByTagName("SCRIPT");
	var len = scripts.length;
	for ( var i = 0; i < len; i++) {
		if (scripts[i].src.indexOf('/' + scriptFilename) > -1) {
			urlPath = scripts[i].src.replace(
					scriptFilename, '');
			break;
		}
	}
	return urlPath;
}
var URL_ROOT = getScriptHomePath('demo-navigation.js');
if( URL_ROOT == './') {URL_ROOT = getScriptHomePath('demo-all.js');}


/**
 * Top navigation contains list of all demos grouped by categories.
 */
function showPersooDemoNavigation(){
	var navigationDiv = document.createElement('div');
	navigationDiv.id = "persooDemoNavigation";
	var navHTML = ('' +
			'<div class="navbar navbar-default">' +
			    '<div class="container-fluid">' +
			        '<div class="navbar-header">' +
				      '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">' +
				        '<span class="sr-only">Toggle navigation</span>' +
				        '<span class="icon-bar"></span>' +
				        '<span class="icon-bar"></span>' +
				        '<span class="icon-bar"></span>' +
				      '</button>' +
				      '<a class="navbar-brand" href="' + URL_ROOT + '..">Persoo Playground</a>' +
				    '</div>' +				    
				    '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
					    '<ul class="nav navbar-nav">');

	// TODO mark active links

	function generNavigation( navConfig, navHTML, level ) {
		for(var item in navConfig){
			if( navConfig.hasOwnProperty(item) ){
				if( typeof navConfig[item] === 'string' ){
					if(navConfig[item].indexOf('javascript:')==0){
						// on click run javascript
						navHTML += '<li><a href="' + navConfig[item] + '">' + item + '</a></li>';
					} else {
						// add link with correct path
						navHTML += '<li><a href="' + URL_ROOT + navConfig[item] + '">' + item + '</a></li>';
					}
				} else if( typeof navConfig[item] === 'object' ){
					if( level < 1 ){
						navHTML += '<li class="dropdown">' +
									'<a class="dropdown-toggle" data-toggle="dropdown" href="#">' +	item +
									'<b class="caret"></b></a>';
					} else {
						navHTML += '<li class="dropdown-submenu">' +
						'<a tabindex="-1" href="#">' + item + '</a>';
					}
	                navHTML += '<ul class="dropdown-menu">';
					navHTML = generNavigation(navConfig[item], navHTML, level+1);
	                navHTML += '</ul></li>';
				}
			}
		}
		return navHTML;
	}
	navHTML = generNavigation(persooDemo.navigation, navHTML, 0);

	navHTML += '<li>' +
		'<div class="btn-group navbar-form" role="group" aria-label="...">' +
		    '<button type="button" class="btn btn-default" onclick="' + "javascript:persoo('showAdminBar');" + '">Show admin bar</button>' +
		    '<button type="button" class="btn btn-default" onclick="' + "javascript:persoo('setEnvironment', 'test');" + '">Test environment</button>' +
	    '</div></li>';	
	
	navHTML += ('' +
					'</ul>' +
				'</div>' + 	// navbar-collapse
				'</div>' + 	// fluid-container
			'</div>');		// div.navbar
	navigationDiv.innerHTML = navHTML;
	document.body.insertBefore(navigationDiv, document.body.firstChild);
}

/**
 * Local navigation contains only list of pages in currently selected demo.
 */
function showPersooDemoLocalNavigation(){
	var localNavDiv = document.getElementById('localNavigation');
    localNavDiv.className += ' well';
    localNavDiv.style.padding = '8px 0';

	var navConfig = persooDemo.localNavigation;
	var navHTML = '<ul class="nav nav-list">' +
				  '<li class="nav-header">This demo pages:</li>';
	var active;
	var uniqueID=1;
	for(var item in navConfig){
		if( navConfig.hasOwnProperty(item) ){
			if( typeof navConfig[item] === 'string' ){
				// add item
				active = ( matchFilenameInUrl(document.URL, navConfig[item])  ? ' class="active"' : '');
				navHTML += '<li'+ active +'><a href="' + navConfig[item] + '">' + item + '</a></li>';
			} else if( typeof navConfig[item] === 'object' ){
				// add sub section


				var subNavHTML = "",
                	subConfig = navConfig[item],
                	activeSubNav = false;
                for(var subitem in subConfig){
            		if( subConfig.hasOwnProperty(subitem) ){
            			if( typeof subConfig[subitem] === 'string' ){
            				// add sub item
            				active = ( matchFilenameInUrl(document.URL, subConfig[subitem])  ? ' class="active"' : '');
            				subNavHTML += '<li' + active + '><a href="' + subConfig[subitem] + '">' + subitem + '</a></li>';
            				if(active){ activeSubNav = true; }
            			}
            			// other levels are not supported
            		}
                }

                navHTML += '<li><a href="#" data-target="#submenu' + uniqueID + '" data-toggle="collapse"><i class="icon-chevron-right"></i>' +	item + '</a>';
                navHTML += '<ul  id="submenu' + uniqueID + '" class="nav nav-list collapse' + (activeSubNav ? ' in':'') + '">';
                uniqueID++;
                navHTML += subNavHTML;
                navHTML += '</ul></li>';
			}
		}
	}
    navHTML += '</ul>';

	localNavDiv.innerHTML = navHTML;
}

function mountTopNavigation(headElement) {	
	if( typeof persooDemo === 'undefined' || !persooDemo.navigation){
		// load persoo-nav-config.js
		var configScript = document.createElement('script');
		configScript.async = 1;
		configScript.src = URL_ROOT + 'demo-nav-config.js';
		function onConfigScriptLoad() {
			showPersooDemoNavigation();
			headElement.removeChild(configScript);
		}
		configScript.onload = onConfigScriptLoad;
		headElement.appendChild(configScript);
	} else {
		// already loaded
		showPersooDemoNavigation();
	}
}

function mountLocalNavigation(headElement) {
	var localConfigScript = document.createElement('script');
	localConfigScript.async = 1;
	localConfigScript.src = document.URL.replace(/\/[^\/]*$/,'/') + 'local-nav-config.js';
	function onLocalConfigScriptLoad() {
		showPersooDemoLocalNavigation();
		headElement.removeChild(localConfigScript);
	}
	localConfigScript.onload = onLocalConfigScriptLoad;
	headElement.appendChild(localConfigScript);
}

function mountNavigationCSS(headElement) {
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = URL_ROOT + '../../common/persoo-demo-all.css';
	link.media = 'all';
	headElement.appendChild(link);
}


/* main */
var headElement = document.getElementsByTagName('head')[0];
mountNavigationCSS(headElement);
$( document ).ready(function() {
    // FIXME use pure javascript solution
    mountTopNavigation(headElement);
});
mountLocalNavigation(headElement);
