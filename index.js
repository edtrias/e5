//It works in Firefox, but not in Chrome and Safari because when fetching data from a json file, this browsers seems to expect it to work in a server environment and not from the hard drive.

let list = [];
let listItems = [];

const getData = () => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', 'data.json');
    request.onload = () => {
      let data = JSON.parse(request.responseText);
      list = data.typeList

      resolve(list);
    }
    request.onerror = () => reject(request.statusText);
    request.send();
  })
}

const storeData = () => {
  getData();
  setTimeout(() => {
    for(i = 0; i < list.length; i++) {
      listItems.push(list[i].type)
    }
  }, 50);
}

const printData = () => {
  storeData();
  setTimeout(() => {
    const elements = document.querySelectorAll('.option');

    elements.forEach((element, index) => {
      element.textContent = listItems[index];
      element.value = listItems[index];
    })
  }, 60);
}

const getDateNow = () => {

  const myDate = new Date();

  let day = myDate.getDate();
  let month = myDate.getMonth()+1;
  let year = myDate.getFullYear();

  if (day < 10) {
    day = '0' + day;
  }

  if (month < 10) {
    month = '0' + month
  }

  const today = `${day}/${month}/${year}`;
  document.getElementById('date').value = today;
}

printData();
getDateNow();
