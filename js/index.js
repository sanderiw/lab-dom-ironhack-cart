// ITERATION 1

function updateSubtotal(product) {
  //console.log('Calculating subtotal, yey!');
  
  const price = parseFloat(product.querySelector('.price span').innerText);
  
  const quantity = product.querySelector('.quantity input').value;
  
  const subtotal = price * quantity
  // Assigning the subtotal value calculated to the innerText of subtotal
  // Remember that I cannot keep the left side of the assignment into a variable. Otherwise I would assign the value inside it to another variable. What I want to change is the innertext, the memory location.!!!
  product.querySelector('.subtotal span').innerText = subtotal.toFixed(2);
  
  return subtotal;
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  
  //const singleProduct = document.querySelector('.product');
  //updateSubtotal(singleProduct);
  // end of test

  // ITERATION 2
  const allProducts = document.getElementsByClassName("product");
  
  // Calculating the total value and updating the subtotal of all products in the table
  let total = 0
  for (let i = 0; i < allProducts.length; i++) {
    total += updateSubtotal(allProducts[i])
  }

  // ITERATION 3
  // Accessing the price text element so I can replace it with the Total value I calculated on the previous iteration
  totalPriceText = document.getElementById('total-value').firstElementChild;
  totalPriceText.innerText = total.toFixed(2);
}

// ITERATION 4

function removeProduct(event) {
  const target = event.target;
  console.log(target);
  //console.log('The target in remove is:', target.parentNode.parentNode.parentNode);
  // Finding the Dom elements: The parent and the child. 
  const table = target.parentNode.parentNode.parentNode;
  const productToRemove = target.parentNode.parentNode;
  // Deletind the child from the parent: the product from the table
  table.removeChild(productToRemove);
  // Recalculating the prices after removal of one product
  calculateAll()
  
}

// ITERATION 5

function createProduct() {
  
  // Getting the Dom elements and testing them with console.log to check if I got them correctly
  //console.log('Teste');
  const productText = document.querySelector(".create-product").firstElementChild.firstElementChild;
  //console.log(productText);
  const productQuantity = document.querySelector(".create-product").firstElementChild.nextElementSibling.firstElementChild;
  //console.log(productQuantity);

  // Creating the new product html framework to add it later on the list
  const newProductHtml = `<tr class="product">
  <td class="name">
    <span>${productText.value}</span>
  </td>
  <td class="price">$<span>${productQuantity.value}</span></td>
  <td class="quantity">
    <input type="number" value="0" min="0" placeholder="Quantity" />
  </td>
  <td class="subtotal">$<span>0</span></td>
  <td class="action">
    <button class="btn btn-remove">Remove</button>
  </td>
</tr>`

  // Getting the body of the table to insert the new product in the last position
  let tableOfProducts = document.getElementsByTagName("tbody")[0];
  tableOfProducts.insertAdjacentHTML("beforeend", newProductHtml);

  // Clearing the text after creating a product
  productText.value = "";
  productQuantity.value = 0;

}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  
  const allRemoveButtons = document.getElementsByClassName("btn-remove")
  // for (let i = 0; i < allRemoveButtons.length; i++) {
  //   allRemoveButtons[i].addEventListener('click', removeProduct);
  // }
  document.addEventListener('click', (event) => {
    if (event.target.innerText === "Remove") {
      removeProduct(event);
    }
  })
  
  const createProductButton = document.getElementById("create");
  createProductButton.addEventListener('click', createProduct);
});
