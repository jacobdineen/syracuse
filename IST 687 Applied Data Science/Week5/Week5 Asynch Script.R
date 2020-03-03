# Week 5 Asynch
##Importing Data into R

data() #Predefined datasets in R
BOD
summary(BOD)
str(BOD)
help(BOD)

install.packages("gdata")
library("gdata")

install.packages("perl")
testFrame <- read.xls(file = "c:/users/jdine/downloads/nst-est2011-01.xls")
testFrame
testFrame <-testFrame[-1:-3,] #remove 1st three rows
testFrame <- testFrame [,1:5] # keep 1st five columns
tail(testFrame, 5) #look at last 5 rows
testFrame <- testFrame[-58:-62,] #remove last 5 rows
testFrame #view post cleansing

#writing numberize funtion
Numberize <- function(inputvector)
{
  inputvector<- str_replace_all(inputvector,",","") #remove commas
  inputvector<- str_replace_all(inputvector, " ", "") #Remove spaces
  return(as.numeric(inputvector))
}

testFrame$April10census <- Numberize(testFrame$X) #runs numberize function and copies to a renamed column


#R to access SQL DBSMs
install.packages("sqldf")
library("sqldf")
sqldf('select AVG(mt.cars.mpg) from mtcars')
sapply(mtcars, mean) #sapply function aggregates 

tapply(mtcars$mpg, mtcars$cyl, mean) #Summary variable, group variable, function


#Using SQL in sqldf
results <- sqldf('select mtcars.mpg from mtcars')
mean(results$mpg)
results <- sqldf('select mtcars.mpg from mtcars where cyl=4')
results
sqldf('select count(mtcars.mpg) from mtcars where cyl=4')
sqldf('select AVG(mtcars.mpg) from mtcars where cyl=4')

tapply(mtcars$mpg, mtcars$cyl, mean)


#JSON
install.packages("jsonlite")
library("jsonlite")
install.packages("RCurl")
library("RCurl")

bikeurl <- "https://feeds.citibikenyc.com/stations/stations.json"
apiresult <- getURL(bikeurl)
head(apiresult)
results<- fromJSON(apiresult)
results
results [1]
allbikedata <- results$stationBeanList
str(allbikedata)
allbikedata$id[1:10]
allbikedata[1,]
nrow(allbikedata)
mean(allbikedata$availableBikes)
tapply(allbikedata$availableDocks, allbikedata$availableDocks>0, length)
docksavailDF <- allbikedata[allbikedata$availableDocks > 0,]
nrow(docksavailDF)

install.packages("RJSONIO")
library("RJSONIO")
resultsA <- fromJSON(apiresult)
resultsA [1]
summary(resultsA[2])
df <- data.frame (matrix(unlist(allbikedata), nrow = 507, byrow=T), stringsAsFactors = FALSE) #jsonlite does this conversion from list to matrix automatically. 
str(allbikedata)
