export function renderItems(item) {
    const div = document.createElement('div');
    const p = document.createElement('p');

    p.textContent = `${item.quantity} ${item.item}`;

    div.append(p);

    return div;
}
