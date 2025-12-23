document.addEventListener("DOMContentLoaded", function () {
    console.log("JS Loaded");
    
let serviceButtons = document.querySelectorAll(".service-btn");
let cartTable = document.querySelector(".box-cart table");
let totalAmountEl = document.querySelector(".total strong");
let confirmMsg = document.getElementById("confirm-msg");
let bookBtn = document.querySelector(".btn-book");

let fullNameInput = document.getElementById("fullName");
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phone");

let cart = [];
let totalAmount=0;

// add -remove item

serviceButtons.forEach( function(btn) {
    btn.addEventListener('click',  () => {
        
    const name = btn.dataset.name;
   const price = Number(btn.dataset.price);

    const index = cart.findIndex(item => item.name === name);



// add item
if (index === -1) {
 cart.push({ name , price });
 totalAmount += price;
 
 btn.classList.remove("btn-add");
 btn.classList.add("btn-remove");
 btn.innerHTML = 'Remove item<ion-icon class="icon-r" name="remove-circle-outline"></ion-icon>';
}

// remove item

else {
  totalAmount -= cart[index].price;
    cart.splice(index, 1);

    btn.classList.remove("btn-remove");
    btn.classList.add("btn-add");
    btn.innerHTML = 'Add item<ion-icon class="icon-a" name="add-circle-outline"></ion-icon>';
}
renderCart();
});
});

// render cart
function renderCart() {
    document.querySelectorAll(".cart-item , .empty-cart").forEach(row => row.remove());
      
 if (cart.length === 0) {
      const emptyRow = document.createElement("tr");
      emptyRow.className = "empty-cart";
      emptyRow.innerHTML = `<td colspan="3" style="text-align:center; padding:20px;color:#888;"><ion-icon name="cart-outline" style="font-size:24px;"></ion-icon><br>No items added</td>`;
      cartTable.appendChild(emptyRow);
 }



    cart.forEach((item , i) => {
    const row = document.createElement("tr");
    row.classList.add("cart-item");
    row.innerHTML = `<td>${i + 1}</td><td>${item.name}</td><td>₹${item.price.toFixed(2)}</td>`;
    cartTable.appendChild(row);
});

    totalAmountEl.innerText = "₹" + totalAmount.toFixed(2);
};


// booknow
bookBtn.addEventListener('click', () => {

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();



    if (cart.length === 0) {
    confirmMsg.style.color = "red";
    confirmMsg.innerText = "Your cart is empty! Please add some services.";
    return;
}   

    if (fullName === "" || email === "" || phone === "") {
    confirmMsg.style.color = "red";
    confirmMsg.innerText = "Please fill in all the required fields.";
    return;
}

// phone validation 
 if (phone.length < 10) {
  confirmMsg.style.color = "red";
  confirmMsg.innerText = "Please enter a valid phone number!";
   return;
} 



// success message
    confirmMsg.style.color = "green";
    confirmMsg.innerText = "Thank you for booking our services. We will contact you soon!";
    
    cart = [];
    totalAmount = 0;
    renderCart();
    // reset form
    fullNameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";

// reset buttons
    serviceButtons.forEach(btn => {
    btn.classList.remove("btn-remove"); 
    btn.classList.add("btn-add");
    btn.innerHTML = 'Add item<ion-icon class="icon-a" name="add-circle-outline"></ion-icon>';
});
});


// Initial render
renderCart();
}); 
