--select Convention.*, [User].FirstName, Budget.*, BudgetCategory.*
--from Convention
--join [User]
--on [User].UserId = Convention.UserId
--join Budget
--on Budget.UserId = Convention.UserId
--join BudgetCategory 
--on BudgetCategory.BudgetCategoryId = Budget.BudgetCategoryId;

--insert into Budget(budgetName, amountBudgeted)
--values ('DragonCon', 800.00);

--select * from BudgetCategoryForBudget;

--update Budget set conId = 1 where BudgetName = 'DragonCon';

--create table BudgetCategoryForBudget (
--BCForBudgetId int primary key identity (1,1) not null,
--BudgetId int foreign key references Budget(BudgetId),
--BudgetCategoryId int foreign key references BudgetCategory(BudgetCategoryId)
--)

--insert into BudgetCategoryForBudget (BudgetId, BudgetCategoryId)
--values (1, 1),
--(1, 2),
--(1, 3),
--(1, 4);

--alter table Budget 
--add BudgetCategoryId int foreign key references BudgetCategory(BudgetCategoryId);

select * from budget;

select Convention.conName, budget.*, budgetCategoryForBudget.*, BudgetCategory.BudgetCategoryName
from Convention
join Budget
on Budget.UserId = Convention.UserId 
join BudgetCategoryForBudget
on Budget.BudgetId = BudgetCategoryForBudget.BudgetId
join BudgetCategory
on BudgetCategory.BudgetCategoryId = BudgetCategoryForBudget.BudgetCategoryId
where budget.conId = Convention.conId;
 
 --alter table Budget drop column BudgetCategoryId;

--select * from BudgetCategory

select Convention.ConName, budget.*
from Convention 
join Budget
on Budget.userId = Convention.userId
where Budget.conId = Convention.conId;

select BudgetCategoryForBudget.*, BudgetCategory.BudgetCategoryName, Budget.*
from BudgetCategoryforBudget
join BudgetCategory
on BudgetCategoryForBudget.budgetCategoryId = BudgetCategory.budgetCategoryId
join Budget 
on Budget.BudgetId = BudgetCategoryForBudget.budgetId
where budget.conId = 1;