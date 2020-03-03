## Homework 2
#Jacob Dineen
#IST 565 Data Mining

#Clear Enviroment
rm(list = ls(all = TRUE))

#specify the packages of interest
packages=c("gdata", "reshape2", "ggplot2")

#use this function to check if each package is on the local machine if a package is installed, it will be loaded if any are not, the missing package(s) will be installed and loaded
package.check <- lapply(packages, FUN = function(x) {
  if (!require(x, character.only = TRUE)) {
    install.packages(x, dependencies = TRUE)
    library(x, character.only = TRUE)
  }
})


#Perl Directory for GDATA read.xls
installXLSXsupport(perl = 'C:/Strawberry/perl/bin/perl.exe')
perl <- "C:/Strawberry/perl/bin/perl.exe"
#Read in File
DataStoryTeller <- read.xls(file.choose())
attach(DataStoryTeller)
str(DataStoryTeller) #Structure Check


##################################Cleaning Data
#Rename Columns for digestion
colnames(DataStoryTeller) <- c("School", "Section", "VeryAhead", "Middling", "Behind", "MoreBehind", "VeryBehind", "Completed")
#Check Above
colnames(DataStoryTeller)

#Section is Nominal, Change
DataStoryTeller$Section <- as.factor(Section)
str(DataStoryTeller)

#All other columns to Integers
for(i in 3:7)
{
  DataStoryTeller[,i] <- as.integer(DataStoryTeller[,i])
}

str(DataStoryTeller)
summary(DataStoryTeller)

#No students are 'Very Ahead'. Remove Column to avoid distortion/noise
DataStoryTeller <- DataStoryTeller [,-3]
##########################################################End Data Cleansing


#Row Sums + Barplot of Students by Status
Students <- data.frame(colSums(DataStoryTeller[,3:7]))
Students <- transpose(Students)
str(Students)
colnames(Students) <- c("Middling", "Behind", "MoreBehind", "VeryBehind", "Completed")
str(Students)
sum(Students)
as.matrix(Students)
barplot(as.matrix(Students), main="Students by Status", xlab="Status",  ylab="Student Count")
Students
Students <- data.frame(colSums(DataStoryTeller[,3:7]))
Students
Students$Percentage <- Students$colSums.DataStoryTeller...3.7../ sum(Students$colSums.DataStoryTeller...3.7..)


#Melting Data
Melt <- melt(DataStoryTeller)
Melt
plot(Melt$variable, Melt$value)

#Showing Number of Students Per School Taking Math course
meltsps <- aggregate(Melt$value ~ Melt$School, data = Melt, FUN = sum)
plot(aggregate(Melt$value ~ Melt$School, data = Melt, FUN = sum))
meltsps
str(meltsps)
meltsps$perc <- meltsps$`Melt$value`/sum(meltsps$`Melt$value`)
meltsps
plot(meltsps$`Melt$School`, meltsps$perc)

#School A is much more represented than the other schools. 

#Showing Number of Students Per Section
aggregate(Melt$value ~ Melt$Section, data = Melt, FUN = sum)
plot(aggregate(Melt$value ~ Melt$Section, data = Melt, FUN = sum))

#Section 1 is much more represented than the other sections 

#Showing Numeric Student Count by Status
aggregate(Melt$value ~ Melt$variable, data = Melt, FUN = sum)
plot(aggregate(Melt$value ~ Melt$variable, data = Melt, FUN = sum))
#Most Students are 'Behind'



#Data Transformation on Melted Values Attribute

#Via Log
Melt$log <- log(Melt$value)
plot(Melt$value, Melt$log)

#Via Zscore
Melt$zscore <- scale(Melt$value, center = TRUE, scale = TRUE)
Melt$zscore

#Via MinMax
Melt$minmax <- (Melt$value - min(Melt$value, na.rm = TRUE))/(max(Melt$value, na.rm = TRUE)-min(Melt$value, na.rm = TRUE))
minmax
Melt
plot(Melt$value)
plot(Melt$value, Melt$log)
plot(Melt$value, Melt$minmax)
plot(Melt$value, Melt$zscore)

DataStoryTeller$TotalStudents <- rowSums(DataStoryTeller[,3:7])
DataStoryTeller$CompPerc <- DataStoryTeller$Completed/DataStoryTeller$TotalStudents
lm(formula = CompPerc~ Section, data = DataStoryTeller)
summary(lm(formula = CompPerc~ Section, data = DataStoryTeller))
DataStoryTeller$CompPerc <- (DataStoryTeller$CompPerc - min(DataStoryTeller$CompPerc, na.rm = TRUE))/(max(DataStoryTeller$CompPerc, na.rm = TRUE)-min(DataStoryTeller$CompPerc, na.rm = TRUE))



#GGPLOT Graph Attempt
ggplot(Melt, aes(x=Melt$variable, y=Melt$value)) + geom_point(aes(color=Melt$School))

install.packages("corrplot")
library("corrplot")
cor <- cor(data.frame(DataStoryTeller[,3:7]))
corrplot((cor), method= "square", title="Status Correlation Test")




