/**
 * Define actions, which can be called from Persoo RTP unit.
 * 
 * @param document
 * @param window
 */
function persooAddActions(document, window){

	// create object for persoo actions if not exists, 
	// otherwise just add actions.
	// we don't know, which async script will load first.
	window.persoo = window.persoo || {};
	window.persoo.actions = window.persoo.actions || {};
	
	// shortcut
	var a = persoo.actions;
		
	//------------------------------------------------------------------------------------------------------------------
	// List of generic actions:
	//------------------------------------------------------------------------------------------------------------------
	
	
	//------------------------------------------------------------------------------------------------------------------
	// List of user defined actions:
	//------------------------------------------------------------------------------------------------------------------
	
	// This is needed for qunit tests
	a.testAction = function(){
		console.log('Action: testAction - setting window.actionTriggersWorks');
		window.actionTriggersWorks = true;
	};	
}
// we need persooAddActions() wrapper for tests
persooAddActions(document, window);