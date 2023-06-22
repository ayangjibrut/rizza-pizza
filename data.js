import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
export const menuArray = [
    {
        name: `Cotton Candy Pizza`,
        ingredients: "the flavors of fairy floss and pizza",
        picture: 'images/cotton-candy.jpg',
        price: 14,
        id: 0,
        numberOrdered: 0,
        uuid: uuidv4()
    },
        {
        name: "Jalapeno Spicy Pizza",
        ingredients: "great choice for those who enjoy a little heat in their food",
        picture: 'images/jalapeno.png',
        price: 12,
        id: 1,
        numberOrdered: 0,
        uuid: uuidv4()
    },
        {
        name: "Twilight Pizza",
        ingredients: "doesn't refer to a specific pizza recipe or a well-known pizza variety",
        picture: 'images/twilight.png',
        price: 11,
        id: 2,
        numberOrdered: 0,
        uuid: uuidv4()
    },
        {
        name: "Nebula Beer",
        ingredients: "grain, hops, yeast, water",
        picture: 'images/nebula-beer.jpg',
        price: 10,
        id: 3,
        numberOrdered: 0,
        uuid: uuidv4()
    },
        {
        name: "Underwater Tropical Juice",
        ingredients: "mango, orange, rambutan, avocado",
        picture: 'images/underwater-tropical-juice.jpg',
        price: 11,
        id: 4,
        numberOrdered: 0,
        uuid: uuidv4()
    }
]