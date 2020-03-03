USE ist722_mafudge_1_dw
;


/* CREATE SCHEMA fudgemart  */
GO


/* Drop table fudge.FactRevenue */
IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'fudge.FactRevenue') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE fudge.FactRevenue 
;

/* Drop table fudge.DimCustomer */
IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'fudge.DimCustomer') AND OBJECTPROPERTY(id, N'IsUserTable') = 1)
DROP TABLE fudge.DimCustomer 
;



/* Create table fudge.DimCustomer */
CREATE TABLE fudge.DimCustomer (
   [CustomerKey]  int IDENTITY  NOT NULL
,  [CustomerSource]  varchar(9)   NULL
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
,  [RowIsCurrent]  nchar(1)   NOT NULL
,  [RowStartDate]  datetime   NOT NULL
,  [RowEndDate]  datetime  DEFAULT '12/31/9999' NOT NULL
,  [RowChangeReason]  nvarchar(200)   NOT NULL
, CONSTRAINT [PK_fudge.DimCustomer] PRIMARY KEY CLUSTERED 
( [CustomerKey] )
) ON [PRIMARY]
;


SET IDENTITY_INSERT fudge.DimCustomer ON
;
INSERT INTO fudge.DimCustomer (CustomerKey, CustomerSource, account_ID, account_email, account_firstname, account_lastname, account_address, account_zipcode, account_planid, account_opened_on, customer_ID, customer_email, customer_firstname, customer_lastname, customer_address, customer_city, customer_state, customer_zip, customer_phone, customer_fax, RowIsCurrent, RowStartDate, RowEndDate, RowChangeReason)
VALUES (-1, 'Unknown ', -1, 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', -1, '', -1, 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 'Unknown ', 'Y', '12/31/1899', '12/31/9999', 'N/A')
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
( [RevenueSource], [RevenueDateKey] )
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
 
