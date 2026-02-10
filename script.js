
let orderNumber = localStorage.getItem("orderNumber") || 1;

document.getElementById("order-number").innerText = orderNumber;

const today = new Date();
const dateText = today.toLocaleDateString("ru-RU");
document.getElementById("order-date").innerText = dateText;




function calculate() {
    let total = 0;

    const storeName = document.getElementById('store-name').value;
    document.getElementById('store-display').innerText =
        storeName ? storeName : '—';


    const agentName = document.getElementById('agent-name').value;
    document.getElementById('agent-display').innerText =
        agentName ? agentName : '—';
    

    const table = document.getElementById('order-table');
    table.innerHTML = "";

    const inputs = document.querySelectorAll('.card input');

    inputs.forEach(input => {
        const qty = Number(input.value);
        const price = Number(input.dataset.price);
        const name = input.dataset.name;
        const unit = input.dataset.unit;

        if (qty > 0) {
            const sum = qty * price;
            total += sum;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td>${qty}</td>
                <td>${unit}</td>
                <td>${sum} сом</td>
            `;
            table.appendChild(row);
        }
    });

    document.getElementById('total').innerText = total;
}



function sendWhatsApp() {
    const store = document.getElementById('store-name').value || '—';
    const agent = document.getElementById('agent-name').value || '—';

    let message = `🧾 *Заказ товаров*%0A`;
    message += `🏪 Магазин: ${store}%0A`;
    message += `👨‍💼 Агент: ${agent}%0A%0A`;
    message += `📦 *Товары:*%0A`;

    let total = 0;
    const inputs = document.querySelectorAll('.card input');

    inputs.forEach(input => {
        const qty = Number(input.value);
        const price = Number(input.dataset.price);
        const name = input.dataset.name;
        const unit = input.dataset.unit;

        if (qty > 0) {
            const sum = qty * price;
            total += sum;
            message += `• ${name}: ${qty} ${unit} = ${sum} сом%0A`;
        }
    });

    if (total === 0) {
        alert("Выберите товары для заказа");
        return;
    }

    message += `%0A💰 *Итого: ${total} сом*`;

    const phone = ""; // можно указать номер, например: "996700123456"
    const url = phone
        ? `https://wa.me/${phone}?text=${message}`
        : `https://wa.me/?text=${message}`;


        orderNumber++;
        localStorage.setItem("orderNumber", orderNumber);
        document.getElementById("order-number").innerText = orderNumber;
        
    window.open(url, "_blank");
}
