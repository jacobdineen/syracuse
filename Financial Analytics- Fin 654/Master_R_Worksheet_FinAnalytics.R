#Week 1
#Fin Analytics


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

#warmups
x <- (1 + (1:5)) #alt + hyphen = hotkey for assignment
sum (x)
prod(x)  
ls()
length(x)
x[1:length(x)]
x[6:8]
x[6:8] <- 7:9
x/0
(x1 <- x-2) #paranth. is same as printing
x1
x/x1

#Value of a dollar at the end of the next 8 years
rates <- c(.06,.07,.05,.09,.09,.08,.08,.08) #storing interest rates for the next 8 years
t <- seq(1,8) #creating sequential error
pv.1 <- sum(1/(1+rates)^t) #sum of 1/1+raxtes raised to the t value
print(pv.1) #this is what a dollar would be worth (NPV calc)

#present value of salvage
salvage.8 <- 5
pv.salvage <- salvage.8/(1+rates[8]) ^t[8]
print(pv.salvage)

#present value of gargleblaster machione
cashflow <-  rep(10,8)
cashflow[8] <-  cashflow [8] + salvage.8
pv.1 <- sum(cashflow/(1+rates)^t) #sum of 1/1+rates raised to the t value
print(pv.1)

#building some character
x[length(x)+1] <- "end" #adding char "end to the end of array"
x[length(x)+1] <- "end" #adding char "end to the end of array"
x.char <-  x[-length(x)] #removing last value of an array
x <- as.numeric(x.char[-length(x.char)])
str(x)

set.seed(1016)
n.sim <- 10
x <-  rnorm(n.sim)
y <-  x/(rchisq(x^2, df=3))^0.5 #help ('distribution) #half power is sq root
??rchisq
z <- c(x,y)
indicator <-  rep(c("normal", "abnormal"), each = length(x))  #each length x = every ten spaces
xy.df <- data.frame(Variates = z, distributions = indicator) 
head(xy.df, n=5)
tail(xy.df, n=5)


#use this function to check if each package is on the local machine if a package is installed, it will be loaded if any are not, the missing package(s) will be installed and loaded
packages <- c("ggplot2", "psych")
package.check <- lapply(packages, FUN = function(x) {
  if (!require(x, character.only = TRUE)) {
    install.packages(x, dependencies = TRUE)
    library(x, character.only = TRUE)
  }
})


#The Plot Thickens
help("ggplot")
ggplot(xy.df, aes(x = Variates, fill = indicator)) +
  geom_density(alpha = 0.5) +xlim(-1,6) #zoom in focused on tails of dist #kortosis from the nonnormal dist.

#An Array of Good Things to Come
#vectors are either x or y only. arrays are more like tables in xl/database

A.error <- matrix(1:11, ncol =4) #Filling spaces (value 12 reverts back to 1)
A.row <- matrix(1:12, ncol=4)
A.col <- matrix(1:12, ncol=4,byrow = FALSE)

(R <- rbind(1:4,5:8,9:12)) #rowbind/row concatenate
(C <- cbind(1:3,4:6,7:9,10:12))#colbind/column concatenate

R == C
A.col == C

#Outer Product
A.min <- outer(3:6/4,3:6/4, FUN = pmin)
print(A.min)

A.max <- outer(3:6/4,3:6/4, FUN = pmax)
print(A.max)

(A.sym <- A.max-A.min - .5) #constant diagonal
diag(A.sym) <- 1 #replacing diagonal with 1's (used with correlation matrices)
A.sym

n.sim <- 100
x.1 <- rgamma(n.sim,.5, .2) #100 samples from gamma dist. Gamma dist helps us to know that we can simulate rare events
x.2 <- rlnorm(n.sim, .15,.25) #100 samples from log dist
X <- cbind(x.1,x.2)
X

hist(x.1)
hist(x.2)
y <-  1.5 * x.1 + .8 * x.2 + rnorm(n.sim,4.2,5.03) #regression with added noise
hist(y)
XTX.inverse <-  solve(t(X) %*% X) #t=transpose
(beta.hat <-  XTX.inverse %*% t(X) %*% y) #finding best beta that fits the data

#gamma distribution is used to model loan default amounts or insurance claims. Concentrated on the low end of the spectrum with fairly high values in the tail of the dist. Nonnegative
#lognormal dist is almost symmetrical around the mean value of 1 with more mass out to tail. Nonnegative. Used to model income of most individuals (pareto distribution)

a <-  y-X %*% beta.hat #estimated error
hist(a)
#degrees of freedom (n = variants, k = #of things we had to estimate) 100-2 = 98 degrees of freedom
(e.sse <-  t(a) %*% a) #sum of squared errors
(n <-  dim(X)[1])
(k <-nrow(beta.hat))
(e.se <- (e.sse/(n-k))^.5) #squared error

