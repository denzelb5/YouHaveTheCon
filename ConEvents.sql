update ConEvents 
set ExpenseId = 2, ConId = 1, UserId = 1
where EventId = 1;

insert into ConEvents (EventName, EventDateTime, EventLocation, ExpenseId, ConId, UserId)
values ('Dr. Who Panel', '2021-05-21 11:00:00.000', 'Daisy Ballroom', 12, 1, 1)


select ConEvents.*, Expenses.*, BudgetLineItem.*
from ConEvents
join Expenses 
on ConEvents.ExpenseId = Expenses.ExpenseId
join BudgetLineItem
on BudgetLineItem.BudgetLineItemId = Expenses.BudgetLineItemId;









select * from ConEvents;
select * from expenses;