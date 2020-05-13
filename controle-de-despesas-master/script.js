function adicionar() {
    let n = document.getElementById('amount')
    let num = Number(n.value)
    if (num < 0) {
        let despesas = document.getElementById('money-minus')
        despesas.innerHTML = `R$  ${num}`
    } else {
        let receitas = document.getElementById('money-plus')
        receitas.innerHTML += `R$  ${num}`
    }
}