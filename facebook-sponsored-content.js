// ==UserScript==
// @name		 facebook.com sponsored
// @include	  /www\.facebook\.com/
// ==/UserScript==

function removeSponsored() {
	var sponsoredLabels = document.querySelectorAll(
		"[data-pagelet^='FeedUnit_']:not(.facebook-sponsored)"
	);

	Array.prototype.forEach.call(sponsoredLabels, function(feedUnit, i) {
		if (feedUnit.id == '') {

			var id = 'facebook-sponsored-' + unsafeWindow.facebookSponsoredId;
			feedUnit.setAttribute('id', id);
			feedUnit.classList.add('facebook-sponsored');
			unsafeWindow.facebookSponsoredId++;

			var spans = [...document.querySelectorAll('#' + id + ' span')];
			var spansHTML = spans.map(function(span, i) {
				if (span.innerHTML.length == 1 && span.style.position != 'absolute') {
					return span.innerHTML;
				}
				return '';
			});
			if (!(spansHTML.includes('S') && spansHTML.includes('p') && spansHTML.includes('o'))) {
				return
			}

			var header = document.querySelector('#' + id + ' h4');
			var showId = id + '-show';
			header.innerHTML = header.innerHTML + '&nbsp;&nbsp;<span style="color: red">Sponsored</span>&nbsp;<a href="javascript: void(0)" id="' + showId + '">(show)</a>';

			var content = document.querySelector('#' + id + ' div > div[dir="auto"]').parentElement;
			var contentId = id + '-content';
			content.setAttribute('id', contentId);
			content.style.display = 'none';

			document.querySelector('#' + showId).onclick = function() {
				var content = document.querySelector('#' + contentId);

				if (content.style.display == 'none') {
					content.style.display = '';
				} else {
					content.style.display = 'none';
				};

				if (this.innerHTML == '(show)') {
					this.innerHTML = '(hide)';
				} else {
					this.innerHTML = '(show)';
				};
			};
		}
	});
}

(function() {
	'use strict';

	unsafeWindow.facebookSponsoredId = 1;

	setTimeout(
		function() {
			removeSponsored();
			document.querySelector("body").addEventListener('DOMSubtreeModified', function() { removeSponsored(); });
		},
		1000
	);
})();
