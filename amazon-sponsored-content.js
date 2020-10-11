// ==UserScript==
// @name         amazon.com sponsored
// @include      /www\.amazon\.com\/s/
// ==/UserScript==


function addSponsoredBanners() {
	var sponsoredResults = document.querySelectorAll("[data-component-type='sp-sponsored-result'] > div > div.a-section:not(amazon-sponsored-done)")

	Array.prototype.forEach.call(sponsoredResults, function(sponsored, i) {

    	if (!sponsored.classList.contains('amazon-sponsored-done')) {
    		sponsored.classList.add('amazon-sponsored-done');
    		sponsored.innerHTML = unsafeWindow.sponsoredBanner + sponsored.innerHTML;
    	};
	});
}


(function() {
    'use strict';

	unsafeWindow.sponsoredBanner = `
		<div class="a-section a-spacing-micro s-grid-status-badge-container" style="pointer-events: none;">
			<span data-component-type="s-status-badge-component" data-component-props="{&quot;badgeType&quot;:&quot;amazons-choice&quot;,&quot;asin&quot;:&quot;B00YBP918M&quot;}" class="rush-component" data-component-id="13">
				<div class="a-row a-badge-region">
					<span id="B00YBP918M-amazons-choice" class="a-badge" aria-labelledby="B00YBP918M-amazons-choice-label B00YBP918M-amazons-choice-supplementary" data-a-badge-supplementary-position="right" tabindex="0" data-a-badge-type="status">
						<span id="amazon-sponsored-border-color" class="a-badge-label" data-a-badge-color="sx-gulfstream" aria-hidden="true">
							<span class="a-badge-label-inner a-text-ellipsis">
								<span class="a-badge-text" data-a-badge-color="sx-cloud">Sponsored</span>
							</span>
						</span>
					</span>
				</div>
			</span>
		</div>
	`

    setTimeout(
        function() {

    		var body = document.querySelector('body')
			body.innerHTML = body.innerHTML + `
				<style id="amazon-sponsored-style">
					#amazon-sponsored-border-color {
						background-color: #C90000 !important
					}
					#amazon-sponsored-border-color:after {
						border-top-color: #C90000 !important
					}
				</style>
			`

            addSponsoredBanners();
			document.querySelector("span[data-component-type='s-search-results']").addEventListener('DOMSubtreeModified', addSponsoredBanners);
        },
        1000
    );
})();