all <-  cbind(y, X, a)
pairs.panels(all) #psych package

nrow(A.min)
ncol(A.min)
dim(A.min)
rowSums(A.min)
colSums(A.min)
apply(A.min, 1, sum) #apply can be used just like rowsums and colsums based on index of rows and sums - 1 = Row, 2=Col

##
library(EIAdata)
key <- "740a46c9ee793a9366c74841dfccae2a"
ID <-  "ELEC.PLANT.GEN.13-WAT-ALL.Q"
plant <- getEIA(ID = ID, key = key)
str(plant)


        ##Week 2 Asynch
#R data modeling
Creditcard <-  read.csv("data/CreditCard.csv")
str(Creditcard)
head(Creditcard,3)
summary(Creditcard) #if factor = distribution of counts


#pivoting with dplyr package
ccard <-  Creditcard[Creditcard$age >= 18,] #subset for age greater than or equal to 18 [row,column]. If column is empty = All columns
hist(ccard$age)
dim(ccard)
#indicator variables are often the dimensions of the analysis.
library(dplyr)
pvt_table <-  filter(ccard, state %in% "NY")
pvt_table <-  group_by(pvt_table, card, owner, selfemp)
options(dplyr.width = Inf)
pvt_table <-  summarise(pvt_table, income.cv = sd(income)/mean(income),age.avg = mean(age), income.per.dependent = sum(income)/sum(dependents))
knitr::kable(pvt_table)

#Vlookup 
le <- read.csv("data/life_expectancy.csv", header = TRUE, stringsAsFactors = FALSE)
sa <-  read.csv("data/sanitation_.csv", header = TRUE, stringsAsFactors = FALSE)

head(le)
head(sa)
life.sanitation <-  merge(le[,c("country", "years.life.expectancy.avg")], sa[,c("country", "sanitation.avg")])#joined on country
head(life.sanitation)

#on your own
hprice <-  read.csv("data/hprice.csv")
head(hprice)
summary(hprice)
hrpice_pvt <-  hprice[hprice$Price >= 99999,]
hprice_pvt <- group_by(hprice_pvt, Brick, Neighborhood)
options(dplyr.width = Inf)
hprice_pvt <-  summarise(hprice_pvt, Price.avg = mean(Price), Price.cv = sd(Price)/mean(Price), 
                         SqFt.avg = mean(SqFt), Price.per.sqft = mean(Price)/mean(SqFt))
knitr::kable(hprice_pvt)

model <-  lm(formula = Price~., data = hprice)
summary(model)

#what's a function
#creating an NPV function
NPV.1 <-  function(rates, cashflows) {
  NPV <-  sum(cashflows/(1+rates)^(seq_along(cashflows)- 1))
  return(NPV)
}

rates <-  c(0,0.08,0.06,.04)
cashflows <-  c(-100,200,300,10)
NPV.1(rates, cashflows)

#Creating an IRR function
#maximer controls number of iterations
#uniroot finds one of the roots
IRR.1 <- function(cashflows, maxiter = 1000) {
  t <- seq_along(cashflows) - 1
  # rate will eventually converge to
  # IRR
  f <- function(rate) (sum(cashflows/(1 +
                                        rate)^t))
  # use uniroot function to solve for
  # root (IRR = rate) of f = 0 c(-1,1)
  # bounds solution for only positive
  # or negative rates select the root
  # estimate
  return(uniroot(f, c(-1, 1), maxiter = maxiter)$root)
}

cashflows <-  c(-150,3,3,3,3,3,3,3,103)
IRR.1(cashflows)
##Reference C:\Users\jdine\Desktop\SYracuse\Term 5 - Current\Financial Analytics- Fin 654\Week 2 for more in depth financial applications


require(pdfetch)
require(xts)
require(zoo)
EIUIR <- pdfetch_BLS(c("EIUIR", "EIUIR100"), 2000, 2016) # start and end years
head(EIUIR)
xmprice <- na.omit(EIUIR) # to clean up any missing data
xmprice.r <- as.zoo(na.omit((diff(log(xmprice[, 1]))))) # compute rates
head(xmprice.r)
plot(xmprice.r, type = "l", col = "blue", xlab = "Date", main = "Monthly 2/2000-6/2016")                      
         
xmprice.r.df <- data.frame(xmprice.r, Date = index(xmprice.r), Rate = xmprice.r[, 1], Rate.abs = abs(xmprice.r[,1]))
head(xmprice.r.df)
str(xmprice.r.df)            

require(ggplot2)
ggplot(xmprice.r.df, aes(x = Date, y = Rate)) + geom_line(colour = "blue")
ggplot(xmprice.r.df, aes(x = Date, y = Rate.abs)) + geom_bar(stat = "identity", colour = "green")
ggplot(xmprice.r.df, aes(Date, Rate.abs)) + geom_bar(stat = "identity", colour = "darkorange") + 
  geom_line(data = xmprice.r.df, aes(Date, Rate), colour = "blue")

