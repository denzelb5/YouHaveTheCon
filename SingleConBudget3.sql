--select BudgetCategoryForBudget.*, budget.* from BudgetCategoryForBudget, BudgetCategory.*
--join budget on budget.BudgetId = BudgetCategoryForBudget.BudgetId
--join BudgetCategory on BudgetCategory.BudgetCategoryId = BudgetCategoryForBudget.BudgetCategoryId
--(select BudgetCategory.BudgetCategoryName);


--select budget.*, BudgetCategoryForBudget.*, BudgetCategory.BudgetCategoryName
--from Budget
--join BudgetCategoryForBudget
--on BudgetCategoryForBudget.BudgetId = Budget.BudgetId
--join BudgetCategory
--on BudgetCategory.BudgetCategoryId = BudgetCategoryForBudget.BudgetCategoryId;

--select BudgetCategoryForBudget.* from BudgetCategoryForBudget
--where BudgetId = 1 
--(select BudgetCategory.BudgetCategoryName, BudgetCategoryForBudget.BudgetCategoryId
--from BudgetCategory
--join BudgetCategoryForBudget on BudgetCategoryForBudget.BudgetCategoryId = BudgetCategory.BudgetCategoryId
--where BudgetCategory.BudgetCategoryId = BudgetCategoryForBudget.BudgetCategoryId)

--select DISTINCT a.BudgetId, a.BudgetCategoryId, b.BudgetCategoryName
--from BudgetCategoryForBudget a, BudgetCategory b
--where a.BudgetId = 1

--select a.BudgetCategoryName, b.BudgetCategoryId, b.BudgetId
--from BudgetCategory a, BudgetCategoryForBudget b
--where a.BudgetCategoryId = b.BudgetCategoryId

--SELECT * FROM BudgetCategoryForBudget WHERE BudgetId = 1;