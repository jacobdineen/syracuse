#ADS IST 687
#Jacob Dineen
#Homework 9
#Due 9/17/2017

#################All Calls to Clear Environment and Fetch Packages
#CLEAR ENVIRONMENT AND INSTALL INITIAL PACKAGES
rm(list = ls(all = TRUE))#Clear Enviroment

# install.packages("kernlab")   
# library("kernlab")
# library(e1071)
# library(ggplot2)
# library(gridExtra)

#  Packages: kernlab, e1071, gridExtra, ggplot2, caret

#specify the packages of interest
packages=c("kernlab","e1071","gridExtra","ggplot2", "caret")

#use this function to check if each package is on the local machine
#if a package is installed, it will be loaded
#if any are not, the missing package(s) will be installed and loaded
package.check <- lapply(packages, FUN = function(x) {
  if (!require(x, character.only = TRUE)) {
    install.packages(x, dependencies = TRUE)
    library(x, character.only = TRUE)
  }
})

#verify they are loaded
search()

library("kernlab")
install.packages("kernlab")

########################################################## Step 1: Load the data
air <- data.frame(airquality)
# find which columns in the dataframe contain NAs.
colnames(air)[colSums(is.na(air)) > 0]
# find the NAs in column "Ozone" and "Solar" and replace them by the mean value of this column
air$Ozone[is.na(air$Ozone)] <- mean(air$Ozone, na.rm=TRUE)
air$Solar.R[is.na(air$Solar.R)] <- mean(air$Solar.R, na.rm=TRUE)
#Rerun Check on NAs
colnames(air)[colSums(is.na(air)) > 0]

########################################################## Step 2: Create Train and Test Data Sets
nrows <- nrow(air)
random.index <- sample(1:nrows)
head(random.index)
cutPoint <- floor(nrows/3*2)

#Training Data (2/3 of total data sampled)
air.trainingdata <- air[random.index[1:cutPoint],]
dim(air.trainingdata)
#Testing Data (1/3 of total data sampled)
air.testingdata <- air[random.index[(cutPoint+1):nrows],]
dim(air.testingdata)

#root mean squared error function
rmse <- function(error)
{
  sqrt(mean(error^2))
}

########################################################## Step 3: Build a Model using KSVM and Visualize the Results
require(kernlab)
require(e1071)
require(ggplot2)


#Using KSVM
model.ksvm.train <- ksvm(Ozone ~., data=air.trainingdata) #building the model
model.ksvm.predict <- predict(model.ksvm.train, air.testingdata) #testing the model on the testing data
air.testingdata$error <- air.testingdata$Ozone - model.ksvm.predict #computing the error between the predicted vs actual
head(air.testingdata)
rmse(air.testingdata$error) #Computing RMSE. RMSE = 13.35492
ksvmgraph <- ggplot(air.testingdata, aes(x=Temp, y=Wind)) + geom_point(aes(size=error, color=error)) + ggtitle("KSVM") #Plotting via Scatterplot
ksvmgraph   # Point size and color shade illustrate how big is the error

#Using SVM
Model.svm.train <- svm(Ozone~.,data = air.trainingdata)
model.svm.predict <- predict(Model.svm.train, air.testingdata)
air.testingdata$error <- air.testingdata$Ozone - model.svm.predict
head(air.testingdata)
rmse(air.testingdata$error) #Computing RMSE. RMSE = 13.48514
svmgraph <- ggplot(air.testingdata, aes(x=Temp, y=Wind)) + geom_point(aes(size=error, color=error)) + ggtitle("SVM") #Plotting via Scatterplot
svmgraph

#using LM
model.lm.train <- lm(Ozone~.,data = air.trainingdata)
model.lm.predict <- predict(model.lm.train, air.testingdata)
air.testingdata$error <- air.testingdata$Ozone - model.lm.predict
head(air.testingdata)
rmse(air.testingdata) #Computing RMSE. RMSE = 84.80184
lmgraph <- ggplot(air.testingdata, aes(x=Temp, y=Wind)) + geom_point(aes(size=error, color=error)) + ggtitle("LM") #Plotting via Scatterplot
lmgraph

grid.arrange(ksvmgraph,svmgraph,lmgraph, nrow=2)

########################################################## Step 4 : Create a goodOzone Variable
meanozone <- mean(air$Ozone, na.rm=TRUE)
air.trainingdata$goodOzone <- ifelse(air.trainingdata$Ozone<meanozone, 0, 1)
air.testingdata$goodOzone <- ifelse(air.testingdata$Ozone<meanozone, 0, 1)

# convert "goodOzone" in train data from numeric to factor
air.trainingdata$goodOzone <- as.factor(air.trainingdata$goodOzone)
# convert "goodOzone" in test data from numeric to factor
air.testingdata$goodOzone <- as.factor(air.testingdata$goodOzone)


