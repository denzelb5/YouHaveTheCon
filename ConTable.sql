--CREATE TABLE Con (
--ConId INT PRIMARY KEY IDENTITY (1,1) NOT NULL,
--ConName VARCHAR(100),
--ConStartDate DateTime,
--LocationInfo VARCHAR(500)
--)

--INSERT INTO Con (ConName, ConStartDate, LocationInfo)
--VALUES ('DragonCon', '2021-05-21T10:00:00', 'Dallas Convention Center')

--alter table Con alter column ConStartDate Date;

--INSERT INTO Con (ConName, ConStartDate, LocationInfo, LocationName)
--VALUES ('San Diego ComicCon', '2021-07-15', '111 W Harbor Dr San Diego, CA 92101', 'San Diego Convention Center'),
--		('Creation Official Star Trek Convention', '2020-12-09', '3911 Koval Ln Las Vegas, NV 89109', 'Caesars Forum Conference Center Las Vegas'),
--		('Con Of Thrones', '2021-06-22', '201 5th Ave S Nashville, TN 37203', 'Music City Center');

SELECT * FROM Convention;

--ALTER table Con
--ADD LocationName VARCHAR(150);

--update Con set LocationInfo = '445 Atlanta S. Pkwy Atlanta, GA 30349' where ConName = 'DragonCon';
--update Con set LocationName = 'Dragon Con Inc.' where ConName = 'DragonCon'

--alter table Convention add ConEndDate date;

--update Convention set ConEndDate = '2021-06-24' where ConId = 4;
--values ('2021-05-23') where conId = 1,
--('2021-07-15'),
--('2020-12-11'),
--('2021-06-24')

--delete from Convention Where conId = 8;

select conId from Convention where ConName = 'DragonCon'




