const cards = document.querySelectorAll('.card.glass');


const addToCart = (id, imageUrl, title, price) => {
    const basket = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [];
    const existingItem = basket.find(item => item.id === id);
    if (existingItem) {
        existingItem.count++;
        localStorage.setItem('basket', JSON.stringify(basket));
    } else {
        basket.push({ id, imageUrl, title, price, count: 1 });
        localStorage.setItem('basket', JSON.stringify(basket));
    }
    getTotalCount()
    getTotalPrice()
}

cards.forEach(card => {
    const id = card.getAttribute('data-id');
    const imageUrl = card.firstElementChild.firstElementChild.getAttribute("src")
    const title = card.firstElementChild.nextElementSibling.firstElementChild.innerText
    const price = card.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.innerText.substring(0, card.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.innerText.indexOf("$"))
    const btn = card.lastElementChild.lastElementChild.firstElementChild
    btn.addEventListener("click", () => addToCart(id, imageUrl, title, price))
})


// NAVBAR JS

const getTotalCount = () => {
    const basket = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [];
    document.querySelectorAll(".basketCount").forEach(element => element.innerText = basket.length)
}

const getTotalPrice = () => {
    const basket = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [];
    let totalPrice = 0
    basket.forEach(item => {
        totalPrice += item.price * item.count
    })
    document.querySelector("#totalPrice").innerHTML = String(totalPrice) + "$"
}
getTotalPrice()
getTotalCount()
