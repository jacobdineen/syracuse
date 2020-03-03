#Jacob Dineen, Stephanie Salvatore, Diana Couillard
#Financial Analytics
#1/13/2018a

#CLEAR ENVIRONMENT AND INSTALL INITIAL PACKAGES
rm(list = ls(all = TRUE))#Clear Enviroment

#use this function to check if each package is on the local machine if a package is installed, it will be loaded if any are not, the missing package(s) will be installed and loaded
packages <- c("ggplot2", "psych", "corrplot")
package.check <- lapply(packages, FUN = function(x) {
  if (!require(x, character.only = TRUE)) {
    install.packages(x, dependencies = TRUE)
    library(x, character.only = TRUE)
  }
})

    #2.8.3 Set A
wacc <-	0.18 #average weighted cost of capital
sales0 <-	80 #sales in year 1
growth1 <-	0.5 #growth from next 3 years
growth4 <-	0.15 #growth from years 4 on
cost.sales <-	0.75 #project to be a flat cost of 75%

depreciation.nfa <-	0.05 #constant 5% depreciation (of NFA)
tax.rate <-	0.35 #tax rate 
wc.incr.sales <-	0.1 #increase in working capital at the rate of 15% each year
nfa.incr.sales <-	0.05 #increase in fixed assets at the rate of 10% of sales each year
wc0 <-	10 #year 1 working capital
dep.accum <-	15 #year 1 depreciation
nfa0 <-	90 #year 1 netfixedassets
time <-	1:4 #seq array of projected years
growth <-	rep(0.5, 4) #array of growth pattern projections

growth[4] <-	growth4 #replacing year four growth with 0.15 projected growth
sales <-	sales0 * (1 + growth) ^ time #initial sales * 1.xx growth rate raised to the year
sales[4] <-	sales[3] * (1 + growth[4]) #replacing sales value 4 to account for 15% projected growth
nfa.incr <-	nfa.incr.sales * sales #0.05 nfa incr. X sales
nfa <-	cumsum(c(nfa0, nfa.incr))[-1] #cumulative sums of starting nfa with projections layered on
year0 <-	2016 #default/starting year
year <-	year0 + time #seq year for projections

sales	# computed above
cost <-	cost.sales * sales #75% of sales
gp <-	sales - cost #gross profit calc
sga <-	rep(0,4) #null values X 4
depreciation <-	depreciation.nfa * nfa #projects netfixedassets * .05 flat deprec.
ebit <-	gp - sga - depreciation #gross profit - selling,gen.,admin - depreciation
tax <-	ebit * tax.rate #Ebit * Tax rate (35%)
depreciation	# computed above
nfa.incr	# computed above
wc.incr <-	wc.incr.sales * sales 
fcf <-	ebit - tax + depreciation -nfa.incr -wc.incr #Free Cash Flow projections

# Form table of results
table.names <- c("Sales", "Cost", "Working Capital (incr.)", 
                 "Net Fixed Assets (incr.)", "Free Cash Flow")
# Assign projection labels
table.year <- year # Assign projection years
table.data <- rbind(sales, cost, wc.incr, 
                    nfa.incr, fcf)  # Layer projections
rownames(table.data) <- table.names  # Replace rows with projection labels
colnames(table.data) <- table.year  # Replace columns with projection years
knitr::kable(round(table.data,2))  # Display a readable table

#Modify the assumptions by +/- 10% and report the results.
knitr::kable(round((table.data *1.10),2)) #+10%
knitr::kable(round((table.data*0.90),2)) #-10%

#PRO1 PART 1 Q1 Challenge 1
fcfafter4 <-  fcf[4] * (1+growth4) #freecash flow after year 4
terminal.value.4 <-  fcfafter4/(wacc-growth4) # last fcf / (wacc - growth4)
terminal.value <-  round(c(0,0,0, terminal.value.4),2)
tcf <- round(terminal.value + fcf[1:4],2) # earlier years tcf is same as fcf