ggplot(xmprice.r.df, aes(Rate)) + stat_ecdf(colour = "blue")

require(ggplot2) 
r.tol <- quantile(xmprice.r.df$Rate, 0.95)
r.tol.label <- paste("Tolerable Rate = ", round(r.tol, 2))
ggplot(xmprice.r.df, aes(Rate)) + stat_ecdf(colour = "blue", size = 1.5) + 
  geom_vline(xintercept = r.tol, colour = "red", size = 1.5) + 
  annotate("text", x = r.tol-.05 , y = 0.75, label = r.tol.label, colour = "darkred")

r.tol <- quantile(xmprice.r.df$Rate, 0.95)
r.tol.label <- paste("Tolerable Rate = ", round(r.tol, 2))
ggplot(xmprice.r.df, aes(Rate.abs)) + geom_histogram(fill = "cornsilk", colour = "grey60") + 
  geom_density() + geom_vline(xintercept = r.tol, colour = "red", size = 1.5) + 
  annotate("text", x = .055 , y = 30, label = r.tol.label, colour = "darkred")


data_moments <- function(data){
  require(moments)
  mean.r <- mean(data)
  sd.r <- sd(data)
  median.r <- median(data)
  skewness.r <- skewness(data)
  kurtosis.r <- kurtosis(data)
  result <- data.frame(mean = mean.r, std_dev = sd.r, median = median.r, skewness = skewness.r, kurtosis = kurtosis.r)
  #result <- data.frame(result, table = t(result))
  return(result)
}

ans <- data_moments(xmprice.r.df$Rate.abs)
ans <- round(ans, 4)
knitr::kable(ans)

cost <- read.csv("data/cost.csv")
cost <- cost$x
cost.moments <- data_moments(cost)
cost.mean <- cost.moments$mean
cost.sd <- cost.moments$std_dev
(cost.shape <- cost.mean^2/cost.sd^2)
(cost.scale <- cost.sd^2/cost.mean)
gamma.start <- c(cost.shape, cost.scale)
require(MASS)
fit.gamma.cost <- fitdistr(cost, "gamma")
fit.gamma.cost

(cost.t <- fit.gamma.cost$estimate / fit.gamma.cost$sd)

rate <- xmprice.r.df$Rate
rate.moments <- data_moments(rate)
(rate.mean <- rate.moments$mean)
(rate.sd <- rate.moments$std_dev)

fit.t.rate <- fitdistr(rate, "t", hessian = TRUE)
fit.t.rate

(rate.tstat <- fit.t.rate$estimate / fit.t.rate$sd)

require(lattice) #install package
data(quakes)
head(quakes)
c(min(quakes$depth), max(quakes$depth), min(quakes$mag), max(quakes$mag))
Depth <- equal.count(quakes$depth, number=6, overlap=.1)
xyplot(lat ~ long | Depth, data = quakes)
Magnitude <- equal.count(quakes$mag, number=3, overlap=.01)
xyplot(lat ~ long | Magnitude, data = quakes)

#Week 3 Asynch
library(fBasics)
library(evir)
library(qrmdata)
library(zoo)
data(OIL_Brent)
str(OIL_Brent)

Brent.price <- as.zoo(OIL_Brent)
Brent.return <- diff(log(Brent.price))[-1] * 100
colnames(Brent.return) <- "Brent.return"
head(Brent.return, n = 5)
tail(Brent.return, n = 5)

plot(Brent.return,  xlab = "", main = "Brent Daily % Change", col = "blue")

boxplot(as.vector(Brent.return), title = FALSE, main = "Brent Daily % Change", col = "blue", cex = 0.5, pch = 19)
skewness(Brent.return)
kurtosis(Brent.return)

acf(coredata(Brent.return), main = "Brent Daily Autocorrelogram", lag.max = 20, ylab = "", xlab = "", col = "blue", ci.col = "red")
pacf(coredata(Brent.return), main = "Brent Daily Partial Autocorrelogram", lag.max = 20, ylab = "", xlab = "", col = "blue", ci.col = "red")

Brent.return.abs <-  abs(Brent.return) 
# Trading position size matters
Brent.return.tail <- tail(Brent.return.abs[order(Brent.return.abs)], 100)[1] 
# Take just the first of the 100 observations and pick the first
index <- which(Brent.return.abs > Brent.return.tail, arr.ind = TRUE)
# Build an index of those sizes that exceed the heavy tail threshold
Brent.return.abs.tail <- timeSeries(rep(0, length(Brent.return)), charvec = time(Brent.return)) 
# just a lot of zeros we will fill up next
Brent.return.abs.tail[index, 1] <- Brent.return.abs[index]
# A Phew! is in order
plot(Brent.return.abs, xlab = "", main = "Brent Daily Return Sizes", col = "blue")
acf(coredata(Brent.return.abs), main = "Brent Autocorrelogram", lag.max = 60, ylab = "", xlab = "", col = "blue", ci.col = "red")
pacf(coredata(Brent.return.abs), main = "Brent Partial Autocorrelogram", lag.max = 60, ylab = "", xlab = "", col = "blue", ci.col = "red")


