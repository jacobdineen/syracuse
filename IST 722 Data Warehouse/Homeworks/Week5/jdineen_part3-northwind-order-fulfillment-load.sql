use ist722_jdineen_dw

--Load Customer
Insert INTO northwind.DimEmployee
	([EmployeeID] , [EmployeeName], [EmployeeTitle])
Select EmployeeID, FirstName + ' ' + LastName as EmployeeName, Title
	From [ist722_jdineen_stage].[northwind].[stgNorthwindEmployees]

Select * from northwind.DimEmployee

-- Load Employee

Insert INTO northwind.[DimCustomer]
([Customerid] ,[Companyname], [Contactname] ,[ContactTitle], [CustomerCountry] , [Customerregion],  [Customercity] , [CustomerPostalCode])  
Select [CustomerID], [CompanyName], [ContactName], [ContactTitle], [Country], 
case when [Region] is null then 'N/A' else [Region] end, 
[City], 
case when [PostalCode] is null then 'N/A' else [PostalCode] end
FROM [ist722_jdineen_stage].[northwind].[stgNorthwindCustomers]

Select * from northwind.DimCustomer

-- Load Product

Insert INTO [northwind].[DimProduct]
([Productid] ,[Productname], [Discontinued] ,[SupplierName], [CategoryName])  
Select [Productid] ,[ProductName] ,[Discontinued],
[CompanyName] ,[CategoryName]   
FROM [ist722_jdineen_stage].[northwind].[stgNorthwindProducts]

Select * from northwind.DimProduct

-- Load Date
Insert into [northwind].[DimDate]
([DateKey],  [Date] ,  [FullDateUSA],  [DayOfWeek] ,  [DayName]  ,  [DayOfMonth]  ,  [DayOfYear]  ,  [WeekOfYear] ,  [MonthName]  ,  [MonthOfYear] ,  [Quarter] ,  [QuarterName]  ,  [Year]  ,  [IsWeekday])
Select  [Datekey], [Date], [FullDateUSA], [DayofWeekUSA], [DayName], [DayofMonth], [DayofYear], [WeekOfYear], [MonthName], [Month], [Quarter], [QuarterName], [Year], [IsWeekday]
From [ist722_jdineen_stage].[northwind].[stgNorthwindDates]

select * from northwind.DimDate

 -- Load OrderFulfillmentFactTable


			 SELECT c.CustomerKey, e.EmployeeKey,
	[ExternalSources].[dbo].[getDateKey](s.OrderDate) as OrderDateKey,
	case when [ExternalSources].[dbo].[getDateKey](s.ShippedDate) is null then -1
	else [ExternalSources].[dbo].[getDateKey](s.ShippedDate) end as ShippedDateKey,
	s.OrderId,
	Datediff(day, OrderDate,ShippedDate) as DaysElapsedFromOrder
	FROM [ist722_jdineen_stage].[northwind].[stgNorthwindOrderFulfillment] s
		join [ist722_jdineen_dw].[northwind].DimCustomer c
			on s.CustomerID = c.Customerid
		join [ist722_jdineen_dw].[northwind].DimEmployee e
			on s.EmployeeID = e.EmployeeID
	

 INSERT INTO [northwind].[FactOrderFulfillment]
	 ([CustomerKey],[EmployeeKey],
	 [OrderDateKey], [ShippedDateKey]
	,[OrderID]
	,[DaysElapsedFromOrder])
 SELECT c.CustomerKey, e.EmployeeKey,
	[ExternalSources].[dbo].[getDateKey](s.OrderDate) as OrderDateKey,
	case when [ExternalSources].[dbo].[getDateKey](s.ShippedDate) is null then -1
	else [ExternalSources].[dbo].[getDateKey](s.ShippedDate) end as ShippedDateKey,
	s.OrderId,
	Datediff(day, OrderDate,ShippedDate) as DaysElapsedFromOrder
	FROM [ist722_jdineen_stage].[northwind].[stgNorthwindOrderFulfillment] s
		join [ist722_jdineen_dw].[northwind].DimCustomer c
			on s.CustomerID = c.Customerid
		join [ist722_jdineen_dw].[northwind].DimEmployee e
			on s.EmployeeID = e.EmployeeID

			select * from [northwind].[FactOrderFulfillment]



Go
Create View [northwind].[orderfulfillmentmart]
AS
Select S.OrderID, s.DaysElapsedFromOrder,
c.CompanyName, c.ContactName, c.ContactTitle, c.CustomerCity, c.CustomerCountry, c.CustomerRegion, c.CustomerPostalCode
,e.EmployeeName, e.EmployeeTitle
, od.*
From northwind.FactOrderFulfillment s
	join northwind.DimCustomer c on c.CustomerKey = s.CustomerKey
	join northwind.DimEmployee e on e.EmployeeKey = s.EmployeeKey
	join northwind.Dimdate od on od.DateKey = s.OrderDateKey
		

		Select * from [northwind].[orderfulfillmentmart]