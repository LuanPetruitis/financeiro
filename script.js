const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")


// Para evitar repitir código
const getStyle = (element, style) =>
    window
    .getComputedStyle(element)
    .getPropertyValue(style)


const initialColors = {
    // Pega os estilos
    // bg: window.getComputedStyle(html).getPropertyValue("--bg"),
    bg: getStyle(html, "--bg"),
    colorHeadings: getStyle(html, "--color-headings"),
}

const darkMode = {
    bg: "#333333",
    colorHeadings: "#3664FF",
}

const transformKey = key =>
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()


const changeColors = (colors) => {
    Object.keys(colors).map(key =>
        html.style.setProperty(transformKey(key), colors[key])
    )
}


checkbox.addEventListener("change", ({ target }) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
})


const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'));
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : [];

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID);
    updateLocalStorage();
    init();
};

const addTransactionsIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement('li');

    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transaction.name}
    <span>${operator} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
        x
    </button>
    `
    transactionsUl.append(li);
};

const updateBalanceValues = () => {
    const transactionsAmounts = transactions
        .map(transactions => transactions.amount);
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

    balanceDisplay.textContent = `R$ ${total}`;
    incomeDisplay.textContent = `R$ ${income}`;
    expenseDisplay.textContent = `- R$ ${expenses}`;

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
    transactionsUl.innerHTML = '';
    transactions.forEach(addTransactionsIntoDOM);
    updateBalanceValues();
};

init();

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
};

const generateID = () => Math.round(Math.random() * 1000);

const addTransactionsArray = (transactionsName, transactionsAmount) => {
    transactions.push({
        id: generateID(),
        name: transactionsName,
        amount: Number(transactionsAmount)
    })
};

const cleanInputs = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
};

const handleFormSubmit = event => {
    event.preventDefault();

    const transactionsName = inputTransactionName.value.trim();
    const transactionsAmount = inputTransactionAmount.value.trim();
    const isSomeInputEmpty = transactionsName === '' || transactionsAmount === '';

    if (isSomeInputEmpty) {
        alert('Por favor, preencha tanto o nome quanto o valor da transação')
        return
    };

    addTransactionsArray(transactionsName, transactionsAmount);
    init();
    updateLocalStorage();
    cleanInputs();
};

form.addEventListener('submit', handleFormSubmit);

function investimento() {
    var valor = document.getElementById('total');
    var invest = document.getElementById('investir').value;
    var juro = document.getElementById('juros').value;
    let mes = [];
    let selic = [];
    let juroMes = juro / 12;
    var montante = totalSelic = invest;
    for (var i = 0; i != 12; i++) {
        montante = parseFloat(montante) + (parseFloat(montante) * (juroMes / 100));
        mes[i] = montante;
        totalSelic = parseFloat(totalSelic) + (parseFloat(totalSelic) * (0.16 / 100));
        selic[i] = totalSelic;
    }
    var textElement = document.createTextNode(`R$ ${montante.toFixed(2)}`);
    const caixa = document.createElement("div");
    caixa.appendChild(textElement);
    var ganhou = document.getElementById('ganho');
    var dinheiro = montante - invest;
    var textJuro = document.createTextNode(`R$ ${dinheiro.toFixed(2)}`);
    const box = document.createElement("div");
    box.appendChild(textJuro);

    // Antes de adicionar o valor ganho, limpa valores que já estejam sendo exibidos
    ganhou.innerHTML = "";
    valor.innerHTML = "";

    // Adiciona novos valores
    ganhou.appendChild(box);
    valor.appendChild(caixa);

    // Grafico 

    var ctx = document.getElementsByClassName("line-chart");

    var chartGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            datasets: [{
                label: "INVESTIMENTO",
                data: mes,
                borderWidth: 6,
                borderColor: 'rgba(77, 166, 253, 0.85)',
                backgroundColor: 'transparent'
            }, {
                label: "SELIC",
                data: selic,
                borderWidth: 6,
                borderColor: 'rgba(200, 200, 200, 0.85)',
                backgroundColor: 'transparent'
            }]
        }
    });
};

const update = () => {
    localStorage.setItem('montante', JSON.stringify(montante))
    localStorage.setItem('dinheiro', JSON.stringify(dinheiro))
}