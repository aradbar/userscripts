// ==UserScript==
// @name         facebook.com sponsored
// @include      /www\.facebook\.com/
// ==/UserScript==

function getFeedUnit(sponsoredAriaLabel) {
	return sponsoredAriaLabel.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
}

function removeSponsored() {
	var sponsoredLabels = document.querySelectorAll(
		"[data-pagelet^='FeedUnit_']:not(.facebook-sponsored) [aria-label='Sponsored'], \
		 [data-pagelet^='FeedUnit_']:not(.facebook-sponsored) [aria-label='ממומן']"
	);
    console.log(sponsoredLabels);
	Array.prototype.forEach.call(sponsoredLabels, function(sponsored, i) {
		var feedUnit = getFeedUnit(sponsored);
		if (feedUnit.id == '') {

			var id = 'facebook-sponsored-' + unsafeWindow.facebookSponsoredId;
			feedUnit.setAttribute('id', id);
			feedUnit.classList.add('facebook-sponsored');

			var header = document.querySelector('#' + id + ' h4');
			var showId = id + '-show';
			header.innerHTML = header.innerHTML + '&nbsp;&nbsp;<span style="color: red">Sponsored</span>&nbsp;<a href="javascript: void(0)" id="' + showId + '">(show)</a>';

			var content = document.querySelector('#' + id + ' div > div[dir="auto"]').parentElement;
			var contentId = id + '-content';
			content.setAttribute('id', contentId);
			content.style.display = 'none';

			var show = document.querySelector('#' + showId).onclick = function() {
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

			unsafeWindow.facebookSponsoredId++;
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
