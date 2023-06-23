import { menuArray } from './data.js'

const orderHtml = document.getElementById('order-process')
const paymentModal = document.getElementById('payment')
const orderTitleHtml = document.querySelector('.title')
const summaryEl = document.querySelector('#summary')
const emptyOrder = document.querySelector('.empty-order')

document.addEventListener('click', function(e) {
    if (e.target.dataset.addBtn) {
        handleAddBtn(e.target.dataset.addBtn)
    }
    else if (e.target.dataset.removeBtn) {
        handleRemoveBtn(e.target.dataset.removeBtn)
    }
    else if (e.target.dataset.completeOrder) {
        handleCompleteOrderBtn(e.target.dataset.completeOrder)
    } 
    else if (e.target.dataset.closeModal) {
        handleCloseModalBtn(e.target.dataset.closeModal)
    }
})

document.addEventListener('submit', function(e) {
    if (e.target.dataset.pay) {
        return e.target.dataset.pay
    }
})

const orderDisplay = () => {
    orderTitleHtml.classList.remove('hidden')
    emptyOrder.classList.add('hidden')
}

const orderProcess = function() {
    orderHtml.innerHTML = ``
    summaryEl.innerHTML = ''

    let totalPrice = 0

    orderArray.forEach(function([name, orderNumber, price, uuid]) {
        orderHtml.innerHTML += `
            <div class="shopping-cart" id="shopping-cart">
                <div class="menu-order">
                    <p class="menu-name" id="menu-name">${name}
                    <span class="remove-btn" id="remove-btn" data-remove=${uuid} data-remove-btn=${uuid}>remove</span></p>
                </div>
                <div class="price-order" id="price-order">
                    <p class="order-price"><small>${orderNumber}x</small><h3>$${price}</h3>
                </div>
            </div>
        `
        totalPrice += price
    })

    summaryEl.innerHTML = `
        <div class="summary">
            <h3 class="total-price">Total price:</h3>
            <h3 id="total-price">$${totalPrice}</h3>
        </div>
        <div class="footer">
            <button class="checkout" id="checkout" data-complete-order="complete-order">Complete Order</button>
        </div>
    `

    if (totalPrice === 0) {
        orderTitleHtml.classList.add('hidden')
        emptyOrder.classList.remove('hidden')
        orderHtml.innerHTML = ``
        summaryEl.innerHTML = ''
        
    }
}

let orderArray = []

function handleAddBtn(addBtnId) {
    const targetAddBtn = menuArray.filter(function(menuItem) {
        return menuItem.uuid === addBtnId
    })[0]

    targetAddBtn.orderNumber++
    if (targetAddBtn.orderNumber === 1) {
        orderArray.push([
            targetAddBtn.name,
            targetAddBtn.orderNumber,
            targetAddBtn.price,
            targetAddBtn.uuid
        ])
    }
    else {
        for (let i = 0; i < orderArray.length; i++) {
            if (orderArray[i][0] === targetAddBtn.name) {
                orderArray[i][1] = targetAddBtn.orderNumber
                orderArray[i][2] = targetAddBtn.price * targetAddBtn.orderNumber
                orderArray[i][3] = targetAddBtn.uuid
            }
        }
    }
    orderDisplay()
    orderProcess()
}

function handleRemoveBtn(removeBtnId) {
    const targetRemoveBtn = menuArray.filter(function(menuItem) {
        return menuItem.uuid === removeBtnId
    })[0]

    targetRemoveBtn.orderNumber--
    for (let i=0; i < orderArray.length; i++) {
        if (orderArray[i][0] === targetRemoveBtn.name) {
            orderArray[i][1] = targetRemoveBtn.orderNumber
            orderArray[i][2] = targetRemoveBtn.price * targetRemoveBtn.orderNumber
        }
        if (orderArray[i][1] === 0) {
            orderArray.splice(i, 1)
        }
    }
    orderProcess()
}

function handleCompleteOrderBtn() {
    openModal()
}

function handleCloseModalBtn() {
    closeModal()
}

const openModal = function() {
    paymentModal.classList.remove('hidden')
}

const closeModal = function() {
    paymentModal.classList.add('hidden')
    event.preventDefault()
}

// function clearAllInputs(event) {
//     let allInputs = document.querySelectorAll('input')
//     allInputs.forEach(singleInput => (singleInput.value = ''))
// }

paymentModal.addEventListener('submit', function(e) {
    e.preventDefault()
    closeModal()

    const buyerName = document.getElementById('buyer-name').value

    menuArray.forEach(function(menu) {
        menu.orderNumber = 0

    orderTitleHtml.style.display = 'none'

    summaryEl.innerHTML = ''
    orderHtml.innerHTML = `
        <div class="thanks">
            <img src="images/loading.svg" class="loading">
            <p>Please wait, uploading your data to the dark web..</p>
        </div>
    `

    setTimeout(function() {
        orderHtml.innerHTML = `
        <div class="thanks">
            <img src="images/loading.svg">
            <p>Making the sale</p>
        </div>
    `
    }, 3000)

    setTimeout(function() {
        orderHtml.innerHTML = `
        <div class="thanks">
            <h3>Thanks <span style="color: #e30000;">${buyerName}</span>, you sucker!</h3>
            <p>We just sold your data to your eternal soul.</p>
            <img src="images/pirate.gif" class="pirate">
        </div>
    `
    }, 3000)

    // <h3>Thanks, <span style="color: #e30000;">${buyerName}!</span> Your order is on it's way!</h3>
    }) 
})

// paymentModal.onsubmit = function() {
//     closeModal()

//     const buyerName = document.getElementById('buyer-name').value

//     orderTitleHtml.classList.add('hidden')

//     orderHtml.innerHTML = ''
//     summaryEl.innerHTML = ''
//     orderHtml.innerHTML = `
//         <div class="thanks">
//             <h3>Thanks, ${buyerName}! Your order is on it's way!</h3>
//         </div>
//         `

//     menuArray.forEach(function(menu) {
//         menu.orderNumber = 0
//     })
//     event.preventDefault()
//     clearAllInputs()
// }



function getFeedHtml() {
    let feedHtml = ``

    menuArray.forEach(function(menu) {
        feedHtml += `
        <div class="menu">
            <img src="${menu.picture}" class="menu-img">
            <ul>
                <li class="bold">${menu.name}</li>
                <li>${menu.ingredients}</li>
            </ul>
            <div class="item-wrapper">
                <h3>$${menu.price}</h3>
                <button class="add-button"><i class="fa-solid fa-plus fa-xl" data-add-btn="${menu.uuid}"></i></button>
            </div>
        </div>
    `
    })
    return feedHtml
}

function render() {
    document.getElementById('section-el').innerHTML = getFeedHtml()
}

render()