let  timerId;
let  searchBoxDom  =  document.getElementById('search-box');
function  makeAPICall() {
	//counting how many times makeAPICall was called
	let  debounceDom  =  document.getElementById('debounce-count');
	let  debounceCount  =  debounceDom.innerHTML  ||  0;
	debounceDom.innerHTML  =  parseInt(debounceCount) +  1
}
let  debounceFunction  =  function (func, delay) {
	
	//everytime timerid is cleared so , function inside settimeout will not be called.It will be only called in the last call.
	clearTimeout(timerId)
	timerId  =  setTimeout(func, delay)
}
searchBoxDom.addEventListener('input', function () {
	//counting how many times user types
	let  apiCallCountDom  =  document.getElementById('show-api-call-count');
	let  apiCallCount  =  apiCallCountDom.innerHTML  ||  0;
	apiCallCount  =  parseInt(apiCallCount) +  1;
	apiCallCountDom.innerHTML  =  apiCallCount;

	//debounce function for makeAPIcall
	debounceFunction(makeAPICall, 200)
})