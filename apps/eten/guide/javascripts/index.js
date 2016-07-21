(function() {
	console.log("ready");

	function tab(obj) {
		obj.bind("click", function() {
			console.log($(this).index());
		});
	} 

	tab($("#tabTitle li"));
})();
