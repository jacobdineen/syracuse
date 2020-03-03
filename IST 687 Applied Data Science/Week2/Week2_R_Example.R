mtcars     #Query for mtcars table/dataset
myCars <- mtcars   #Assign table to variable "myCars"
myCars     #Call "myCars" variable

str (myCars)   #Test Query for data.frame structure   
summary (myCars)   #Test Query of variable summary

length (myCars)  #Number of variables
head (myCars)   #first 6 
tail(myCars)    #last 6
max(myCars$mpg) #Max mpg observation



highMPGcars <-myCars[myCars$mpg > 29,]  #Vector w Cars w mpg > 29 (shows first 4 obs.)
highMPGcars 
index <- which.max(myCars$mpg)
index
myCars[20,]
highMPGcars <- myCars[ order(myCars$mpg),]
highMPGcars
highMPGcars <- myCars[ order(-myCars$mpg),] #-myCars$mpg to sort in descending
highMPGcars
order (-myCars$mpg) #order by indices
myCars [ c(20,18),] #call/query by indices