export const networkrequest2 = (path, data) => {
    return new Promise((resolve, reject) => {
      var requestURL = 'http://13.125.10.254:5000/' + path + '?';
  
      for (let [key, value] of Object.entries(data)) {
        requestURL += key;
        requestURL += '=';
        requestURL += value;
        requestURL += '&';
      }
  
      requestURL = requestURL.substring(0, requestURL.length - 1);
  
      const xhr = new XMLHttpRequest();
      xhr.open('GET', requestURL, true);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const fetchedData = JSON.parse(xhr.responseText);
            resolve(fetchedData);
          } else {
            reject(new Error(`HTTP request failed with status ${xhr.status}`));
          }
        }
      };
  
      xhr.send();
    });
  };

  