require(zoo)
require(qrmdata)
require(xts)
data("EuStockMarkets")
EuStockMarkets.price <- as.zoo(EuStockMarkets)
EuStockMarkets.return <- diff(log(EuStockMarkets.price))[-1] * 100

plot(EuStockMarkets.price, xlab = " ", main = " ")
plot(EuStockMarkets.return, xlab = " ", main = " ")

ccf(EuStockMarkets.return[, 1], EuStockMarkets.return[, 2], main = "Returns DAX vs. CAC", lag.max = 20, ylab = "", xlab = "", col = "blue", ci.col = "red")
ccf(abs(EuStockMarkets.return[, 1]), abs(EuStockMarkets.return[, 2]), main = "Absolute Returns DAX vs. CAC", lag.max = 20, ylab = "", xlab = "", col = "blue", ci.col = "red")

corr.rolling <- function(x) {
  dim <- ncol(x)
  corr.r <- cor(x)[lower.tri(diag(dim), diag = FALSE)]
  return(corr.r)
}

corr.returns <- rollapply(EuStockMarkets.return, width = 250, corr.rolling, align = "right", by.column = FALSE)
colnames(corr.returns) <- c("DAX & CAC", "DAX & SMI", "DAX & FTSE", "CAC & SMI", "CAC & FTSE", "SMI & FTSE" )
plot(corr.returns, xlab = "", main = "")

fisher <- function(r)
{0.5 * log((1 + r)/(1 - r))}

require(xts)
require(qrmdata)
require(quantreg)
require(quantmod)
require(matrixStats)

tickers <- c("ELE.MC", "IBE.MC", "REP.MC")


REP.r <- na.omit(diff(log(REP.MC[, 4]))[-1]) # clean out missing values
IBE.r <- na.omit(diff(log(IBE.MC[, 4]))[-1])
ELE.r <- na.omit(diff(log(ELE.MC[, 4]))[-1])

ALL.r <- merge(REP = REP.r, IBE = IBE.r, ELE = ELE.r, all = FALSE)

plot(ALL.r)
par(mfrow = c(2,1))
acf(ALL.r)

R.corr <- apply.monthly(ALL.r, FUN = cor)
R.vols <- apply.monthly(ALL.r, FUN = colSds) # from MatrixStats
head(R.corr, 3)
head(R.vols, 3)

R.corr <- R.corr[, c(2, 3, 6)]
colnames(R.corr) <- c("ELE.IBE", "ELE.REP", "IBE.REP")
colnames(R.vols) <- c("ELE.vols", "IBE.vols", "REP.vols")
head(R.corr, 3)
head(R.vols, 3)
R.corr.vols <- na.omit(merge(R.corr, R.vols))

plot.zoo(merge(R.corr.vols))

ELE.vols <- as.numeric(R.corr.vols[,"ELE.vols"])
IBE.vols <- as.numeric(R.vols[,"IBE.vols"])
REP.vols <- as.numeric(R.vols[,"REP.vols"])
length(ELE.vols)

rho_vol <- matrix(as.numeric(R.corr.vols[,1:3]), nrow = length(ELE.vols), ncol = 3, byrow= FALSE)


name <-  "GNP"
URL <-  paste("http://research.stlouisfed.org/fred2/series/", name,
              "/", "downloaddata/", name, ".csv", sep = "")
download <-  read.csv(URL)
hist(download[,2])
summary(download[, 2])
GNP <- ts(download[1:84, 2]/1000, start = c(1995, 1), freq = 4)
GNP.rate <-  na.omit(100 * diff(log(GNP)))
plot(GNP, type = "l", main = "US GNP Level")
plot(GNP.rate, type = "h", main = "GNP quarterly growth rates")
abline(h = 0, col = "darkgray")

par(mfrow = c(2,1)) #stacked up and down
acf(GNP.rate)
acf(abs(GNP.rate))

par(mfrow = c(2,1))
pacf(GNP.rate)
pacf(abs(GNP.rate))
par(mfrow = c(1,1)) #default setting

install.packages("knitr")
install.packages("rmarkdown")
install.packages("arules")

read.csv("data/nyhh02.csv", header = T, stringsAsFactors = F)
getwd()
setwd("C:/Users/jdine/Desktop/SYracuse/Term 5 - Current/Financial Analytics- Fin 654/")
getwd()
