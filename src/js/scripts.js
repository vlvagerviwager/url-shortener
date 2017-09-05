function clearField() {
  document.getElementById('url').value = '';
}

function shortenUrl() {
  const inputField = document.getElementById('url');

  const payload = {
    url: inputField.value,
  };

  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  fetch('/', {
      method: 'post',
      headers: myHeaders,
      body: JSON.stringify(payload)
    }).then((response) => {
      return response.json();
    }).then((data) => {
      inputField.value = data.url;
    });
}
