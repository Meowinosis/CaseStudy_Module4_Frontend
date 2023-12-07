function showFormLogin() {
    {
        $("#form-Login").modal("hide");
    }
    document.getElementById("form-login-logout").innerHTML =
        `
    <div class="modal fade" id="form-Login" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          
            <div class="login_form_inner" style="padding-top: 30px">
                <h3>Log in to Website</h3>
                <span id="msg" class="text-danger"></span>
                <div class="row login_form" id="contactForm">
                    <div class="col-md-12 form-group">
                        <input type="text" class="form-control" id="username" name="username" placeholder="Username" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Username'">
                    </div>
                    <div class="col-md-12 form-group">
                        <input type="password" class="form-control" id="password" name="password" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'">
                    </div>
                    <div class="col-md-12 form-group">
                        <div class="creat_account">
                            <input type="checkbox" id="f-option2" name="selector">
                            <label for="f-option2">Keep me logged in</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-group">
                        <button class="primary-btn" onclick="login()">Log In</button>
                        <a href="#">Forgot Password?</a>
                        <a href="javascript:" style="color: skyblue" onclick="showFormRegister()">Create Account?</a>
                    </div>
                </div>
                </div>
          
        </div>
      </div>
    </div>
    `
    $("#form-Login").modal("show");
}

function showFormRegister() {
    {
        $("#form-Login").modal("hide");
    }
    document.getElementById("form-login-logout").innerHTML =
        `
    <div class="modal fade" id="form-Login" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="login_form_inner" style="padding-top: 30px">
                <h3>Register</h3>
                
                <div class="row login_form" id="contactForm">
                    <div class="col-md-12 form-group">
                        <input type="text" class="form-control" id="username" name="username" placeholder="Username" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Username'">
                    </div>
                    <div class="col-md-12 form-group">
                        <input type="password" class="form-control" id="password" name="password" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'">
                    </div>
                    <div class="col-md-12 form-group">
                        <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'">
                    </div>
                    <div class="col-md-12 form-group">
                        <input type="text" class="form-control" id="fullName" name="fullName" placeholder="Full Name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Full Name'">
                    </div>
                    <div class="col-md-12 form-group">
                        <input type="date" class="form-control" id="birthDay" name="birthDay" placeholder="birthDay" onfocus="this.placeholder = ''" onblur="this.placeholder = 'birthDay'">
                    </div>
                    <div class="col-md-12 form-group">
                        <input type="text" class="form-control" id="address" name="address" placeholder="address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'address'">
                    </div>
                    <div class="col-md-12 form-group">
                        <input type="text" class="form-control" id="phoneNumber" name="phoneNumber" placeholder="phoneNumber" onfocus="this.placeholder = ''" onblur="this.placeholder = 'phoneNumber'">
                    </div>
                    <div class="col-md-12 form-group">
                        <input type="text" class="form-control" id="email" name="email" placeholder="email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'email'">
                    </div>
                    
                    <div class="col-md-12 form-group">
                        <span id="msg" class="text-danger"></span>
                        <button onclick="registerAccount()" class="primary-btn">Register</button>
                        <a href="javascript:" onclick="showFormLogin()"> Have Account <span  class="hover-text" style="color: skyblue" >Login</span></a>
                    </div>
                </div>
                </div>
          
        </div>
      </div>
    </div>
    `
    $("#form-Login").modal("show");
}

function login() {
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let user = {
        username: username.value,
        password: password.value
    }
    console.log(user)
    axios.post("http://localhost:8080/login", user).then(res => {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        $("#form-login").modal('hide');
    }).catch(err => {
        document.getElementById("msg").innerHTML = "Sai Tài Khoản hoặc mật khẩu"
    })
}

function registerAccount() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let fullName = document.getElementById("fullName").value;
    let birthDay = document.getElementById("birthDay").value;
    let address = document.getElementById("address").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let email = document.getElementById("email").value;
    let customer = {
        firstName: fullName,
        birthDay: birthDay,
        address: address,
        phoneNumber: phoneNumber,
        email: email,
        user: {
            username: username,
            password: password,
            confirmPassword: confirmPassword
        }
    }
    axios.post("http://localhost:8080/register", customer)
        .then(function (response) {
            alert("success")
            showFormLogin()
        }).catch(error => {
        document.getElementById("msg").innerHTML = error.response.data;
    })
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}
