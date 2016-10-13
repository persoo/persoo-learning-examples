var persooDemo = persooDemo || {};

persooDemo.navigationConfig = [
    {
    	type: 'demo',
    	title: 'Product Import',
    	description: 'How to import product to Persoo. Magics with item preprocessing and other tricks.',
    	url: 'ch1-1-product-import'
    },
    {
    	type: 'group',
    	title: 'Data Collection',
    	description: 'How to report events to Persoo.',
    	children: [
            {
	           	type: 'demo',
	           	title: 'Persoo Snippet',
	           	description: 'Using javascript snippet to be included to HTML page.',
	           	url: 'ch2-1-snippet'
            },
    	]
    },
    {
    	type: 'demo',
    	title: 'Eshop - product recommendations',
    	description: 'Setting dataLayer in simple eshop. Displaying simple boxes with product recommendations',
    	url: 'eshop'
    },    
    {
    	type: 'demo',
    	title: 'Auto-complete/suggest in site search',
    	description: 'More and more users are using site search to find what they need. Speed matters. Personalizations drives higher conversion.',
    	url: 'autocomplete'
    }    
];
persooDemo.navigation = {
	'Ch1 Product Import': 'ch1-1-product-import',
	'Ch2 Snippet': 'ch2-1-snippet',
	'Ch3 eShop': 'eshop' /*,
	'Imports': {
		'Import Product Feed': 'ch1.1-simpleProductFeed',
		'Import Preprocessing': 'ch1.2-importPreprocessing'
	},
	'Data collection': {
		'Install Persoo Snippet': 'ch2.1-snippet',
		'Setting Data Layer': 'ch2.2-dataLayer',
		'Using Events': 'ch2.3-events',
	},
	'Recommendations': {
		'Display box with products (persoo rendering)': 'ch1.1-simpleProductFeed',
		'Display box with products (ajax rendering)': 'ch1.1-simpleProductFeed',		
		'Product Search Algorithm': 'ch1.2-importPreprocessing',
		'Scenarios': 'ch1.2-importPreprocessing'
	},
	'Web Widgets': {
		'Import Product Feed': 'ch1.1-simpleProductFeed',
		'Import Preprocessing': 'ch1.2-importPreprocessing'
	},
	'Emailing': {
		'Import Product Feed': 'ch1.1-simpleProductFeed',
		'Import Preprocessing': 'ch1.2-importPreprocessing'
	},
	'Other cool features': {
		'Tags': 'ch1.1-simpleProductFeed',
		'Exports': 'ch1.2-importPreprocessing'
	},
	*/
};
