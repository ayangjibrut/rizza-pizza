import { menuArray } from './data.js'

// Render restaurant menu
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

// Handle button, display ordering process in html
const orderHtml = document.getElementById('order-process')
const paymentModal = document.querySelector('form')
const overlay = document.querySelector('.overlay')
const orderTitleHtml = document.querySelector('.title')
const summaryEl = document.querySelector('#summary')
const emptyOrder = document.querySelector('.empty-order')

document.addEventListener('click', function(e) {
    if (e.target.dataset.addBtn) {
        handleAddBtnClick(e.target.dataset.addBtn)
    }
    else if (e.target.dataset.removeBtn) {
        handleRemoveBtnClick(e.target.dataset.removeBtn)
    }
    else if (e.target.dataset.completeOrder) {
        handleCompleteOrderBtnClick(e.target.dataset.completeOrder)
    } 
    else if (e.target.dataset.closeModal) {
        handleCloseModalBtnClick(e.target.dataset.closeModal)
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

    orderArray.forEach(function([name, numberOrdered, price, uuid]) {
        orderHtml.innerHTML += `
            <div class="shopping-cart" id="shopping-cart">
                <div class="menu-order">
                    <p class="menu-name" id="menu-name">${name}
                    <span class="remove-btn" id="remove-btn" data-remove=${uuid} data-remove-btn=${uuid}>remove</span></p>
                </div>
                <div class="price-order" id="price-order">
                    <p class="order-price"><small>${numberOrdered}x</small><h3>$${price}</h3>
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
        orderHtml.innerHTML = ``
        summaryEl.innerHTML = ''
    }
}

// Add remove buttons
let orderArray = []

function handleAddBtnClick(addBtnId) {
    const targetAddBtn = menuArray.filter(function(menuItem) {
        return menuItem.uuid === addBtnId
    })[0]

    targetAddBtn.numberOrdered++
    if (targetAddBtn.numberOrdered === 1) {
        orderArray.push([
            targetAddBtn.name,
            targetAddBtn.numberOrdered,
            targetAddBtn.price,
            targetAddBtn.uuid
        ])
    }
    else {
        for (let i = 0; i < orderArray.length; i++) {
            if (orderArray[i][0] === targetAddBtn.name) {
                orderArray[i][1] = targetAddBtn.numberOrdered
                orderArray[i][2] = targetAddBtn.price *targetAddBtn.numberOrdered
                orderArray[i][3] = targetAddBtn.uuid
            }
        }
    }
    orderDisplay()
    orderProcess()
}

function handleRemoveBtnClick(removeBtnId) {
    const targetRemoveBtn = menuArray.filter(function(menuItem) {
        return menuItem.uuid === removeBtnId
    })[0]

    targetRemoveBtn.numberOrdered--
    for (let i=0; i < orderArray.length; i++) {
        if (orderArray[i][0] === targetRemoveBtn.name) {
            orderArray[i][1] = targetRemoveBtn.numberOrdered
            orderArray[i][2] = targetRemoveBtn.price * targetRemoveBtn.numberOrdered
        }
        if (orderArray[i][1] === 0) {
            orderArray.splice(i, 1)
        }
    }
    orderProcess()
}

// Complete order btn
function handleCompleteOrderBtnClick() {
    openModal()
}

// Close payment modal
function handleCloseModalBtnClick() {
    closeModal()
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !paymentModal.classList.contains('hidden')) {
        closeModal()
    }
})

const openModal = function() {
    paymentModal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

const closeModal = function() {
    paymentModal.classList.add('hidden')
    overlay.classList.add('hidden')
    event.preventDefault()
}

// Pay btn
paymentModal.onsubmit = function() {
    closeModal()

    const buyerName = document.getElementById('buyer-name').value

    orderTitleHtml.classList.add('hidden')

    orderHtml.innerHTML = ''
    summaryEl.innerHTML = ''
    orderHtml.innerHTML = `
        <div class="thank-you-message">
            <h3>Thanks! ${buyerName}! Your order is on it's way!</h3>
        </div>
        `

    menuArray.forEach(function(menu) {
        menu.numberOrdered = 0
    })
    event.preventDefault()
    clearAllInputs()
}

// Clear input fields
function clearAllInputs(event) {
    let allInputs = document.querySelectorAll('input')
    allInputs.forEach(singleInput => (singleInput.value = ''))
}