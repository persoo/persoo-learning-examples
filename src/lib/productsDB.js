var productsDB = {
	getProducts: function(itemIDs, callback) {
        window.persoo('send', 'getProducts', {
			_w : 'catalogue_getProducts',
			itemIDs : itemIDs
		},callback);
	},
	getProductsByCategoryID: function(categoryID, callback) {
		window.persoo('send', 'getProductsByCategory', {
			_w : 'catalogue_getProductsByCategory',
			categoryID : categoryID
		}, callback);
	},
	getCategoryTree: function(callback) {
		window.persoo('send', 'getCategoryTree', {
			_w : 'catalogue_getCategoryTree'
		}, callback);
	},
	getSampleProduct: function(callback) {
		var myThis = this;
		this.getCategoryTree(function (data){
			console.log(data);
			if (data.topCategories && data.topCategories.length > 0) {
			   var sampleCategoryID = data.topCategories[0].categoryID;
			   myThis.getProductsByCategoryID(sampleCategoryID, function(data){
				   if (data.categoryProducts && data.categoryProducts.length > 0) {
					   callback(data.categoryProducts[0]);
				   } else {
					   callback(null);
				   }
			   });
			} else {
				callback(null);
			}
		})
	}
};
// FIXME refactor this old code

var editor;

function showDebug() {
	var elems = document.querySelectorAll(".debug");
	for ( var i = 0; i < elems.length; i++) {
		elems[i].classList.toggle("hide");
	}
}
function hideDebug() {
	var elems = document.querySelectorAll(".debug");
	for ( var i = 0; i < elems.length; i++) {
		elems[i].classList.toggle("hide");
	}
}
function foldDebug() {
	editor.getSession().foldAll(1, null, 1);
}

function showProductDetail(data) {
	var detailElement = document.getElementById('box-detail');
	var item = data.products[0];

	var html = '<h1>' + item.title + '</h1>';
	html += '<div class="breadcrumb"><a href="homepage.html">Home</a>';
	for ( var cat = 0; item.categoryIDs && cat < item.categoryIDs.length; cat++) {
		html += ' &gt; <a href="category.html?category=' + item.categoryIDs[cat]
				+ '">' + item.categoryIDs[cat] + '</a>';
	}
	html += '</div>';

	html += '<div class="main-image">';
	html += '  <img src=' + item.imageLink + '>';
	html += '</div>';
	html += '<div class="main-info">';
	html += '  <div class="info">Price: ' + item.price + '</div>';
	html += '  <div class="info">View count: ' + item.viewCount + '</div>';
	html += '  <div class="info">Buy count: ' + item.buyCount + '</div>';
	html += '  <div class="link">Eshop: <a href="' + item.link
			+ '">detail produktu</a></div>';
	html += '  <div class="categories">Categories: ';
	for ( var cat = 0; item.categoryIDs && cat < item.categoryIDs.length; cat++) {
		html += '  <div class="category"><a href="category.html?category='
				+ item.categoryIDs[cat] + '">' + item.categoryIDs[cat]
				+ '</a></div>';
	}
	html += '  </div>';
	html += '  <div class="button buy" onclick="addToBasketInCookies(\'' +
				item.itemID + '\', ' + item.price + '); showBasketStatus();"><a href="#">Koupit</a></div>';
	html += '</div>';
	html += '<div class="more-info">ITEM as JSON:(<span class="link" onclick="showDebug()">show/hide</span> | <span class="link" onclick="foldDebug()">fold</span>)';
	html += '  <div class="editor debug hide" id="jsoneditor">'
			+ JSON.stringify(item) + '</div>';
	html += '</div>';
	html += '<div id="box-alsoBoughtProducts" class="mini-products"><h2>Also Bought</h2><div id="alsoBoughtProducts"></div><div class="clear"></div></div>';
	html += '<div id="box-alsoViewedProducts" class="mini-products"><h2>Also Viewed</h2><div id="alsoViewedProducts"></div><div class="clear"></div></div>';

	detailElement.innerHTML = html;

	editor = ace.edit("jsoneditor");
	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/javascript");
	editor.setValue(JSON.stringify(item, false, 4));
	editor.setReadOnly(true);
	editor.clearSelection();
	setTimeout(function() {
		editor.getSession().foldAll(1, null, 1);
	}, 50);

    persoo('send', 'getProducts', {_w: 'catalogue_getProducts', ids:item.alsoBought});
	persoo('onLoad', function(){showProductMiniBox('alsoBoughtProducts');});

    persoo('send', 'getProducts', {_w: 'catalogue_getProducts', ids:item.alsoViewed});
	persoo('onLoad', function(){showProductMiniBox('alsoViewedProducts');});
}

function showProductMiniBox(containerId){
	var container = document.getElementById(containerId);
	var items = persoo.data.products;
	if (items) {
    	var html = "";
    	for (var i = 0; i < items.length; i++) {
    		html += renderProductMiniCard(items[i]);
    	}
    	container.innerHTML = html;
	}
}


