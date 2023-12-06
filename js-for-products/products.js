function showAllProduct() {
  axios.get('http://localhost:8080/products')

    .then(function (response) {
      let products = response.data;
      let html = `

    <div class="container">
    <div class="row">
      <div class="col-xl-3 col-lg-4 col-md-5">

        <div class="sidebar-categories">
          <div class="head">Browse Categories</div>
          <ul class="main-categories">
            <li class="main-nav-list"><a data-toggle="collapse" href="#fruitsVegetable" aria-expanded="false" aria-controls="fruitsVegetable"><span
                 class="lnr lnr-arrow-right"></span>Fruits and Vegetables<span class="number">(53)</span></a>
            </li>

            <li class="main-nav-list"><a data-toggle="collapse" href="#meatFish" aria-expanded="false" aria-controls="meatFish"><span
                 class="lnr lnr-arrow-right"></span>Meat and Fish<span class="number">(53)</span></a>
            </li>

          </ul>
        </div>

<!--        search by brand-->

        <div class="sidebar-filter mt-50">
          <div class="top-filter-head">Product Filters</div>
          <div class="common-filter">
            <div class="head">Brands</div>
            <form action="#">
              <ul>
                <li class="filter-list"><input class="pixel-radio" type="radio" id="apple" name="brand"><label for="apple">Orient<span>(29)</span></label></li>

              </ul>
            </form>
          </div>

          <div class="common-filter">
            <div class="head">Price</div>
            <div class="price-range-area">
              <div id="price-range"></div>
              <div class="value-wrapper d-flex">
                <div class="price">Price:</div>
                <span>$</span>
                <div id="lower-value"></div>
                <div class="to">to</div>
                <span>$</span>
                <div id="upper-value"></div>
              </div>
            </div>
          </div>
        </div>
         </div>
         <div class="col-xl-9 col-lg-8 col-md-7">
        <!-- Start Filter Bar -->
        <div class="filter-bar d-flex flex-wrap align-items-center">
          <div class="sorting">
            <select>
              <option value="1">Default sorting</option>
              <option value="1">Default sorting</option>
              <option value="1">Default sorting</option>
            </select>
          </div>
          <div class="sorting mr-auto">
            <select>
              <option value="1">Show 12</option>
              <option value="1">Show 12</option>
              <option value="1">Show 12</option>
            </select>
          </div>
          <div class="pagination">
            <a href="#" class="prev-arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></a>
            <a href="#" class="active">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#" class="dot-dot"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
            <a href="#">6</a>
            <a href="#" class="next-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
          </div>
        </div>
     
        <section class="lattest-product-area pb-40 category-list">
          <div class="row"
          >
`;
      for (let i = 0; i < products.length; i++) {
        html += `
                 <div class="col-lg-4 col-md-6">
              <div class="single-product">
                <img class="img-fluid" src="#dfsdf" alt="">Image
                <div class="product-details">
                  <input type="hidden" value="${products[i].id}" />
                  <h6>${products[i].name}
                    </h6>
                  <div class="price">
                    <h6>$${products[i].price}</h6>
                    <h6 class="l-through">$210.00</h6>
                  </div>
                  <div class="prd-bottom">

                    <a href="javascript:" onclick="addToCart(${products[i].id})" class="social-info">
                      <span class="ti-bag"></span>
                      <p class="hover-text">add to bag</p>
                    </a>
                    <a href="" class="social-info">
                      <span class="lnr lnr-heart"></span>
                      <p class="hover-text">Wishlist</p>
                    </a>
                    <a href="" class="social-info">
                      <span class="lnr lnr-sync"></span>
                      <p class="hover-text">compare</p>
                    </a>
                    <a href="" class="social-info">
                      <span class="lnr lnr-move"></span>
                      <p class="hover-text">view more</p>
                    </a>
                  </div>
                </div>
              </div>
                </div>       
            `;
      }
      html +=
        `
         </div> 
        </section>
        <!-- End Best Seller -->
        <!-- Start Filter Bar -->
        <div class="filter-bar d-flex flex-wrap align-items-center">
          <div class="sorting mr-auto">
            <select>
              <option value="1">Show 12</option>
              <option value="1">Show 12</option>
              <option value="1">Show 12</option>
            </select>
          </div>
          <div class="pagination">
            <a href="#" class="prev-arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></a>
            <a href="#" class="active">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#" class="dot-dot"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
            <a href="#">6</a>
            <a href="#" class="next-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
          </div>
        </div>
        <!-- End Filter Bar -->
      </div>
    </div>
  </div>
    `;
      document.getElementById("main").innerHTML = html;
    });
}
showAllProduct();


function addToCart(id) {
  // if (getCurrentUser()) {
    let existingList = sessionStorage.getItem('cart-list');
    let updatedList = existingList ? JSON.parse(existingList) : [];
    var productIdToCheck = id;
    var existingProductIndex = updatedList.findIndex(function (item) {
      return item.id === productIdToCheck;
    });
    if (existingProductIndex === -1) {
      let newItem = { id: id, quantity: 1 };
      updatedList.push(newItem);
    }
    else {
      updatedList[existingProductIndex].quantity += 1;
    }
    sessionStorage.setItem('cart-list', JSON.stringify(updatedList));
  // }
  // else {
  //   alert("chua dang nhap");
  // }
}

function getCurrentUser(){
  return JSON.parse(localStorage.getItem("current-user"));
}