function shortenUrl() {
	let inputField = document.getElementById('url');

	const payload = {
	    url: inputField.value
	};

	const myHeaders = new Headers().append("Content-Type", "text/plain");

	fetch('/', {
		method: 'post',
		headers: myHeaders,
		body: JSON.stringify(payload)
	}).then(function(response) {
		return response.json();
	}).then(function(data) {
		inputField.value = data.url;
	});
}