function renderProductCard(item) {
	var html = '<div class="productCard">';
	html += '<div class="image">';
	html += '  <a href="detail.html?product=' + item.itemGroupID + '"><img src=' + item.imageLink + '></a>';
	html += '</div>';
	html += '<div class="main-info">';
	html += '  <div class="name">' + item.title + '</div>';
	html += '  <div class="info">Brand: ' + item.brand + '</div>';
	html += '  <div class="info">Price: ' + item.price + '</div>';
//	html += '  <div class="info">View count: ' + item.viewCount + '</div>';
//	html += '  <div class="info">Buy count: ' + item.buyCount + '</div>';
//	html += '  <div class="link">Eshop: <a href="' + item.link + '">detail produktu</a></div>';
	html += '  <div class="link">Preview: <a href="detail.html?product=' + item.itemGroupID + '">detail produktu</a></div>';
	html += '  <div class="categories">Categories: ';
	for ( var cat = 0; item.categoryIDs && cat < item.categoryIDs.length; cat++) {
		html += '  <span class="category"><a href="category.html?category='
				+ item.categoryIDs[cat] + '">' + item.categoryIDs[cat]
				+ '</a></span>';
	}
	html += '  </div>';
	html += '  <div class="button buy" onclick="addToBasketInCookies(\'' +
				item.itemID + '\', ' + item.price + '); showBasketStatus();"><a href="#">Koupit</a></div>';
	html += '</div>';
	html += '</div>';


	return html;
}

function renderProductMiniCard(item) {
	var html = '<div class="productMiniCard">';
	html += '<div class="image">';
	html += '  <a href="detail.html?product=' + item.itemGroupID + '"><img src=' + item.imageLink + '></a>';
	html += '</div>';
	html += '<div class="main-info">';
	html += '  <div class="name">' + item.title + '</div>';
	html += '  <div class="info">Brand: ' + item.brand + '</div>';
	html += '  <div class="info">Price: ' + item.price + '</div>';
	//html += '  <div class="info">View count: ' + item.viewCount + '</div>';
	//html += '  <div class="info">Buy count: ' + item.viewCount + '</div>';
	//html += '  <div class="link">Eshop: <a href="' + item.link + '">detail produktu</a></div>';
	html += '  <div class="link">Preview: <a href="detail.html?product=' + item.itemGroupID + '">detail produktu</a></div>';
	html += '</div>';
	html += '</div>';

	return html;
}


function showCategoryList() {
	var categoryListElement = document.getElementById('category-product-list');
	var items = persoo.data.categoryProducts;
	var category = persoo.data.categoryIDs;

	var html;
	if (category) {
		html = '<h1>Category ' + category.title + ' (' + category.categoryID + ')</h1>';
	} else {
		html = '<h1>Category (' + QueryString.category + ')</h1>';
	}


	html += '<div class="breadcrumb"><a href="homepage.html">Home</a>';
	if (category && category.categoryIDs) {
    	for ( var cat = 0; cat < category.categoryIDs.length; cat++) {
    		html += ' &gt; <a href="category.html?category=' + category.categoryIDs[cat]
    				+ '">' + category.categoryIDs[cat] + '</a>';
    	}
	}
	html += ' (' + (category && category.size ? category.size : '?') + ' items in category)</div>';

	for (var i = 0; i < items.length; i++) {
		html += renderProductCard(items[i]);
	}

	html += '<div style="clear:both;">';

	categoryListElement.innerHTML = html;
}

function showCategoryTree() {
	var categoryTreeElement = document.getElementById('category-tree');
	var category = persoo.data.topCategories;

	var html = '<h2>Category tree</h2>';


	html += '<ul>';
	for ( var i = 0; i < category.length; i++) {
		var cat = category[i];
		var categoryLabel = (cat.title ? cat.title : (cat.CATEGORYTEXT ? cat.CATEGORYTEXT : cat.categoryID));
		html += '<li>';
		html += '<a href="category.html?category=' + cat.categoryID + '">' + categoryLabel + '</a>';
		html += '<li>';
		html += ' (' + (cat.size ? cat.size : '?') + ' items)</div>';
		html += '</li>'
	}
	html += '</ul>';

	categoryTreeElement.innerHTML = html;
}

function showBasketStatus() {
	var basketStatusElem = document.getElementById('basketStatus');
	var basketItems = getBasketItems();
	var html = "";

	if (basketItems) {
		html += "<div class='basketBox'>";
		html += 'Basket (' + sumBasketItems(basketItems) + ' Kč) contains ';
		html += '<div class="button basket" onclick="purchaseBasketInCookies();showBasketStatus();">Koupit košík</div>';
		html += '<div class="button basket clear-right" onclick="deleteBasketInCookies();showBasketStatus();">Vysypat košík</div>';
		html += '<pre class="basket">' + JSON.stringify(basketItems, false, 4) + ".</pre>";
		html += '<div class="clear"></div>';
		html += "</div>";
	} else {
		html += "<div class='basketBox'>Basket is empty.</div>"
	}
    basketStatusElem.innerHTML = html;
}
