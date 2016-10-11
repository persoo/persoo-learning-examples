/**
 * Global settings to be used for all demos/excercises/solutions.
 */

// Persoo Account ID (apikey) to be used in all persoo demos.
// To override this settings and save new value to a cookie, add ?persooAccountID="<yourAccountID>" 
// to url address in any demo.
var persooAccountID = "v09s63pt9rtjfi15vu91apmj";



//
// Advanced Settings for Custom Persoo Clouds
//
// Usually you do not need to change the settings below this line
//-----------------------------------------------------------------------------

var persooScriptsHostname = "scripts.persoo.cz";
var persooRTPHostname = "rtp.persoo.cz";

// read the persooAccountID, scriptsHostname from the url parameter or cookies or from defaults above
var APIKEY_COOKIE_NAME = "persooAccountID";
persooAccountID = QueryString.persooAccountID || docCookies.getItem(APIKEY_COOKIE_NAME) || persooAccountID;
docCookies.setItem(APIKEY_COOKIE_NAME, persooAccountID);

var SCRIPTS_COOKIE_NAME = "persooScriptsHostname";
persooScriptsHostname = QueryString[SCRIPTS_COOKIE_NAME] || docCookies.getItem(SCRIPTS_COOKIE_NAME) || persooScriptsHostname;
docCookies.setItem(SCRIPTS_COOKIE_NAME, persooScriptsHostname);

// Note: persoo.js client will load RTP hostname from the cookie. No need to add it to persooConfig.
var RTP_HOSTNAME_COOKIE_NAME = "rtpHostname";
persooRTPHostname = QueryString[RTP_HOSTNAME_COOKIE_NAME] || docCookies.getItem(RTP_HOSTNAME_COOKIE_NAME) || persooRTPHostname;
if (QueryString[RTP_HOSTNAME_COOKIE_NAME]) {
	docCookies.setItem(RTP_HOSTNAME_COOKIE_NAME, QueryString[RTP_HOSTNAME_COOKIE_NAME]);
}