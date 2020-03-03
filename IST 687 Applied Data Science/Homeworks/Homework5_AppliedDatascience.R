#HW 5
##Jacob Dineen
###################################################################################################
######################################################################################################


#CLEAR ENVIRONMENT AND INSTALL INITIAL PACKAGES
rm(list = ls(all = TRUE))#Clear Enviroment
install.packages("jsonlite")
library("jsonlite")
install.packages("RCurl")
library("RCurl")

# Step 1
#Save URL as vector
marylandurl <- "http://data.maryland.gov/api/views/pdvh-tf2u/rows.json?accessType=DOWNLOAD"
#Need to replace Nulls with NAs

#run/store json function to store data
apiresult <- getURL(marylandurl)
head(apiresult)
results<- fromJSON(apiresult) #Read JSON file into R
summary(results) #run summary on dataset
alldata <- results$data #Remove metadata from data frame

numRows <-length(alldata) # count how many elements are in "myList" and store the number into variable "numRows"

#Run function to remove nulls and replace with 'NA'
for(i in 1:numRows) { 
  record <- alldata[[i]] 
  record[sapply(record, is.null)] <- NA 
  alldata[[i]] <- record
}

#Test to see if there's any nulls remaining
any(is.null(alldata)) 

#Remove nulls from df
alldata<- na.omit(alldata)

# Step 2
#remove first 8 columns
alldata <- alldata [,-1:-8] 

#Rename all columns per document
colnames(alldata) <-c("CASE_NUMBER","BARRACK","ACC_DATE","ACC_TIME","ACC_TIME_CODE","DAY_OF_WEEK","ROAD","INTERSECT_ROAD","DIST_FROM_INTERSECT","DIST_DIRECTION","CITY_NAME","COUNTY_CODE","COUNTY_NAME","VEHICLE_COUNT","PROP_DEST","INJURY","COLLISION_WITH_1","COLLISION_WITH_2")
alldata
str(alldata)

dfaccidents <- data.frame(alldata, stringsAsFactors = FALSE) #STORE DF
dfaccidents #CALL DF
str(dfaccidents) #STR of DF
summary(dfaccidents)


#TRIM DATA
install.packages("stringr")
library("stringr")

str(dfaccidents) #STR of DF. Day of Week has prevalent blank spaces.
dfaccidents

data.frame(lapply(dfaccidents, trimws), stringsAsFactors = FALSE)  #Function to remove white space from entire data frame. Researched on Stackoverflow. 
dfaccidents <- data.frame(lapply(dfaccidents, trimws), stringsAsFactors = FALSE) #Store new dataframe trimming whitespace on df.

str(dfaccidents) #Now check structure to see if white spaces still prevalent. They are not.


###Step 3  SQLDF
install.packages("sqldf")
library("sqldf")



#Question1 . How many accidents happen on SUNDAY
sqldf("select count(*) from dfaccidents WHERE DAY_OF_WEEK like '%SUNDAY%' ") 
#OR
sqldf("select count(*) from dfaccidents WHERE TRIM(DAY_OF_WEEK) = 'SUNDAY' ") #Only works after data trim

 
#SUNDAY had 2061 accidents

#Question 2 . How many accidents had injuries (might need to remove NAs from the data) Injury == YES
sqldf("select count(*) from dfaccidents WHERE INJURY like '%YES%' ")
#OR
sqldf("select count(*) from dfaccidents WHERE INJURY = 'YES' ") #Only works after data trim


## 5639 accidents had injuries. 


#Question 3 . List the injuries by day. Injury == YES
sqldf("select count(dfaccidents.Injury), Day_of_week from dfaccidents where Injury = 'YES' group by DAY_OF_WEEK ") #Lists by DAY_OF_WEEK 


##STEP 4 TAPPLY

#Question1 . How many accidents happen on SUNDAY
tapply(dfaccidents[dfaccidents$DAY_OF_WEEK=='SUNDAY',]$DAY_OF_WEEK,dfaccidents[dfaccidents$DAY_OF_WEEK=='SUNDAY',]$DAY_OF_WEEK,length) #Inside brackets act as filters.

#SUNDAY had 2061 accidents

#Question 2 Injury == YES
tapply(dfaccidents[dfaccidents$INJURY=='YES',]$INJURY,dfaccidents[dfaccidents$INJURY=='YES',]$INJURY,length) #Inside brackets act as filters.

## 5639 accidents had injuries. 

#Question 3 . List the injuries by day Injury == YES
tapply(dfaccidents[dfaccidents$INJURY=='YES',]$INJURY,dfaccidents[dfaccidents$INJURY=='YES',]$DAY_OF_WEEK,length) #Inside brackets act as filters.

####ANSWERS ARE THE SAME USING SQLDF AND TAPPLY FUNCTIONS

df