#Function for NPV
NPV.1 <-  function(rates, cashflows) {
  NPV <-  sum(tcf/(1+rates)^(seq_along(tcf)))
  return(NPV)
}
rates <- rep(wacc, 4)
cashflows <-  tcf
NPV.1 (wacc,tcf)


#PRO1 PART 1 Q1 Challenge 2  
debt <- -60 #set random debt variable 
cash <- 150 #set random cash variable
NI <- ebit+tax+depreciation #calculate current year net income
total.assets <- cash+nfa #calculate total assets
equity <- 225.28 #fixed equity
shares.outstanding <- 30 #set shares outstanding variable
share.price <- equity / shares.outstanding #calculate share price
table.names.2 <- c("Debt", "Cash", "Total Assets", 
                 "Equity", "Shares Outstanding", "Share Price")
table.year2 <- year # Assign projection years
table.data.2 <- rbind(debt, cash, total.assets,equity,shares.outstanding, share.price)
table.data.3 <- round(table.data.2[,4],2)


        # 2.8.4 Set B: 
x.data <- read.csv("data/hospitals.csv") #Read in data
x.data <- na.omit(x.data)
str(x.data) #call data structure
pairs.panels(x.data) #psych package
#Strong collinearity/correlation between Expenses/Payroll/FTE
#hospital is just an index, so no relationships present. May remove so as not to confuse model with diverse ranges/variance.
#Strong relationship between beds and admissions, beds and expenses/payroll/fte (if relationship with expenses, expected relationship w/ payroll/fte)

cor(x.data) #call just correlation table
corrplot(cor(x.data), method= "square", title="Hospital Correlation")

#Investigate the influence of admission and outpatient rates on expenses and payroll
df <-  subset(x.data, select = c(admissions, outpatients, expense, payroll)) #remove superfluous columns

#Regression Using LM
model.expense <- lm(formula=expense~ admissions+outpatients, data = df)
model.payroll <- lm(formula=payroll~ admissions+outpatients, data = df)
summary(model.expense) #adjusted r2 = .8243
print(model.expense$coefficients) #variables both statistically significant
summary(model.payroll) #adjusted r2 =.7376
print(model.payroll$coefficients)#variables both statistically significant

#Variance in expenses are more tied with variance in  admissions and outpatients than payroll w/ admissions and outpatients


#Use this code to investigate further the relationship among predicted expenses and the drivers, admissions and outpatients.
require(reshape2)
require(ggplot2)

## REGRESSION USING ??^	 
x.1 <- df$admissions #Store admissions vector
x.2 <- df$outpatients #Store outpatients vector
hist(x.1) #hist admissions 
hist(x.2) #hist outpatients
X <- cbind(x.1, x.2) #merge two predictors together
y <- model.expense$coefficients["admissions"] * x.1 + model.expense$coefficients["outpatients"] * x.2 + model.expense$coefficients["(Intercept)"]
hist(y) #Build manual model per the data
XTX.inverse <-  solve(t(X) %*% X) #Find inverse of x variable (transposed X * X, sumproduct)
beta.hat <-  XTX.inverse %*% t(X) %*% y #Inverse times transposed X * Y (Finding Coefficents)
actual <- y #Store actual results 
predicted <- X %*% beta.hat #Store model predictions
residual <- actual - predicted #Find residuals
results <- data.frame(actual = actual, 
                      predicted = predicted, residual = residual) #Create dataframe 

#calculating error
e <- y - X %*% beta.hat	#Another way of calculating residual
(e.sse <- t(e) %*% e)	#Find  estimated sum of squared error
(n <- dim(X)[1])	
(k <- nrow(beta.hat))	#degrees of freedom
(e.se <- (e.sse / (n - k))^0.5)	#find estimated square error (raised to .5 is same as sq.root)


