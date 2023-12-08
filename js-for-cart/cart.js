function showCart() {
    let storedData = sessionStorage.getItem('cart-list');
    let productList = JSON.parse(storedData);
    if(productList === null){
        let html = `
        <section class="cart_area">
           <div class="container">
               <div class="cart_inner">
                   <div class="table-responsive">
                   <table class="table">
                           <thead>
                               <tr>
                                   <th scope="col">Product</th>
                                   <th scope="col">Price</th>
                                   <th scope="col">Quantity</th>
                                   <th scope="col">Total</th>
                               </tr>
                           </thead>
                           <tbody>
                           <tr>
                           <td colspan="4" style="text-align:center;">
                                <h2>You have no product in cart<h2>
                                <td>
                            </tr>
                            <tr class="out_button_area">
                            <td>
                    
                            </td>
                            <td>
                    
                            </td>
                            <td>
                    
                            </td>
                            <td>
                                <div class="checkout_btn_inner d-flex align-items-center">
                                    <a class="gray_btn" href="#">Continue Shopping</a>
                                </div>
                            </td>
                            </tr>
                           </tbody>
                   </div>
                   </div>
               </div>
    </section>`;
    document.getElementById("main").innerHTML = html;

    }else{
    let productIdList = productList.map(function (item) {
        return item.id;
    });
    console.log(productIdList);
    axios.post('http://localhost:8080/cart', productIdList)
        .then(function (response) {
            let html = ``;
            let products = response.data;   
            let matchedProducts = products.map(serverProduct => {
                let storedProduct = productList.find(item => item.id === serverProduct.id);

                if (storedProduct) {
                    // Match found, add quantity to the product information
                    return { ...serverProduct, quantityInCart: storedProduct.quantity };
                } else {
                    // If no match found, set default quantity or handle as needed
                    return { ...serverProduct, quantityInCart: 0 };
                }
            });
            html = `<section class="cart_area">
        <div class="container">
            <div class="cart_inner">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
            for (let i = 0; i < matchedProducts.length; i++) {
                html += `                            
            <tr>
            <td>
                <div class="media">
                    <div class="d-flex">
                        <img src="img/cart.jpg" alt="">
                    </div>
                    <div class="media-body">
                        <p>${matchedProducts[i].name}</p>
                    </div>
                </div>
            </td>
            <td>
                <h5>$${matchedProducts[i].price}</h5>
            </td>
            <td>
                <div class="product_count">
                    <input type="text" name="qty" id="product_${matchedProducts[i].id}" maxlength="100" value="${matchedProducts[i].quantityInCart}" title="Quantity:"
                        class="input-text qty" data-price="${matchedProducts[i].price}">
                    <button onclick="increaseQuantity(this);"
                        class="increase items-count" type="button"><i class="lnr lnr-chevron-up"></i></button>
                    <button onclick="decreaseQuantity(this);"
                        class="reduced items-count" type="button"><i class="lnr lnr-chevron-down"></i></button>
                </div>
            </td>
            <td>
                <h5 id="totalPrice_${matchedProducts[i].id}">$${calculateTotalPrice(matchedProducts[i].quantityInCart, matchedProducts[i].price)}</h5>
            </td>
        </tr>`;

                ;
            }
            html += `                            
            <tr>
            <td>
    
            </td>
            <td>
    
            </td>
            <td>
                <h5>Subtotal</h5>
            </td>
            <td>
                <h5 id="cartSubtotal">$0.00</h5>
            </td>
        </tr>
        <tr class="out_button_area">
            <td>
    
            </td>
            <td>
    
            </td>
            <td>
    
            </td>
            <td>
                <div class="checkout_btn_inner d-flex align-items-center">
                    <a class="gray_btn" href="#">Continue Shopping</a>
                    <a class="primary-btn" href="javascript:" onclick="showCheckout()">Proceed to checkout</a>
                </div>
            </td>
        </tr>
        `;


            document.getElementById("main").innerHTML = html;

            updateSubtotal();
        });

    }
}

function calculateTotalPrice(quantity, price) {
    return quantity * price;
}

// Function to increase quantity
function increaseQuantity(button) {
    let inputElement = button.parentElement.querySelector('input');
    let quantity = parseInt(inputElement.value, 10);
    let productId = inputElement.id.split('_')[1];
    if (!isNaN(quantity)) {
        inputElement.value = quantity + 1;
        updateTotalPrice(inputElement);
        updateQuantityInSession(productId, quantity + 1);
    }
}

// Function to decrease quantity
function decreaseQuantity(button) {
    let inputElement = button.parentElement.querySelector('input');
    let productId = inputElement.id.split('_')[1];
    let quantity = parseInt(inputElement.value, 10);
    if (!isNaN(quantity) && quantity > 0) {
        inputElement.value = quantity - 1;
        updateTotalPrice(inputElement);
        updateQuantityInSession(productId, quantity - 1);
    }
}

function updateTotalPrice(inputElement) {
    let quantity = parseInt(inputElement.value, 10);
    let price = parseFloat(inputElement.getAttribute('data-price'));
    let rowId = inputElement.id.split('_')[1]; // Assuming your row ID is in the format 'totalPrice_X'
    let totalPriceElement = document.getElementById('totalPrice_' + (rowId));

    if (!isNaN(quantity) && !isNaN(price) && totalPriceElement) {
        let totalPrice = calculateTotalPrice(quantity, price);
        totalPriceElement.textContent = '$' + totalPrice.toFixed(2);
    }
    updateSubtotal();
}

function calculateCartSubtotal() {
    let cartRows = document.querySelectorAll('.product_count');
    let subtotal = 0;

    cartRows.forEach(function (row, index) {
        let inputElement = row.querySelector('input');
        let quantity = parseInt(inputElement.value, 10);
        let price = parseFloat(inputElement.getAttribute('data-price'));

        if (!isNaN(quantity) && !isNaN(price)) {
            let totalPrice = calculateTotalPrice(quantity, price);
            subtotal += totalPrice;
        }
    });
    return subtotal;
}

// Function to update the subtotal element
function updateSubtotal() {
    let subtotal = calculateCartSubtotal();
    let subtotalElement = document.getElementById('cartSubtotal');

    if (subtotalElement) {
        subtotalElement.textContent = '$' + subtotal.toFixed(2);
    }
    sessionStorage.setItem("total", subtotal);
}

function updateQuantityInSession(productId, newQuantity) {
    let storedData = sessionStorage.getItem('cart-list'); // Replace with your actual key
    let cartItems = JSON.parse(storedData);

    // Find the item with the specified productId in the cart
    let cartItem = cartItems.find(item => item.id == productId);

    if (cartItem) {
        // Update the quantity for the found item
        cartItem.quantity = newQuantity;

        // Save the updated cart to session storage
        sessionStorage.setItem('cart-list', JSON.stringify(cartItems)); // Replace with your actual key
    }
}