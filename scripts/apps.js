const budgetForm = document.getElementById('budget-form');
    const budgetInput = document.getElementById('budget-amount');
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expensesList = document.getElementById('expenses-list');

    let budget = localStorage.getItem('budget') || 0;
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    renderExpenses();

    budgetForm.addEventListener('submit', function(event) {
      event.preventDefault();
      budget = parseFloat(budgetInput.value);
      localStorage.setItem('budget', budget);
      renderExpenses();
    });

    expenseForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = expenseNameInput.value;
      const amount = parseFloat(expenseAmountInput.value);
      expenses.push({ name, amount });
      localStorage.setItem('expenses', JSON.stringify(expenses));
      expenseNameInput.value = '';
      expenseAmountInput.value = '';
      renderExpenses();
    });

    function renderExpenses() {
        expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
        const remainingBudget = budget - totalExpenses;
  
        expensesList.innerHTML = '';
        expenses.forEach(expense => {
          const expenseItem = document.createElement('li');
          expenseItem.classList.add('expense-item');
          expenseItem.innerHTML = `
            <span>${expense.name}</span>
            <span>$${expense.amount.toFixed(2)}</span>
            <button onclick="deleteExpense('${expense.name}')">Delete</button>
          `;
          expensesList.appendChild(expenseItem);
        });
  
        const remainingBudgetDisplay = document.createElement('p');
        remainingBudgetDisplay.textContent = `Remaining budget: $${remainingBudget.toFixed(2)}`;
        expensesList.appendChild(remainingBudgetDisplay);
      }
  
      function deleteExpense(name) {
        expenses = expenses.filter(expense => expense.name !== name);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
      }