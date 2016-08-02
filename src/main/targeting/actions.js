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
	
	function appendDivOnce( whereId, divId, divClass, divHTML ){
		// if element does not exist 
		if( document.getElementById(divId) == null ){
			var parent = document.getElementById(whereId);
			var box = document.createElement('div');
			box.id = divId;
			box.className = divClass;
			box.innerHTML = divHTML;
			parent.appendChild(box);
		}
	}
	
	//------------------------------------------------------------------------------------------------------------------
	// List of user defined actions:
	//------------------------------------------------------------------------------------------------------------------
	
	a.offerOfTheDay = function(day){
		appendDivOnce('targetedActions',
				'offerOfTheDay',	// id
				"alert alert-error",// class
				'Cool products on sale! Only on '+day+'!' // content
		);		
	};
	a.messageClickedThreeTimes = function(){
		appendDivOnce('targetedActions',
				'clickedThreeTimes',	// id
				"alert alert-info",// class
				'You clicked the button at least three times.' // content
		);		
	};
	a.messageVisitedCoolProduct = function(){
		appendDivOnce('targetedActions',
				'visitedCoolProduct',	// id
				"alert alert-success",	// class
				'You had visited our Cool product. Wanna buy it?' // content
		);		
	};
	
	
	// This is needed for qunit tests
	a.testAction = function(){
		console.log('Action: testAction - setting window.actionTriggersWorks');
		window.actionTriggersWorks = true;
	};	
}
// we need persooAddActions() wrapper for tests
persooAddActions(document, window);