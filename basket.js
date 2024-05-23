const tbody = document.querySelector('tbody');


const deleteItem = (id) => {
    const basket = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [];
    const newBasket = basket.filter(item => item.id != id);
    localStorage.setItem('basket', JSON.stringify(newBasket));
    renderBasket();
    getTotalCount();
    getTotalPrice();
}

const renderBasket = () => {
    const basket = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [];
    tbody.innerHTML = '';
    if (basket.length !== 0) {

        basket.forEach((item, index) => {
            tbody.innerHTML += `
            <tr>
            <th>${index + 1}</th>
            <td>
            <img style="width: 140px; height: 80px" src=${item.imageUrl} alt=${item.title} />
            </td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>${item.count}</td>
            <td style="cursor: pointer" onclick="deleteItem(${item.id})"><i class="fa-solid fa-trash"></i></td>
            </tr>`
        })
    } else {
        tbody.innerHTML = `<tr style="text-align: center"><td colspan="6">Basket is empty</td></tr>`
    }
}


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
renderBasket()