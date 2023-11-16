export const networkrequest = (path, data, onReturn) =>
{
    var requestURL = 'http://13.125.10.254:5000/' + path + '?';

    for (let [key, value] of Object.entries(data)) {
        requestURL += key;
        requestURL += '=';
        requestURL += value;
        requestURL += '&';
    }

    requestURL = requestURL.substring(0, requestURL.length - 1);

    const xhr = new XMLHttpRequest();
    console.log(requestURL);
    console.log(xhr.status);
    xhr.open('GET', requestURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const fetchedData = JSON.parse(xhr.responseText);
        
        //console.log('result', fetchedData.data);
        onReturn(fetchedData);
      }
    };
    // xhr.withCredentials = true;

    xhr.send();
} 