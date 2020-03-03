use [ist722_jdineen_stage]



--stage Customers
Select [CustomerID]
		, [CompanyName]
		, [ContactName]
		, [ContactTitle]
		, [Address]
		, [City]
		, [Region]
		, [PostalCode]
		, [Country]
INTO [northwind].[stgNorthwindCustomers]
FROM [Northwind].[dbo].[Customers]


-- stage Employees
Select [EmployeeID]
	  ,[FirstName]
	  ,[LastName]
	  ,[Title]
	INTO [northwind].[stgNorthwindEmployees]
	From [Northwind].[dbo].[Employees]

-- Stage Products
Select [Productid]
	   ,[ProductName]
	   ,[Discontinued]
	   ,[CompanyName]
	   ,[CategoryName]   
    INTO [northwind].[stgNorthwindProducts]
	FROM [Northwind].[dbo].[Products] p
		join [Northwind].[dbo].Suppliers s
			on p.[SupplierID]=s.[SupplierID]
		join [Northwind].[dbo].Categories c
			on c.[CategoryID]= p.[CategoryID]

-- Stage Date
Select *
INTO [northwind].[stgNorthwindDates]
FROM [ExternalSources].[dbo].[v_date_dimension]
where Year between 1996 and 1998

select * from northwind.stgNorthwindDates

--Stage SalesFact
Select [ProductID]
		, d.[OrderID]
		, [CustomerID]
		, [EmployeeID]
		,[OrderDate]
		,[ShippedDate]
		,[UnitPrice]
		,[Quantity]
		,[Discount]
INTO [northwind].[stgNorthwindSales]
FROM [Northwind].[dbo].[Order Details] d
	join [Northwind].[dbo].[Orders] o
		on o.[OrderID] = d.[OrderID]

		select * from [northwind].[stgNorthwindSales]


	--StageOrderFulfillment
Select 
 [OrderID]
 ,[OrderDate]
 ,[ShippedDate]
 ,[CustomerID]
 ,[EmployeeID]
 INTO [northwind].[stgNorthwindOrderFulfillment]
 FROM [Northwind].[dbo].[Orders] a

 select * from [northwind].[stgNorthwindOrderFulfillment]






