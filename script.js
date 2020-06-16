const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionsIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transaction.name} 
    <span>${operator} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
        x
    </button>
    `
    transactionsUl.append(li)
}

const updateBalanceValues = () => {
    const transactionsAmounts = transactions
        .map(transactions => transactions.amount)
    const total = transactionsAmounts
        .reduce((accumulator, transactions) => accumulator + transactions, 0)
        .toFixed(2)
    const income = transactionsAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    const expenses = Math.abs(transactionsAmounts
            .filter(value => value < 0)
            .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `- R$ ${expenses}`

    // Atualiza cor de exibição do saldo atual
    if (total >= 0) {
        balanceDisplay.classList.remove("balance-negative");
        balanceDisplay.classList.add("balance-positive");
    } else {
        balanceDisplay.classList.remove("balance-positive");
        balanceDisplay.classList.add("balance-negative");
    }
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionsIntoDOM)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const addTransactionsArray = (transactionsName, transactionsAmount) => {
    transactions.push({
        id: generateID(),
        name: transactionsName,
        amount: Number(transactionsAmount)
    })
}

const cleanInputs = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
}

const handleFormSubmit = event => {
    event.preventDefault()

    const transactionsName = inputTransactionName.value.trim()
    const transactionsAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpty = transactionsName === '' || transactionsAmount === ''

    if (isSomeInputEmpty) {
        alert('Por favor, preencha tanto o nome quanto o valor da transação')
        return
    }

    addTransactionsArray(transactionsName, transactionsAmount)
    init()
    updateLocalStorage()
    cleanInputs()
}

form.addEventListener('submit', handleFormSubmit)

function investimento() {
    var valor = document.getElementById('total')
    var invest = document.getElementById('investir')
    var juro = document.getElementById('juros')
    var temp = document.getElementById('tempo')
    var total = invest.value
    var jurom = (juro.value / 12)
    for (var c = 0; c <= temp.value; c++) {
        var total = (total * (jurom / 100))
    }
    var textElement = document.createTextNode(`R$ ${total}`)
    const caixa = document.createElement("div")
    caixa.appendChild(textElement)
    valor.appendChild(caixa)
}