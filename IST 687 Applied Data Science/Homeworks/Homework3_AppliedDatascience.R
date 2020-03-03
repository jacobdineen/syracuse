#
#HW 3 IST 687


#Step 1
rm(list = ls(all = TRUE))
urltoread <- "http://www2.census.gov/programs-surveys/popest/tables/2010-2011/state/totals/nst-est2011-01.csv" #URL to Read Vector
readStates <- read.csv(url(urltoread)) #Creating Vector for Census CSV DF
data.frame (readStates) #Call DF of readStates 
str (readStates) #Structure of readStates

#Step2
readStates <- readStates [-1:-8,] #Remove first 8 Rows 
summary (readStates [,6:10]) #Summarize Columns 6:10 (all null values)
readStates <- readStates [,-6:-10] #Remove columns 6:10
tail (readStates, 8) #Call bottom portion of DF for Nulls
readStates <- readStates [-52:-58,] #Remove Last 7 Rows (PuertoRico and Census notes)
readStates$stateName <- readStates [,1] #Rename Col 1 to stateName
readStates$base2010 <- readStates [,2] #Rename Col 2 to Base2010
readStates$base2011 <- readStates [,3] #Rename Col 3 to Base2011
readStates$Jul2010 <- readStates [,4] #Rename Col 3 to Jul2010
readStates$Jul2011 <- readStates [,5] #Rename Col 4 to Jul2011
readStates <- readStates [,-1:-5] #Remove columns 1:5 (legacy, bad names)
readStates$stateName <- gsub ("\\.", "", readStates$stateName) #Remove dots from stateName

#Removing commas from character string columns with population data
readStates$base2010 <-gsub(",", "", readStates$base2010)
readStates$base2011 <-gsub(",", "", readStates$base2011)
readStates$Jul2010 <-gsub(",", "", readStates$Jul2010)
readStates$Jul2011 <-gsub(",", "", readStates$Jul2011)

#Removing spaces and converting to numeric values
readStates$base2010 <- as.numeric (gsub(" ", "", readStates$base2010))
readStates$base2011 <- as.numeric (gsub(" ", "", readStates$base2011))
readStates$Jul2010 <- as.numeric (gsub(" ", "", readStates$Jul2010))
readStates$Jul2011 <- as.numeric (gsub(" ", "", readStates$Jul2011))
rownames (readStates) <- NULL #Normalize Row names
head (readStates, 5) #RowName Check

#Step3
dfStates <- data.frame(readStates) #readStates vector stored as data.frame "dfStates"
dfStates #call dfStates data.frame
mean(dfStates$Jul2011)


#Step4
which.max(dfStates$Jul2011) #Call maxpop index of July 2011 Column
dfStates [5,5] #Call dataframe for maxpop Jul2011 index
dfStates [5,1] #Call dataframe for stateName Jul2011 index
dfStates [order (dfStates$Jul2011),] #Sort by Max Jul2011 Population in ASC order

#Step5
#Write function that will return the percentage of the elements within the vector that is less than the same

v <- dfStates$Jul2011 #Store Vector for col "Jul2011"
mean <- mean(dfStates$Jul2011) #Store Vector for mean Jul2011 Pop

####Version 1
function1 <- function(v) {
length(which(v<mean))/ length(v) #Length of which states less than mean/length of states
paste(round(100* length(which(v<mean))/ length(v), 2), "%", sep = "") #Convert to percentage format
meanDfStates <- paste(round(100* length(which(v<mean))/ length(v), 2), "%", sep = "")
}

function1 (dfStates$Jul2011) #Call Function for col "Jul2011"


###OR Version 2

function2 <- function(v) {
sum(v<mean, na.rm = TRUE)/ length(v) #Sum of Trues less than mean/ length of column
paste(round(100* sum(v<mean, na.rm = TRUE)/ length(dfStates$Jul2011), 2), "%", sep = "") #Convert to percentage format

}

function2 (dfStates$Jul2011) #Call Function for col "Jul2011"






