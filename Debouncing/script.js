var  timerId;
var  searchBoxDom  =  document.getElementById('search-box');
function  makeAPICall() {
	var  debounceDom  =  document.getElementById('debounce-count');
	var  debounceCount  =  debounceDom.innerHTML  ||  0;
	
	debounceDom.innerHTML  =  parseInt(debounceCount) +  1
}
var  debounceFunction  =  function (func, delay) {
	clearTimeout(timerId)
	timerId  =  setTimeout(func, delay)
}
searchBoxDom.addEventListener('input', function () {
	var  apiCallCountDom  =  document.getElementById('show-api-call-count');
	var  apiCallCount  =  apiCallCountDom.innerHTML  ||  0;
	apiCallCount  =  parseInt(apiCallCount) +  1;
	apiCallCountDom.innerHTML  =  apiCallCount;
	debounceFunction(makeAPICall, 200)
})