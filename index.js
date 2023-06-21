import { menuArray } from './data.js'

const basket = []

document.addEventListener('click', function(e) {
    if (e.target.dataset.addmenu) {
        handleAddClick(e.target.dataset.addmenu)
    }
})

function handleAddClick(menuId) {
    const targetMenuObj = menuArray.filter(function(menu) {
        return menu.id === menuId
    })
    menuArray.unshift(targetMenuObj)
    render()
}

function getMenuHtml() {
    let menuItem = ``
    let menuHtml = ``

    menuArray.forEach(function(menu) {

        menuItem += `
        <div class="menu">
            <img src="${menu.picture}" class="menu-img">
            <ul>
                <li class="bold">${menu.name}</li>
                <li>${menu.ingredients}</li>
            </ul>
            <div class="item-wrapper">
                <h3>$${menu.price}</h3>
                <button><i class="fa-solid fa-plus fa-xl" data-addmenu="${menu.id}"></i></button>
            </div>
        </div>
    `
    })
    menuHtml += menuItem
    return menuHtml
}

function createAside() {
    document.getElementById('cart').innerHTML = createAside()
    let asideHtml = `
        <h4>Your Order</h4>
        <div class="shopping-cart" id="shopping-cart">
            <h3>${menu.name}</h3>
        </div>
    `
    asideHtml += ``
    return asideHtml
}

function render() {
    document.getElementById('menus').innerHTML = getMenuHtml()

    const aside = document.querySelector('aside')

    aside.innerHTML = createAside()
        if (menuArray.length === 0) {
            aside.classList.add(`hidden`)
        }
        else {
            aside.classList.remove(`hidden`)
        }
}

render()