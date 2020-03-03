
#CLEAR ENVIRONMENT AND INSTALL INITIAL PACKAGES
rm(list = ls(all = TRUE))#Clear Enviroment

library(data.table)

#Reading in Census Data
Census <- fread('http://archive.ics.uci.edu/ml/machine-learning-databases/adult/adult.data')
Census <- as.data.frame(Census)
CensusTest <- fread('http://archive.ics.uci.edu/ml/machine-learning-databases/adult/adult.test')
CensusTest <- as.data.frame(CensusTest)


CensusTrainTest <- rbind(Census,CensusTest)


#Changing Column Names per documentation
colnames(Census) <- c("age", "workclass", "fnlwgt", "education", "education-num", "marital-status", "occupation", "relationship", "race", "sex", "capital-gain", 
                      "capital-loss", "hours-per-week", "country", "class")
#checking df structure
str(Census)



#Change factors to nominal

for (i in c(2,4,6:10,14:15))
{ 
  Census[, i] <- as.factor(Census[,i])
}


#Change integers to numeric
for (i in c(1,3,5,11:13))
{ 
  Census[, i] <- as.numeric(Census[,i])
}



#find Question Marks and convert to NAs
  
for (i in 1:15)
{
  Census[,i][Census[,i]== "?"] <- NA
  
}


#Find rows with na
row.has.na <- apply(Census,1,function(x){any(is.na(x))})
sum(row.has.na) #2399 rows contain an NA
Census <- Census[!row.has.na,]


str(Census)

write.csv(Census, file = "CensusMLProjectTrainingandTest.csv")

summary((Census))

summary(CensusTest)


install.packages("corrplot")
library("corrplot")

dfcorr <- Census[,c(1,3,5,11,12,13)]

cor(dfcorr)

corrplot(cor(dfcorr), method= "square", title="Census Correlation Test")


Census[sample(nrow(Census), 500), ]

CensusSmall<- Census[sample(nrow(Census), 500), ]
write.csv(CensusSmall, file = "CensusMLProjectTrainingandTest.csv")



