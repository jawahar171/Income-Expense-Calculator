const balanceEl = document.getElementById('balance');
const incomeTotalEl = document.getElementById('income-total');
const expenseTotalEl = document.getElementById('expense-total');
const transactionListEl = document.getElementById('transaction-list');
const formEl = document.getElementById('transaction-form');
const descriptionEl = document.getElementById('description');
const amountEl = document.getElementById('amount');

let transactions = [];

// Add Transaction
function addTransaction(e) {
    e.preventDefault();

    const description = descriptionEl.value;
    const amount = +amountEl.value;

    if (description.trim() === '' || amount === 0) {
        alert('Please enter a valid description and amount');
        return;
    }

    const transaction = {
        id: generateID(),
        description,
        amount
    };

    transactions.push(transaction);
    updateUI();
    descriptionEl.value = '';
    amountEl.value = '';
}

// Generate Random ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Update the UI
function updateUI() {
    
    transactionListEl.innerHTML = '';

    
    const income = transactions.filter(item => item.amount > 0)
        .reduce((acc, item) => acc + item.amount, 0);

    const expense = transactions.filter(item => item.amount < 0)
        .reduce((acc, item) => acc + Math.abs(item.amount), 0);

    const balance = income - expense;

    balanceEl.innerText = `$${balance.toFixed(2)}`;
    incomeTotalEl.innerText = `$${income.toFixed(2)}`;
    expenseTotalEl.innerText = `$${expense.toFixed(2)}`;

    
    transactions.forEach(transaction => addTransactionToDOM(transaction));
}

// Add Transaction to DOM
function addTransactionToDOM(transaction) {
    const sign = transaction.amount > 0 ? '+' : '-';
    const type = transaction.amount > 0 ? 'income' : 'expense';

    const li = document.createElement('li');
    li.classList.add(type);
    li.innerHTML = `
        ${transaction.description} <span>${sign}$${Math.abs(transaction.amount)}</span>
        <button class="edit-btn" onclick="editTransaction(${transaction.id})">Edit</button>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
    `;

    transactionListEl.appendChild(li);
}

// Remove Transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateUI();
}

// Edit Transaction
function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);
    descriptionEl.value = transaction.description;
    amountEl.value = transaction.amount;
    removeTransaction(id);
}

// Event Listeners
formEl.addEventListener('submit', addTransaction);

// Initial call to update UI
updateUI();
