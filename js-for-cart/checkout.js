function showCheckout(){
    let storedData = sessionStorage.getItem('cart-list');
    let productList = JSON.parse(storedData);
    let productIdList = productList.map(function (item) {
        return item.id;
    });
    axios.post('http://localhost:8080/order/checkout', productIdList,{headers: {"Authorization": `Bearer ${getCurrentUser().accessToken}`}})
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
            html = `
            <section class="checkout_area section_gap">
            <div class="container">
            <div class="billing_details">
                <div class="row">
                <div class="col-lg-8">
                <div class="order_box">
                    <h2>Your Order</h2>
                    <ul class="list">
                    <li><a href="#">Product <span>Total</span></a></li>`;
            for(let i = 0; i < matchedProducts.length; i++){
                html+=`
                <li><a href="#">${matchedProducts[i].name} <span class="middle">x ${matchedProducts[i].quantityInCart}</span> <span class="last">$${matchedProducts[i].price}</span></a></li>`
            }
            html+=`
            </ul>
            <ul class="list list_2">
                <li><a href="#">Total <span id="cartSubtotal">$${sessionStorage.getItem("total")}</span></a></li>
            </ul>
            <div class="payment_item">
                <div class="radion_btn">
                    <input type="radio" id="f-option5" name="selector">
                    <label for="f-option5">Pay with money</label>
                    <div class="check"></div>
                </div>
                <p>Pay with money.</p>
            </div>
            <div class="payment_item active">
                <div class="radion_btn">
                    <input type="radio" id="f-option6" name="selector">
                    <label for="f-option6">Credit card </label>
                    <img src="img/product/card.jpg" alt="">
                    <div class="check"></div>
                </div>
                <p>Pay via card; you can pay with your credit card</p>
            </div>
            <a class="primary-btn" href="javascript:" onclick="confirmation()">Proceed to confirmation</a>
            </div>
            </div>
        </div>
    </div>
</div>
</section>`
            document.getElementById("main").innerHTML =html;
        });
}

function confirmation(){
    let total = sessionStorage.getItem("total");
    let data = JSON.parse(sessionStorage.getItem("cart-list"));
    let request ={
        data: data,
        total: total,
        userId: getCurrentUser().id
    }
    axios.post('http://localhost:8080/order/create', request,{headers: {"Authorization": `Bearer ${getCurrentUser().accessToken}`}})
    .then((function (){
        showPageUser();
    }));
}