create table CosplayPieces (
CosplayPiecesId int primary key identity(1,1) not null,
CosplayId int foreign key references CosplayOutfit(CosplayId),
PieceName varchar(150),
TodoId int foreign key references TodoItems(TodoId),
PercentDone int,
CompletionHoursEstimate int,
CompletionMinutesEstimate int,
PieceImageUrl varchar(1500),
CosplayImageUrl varchar(1500),
ExpenseId int foreign key references Expenses(ExpenseId)
);

create table TodoItems (
TodoId int primary key identity(1, 1) not null,
TodoName varchar(150),
ExpenseId int foreign key references Expenses(ExpenseId),
TodoPercentDone int,
TodoBuy varchar(200),
TodoMake varchar(200),
TodoNotes varchar(1000),
IsDone bit default 0 not null
);

insert into CosPlayOutfit (CosplayName, UserId, DateCreated, DateDue, TotalProgress, CosplayImageUrl)
values ('Mando Outfit', 1, '2020-01-21 11:00:00.000', '2021-05-21 11:00:00.000', 25, 'https://live.staticflickr.com/65535/48854889767_f55d214221_b.jpg'),
('CyberMan', 1, '2020-05-21 11:00:00.000', '202-10-21 11:00:00.000', 10, 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Cyberman_from_Doctor_Who_%28529659465%29.jpg'),
('Spock',1, '2020-06-15 11:00:00.000', '2021-01-10 11:00:00.000', 90 ,'https://upload.wikimedia.org/wikipedia/commons/b/bd/Leonard_Nimoy_Mr._Spock_Star_Trek.JPG')

select * from CosplayOutfit
