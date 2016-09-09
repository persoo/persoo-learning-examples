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
var URL_ROOT = getScriptHomePath('globalConfig.js');
if( URL_ROOT == './') {URL_ROOT = getScriptHomePath('persoo-demo-all.js');}

function convertNavigationStructureToList(navConfig, list, prefix) {
	for(var i = 0; i < navConfig.length; i++){
		var navItem = navConfig[i];
		var newPrefix = (prefix ? prefix + '.' : '') + (i+1);
		if (navItem.type == 'demo') {
			navItem.numbering = newPrefix
			list.push(navItem);

		} else if (navItem.type == 'group') {
			list = list.concat(convertNavigationStructureToList(navItem.children, [], newPrefix));
		}
	}
	return list;
}

function getTopLinks() {
	var topLinks = {};

	var currentPath = document.location.pathname;
	var rootPath = URL_ROOT.replace(/.*:\/\/[^/]+\//,'/');

	var currentDemoURL = currentPath.replace(rootPath, '').replace(/\/.*/, '');
	if (currentDemoURL) {
		var list = convertNavigationStructureToList(persooDemo.navigationConfig, []);
		for (var j = 0; j < list.length; j++) {
			if (list[j].url == currentDemoURL) {
				if (j > 0) {
					var item = list[j - 1];
					topLinks.prevURL = URL_ROOT + item.url;
					topLinks.prevTitle = item.numbering + ' ' + item.title;
				}
				if (j < list.length-1) {
					var item = list[j + 1];
					topLinks.nextURL = URL_ROOT + item.url;
					topLinks.nextTitle = item.numbering + ' ' + item.title;
				}
				break;
			}
		}
	}
	return topLinks;
}

/**
 * Top navigation panel.
 */
function showPersooDemoNavigation(){
	var navigationDiv = document.createElement('div');
	navigationDiv.id = "persooDemoNavigation";
	var topLinks = getTopLinks();
	var navHTML = '' +
			'<div class="navbar navbar-default">' +
			    '<div class="container-fluid">' +
			        '<div class="navbar-header">' +
				      '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">' +
				        '<span class="sr-only">Toggle navigation</span>' +
				        '<span class="icon-bar"></span>' +
				        '<span class="icon-bar"></span>' +
				        '<span class="icon-bar"></span>' +
				      '</button>' +
				      '<a href="' + URL_ROOT + '"><img src="' + URL_ROOT + '/../../common/img/persoo_logo_60h.png" height="40px" style="float:left;margin:0px 15px 0 0;"></a>' +
				      '<a class="navbar-brand" href="' + URL_ROOT + '">Playground</a>' +
				    '</div>' +
				    '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
					    '<ul class="nav navbar-nav">' +
						     '<li>' +
								'<div class="btn-group navbar-form" role="group" aria-label="...">' +
								    '<button type="button" class="btn btn-default" onclick="' + "javascript:persoo('showAdminBar');" + '">Show admin bar</button>' +
								    '<button type="button" class="btn btn-default" onclick="' + "javascript:persoo('setEnvironment', 'test');" + '">Test environment</button>' +
								    '</div></li>' +
     	        '</ul>' +
				    '</div>' + 	// navbar-collapse
				'</div>' + 	// fluid-container
			'</div>';		// div.navbar
	navigationDiv.innerHTML = navHTML;
	document.body.insertBefore(navigationDiv, document.body.firstChild);
}

/**
 * Top navigation panel. 2
 */
function showPersooDemoNavigation2(){
	var navigationDiv = document.createElement('div');
	navigationDiv.id = "persooDemoNavigation2";
	var topLinks = getTopLinks();
	var navHTML = '' +
			'<div class="navbar navbar-default">' +
			    '<div class="container-fluid">' +
				    '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
					    '<ul class="nav navbar-nav">' +
								'<li>' +
                   (topLinks.prevURL ?
					             '<a href="' + topLinks.prevURL + '" title="Previous demo">' +
					             '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' + topLinks.prevTitle + '</a>' : '') +
							  '</li>' +
					         '<li><a href="' + URL_ROOT + '" title="List of available demos">' +
					             '<span class="glyphicon glyphicon-list" aria-hidden="true"></span>&nbsp;demo list</a>' +
							  '<li>' +
					         (topLinks.nextURL ?
					             '<a href="' + topLinks.nextURL + '" title="Next demo">' +
					             '' + topLinks.nextTitle + '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>' : '') +
							  '</li>' +
     	        '</ul>' +
				    '</div>' + 	// navbar-collapse
				'</div>' + 	// fluid-container
			'</div>';		// div.navbar
	navigationDiv.innerHTML = navHTML;
	document.body.insertBefore(navigationDiv, document.body.firstChild);
}

/**
 * Mount Persoo Demo navigation for HP to an element rootElement.
 * @param navigationConfig
 * @param rootElement
 * @returns
 */
function mountPersooHPNavigation(navigationConfig, rootElement) {
	function generInnerNavigation(navConfig, html, level) {
		html += '<div class="navContainer level' + level + '"><ol>';
		for(var i = 0; i < navConfig.length; i++){
			html += '<li>';
			var navItem = navConfig[i];
			if (navItem.type == 'demo') {
				html += '<a href="' + URL_ROOT + navItem.url + '">' + navItem.title + '</a><br />';
				html += '<p><i>' + navItem.description + '</i></p>';
			} else if (navItem.type == 'group') {
				html += navItem.title;
				html += '<p><i>' + navItem.description + '</i></p>';
				html += generInnerNavigation(navItem.children, '', level + 1);
			}
			html += '</li>';
		}
		html += '</ol></div>';

		return html;
	}
	var html = generInnerNavigation(navigationConfig, '', 0);

	if (typeof rootElement == 'string') {
		rootElement = document.getElementById(rootElement);
	}
	rootElement.innerHTML = html;
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
				  '<li class="nav-header">This demo pages</li>';
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
		showPersooDemoNavigation2();
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
	link.href = URL_ROOT + '../common/persoo-demo-all.css';
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

/*Footer*/
$( document ).ready(function footer(){
	console.log("test");
	var footerElement = document.getElementById('footerElement');
	var footerContainer = '<span>&copy; Persoo.cz 2016</span>';
	footerElement.innerHTML = footerContainer;
});
footer();
