

// Defining async function
async function getapi(url) {
   
    // Storing response
    const response = await fetch(url);
    // Storing data in form of JSON
    var data = await response.json();
    show(data);
}

// Calling that async function
// Function to define innerHTML for HTML table
function show(data) {
    let tab = 
    `<div class="row">`
    for (let r of data) {
        tab +=  `<div class="col-sm-6 col-md-6 col-lg-6">
        <div class="box">
           <div class="option_container">
              <div class="options">
                 <button class="option2" onclick="buyNow(${r.PID})" data-id="${r.id}";
                 ">
                 Buy Now
                 </button>
              </div>
           </div>
           <div class="img-box">
              <img src="images/${r.image}" alt="">
           </div>
           <div class="detail-box">
              <h5>
              ${r.name}
              </h5>
              <h6>
              ${r.price} /${r.unit}
              </h6>
           </div>
        </div>
     </div>`;
    }     
    // Setting innerHTML as tab variable
    document.getElementById("products").innerHTML = tab;
}
// Defining async function

function buyNow(id)
{
    console.log(id);
    localStorage.setItem("Cart",id);
    window.location.href = "order.html";
}

function saveData() {
    // Storing response   from form
    document.getElementById('message').innerHTML = "checking";
    const data = {
        "name": document.getElementById("name").value,
        "phone": document.getElementById("phone").value,
        "address": document.getElementById("address").value,
      };
    const product = localStorage.getItem("Cart");
    const url = "http://192.168.1.93:9000/orders/"+product;
    $.ajax({
        type: "post",
        dataType: "json",
        url: url,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(data, textStatus){
            document.getElementById('message').innerHTML = "Order Placed";
            document.getElementById("name").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("address").value = "";
            // window.location.href = "index.html";
        },
        error: function(xhr, textStatus, errorThrown){
            document.getElementById('message').innerHTML = "Error";
        }
    });
}


