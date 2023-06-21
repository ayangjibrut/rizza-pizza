import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export const menuArray = [
    {
        name: `Cotton Candy Pizza`,
        ingredients: "the flavors of fairy floss and pizza",
        picture: 'images/cotton-candy.jpg',
        price: 14.3,
        id: 0,
        uuid: uuidv4()
    },
        {
        name: "Jalapeno Spicy Pizza",
        ingredients: "great choice for those who enjoy a little heat in their food",
        picture: 'images/jalapeno.png',
        price: 12.1,
        id: 1,
        uuid: uuidv4()
    },
        {
        name: "Twilight Pizza",
        ingredients: "doesn't refer to a specific pizza recipe or a well-known pizza variety",
        picture: 'images/twilight.png',
        price: 11.4,
        id: 2,
        uuid: uuidv4()
    },
        {
        name: "Beer",
        ingredients: "grain, hops, yeast, water",
        picture: 'images/beer.jpg',
        price: 7.2,
        id: 3,
        uuid: uuidv4()
    },
        {
        name: "Tropical Juice",
        ingredients: "mango, orange, rambutan, avocado",
        picture: 'images/tropical-juice.jpg',
        price: 9.4,
        id: 4,
        uuid: uuidv4()
    }
]