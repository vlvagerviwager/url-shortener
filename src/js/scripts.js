function clearField() {
  document.getElementById('url').value = '';
}

function shortenUrl() {
  const inputField = document.getElementById('url');

  const payload = {
    url: inputField.value,
  };

  const myHeaders = new Headers().append('Content-Type', 'application/json');

  fetch('/', {
    method: 'post',
    headers: myHeaders,
    body: JSON.stringify(payload),
  }).then(response => response.json()).then((data) => {
    inputField.value = data.url;
  });
}
