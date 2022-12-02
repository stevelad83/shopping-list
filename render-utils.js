export function renderItems(item) {
    const div = document.createElement('div');
    const p = document.createElement('p');

    div.classList.add(item.bought ? 'bought' : 'need');
    div.classList.add('item');

    p.textContent = `${item.quantity} ${item.item}`;

    div.append(p);

    return div;
}
