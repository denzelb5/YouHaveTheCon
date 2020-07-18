create database YouHaveTheConDB

CREATE TABLE [User] (
UserId INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
FirstName VARCHAR(100),
LastName VARCHAR(100),
Email VARCHAR(100)
)

select * from [user];

insert into [user] (FirstName, LastName, Email)
values ('Denise', 'Baker', 'denviol@yahoo.com')