min_xy <- min(min(results$actual), min(results$predicted)) #finding min. value in df
max_xy <- max(max(results$actual), max(results$predicted)) #finding max. value in df
plot.melt <- melt(results, id.vars = "predicted") #melting variables into singular column
plot.data <- rbind(plot.melt, data.frame(predicted = c(min_xy, 
                                                       max_xy), variable = c("actual", "actual"), 
                                         value = c(max_xy, min_xy))) #combining dataframes
#Plotting data frame
p <- ggplot(plot.data, aes(x = predicted, 
                      y = value)) + geom_point(size = 2.5) +   theme_bw()
p <- p + facet_wrap(~variable, scales = "free")
p


          #PRO1 PART 2 Challenge 1
# Change one of the dependent variables	
##Changing Outpatients to 'Beds'
ch1 <-  subset(x.data, select = c(admissions, beds, expense)) #remove superfluous columns
model.expense.2 <- lm(formula = expense~. , ch1)
summary(model.expense.2) #adjusted r^2 = .85
print(model.expense.2$coefficients)
x.1.1 <- ch1$admissions
x.2.1 <- ch1$beds
X1 <- cbind(x.1.1,x.2.1)
y1 <- model.expense.2$coefficients["admissions"] * x.1.1 + model.expense.2$coefficients["beds"] * x.2.1 + model.expense.2$coefficients["(Intercept)"]
XTX.inverse.1 <-  solve(t(X1) %*% X1) #Find inverse of x variable (transposed X * X, sumproduct)
beta.hat.1 <-  XTX.inverse.1 %*% t(X1) %*% y1 #Inverse times transposed X * Y (Finding Coefficents)
actual.1 <- y1 #Store actual results 
predicted.1 <- X1 %*% beta.hat.1 #Store model predictions
residual.1 <- actual.1 - predicted.1 #Find residuals
results.1 <- data.frame(actual = actual.1, 
                      predicted = predicted.1, residual = residual.1) #Create dataframe 

#calculating error
e.1 <- y1 - X1 %*% beta.hat.1	#Another way of calculating residual
(e.sse.1 <- t(e.1) %*% e.1)	#Find  estimated sum of squared error
(n.1 <- dim(X1)[1])	
(k.1 <- nrow(beta.hat.1))	#degrees of freedom
(e.se.1 <- (e.sse.1 / (n.1 - k.1))^0.5)	#find estimated square error (raised to .5 is same as sq.root)



      # PRO1 PART 2 CHALLENGE 2	
# Choose three dependent variables	
ch2 <-  subset(x.data, select = c(admissions,outpatients, beds, expense)) #remove superfluous columns

# REGRESSION USING lm()	
model.expense.3 <- lm(formula= expense~., ch2)
summary(model.expense.3) #all variables stat. significant (pvalue <.05)

# REGRESSION USING ??^	
x.1.2 <- ch2$admissions
x.2.2 <- ch2$outpatients
x.3.3 <- ch2$beds

X2 <- cbind(x.1.2,x.2.2,x.3.3)
y2 <- model.expense.3$coefficients["admissions"] * x.1.2 + 
  model.expense.3$coefficients["outpatients"] * x.2.2 + 
  model.expense.3$coefficients["beds"] * x.3.3 +
  model.expense.3$coefficients["(Intercept)"]
XTX.inverse.2 <-  solve(t(X2) %*% X2)
beta.hat.2 <- XTX.inverse.2 %*% t(X2) %*% y2
actual.2 <- y2
predicted.2 <- X2 %*% beta.hat.2
residual.2 <- actual.2 - predicted.2
results.2 <- data.frame(actual = actual.2, predicted = predicted.2, residual= residual.2)


#calculating error
e.2 <- y2 - X2 %*% beta.hat.2	#Another way of calculating residual
(e.sse.2 <- t(e.2) %*% e.2)	#Find  estimated sum of squared error
(n.2 <- dim(X2)[1])	
(k.2 <- nrow(beta.hat.2))	#degrees of freedom
(e.se.2 <- (e.sse.2 / (n.2 - k.2))^0.5)	#find estimated square error (raised to .5 is same as sq.root)


