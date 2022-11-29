/* Imports */
// this will check if we have a user and set signout link if it exists
import { checkAuth, createItem } from './fetch-utils.js';

/* Get DOM Elements */
const form = document.querySelector('.item-form');
/* State */

/* Events */

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const item = data.get('item');
    const quantity = data.get('quantity');

    const response = await createItem(item, quantity);
    return response.data;
});
/* Display Functions */
