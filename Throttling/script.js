let  timerId;
const  divBodyDom  =  document.getElementById('div-body');
function  makeAPICall() {
	//counting how many times makeAPICall is called
	const  debounceDom  =  document.getElementById('debounc-count');
	const  debounceCount  =  debounceDom.innerHTML  ||  0;
	debounceDom.innerHTML  =  parseInt(debounceCount) +  1
}

const  throttleFunction  =  function (func, delay) {
	// If timerid is undefined then only makeAPICall function will be called.
	if (timerId) {
		return
	}
	timerId  =  setTimeout(function () {
		func()
		timerId  =  undefined;
	}, delay)
}

divBodyDom.addEventListener('scroll', function () {
	//counting how many times scroll event is called
	const  apiCallCountDom  =  document.getElementById('show-api-call-count');
	let  apiCallCount  =  apiCallCountDom.innerHTML  ||  0;
	apiCallCount  =  parseInt(apiCallCount) +  1;
	apiCallCountDom.innerHTML  =  apiCallCount;

	//throttle function for makeAPICall
	throttleFunction(makeAPICall, 200)
});