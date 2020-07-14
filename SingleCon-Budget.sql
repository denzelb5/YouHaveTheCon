--create table BudgetCategory (
--BudgetCategoryId int primary key identity (1,1) not null,
--BudgetCategoryName varchar(100)
--)

--create table Expenses (
--ExpenseId int primary key identity (1,1) not null,
--ExpenseName varchar(100),
--Cost Decimal,
--BudgetCategoryId int foreign key references BudgetCategory(BudgetCategoryId),
--UserId int foreign key references [User](UserId)
---)


--create table CosPlayOutfit (
--CosplayId int primary key identity (1,1) not null,
--CosplayName varchar(100),
--UserId int foreign key references [User](UserId),
--DateCreated DateTime,
--DateDue DateTime,
--TotalProgress Int,
--CosplayImageUrl varchar(1000)
--)







--create table ConEvents (
--EventId int primary key identity (1,1) not null,
--EventName varchar(200),
--EventDateTime DateTime,
--EventLocation varchar(100),
--ExpenseId Int foreign key references Expenses(ExpenseId),
--ConId int foreign key references Convention(ConId),
--UserId INT FOREIGN KEY REFERENCES [User](UserId),
--CosplayId int foreign key references CosPlayOutfit(CosplayId)
--)

--create table Budget (
--BudgetId int primary key identity (1,1) not null,
--BudgetName varchar(100),
--BudgetCategoryId int foreign key references BudgetCategory(BudgetCategoryId),
--AmountBudgeted Decimal,
--UserId int foreign key references [User](UserId)

--)
--insert into BudgetCategory (BudgetCategoryName)
--values ('Travel'),
--('Lodging'),
--('Food'),
--('Merchandise'),
--('TotalCosplayExpense');


--select * from BudgetCategory;

--select Convention.*, ConEvents.*, Budget.*, BudgetCategory.*, Expenses.*
--from Convention
--join ConEvents 
--on Convention.conId = ConEvents.conId
--join Budget 
--on ConEvents.UserId = Budget.UserId
--join BudgetCategory
--on Budget.BudgetCategoryId = BudgetCategory.BudgetCategoryId
--join expenses
--on conEvents.userId = Expenses.userId
--where conEvents.userId = 1;


--select Convention.*, ConEvents.*
--from Convention 
--join ConEvents
--on ConEvents.conId = Convention.conId
--where Convention.ConId = 1;

--insert into ConEvents (EventName, EventDateTime, EventLocation)
--values ('John Snow autograph', '2021-05-21T10:00:00', '404')

--select convention.*, conEvents.ConId
--from Convention
--join conEvents
--on conEvents.ConId = Convention.ConId;

--select * from ConEvents;

--alter table Convention
--add  UserId int foreign key references [User](UserId);

select * from Convention;

Insert into Convention (UserId)
values
(1, (SELECT UserId FROM Convention WHERE ConName ='DragonCon'))

update Convention set UserId = 1 where ConId = 4;