# remove "Ozone" from train data
air.trainingdata <- air.trainingdata[,-1]
# remove "Ozone" from test data
air.testingdata <- air.testingdata[,-1]
air.testingdata <- air.testingdata[,-6]

str(air.testingdata)
str(air.trainingdata)

########################################################## Step 5 : See if we can do a better job predicting good and bad days

#KSVM
model.ksvm.train <-ksvm(goodOzone~., data=air.trainingdata)

air.testingdata$predictedGoodOzone <- predict(model.ksvm.train, air.testingdata)
head(air.testingdata)
results <- table(air.testingdata$predictedGoodOzone, air.testingdata$goodOzone)
print(results)

percentCorrect <- (results[1,1]+results[2,2])/(results[1,1]+results[1,2]+results[2,1]+results[2,2])*100
print(round(percentCorrect) )

compgood1 <- data.frame(air.testingdata[,6], air.testingdata$predictedGoodOzone)
colnames(compgood1) <- c("test","Pred")
compgood1$correct <- ifelse(compgood1$test==compgood1$Pred,"correct","wrong")
Plot_ksvm <- data.frame(compgood1$correct,air.testingdata$Temp,air.testingdata$Wind,air.testingdata$goodOzone,compgood1$Pred)
colnames(Plot_ksvm) <- c("correct","Temp","Wind","goodOzone","Predict")


ksvmgoodbadplot <- ggplot(Plot_ksvm, aes(x=Temp,y=Wind)) + 
  geom_point(aes(size=correct,color=goodOzone,shape = Predict))+
  ggtitle("ksvm - good/bad ozone")

ksvmgoodbadplot


## 73% correct on our predictions using the KSVM model

#SVM
Model.svm.train <- svm(goodOzone~., data = air.trainingdata)
air.testingdata$predictedGoodOzone <- predict(Model.svm.train, air.testingdata)
head(air.testingdata)
results <- table(air.testingdata$predictedGoodOzone, air.testingdata$goodOzone)
print(results)
percentCorrect <- (results[1,1]+results[2,2])/(results[1,1]+results[1,2]+results[2,1]+results[2,2])*100
print(round(percentCorrect) )

compgood2 <- data.frame(air.testingdata[,6], air.testingdata$predictedGoodOzone)
colnames(compgood2) <- c("test","Pred")
compgood2$correct <- ifelse(compgood2$test==compgood2$Pred,"correct","wrong")
Plot_svm <- data.frame(compgood2$correct,air.testingdata$Temp,air.testingdata$Wind,air.testingdata$goodOzone,compgood2$Pred)
colnames(Plot_svm) <- c("correct","Temp","Wind","goodOzone","Predict")

svmgoodbadplot <- ggplot(Plot_svm, aes(x=Temp,y=Wind)) + 
  geom_point(aes(size=correct,color=goodOzone,shape = Predict))+
  ggtitle("svm - good/bad ozone")

svmgoodbadplot


## 73% correct on our predictions using the SVM model

#Naive Bayes
model.naivebayes.train <- naiveBayes(goodOzone~., data = air.trainingdata)
air.testingdata$predictedGoodOzone <- predict(model.naivebayes.train, air.testingdata)
head(air.testingdata)
results <- table(air.testingdata$predictedGoodOzone, air.testingdata$goodOzone)
print(results)
percentCorrect <- (results[1,1]+results[2,2])/(results[1,1]+results[1,2]+results[2,1]+results[2,2])*100
print(round(percentCorrect) )

compgood3 <- data.frame(air.testingdata[,6], air.testingdata$predictedGoodOzone)
colnames(compgood3) <- c("test","Pred")
compgood3$correct <- ifelse(compgood3$test==compgood3$Pred,"correct","wrong")
Plot_nb <- data.frame(compgood3$correct,air.testingdata$Temp,air.testingdata$Wind,air.testingdata$goodOzone,compgood3$Pred)
colnames(Plot_nb) <- c("correct","Temp","Wind","goodOzone","Predict")

nbgoodbadplot <- ggplot(Plot_nb, aes(x=Temp,y=Wind)) + 
  geom_point(aes(size=correct,color=goodOzone,shape = Predict))+
  ggtitle("naive bayes - good/bad ozone")

nbgoodbadplot

## 69% correct on our predictions using the Naive Bayes model

grid.arrange(ksvmgoodbadplot,svmgoodbadplot,nbgoodbadplot, nrow=2)

########################################################## Step 6 : Which are the best models for this data
#Originally when we were using RMSE as our indicator of good vs bad models, the KSVM model had the lowest value, but the SVM model was very close.
#When we predicted our training data against actual values, we saw that both the KSVM and SVM models had an accuracy rating of about 73%, while the
#Naive Bayes model had a rating of 69% correct. It should be noted that rerunning these models changes the predicted values, and if you rerun them enough
#you're likely to find a higher success rating from different models.



