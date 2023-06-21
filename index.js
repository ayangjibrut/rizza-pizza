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
    return menuItem
}

function render() {
    document.getElementById('menus').innerHTML = getMenuHtml()
}

render()