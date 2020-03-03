#
#HW 3 IST 687


####STEP 1

rm(list = ls(all = TRUE))#Clear Enviroment

install.packages('moments')
library(moments)
x <- c(1,2,3,4,5,6,7,8,9,10,50) #Input Vector has (1,2,3,4,5,6,7,8,9,10,50), Stored as x
quantile(x, .95)


#Test Descriptive Statistics on x
mean (x)
median(x)
max(x)
min(x)
sd (x)
quantile(x, .05)
quantile(x, .95)
skewness(x)
  
#Create function returning descriptive statistics on 'x' vector. Rename Index Results per the Descriptive Test
printVecInfo <- function (x) 
{
  descriptive <- list( "mean" = mean(x), "median" = median(x), "min" = min(x),"maximum" = max(x), "stdev" = sd(x), "Quant.5" = quantile(x, .05),
 "Quantile.95" = quantile(x, .95), "skewness" = skewness(x))
  return(descriptive)
}



#Test Function
printVecInfo (x)


####STEP 2
# Create Variable with 50 Red, 50 Blue Marbles
#4
red<- "red"
v.red <- replicate(50, red)
blue <- "blue"
v.blue <- replicate(50, blue)
jar<-c(v.red, v.blue)
jar

#5
length(jar[grepl("red", jar)]) #Found numeric count of "reds" in dataset.
#Or
length(jar[jar=="red"]) #Found numeric count of "reds" in dataset.



#6

functjar <- function (jar, size)
{
v <-sample(jar, size, replace =TRUE) #Sample 10 marbles
vnum <-length(v[grepl("red", v)])
print(vnum)
vperc <-paste(round(size* vnum), "%", sep = "") #Convert to percentage format
print(vperc)
}

functjar(jar, 10) #call function to see number of red marbles when sampling ten marbles in numeric/percent format

#7
#Function from above, minus the percentage conversion

functjar1<- function (jar, size)
{
  v <-sample(jar, size, replace =TRUE) #Sample 10 marbles
  vnum <-length(v[grepl("red", v)])
}

replicate(20, mean(replicate(20,(functjar1(jar, 10))))) #run function for finding 20 means of samples


``
#8
replicate(20, mean(replicate(20,(functjar1(jar, 100))))) #run function for finding 20 means of samples
rep2 <-replicate(20, mean(replicate(20,(functjar1(jar, 100)))))#Store Vector
printVecInfo(rep2) #run descriptive stats on samples
hist(rep2) #histogram of samples

#9
replicate(100, mean(replicate(100,(functjar1(jar, 100))))) #run function for finding 20 means of samples
rep3 <- replicate(100, mean(replicate(100,(functjar1(jar)))))#Store Vector
printVecInfo(rep3) #run descriptive stats on samples
hist(rep3) #histogram of samples
                 
#Step 3 

#10
tempvar <- (airquality)
any(is.na(airquality))



#11
tempvar<- na.omit(tempvar) #removes all rows where na is prevalent.
## Could take the mean of a column and replace na with that mean. 
##na.rm ignores the na's within a function


tempvar

#12
#####Generate Desc. Stats and Histograms from each variable of the airquality dataset.
##Ozone
printVecInfo(tempvar$Ozone)
hist(tempvar$Ozone)

#Wind
printVecInfo(tempvar$Wind)
hist(tempvar$Wind)

#Temp
printVecInfo(tempvar$Temp)
hist(tempvar$Temp)

