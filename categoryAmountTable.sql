create table CategoryAmount (
CatAmountId int primary key identity (1,1) not null,
CatAmount decimal,
BudgetCategoryId int foreign key references BudgetCategory(BudgetCategoryId)
);

select CatAmount from CategoryAmount
where BudgetCategoryId = 1;

select * from CategoryAmount;

insert into CategoryAmount (CatAmount, BudgetCategoryId)
values (0.00, 1),
(0, 2),
(0, 3);

update CategoryAmount set CatAmount = 50 output inserted.* where BudgetCategoryId = 1;

select BudgetCategoryForBudget.*, BudgetCategory.BudgetCategoryName, Budget.conId, CategoryAmount.CatAmount
                                from BudgetCategoryforBudget
                                join BudgetCategory 
                                on BudgetCategoryForBudget.budgetCategoryId = BudgetCategory.budgetCategoryId
                                join Budget 
                                on Budget.BudgetId = BudgetCategoryForBudget.budgetId
								join CategoryAmount 
								on CategoryAmount.BudgetCategoryId = BudgetCategory.BudgetCategoryId
                                where budget.conId = 1