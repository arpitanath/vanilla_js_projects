var  timerId;
var  divBodyDom  =  document.getElementById('div-body');
function  makeAPICall() {
	var  debounceDom  =  document.getElementById('debounc-count');
	var  debounceCount  =  debounceDom.innerHTML  ||  0;

	debounceDom.innerHTML  =  parseInt(debounceCount) +  1
}
var  throttleFunction  =  function (func, delay) {
	if (timerId) {
		return
	}
	timerId  =  setTimeout(function () {
		func()
		timerId  =  undefined;
	}, delay)
}

divBodyDom.addEventListener('scroll', function () {
	var  apiCallCountDom  =  document.getElementById('show-api-call-count');
	var  apiCallCount  =  apiCallCountDom.innerHTML  ||  0;
	apiCallCount  =  parseInt(apiCallCount) +  1;
	apiCallCountDom.innerHTML  =  apiCallCount;
	throttleFunction(makeAPICall, 200)
})