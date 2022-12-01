/* Imports */
// this will check if we have a user and set signout link if it exists
import {
    buyItem,
    checkAuth,
    createItem,
    getAllItems,
    deleteAllItems,
    signOutUser,
} from './fetch-utils.js';
import { renderItems } from './render-utils.js';

/* Get DOM Elements */
const form = document.querySelector('.item-form');
const listEl = document.querySelector('.list');
const deleteBtn = document.querySelector('.delete');
const signOutLink = document.getElementById('sign-out-link');

/* State */
checkAuth();
/* Events */

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const item = data.get('item');
    const quantity = data.get('quantity');

    await createItem(item, quantity);
    form.reset();
    fetchAndDisplayList();
});
/* Display Functions */

async function fetchAndDisplayList() {
    const list = await getAllItems();

    listEl.textContent = '';

    for (let item of list) {
        const listItemEl = renderItems(item);

        listEl.append(listItemEl);

        listItemEl.addEventListener('click', async () => {
            await buyItem(item.id);
            fetchAndDisplayList();
        });
    }
}

window.addEventListener('load', async () => {
    fetchAndDisplayList();
});

deleteBtn.addEventListener('click', async () => {
    await deleteAllItems();
    fetchAndDisplayList();
});

signOutLink.addEventListener('click', () => {
    signOutUser();
});
