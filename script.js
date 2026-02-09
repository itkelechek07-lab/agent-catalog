function calculate() {
    let total = 0;

    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const check = product.querySelector('.check');
        const qty = product.querySelector('.qty');

        if (check.checked && qty.value > 0) {
            const price = check.dataset.price;
            total += price * qty.value;
        }
    });

    document.getElementById('total').innerText = total;
}
