function showCategories() {
  const container = document.querySelector('.categories');

  for (let i = 0; i < data.length; i++) {
    const elem = document.createElement('div');
    elem.textContent = data[i].name;
    elem.setAttribute('data-category', i);
    elem.addEventListener('click', showProducts);
    container.appendChild(elem);
  }

}

// handler of click on categories
function showProducts(event) {
  const categoryIndex = event.target.getAttribute('data-category');
  const products = data[categoryIndex].products;
  const container = document.querySelector('.products');
  container.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    const elem = document.createElement('div');
    elem.textContent = products[i].name;
    elem.setAttribute('data-product', i);
    elem.setAttribute('data-category', categoryIndex);
    elem.addEventListener('click', showDetails);
    container.appendChild(elem);
  }

}

function showDetails(event) {
  const categoryIndex = event.target.getAttribute('data-category');
  const productIndex = event.target.getAttribute('data-product');
  const container = document.querySelector('.details');
  container.innerHTML = '';
  const elemPrice = document.createElement('div');
  const elemDescr = document.createElement('div');
  const buttonFinish = document.createElement('button');
  elemPrice.textContent = data[categoryIndex].products[productIndex].price;
  elemDescr.textContent = data[categoryIndex].products[productIndex].description;
  container.appendChild(elemPrice);
  container.appendChild(elemDescr);
  container.appendChild(buttonFinish);
  buttonFinish.textContent = 'Buy';
  buttonFinish.setAttribute('data-buttonCategoty', categoryIndex);
  buttonFinish.setAttribute('data-buttonProducts', productIndex);
  buttonFinish.getAttribute("id", "button")
  buttonFinish.addEventListener('click', showForm);
  buttonFinish.addEventListener('click', saveInfoUser);
}

function saveInfoUser(event) {
  let product = JSON.parse(localStorage.getItem('products'));
  if (product === null) {
    product = [];
  }
  product.push({
    categoryIndex: event.target.getAttribute('data-buttonCategoty'),
    productIndex: event.target.getAttribute('data-buttonProducts'),
  });
  localStorage.setItem('products', JSON.stringify(product));
}
document.getElementById('buttonProduct').addEventListener('click', showMyProduct);

function showMyProduct() {
  let showProducts = JSON.parse(localStorage.getItem('products'));
  const finishResult = document.getElementById('showResult');
  const container = document.querySelector('.container');
  finishResult.innerHTML = '';
  for (key in showProducts) {
    let productIndex = showProducts[key].productIndex;
    let categoryIndex = showProducts[key].categoryIndex;
    const elem = document.createElement('li');
    const elemBtn = document.createElement('button');
    elemBtn.setAttribute('class', 'delBtn');
    elemBtn.innerHTML = 'delete';
    elemBtn.setAttribute('data-deleteButton', key);
    elemBtn.addEventListener('click', deleteItem);
    elem.textContent = data[categoryIndex].products[productIndex].name;
    elem.setAttribute('data-descriptionPriseCategory', categoryIndex);
    elem.setAttribute('data-descriptionPriseProduct', productIndex);
    finishResult.appendChild(elem);
    finishResult.appendChild(elemBtn);
    elem.addEventListener('click', showMainDetails);
  }
  container.className = "hidden";
  finishResult.className = "view";

}

function deleteItem(event) {
  let showProducts = JSON.parse(localStorage.getItem('products'));
  const item = event.target.getAttribute('data-deleteButton');
  showProducts.splice(item, 1);
  localStorage.setItem('products', JSON.stringify(showProducts));
  showMyProduct();
}

function showMainDetails(event) {
  const finishResult = document.getElementById('showResult');
  const priseDescript = document.querySelector('.priseDescription');
  const categoryIndex = event.target.getAttribute('data-descriptionPriseCategory');
  const productIndex = event.target.getAttribute('data-descriptionPriseProduct');
  const product = data[categoryIndex].products[productIndex];
  let descr = document.createElement('div');
  descr.textContent = `Prise:${product.price}; Descriptions: ${product.description}`;
  priseDescript.appendChild(descr);
  finishResult.className = "hidden";
  priseDescript.className = "view";
}

// function showConfirm(event) {
//   const container = document.querySelector('.products');
//   const containerDetail = document.querySelector('.details');
//   alert("Congratulations!!!");
//   container.innerHTML = '';
//   containerDetail.innerHTML = '';
// }

function showForm() {
  let container = document.querySelector('.container');
  let finishForm = document.getElementById('userForm');
  const button = document.getElementById('btn');
  console.log(container);
  console.log(finishForm);
  // diffElem.setAttribute('class', state);
  container.className = "hidden";
  finishForm.className = "view";
  button.addEventListener('click', collectInfo);
}

function collectInfo() {
  const userInfo = {
    fullName: document.forms[0].elements.fullName.value,
    city: document.forms[0].elements.City.value,
    department: document.forms[0].elements.department.value,
    payment: document.forms[0].elements.payment.value,
    count: document.forms[0].elements.count.value,
    addInfo: document.forms[0].elements.addInfo.value,
  }
  checkInfo(userInfo);
}
function checkInfo(userInfo) {
  let finishForm = document.getElementById('userForm');
  const result = document.getElementById('result');
  let isError = false;

  if (!isNumberValid(userInfo.count)) {
    isError = true;
    document.forms[0].elements.count.setAttribute('class', 'invalid');
    alert('Change you Quantity products');
  }
  if (!isString(userInfo.fullName)) {
    isError = true;
    document.forms[0].elements.fullName.setAttribute('class', 'invalid');
    alert('Change you FullName');
  }
  if (!isString(userInfo.department)) {
    isError = true;
    document.forms[0].elements.department.setAttribute('class', 'invalid');
    alert('Change you department');
  }
  if (isError) {
    return;
  }
  for (key in userInfo) {
    let showFinishInfo = document.createElement('div');
    showFinishInfo.textContent += userInfo[key];
    result.appendChild(showFinishInfo);
  }
  finishForm.className = "hidden";
}

function isNumberValid(value) {
  if (value > 0) {
    return true;
  }
  return false;
}
function isString(value) {
  if (value === null || isNaN(value)) {
    return true;
  }
  return false;
}
showCategories();



