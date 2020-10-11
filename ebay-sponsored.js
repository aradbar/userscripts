// ==UserScript==
// @name             ebay.com sponsored
// @include          /www\.ebay\.com\/sch\//
// ==/UserScript==


function emphasizeSponsored() {
	var sponsoredResults = document.querySelectorAll("[class$='SPONSORED']:not(.emphasized-sponsored)");

	Array.prototype.forEach.call(sponsoredResults, function(sponsored, i) {
		sponsored.classList.add('emphasized-sponsored');
		sponsored.innerHTML = '&nbsp;&nbsp;' + sponsored.innerHTML + '&nbsp;&nbsp;';
		sponsored.style.backgroundColor = 'red';
		sponsored.style.color = 'white';
		sponsored.style.borderRadius = '5px';
		sponsored.style.fontSize = '15px';
	});
}


(function() {
	'use strict';

	setTimeout(
		function() {
			emphasizeSponsored();
			document.querySelector("#mainContent").addEventListener('DOMSubtreeModified', emphasizeSponsored);
		},
		1000
	);
})();
