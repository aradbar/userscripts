// ==UserScript==
// @name		 google.com sponsored
// @include	  /www\.google\.com\/search/
// ==/UserScript==

function markAds() {
	var ads = document.querySelectorAll("[data-text-ad='1'] > div");

	Array.prototype.forEach.call(ads, function(ad, i) {
		var id = 'google-ad-' + i;
		ad.setAttribute('id', id);

		var adTitlePart = ad.children[0];
		if (!adTitlePart.innerText.includes('Ad·')) {
		    adTitlePart = ad.children[1];
		}

		adTitlePart.classList.add('ad-part-visible');

		Array.prototype.forEach.call(ad.children, function(adPart, i) {
			adPart.classList.add('ad-part');
		});

		var adHeader = adTitlePart.firstChild.children[2];

		// Color the word "Ad"
		adHeader.firstChild.style.color = 'red';

		// Add show / hide link
		var showId = id + '-show';
		adHeader.innerHTML += '&nbsp;&nbsp;<a href="javascript: void(0)" id="' + showId + '">(show)</a>';

		function toggleVisibility() {
			var adParts = document.querySelectorAll('#' + id + ' .ad-part:not(.ad-part-visible)');

			Array.prototype.forEach.call(adParts, function(adPart, i) {
				if (adPart.style.display == 'none') {
                    adPart.style.display = '';
				} else {
					adPart.style.display = 'none';
				};
			});

			if (this.innerHTML == '(show)') {
				this.innerHTML = '(hide)';
			} else {
				this.innerHTML = '(show)';
			};
		};

		document.querySelector('#' + showId).onclick = toggleVisibility;
		toggleVisibility();
	});
}

(function() {
	'use strict';
    markAds();
})();
