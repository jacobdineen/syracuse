USE ist722_mafudge_1_dw;
GO

--CREATE SCHEMA fudge
--GO

/* Drop table fudge.FactEmployeeTimesheets */
IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'fudge.FactEmployeeTimesheets') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE fudge.FactEmployeeTimesheets 
;

/* Drop table fudge.DimDate */
IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'fudge.DimDate') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE fudge.DimDate 
;
/* Drop table fudge.DimEmployees */
IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'fudge.DimEmployees') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE fudge.DimEmployees 
;

/* Create table fudge.DimDate */
CREATE TABLE fudge.DimDate (
   [DateKey]  int   NOT NULL
,  [Date]  date   NULL
,  [FullDateUSA]  nchar(11)   NOT NULL
,  [DayOfWeek]  tinyint   NOT NULL
,  [DayName]  nchar(10)   NOT NULL
,  [DayOfMonth]  tinyint   NOT NULL
,  [DayOfYear]  smallint   NOT NULL
,  [WeekOfYear]  tinyint   NOT NULL
,  [MonthName]  nchar(10)   NOT NULL
,  [MonthOfYear]  tinyint   NOT NULL
,  [Quarter]  tinyint   NOT NULL
,  [QuarterName]  nchar(10)   NOT NULL
,  [Year]  smallint   NOT NULL
,  [IsWeekday]  bit  DEFAULT 0 NOT NULL
, CONSTRAINT [PK_fudge.DimDate] PRIMARY KEY CLUSTERED 
( [DateKey] )
) ON [PRIMARY]
;


INSERT INTO fudge.DimDate (DateKey, Date, FullDateUSA, DayOfWeek, DayName, DayOfMonth, DayOfYear, WeekOfYear, MonthName, MonthOfYear, Quarter, QuarterName, Year, IsWeekday)
VALUES (-1, '', 'Unk date', 0, 'Unk date', 0, 0, 0, 'Unk month', 0, 0, 'Unk qtr', 0, 0)
;



/* Create table fudge.DimEmployees */
CREATE TABLE fudge.DimEmployees (
   [EmployeeKey]  int IDENTITY  NOT NULL
,  [EmployeeSSN]  char(9)   NOT NULL
,  [EmployeeLastName]  varchar(50)   NOT NULL
,  [EmployeeFirstName]  varchar(50)   NOT NULL
,  [EmployeeNameFirstLast]  varchar(110)   NOT NULL
,  [EmployeeNameLastFirst]  varchar(110)   NOT NULL
,  [EmployeeJobTitle]  nvarchar(50)   NOT NULL
,  [EmployeeDepartment]  nvarchar(50)   NOT NULL
,  [EmployeeBirthDate]  datetime   NULL
,  [EmployeeHireDate]  datetime   NULL
,  [EmployeeTermDate]  datetime   NULL
,  [EmployeeHourlyWage]  money   NOT NULL
,  [EmployeeFullTime]  char   NOT NULL
,  [EmployeeSupervisorID]  int   NOT NULL
,  [EmployeeSupervisorName]  varchar(110)   NOT NULL
,  [RowIsCurrent]  nchar(1)   NOT NULL
,  [RowStartDate]  datetime   NOT NULL
,  [RowEndDate]  datetime  DEFAULT '12/31/9999' NOT NULL
,  [RowChangeReason]  nvarchar(200)   NOT NULL
, CONSTRAINT [PK_fudge.DimEmployees] PRIMARY KEY CLUSTERED 
( [EmployeeKey] )
) ON [PRIMARY]
;


SET IDENTITY_INSERT fudge.DimEmployees ON
;
INSERT INTO fudge.DimEmployees (EmployeeKey, EmployeeSSN, EmployeeLastName, EmployeeFirstName, EmployeeNameFirstLast, EmployeeNameLastFirst, EmployeeJobTitle, EmployeeDepartment, EmployeeBirthDate, EmployeeHireDate, EmployeeTermDate, EmployeeHourlyWage, EmployeeFullTime, EmployeeSupervisorID, EmployeeSupervisorName, RowIsCurrent, RowStartDate, RowEndDate, RowChangeReason)
VALUES (-1, '-1', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', '', '', '', -1, '?', -1, 'None', 'Y', '12/31/1899', '12/31/9999', 'N/A')
;
SET IDENTITY_INSERT fudge.DimEmployees OFF
;



/* Create table fudge.FactEmployeeTimesheets */
CREATE TABLE fudge.FactEmployeeTimesheets (
   [EmployeeKey]  int  NOT NULL
,  [PayrollDateKey]  int  NOT NULL
,  [EmployeeHireDate]  int  NOT NULL
,  [EmployeeTermDate]  int  NULL
,  [TimesheetID]  int   NOT NULL
,  [TimesheetHours]  int   NULL
,  [TimesheetTotalPay]  money   NULL
,  [DaysOfEmployment]  int   NULL
, CONSTRAINT [PK_fudge.FactEmployeeTimesheets] PRIMARY KEY NONCLUSTERED 
( [EmployeeKey], [TimesheetID] )
) ON [PRIMARY]
;

ALTER TABLE fudge.FactEmployeeTimesheets ADD CONSTRAINT
   FK_fudge_FactEmployeeTimesheets_EmployeeKey FOREIGN KEY
   (
   EmployeeKey
   ) REFERENCES fudge.DimEmployees
   ( EmployeeKey )
     ON UPDATE  NO ACTION
     ON DELETE  NO ACTION
;
 
ALTER TABLE fudge.FactEmployeeTimesheets ADD CONSTRAINT
   FK_fudge_FactEmployeeTimesheets_PayrollDateKey FOREIGN KEY
   (
   PayrollDateKey
   ) REFERENCES fudge.DimDate
   ( DateKey )
     ON UPDATE  NO ACTION
     ON DELETE  NO ACTION
;
 
ALTER TABLE fudge.FactEmployeeTimesheets ADD CONSTRAINT
   FK_fudge_FactEmployeeTimesheets_EmployeeHireDate FOREIGN KEY
   (
   EmployeeHireDate
   ) REFERENCES fudge.DimDate
   ( DateKey )
     ON UPDATE  NO ACTION
     ON DELETE  NO ACTION
;
 
ALTER TABLE fudge.FactEmployeeTimesheets ADD CONSTRAINT
   FK_fudge_FactEmployeeTimesheets_EmployeeTermDate FOREIGN KEY
   (
   EmployeeTermDate
   ) REFERENCES fudge.DimDate
   ( DateKey )
     ON UPDATE  NO ACTION
     ON DELETE  NO ACTION
;
 
