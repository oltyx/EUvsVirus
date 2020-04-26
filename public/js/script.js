const pay = document.querySelector("#payBtn")
const about = document.querySelector("#aboutBtn")
const home = document.querySelector("#homeBtn")
const payCon = document.querySelector("#client")
const aboutCon = document.querySelector("#about")
const item = document.getElementsByClassName("item")
const selectImg = document.querySelector("#selectImg")
const selectPrice = document.querySelector("#pri")
const avai = document.querySelector("#avai")
// let totalView = document.querySelector("#totalView")

let source = ""
let justPrice = ""
let count = ""
let total = 0

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

Array.from(item).forEach(function(element, i) {
  // if item sold out
  if(Number(item[i].querySelector("h3").textContent) == 0){
    item[i].querySelector("img").src = "images/sold.jpg"
  }
  
  element.addEventListener('click', function() {
    const price = item[i].querySelector("h2").textContent
    let itemImage = item[i].querySelector("img").src
    // if the item is clicked and  is not sold out
    if(Number(item[i].querySelector("h3").textContent) > 0){
      selectImg.src = itemImage
      selectPrice.textContent = price
      source = itemImage.slice(22, itemImage.length)
      justPrice = item[i].querySelector("h2").textContent
      count = item[i].querySelector("h3").textContent
      if (document.querySelector("#cko-widget")) {
        let widgets =  document.querySelectorAll("#cko-widget")
        for(let i=0;i<widgets.length;i++){
          widgets[i].remove()
        }
      }
      var para = document.createElement("script")
      para.src = "https://cdn.checkout.com/sandbox/js/checkout.js";
      para.async = true
      window.CKOConfig = {
        publicKey: 'pk_test_6ff46046-30af-41d9-bf58-929022d2cd14',
        customerEmail: 'user@email.com',
        value: selectPrice.textContent.replace('.', '').replace(" €", ''),
        currency: 'EUR',
        paymentMode: 'cards',
        cardFormMode: 'cardTokenisation',
        cardTokenised: function(event) {
          console.log(event.data.cardToken);
          postData("/orders",{token: event.data.cardToken,productId: 1}).then((data) => {
            console.log(data); // JSON data parsed by `response.json()` call
          });
        }
      }
      document.querySelector("#payment-form").appendChild(para)
    }
  })
})


/*home.addEventListener("click", function(e) {
  payCon.style.display = "initial"
  aboutCon.style.display = "none"
})*/

about.addEventListener("click", function(e) {
  aboutCon.style.display = "initial"
  payCon.style.display = "none"
})


// pay.addEventListener('click', function(e) {
//   //cash float
//   let mon = Number(justPrice.substr(1))
//   total =+ mon
//   // totalView.value = total
//
//   fetch('messages', {
//       method: 'put',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         'image': source,
//         'count': Number(count)
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
// });
