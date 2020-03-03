USE ist722_mafudge_1_dw;
GO



/* Drop table fudge.FactEmployeeTimesheets */
IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'fudge.FactEmployeeTimesheets') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE fudge.FactEmployeeTimesheets 
;

/* Drop table fudge.FactRevenue */
IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'fudge.FactRevenue') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE fudge.FactRevenue 
;

/* Drop table fudge.DimCustomer */
IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'fudge.DimCustomer') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE fudge.DimCustomer 
;
/* Drop table fudge.DimDate */
IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'fudge.DimDate') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE fudge.DimDate 
;

/* Drop table fudge.FactEmployeeTimesheets */
IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'fudge.FactEmployeeTimesheets') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE fudge.FactEmployeeTimesheets 
;
/* Drop table fudge.DimEmployees */
IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'fudge.DimEmployees') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE fudge.DimEmployees 



/* Create table fudge.DimEmployees */
CREATE TABLE fudge.DimEmployees (
   [EmployeeKey]  int IDENTITY  NOT NULL
,  [EmployeeID] int not null
,  [EmployeeSSN]  char(9)   NOT NULL
,  [EmployeeLastName]  varchar(50)   NOT NULL
,  [EmployeeFirstName]  varchar(50)   NOT NULL
,  [EmployeeNameFirstLast]  nvarchar(110)   NOT NULL
,  [EmployeeNameLastFirst]  nvarchar(110)   NOT NULL
,  [EmployeeJobTitle]  varchar(50)   NOT NULL
,  [EmployeeDepartment]  varchar(50)   NOT NULL
,  [EmployeeBirthDate]  datetime   NULL
,  [EmployeeHireDate]  datetime   NULL
,  [EmployeeTermDate]  datetime   NULL
,  [EmployeeHourlyWage]  money   NOT NULL
,  [EmployeeFullTime]  nvarchar(10)   NOT NULL
,  [EmployeeSupervisor]  int  
,  [EmployeeSupervisorName]  nvarchar(110)   
,  [EmployeeSupervisorTitle]  varchar(110)  
,  [RowIsCurrent]  nchar(1)   NOT NULL
,  [RowStartDate]  datetime   
,  [RowEndDate]  datetime  DEFAULT '12/31/9999' 
,  [RowChangeReason]  varchar(200)  
, CONSTRAINT [PK_fudge.DimEmployees] PRIMARY KEY CLUSTERED 
( [EmployeeKey] )
) ON [PRIMARY]
;


SET IDENTITY_INSERT fudge.DimEmployees ON
;
INSERT INTO fudge.DimEmployees (EmployeeKey, EmployeeID, EmployeeSSN, EmployeeLastName, EmployeeFirstName, EmployeeNameFirstLast, EmployeeNameLastFirst, EmployeeJobTitle, EmployeeDepartment, EmployeeBirthDate, EmployeeHireDate, EmployeeTermDate, EmployeeHourlyWage, EmployeeFullTime, EmployeeSupervisor, EmployeeSupervisorName, RowIsCurrent, RowStartDate, RowEndDate, RowChangeReason)
VALUES (-1, '-1', -1, 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', '', '', '', -1, '?', -1, 'None', 'Y', '12/31/1899', '12/31/9999', 'N/A')
;
SET IDENTITY_INSERT fudge.DimEmployees OFF
;



/* Create table fudge.FactEmployeeTimesheets */
CREATE TABLE fudge.FactEmployeeTimesheets (
   [EmployeeKey]  int  NOT NULL
,  [PayrollDateKey]  int  NOT NULL
,  [TimesheetID]  int   NOT NULL
,  [TimesheetHours]  numeric(10,2)   NULL
,  [TimesheetTotalPay]  numeric(10,2)   NULL
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
 

 




/* Create table fudge.DimCustomer */
CREATE TABLE fudge.DimCustomer (
   [CustomerKey]  int IDENTITY  NOT NULL
,  [CustomerSource]  varchar(9)   NULL
,  [email]  varchar(200)   NULL
,  [name]  varchar(100)   NULL
,  [firstname]  varchar(50)   NULL
,  [lastname]  varchar(50)   NULL
,  [address]  varchar(1000)   NULL
,  [zipcode]  char(20)   NULL
,  [account_ID]  int   NULL
,  [account_email]  varchar(200)   NULL
,  [account_firstname]  varchar(50)   NULL
,  [account_lastname]  varchar(50)   NULL
,  [account_address]  varchar(1000)   NULL
,  [account_zipcode]  char(20)   NULL
,  [account_planid]  int   NULL
,  [account_opened_on]  datetime   NULL
,  [customer_ID]  int   NULL
,  [customer_email]  varchar(100)   NULL
,  [customer_firstname]  varchar(50)   NULL
,  [customer_lastname]  varchar(50)   NULL
,  [customer_address]  varchar(255)   NULL
,  [customer_city]  varchar(50)   NULL
,  [customer_state]  char(20)   NULL
,  [customer_zip]  varchar(20)   NULL
,  [customer_phone]  varchar(30)   NULL
,  [customer_fax]  varchar(30)   NULL
,  [RowIsCurrent]  bit DEFAULT(1)   NOT NULL
,  [RowStartDate]  datetime   DEFAULT '12/31/9999' NOT NULL
,  [RowEndDate]  datetime  DEFAULT '12/31/9999' NOT NULL
,  [RowChangeReason]  nvarchar(200)   DEFAULT('N/A') NOT NULL
, CONSTRAINT [PK_fudge.DimCustomer] PRIMARY KEY CLUSTERED 
( [CustomerKey] )
) ON [PRIMARY]
;


SET IDENTITY_INSERT fudge.DimCustomer ON
;
INSERT INTO fudge.DimCustomer (CustomerKey, CustomerSource, email, name, firstname,lastname,address,zipcode, account_ID, account_email, account_firstname, account_lastname, account_address, account_zipcode, account_planid, account_opened_on, customer_ID, customer_email, customer_firstname, customer_lastname, customer_address, customer_city, customer_state, customer_zip, customer_phone, customer_fax, RowIsCurrent, RowStartDate, RowEndDate, RowChangeReason)
VALUES (-1, 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', -1, 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', -1, '', -1, 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 1, '12/31/1899', '12/31/9999', 'N/A')
;
SET IDENTITY_INSERT fudge.DimCustomer OFF
;





/* Create table fudge.FactRevenue */
CREATE TABLE fudge.FactRevenue (
   [CustomerKey]  int   NOT NULL
,  [RevenueSource]  varchar(20)   NOT NULL
,  [RevenueDateKey]  int   NOT NULL
,  [Amount]  money  DEFAULT 0 NULL
, CONSTRAINT [PK_fudge.FactRevenue] PRIMARY KEY NONCLUSTERED 
( [RevenueSource], [RevenueDateKey], [CustomerKey])
) ON [PRIMARY]
;


ALTER TABLE fudge.FactRevenue ADD CONSTRAINT
   FK_fudge_FactRevenue_CustomerKey FOREIGN KEY
   (
   CustomerKey
   ) REFERENCES fudge.DimCustomer
   ( CustomerKey )
     ON UPDATE  NO ACTION
     ON DELETE  NO ACTION
;
 
ALTER TABLE fudge.FactRevenue ADD CONSTRAINT
   FK_fudge_FactRevenue_RevenueDateKey FOREIGN KEY
   (
   RevenueDateKey
   ) REFERENCES fudge.DimDate
   ( DateKey )
     ON UPDATE  NO ACTION
     ON DELETE  NO ACTION
;