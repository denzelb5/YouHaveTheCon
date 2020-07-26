--create table BudgetLineItem (
--BudgetLineItemId int primary key identity (1,1) not null,
--BudgetId int foreign key references Budget(BudgetId),
--[Name] varchar(100),
--Amount decimal (10, 2)
--)



--insert into BudgetLineItem (BudgetId, [Name], Amount)
--values (1, 'Travel', 400.00),
--(1, 'Accomodations', 1000),
--(1, 'Cosplay Outfit', 150),
--(1, 'Food', 200),
--(1, 'Events', 500)

--select * 
--from Convention
--where conId = 1
--and userId = 1

--alter table Budget
--add AmountBudgeted decimal(10, 2);

select * from Budget
select * from BudgetLineItem