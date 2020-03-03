rm(list = ls(all = TRUE))#Clear Enviroment

                                                          #Week 2 Asynch
titanic <- read.csv(file.choose())
str(titanic)
titanic$PassengerId <- as.factor(titanic$PassengerId)
str(titanic)


#checking na values per attribute
length(which(is.na(titanic$PassengerId)))
length(which(is.na(titanic$Survived)))
length(which(is.na(titanic$Pclass)))
length(which(is.na(titanic$Name)))
length(which(is.na(titanic$Sex)))
length(which(is.na(titanic$Age)))
length(which(is.na(titanic$Parch)))
length(which(is.na(titanic$Ticket)))
length(which(is.na(titanic$Fare)))
length(which(is.null(titanic$Cabin)))

for (i in 1:12)
titanic[,i][titanic[,i] == NULL] <- NA


sum(is.na(titanic$Cabin))
sum(is.na(titanic$Embarked))

#replacing na values in age to mean of age
mean <- mean(titanic$Age, na.rm = TRUE)
titanic$Age[is.na(titanic$Age)] <- mean
length(which(is.na(titanic$Age)))

#summarize central tendency
summary(titanic$Pclass)
mean(titanic$Age)
median(titanic$Age)
#freq
table(titanic$Age)
#mode
table(titanic$Age)[which.max(table(titanic$Age))]

#summarize data spread
var(titanic$Age)
sd(titanic$Age)
max(titanic$Age)
min(titanic$Age)
#Quantile
wt <- quantile(titanic$Age, na.rm = TRUE)
wt
#InterQuartile Range
IQR <- wt[['75%']]-wt[['25%']]
IQR


#Ordinal and Nominal Variables
table(titanic$Sex)
table(titanic$Sex)[which.max(table(titanic$Sex))]

#Show distribution by nominal value
table(titanic$Pclass)

#visualization
hist(titanic$Age) #histogram
boxplot(titanic$age)
plot(titanic$Age, titanic$Fare)

#crosstab two nominal variables
table(titanic$Sex, titanic$Survived)

#relationship between nominal and numberic variable
male <- titanic[titanic$Sex == 'male',]
mean(male$Fare)

female <- titanic[titanic$Sex == 'female',]
mean(female$Fare)

titanicthirdclass <- titanic[titanic$Pclass == 3,]
boxplot(titanicthirdclass$Fare)
boxplot(titanic$Fare)

hist(titanicthirdclass$Fare)

t1 <- table(titanicthirdclass$Embarked, titanicthirdclass$Survived)
t1

table(titanic$Embarked, titanic$Survived)

#data aggregation
#Aggregate the average fare for men and for women in the Titanic data set.
attach(titanic)
summary(titanic)

aggregate(cbind(Fare), by=list(Group.Gender=Sex),FUN= mean)


#attribute transformation
str(titanic)

plot(titanic$Age, log(titanic$Age))

#discretization
range(titanic$Fare)
hist(titanic$Fare)

#categorizing fares into three subsections of costs
fare <- cut(titanic$Fare, breaks = c(1, 50 ,100,Inf), labels = c("low", "middle", "high"))
fare
hist(titanic$Fare)

ffff#log
titanic$logfare <- log(titanic$Fare)
plot(titanic$Fare, titanic$logfare)

#zscore
titanic$zscore <- scale(titanic$Fare, center = TRUE, scale = TRUE)
titanic$zscore



#minmax
minmax <- (titanic$Fare - min(titanic$Fare,na.rm=TRUE))/(max(titanic$Fare, na.rm = TRUE)-min(titanic$Fare, na.rm = TRUE))




#sampling
sample <- titanic[sample(1:nrow(titanic),100, replace=FALSE),]
table(sample$Survived)

#systematic sampling
syssample <- titanic[seq(1, 100,10),]
syssample


                                                  #Week 3 Asynch Association Rule Mining

install.packages("arules")
install.packages("arulesViz")
library("arules")
library("arulesViz")
library(plyr)
library(dplyr)


groceries <- read.transactions(file.choose(), format = "basket", sep = ",")
str(groceries)
itemFrequencyPlot(groceries, topN= 20, type="absolute")

rules <- apriori(groceries, parameter = list(supp = 0.001, conf = 0.8))
options(digits=2)
inspect(rules[1:5])
rules<-sort(rules, by="confidence", decreasing=TRUE)
inspect(rules[1:5])
rules <- apriori(Groceries, parameter = list(supp = 0.001, conf = 0.8,maxlen=3))

subset.matrix <- is.subset(rules, rules)
subset.matrix[lower.tri(subset.matrix, diag=T)] <- NA
redundant <- colSums(subset.matrix, na.rm=T) >= 1
rules.pruned <- rules[!redundant]
rules<-rules.pruned

rules<-apriori(data=Groceries, parameter=list(supp=0.001,conf = 0.08), 
               appearance = list(default="lhs",rhs="whole milk"),
               control = list(verbose=F))
rules<-sort(rules, decreasing=TRUE,by="confidence")
inspect(rules[1:5])


rules<-apriori(data=Groceries, parameter=list(supp=0.001,conf = 0.15,minlen=2), 
               appearance = list(default="rhs",lhs="whole milk"),
               control = list(verbose=F))
rules<-sort(rules, decreasing=TRUE,by="confidence")
inspect(rules[1:5])

plot(rules,method="graph",interactive=TRUE,shading=NA)


rules<-apriori(data=Groceries, parameter=list(supp=0.001,conf = 0.08), 
               appearance = list(default="lhs",rhs="pastry"),
               control = list(verbose=F))
rules<-sort(rules, decreasing=TRUE,by="confidence")
inspect(rules[1:5])

retail <- read.transactions(file.choose(), format = "basket", sep = ",")
rules <- apriori(retail, parameter = list(supp = 0.001, conf = 0.8,minlen= 2, maxlen=3))
inspect(rules)
rules<-apriori(data=retail, parameter=list(supp=0.01,conf = 0.8))
               


rules<-apriori(data=retail, parameter=list(supp=0.01,conf = 0.8), 
               appearance = list(default="rhs",lhs="38"),
               control = list(verbose=F))
rules<-sort(rules, decreasing=TRUE,by="confidence")
inspect(rules)


                                                        #Week 4 Clustering


#Euclidean Distance
ED = function(a,b) sqrt(sum((a-b)^2))

#Cosine Similarity
CS = function(a,b) a%*% b/sqrt(a%*%a*b%*%b)

v1 <- c(22, 1, 42, 10)
v2 <- c(20,0,36,8)

ED(v1,v2)
CS(v1,v2)

#Manhattan Distance
((22-20) + (1-0) + (42-36) + (10-8))

#With Zoo Data
zoo <- read.csv(file.choose())
str(zoo)
  
  #Leave out first and last attribute
zoo_unlabel <- zoo[,c(2:17)]
str(zoo_unlabel)

install.packages("RWeka")
library("RWeka")

model_r <- kmeans(zoo_unlabel, 3)
model_r 

model_r$centers 
clusterassignment <- data.frame(zoo, model_r$cluster)
View(clusterassignment)

plot(zoo$type ~ jitter(model_r$cluster, 1),pch=21, col=as.factor(zoo$milk))


          
                                                #Week 5 Decision Trees

Sys.setenv(JAVA_HOME='C:\\Program Files\\Java\\jre7') # for 64-bit version

install.packages("rJava",type = "source")
install.packages("rJava")
library(rJava)


install.packages("RWeka")
library("RWeka")
trainset <- read.csv(file.choose())
testset <- read.csv(file.choose())

NN <- make_Weka_filter("weka/filters/unsupervised/attribute/NumericToNominal") #build a function using RWeka filter interface

trainset <- NN(data=trainset, control= Weka_control(R="1-3"), na.action = NULL)
testset <- NN(data=testset, control= Weka_control(R="1,3"), na.action = NULL)

MS <- make_Weka_filter("weka/filters/unsupervised/attribute/ReplaceMissingValues") #build a function using RWeka filter interface

#Apply the filter function to both training and test datasets.
trainset <-MS(data=trainset, na.action = NULL)
testset <-MS(data=testset, na.action = NULL)

str(trainset)

#Build decision tree model
m=J48(Survived~., data = trainset)
m=J48(Survived~., data = trainset, control=Weka_control(U=FALSE, M=2, C=0.5))

m
# View parameters with function WOW:
WOW("J48")

#Use 10 fold cross-validation to evaluate the model
e <- evaluate_Weka_classifier(m,numFolds = 10, seed = 1, class = TRUE)
e

#Apply the model with test dataset
pred <- predict(m, newdata = testset, type = c("class" ))
pred

#Then save the prediction to a csv file:
write.csv(pred)

InfoGainAttributeEval(Survived ~ . , data = trainset)


all <- read.csv(file.choose())
Train <- all[12:85,]
Test <- all[1:11,]


str(all)

MS <- make_Weka_filter("weka/filters/unsupervised/attribute/ReplaceMissingValues") #build a function using RWeka filter interface

#Apply the filter function to both training and test datasets.
trainset <-MS(data=Train, na.action = NULL)
testset <-MS(data=Test, na.action = NULL)

m=J48(author~., data = trainset)
m=J48(author~., data = trainset, control=Weka_control(U=False, M=5, C=0.25))
m

e <- evaluate_Weka_classifier(m,numFolds = 10, seed = 1, class = TRUE)
e

#Apply the model with test dataset
pred <- predict(m, newdata = testset, type = c("class" ))
pred

e <- evaluate_Weka_classifier(,numFolds = 10, seed = 1, class = TRUE)

InfoGainAttributeEval(Survived ~ . , data = trainset)


############## Naive Bayes in R

##First load the training data in csv format, and then convert "Survived" to nominal variable and "Pclass" to ordinal variable.

trainset <- read.csv(file.choose())
trainset$Survived=factor(trainset$Survived)
trainset$Pclass=ordered(trainset$Pclass)


#Then load the test data and convert attributes in similar way.

testset <- read.csv(file.choose())
testset$Survived=factor(testset$Survived)
testset$Pclass=ordered(testset$Pclass)


#Then remove some attributes that are not likely to be helpful, such as "embarked" - create a new data set with all other attributes. Process the train and test set in the same way. 

myVars=c("Pclass", "Sex", "Age", "SibSp", "Fare", "Survived")
newtrain=trainset[myVars]
newtest=testset[myVars]

# naive Bayes in e1071

#Now load the package e1071

library(e1071)


#Build naive Bayes model using the e1071 package
nb=naiveBayes(Survived~., data = newtrain, laplace = 1, na.action = na.pass)


#Apply the model to predicting test data
pred=predict(nb, newdata=newtest, type=c("class"))
pred

#Combine the predictions with the corresponding case ids. 
myids=c("PassengerId")ssssssssssssssssssssss
id_col=testset[myids]
newpred=cbind(id_col, pred)


#Add header to output
colnames(newpred)=c("Passengerid", "Survived")

#Write output to file
write.csv(newpred, file="/Users/byu/Desktop/Data/titanic-NB-pred.csv", row.names=FALSE)



train <- read.csv(file.choose())
train$label <- as.factor(train$label)

test <- read.csv(file.choose())
test$label <- as.factor(test$label)

str(test)

#Build naive Bayes model using the e1071 package
nb=naiveBayes(train$label~., data = train, laplace = 1, na.action = na.pass)
nb

#Apply the model to predicting test data
pred=predict(nb, newdata=test, type=c("class"))
pred

#Combine the predictions with the corresponding case ids. 
myids= train$label
id_col=testset[myids]
newpred=cbind(id_col, pred)



# Titanic-multi-models

#First, load in train and test data
trainset <- read.csv("/Users/byu/Desktop/Data/titanic-train.csv")
testset <- read.csv("/Users/byu/Desktop/Data/titanic-test.csv")
#Second, convert Survived to nominal variable, Pclass to ordinal
trainset$Survived=factor(trainset$Survived)
trainset$Pclass=ordered(trainset$Pclass)
testset$Survived=factor(testset$Survived)
testset$Pclass=ordered(testset$Pclass)
#Third, replace missing value with mean and mode
library(RWeka)
MS <- make_Weka_filter("weka/filters/unsupervised/attribute/ReplaceMissingValues") 
trainset_nomissing <-MS(data=trainset, na.action = NULL)
testset_nomissing <-MS(data=testset, na.action = NULL)
#Fourth, use RWeka InfoGain to rank feature relevance to prediction
library("RWeka")
InfoGainAttributeEval(Survived ~ . , data = trainset_nomissing)

#Fifth, select potentially relevant variables for analysis
myVars=c("Pclass", "Sex", "Age", "SibSp", "Fare", "Survived")
newtrain=trainset_nomissing[myVars]
newtest=testset_nomissing[myVars]
str(newtrain)

#Sixth, use the "infotheo" package to discretize numeric variable; combine train and test data for unified discretization
# Kaggle returned lower accuracy .727
#install.packages("infotheo")
library(infotheo)
data <- rbind(newtrain, newtest) 
dData <- discretize(data[, 2:4], disc = "equalwidth", nbins=10)
dData <- lapply(dData, as.factor)
dData <- cbind(data[, c(1,6)], dData)
dlabel <- data$Survived
dData <- cbind(dData, dlabel)
# separate train (1-891) and test
train_index <- 1:891
train1<- dData[train_index,]
test1<- dData[-train_index,]

#train and test naive Bayes model
library(e1071)
nb=naiveBayes(Survived~., data = train1, laplace = 1, na.action = na.pass)
nb
## 
## Naive Bayes Classifier for Discrete Predictors
## 
## Call:
naiveBayes.default(x = X, y = Y, laplace = laplace)

pred=predict(nb, newdata=test1, type=c("class"))
myids=c("PassengerId")
id_col=testset[myids]
newpred=cbind(id_col, pred)
colnames(newpred)=c("Passengerid", "Survived")
write.csv(newpred, file="/Users/byu/Desktop/Data/titanic-binned-NB-pred.csv", row.names=FALSE)

#kNN in the "class" package
N#ow we will use the "class" package to run kNN. No missing values are allowed. No nominal values are allowed. Labels should be separated from train and test data. Kaggle returned accuracy .617
# install.packages("class")
library(class)
train_labels = newtrain$Survived
sex=as.numeric(newtrain$Sex)
pclass=as.numeric(newtrain$Pclass)
dtrain=cbind(sex, newtrain[, c(3,4)] )
dtrain=cbind(dtrain, pclass)

sex=as.numeric(newtest$Sex)
pclass=as.numeric(newtest$Pclass)
dtest=cbind(sex, newtest[, c(3,4)] )
dtest=cbind(dtest, pclass)

predKNN <- knn(train=dtrain, test=dtest, cl=train_labels, k=3)
myids=c("PassengerId")
id_col=testset[myids]
newpred=cbind(id_col, predKNN)
colnames(newpred)=c("Passengerid", "Survived")
write.csv(newpred, file="/Users/byu/Desktop/Data/titanic-kNN-pred.csv", row.names=FALSE)


#SVM
#Kaggle returned prediction accuray .77990
library(e1071)
svm<- svm(Survived~., data = newtrain)
pred=predict(svm, newdata=newtest, type=c("class"))
myids=c("PassengerId")
id_col=testset[myids]
newpred=cbind(id_col, pred)
colnames(newpred)=c("Passengerid", "Survived")
write.csv(newpred, file="/Users/byu/Desktop/Data/titanic-SVM-pred.csv", row.names=FALSE)

#Random forest on non-discretized data
#Kaggle returned accuracy .727
#install.packages("randomForest")
library(randomForest)
## randomForest 4.6-12
## Type rfNews() to see new features/changes/bug fixes.
rfm <- randomForest(Survived~., data=newtrain, ntree=10)
print(rfm)
## 
## Call:
##  randomForest(formula = Survived ~ ., data = newtrain, ntree = 10) 
##                Type of random forest: classification
##                      Number of trees: 10
## No. of variables tried at each split: 2
## 
##         OOB estimate of  error rate: 18.93%
## Confusion matrix:
##     0   1 class.error
## 0 471  70   0.1293900
## 1  96 240   0.2857143
predRF <- predict(rfm, newtest, type=c("class"))
myids=c("PassengerId")
id_col=testset[myids]
newpred=cbind(id_col, pred)
colnames(newpred)=c("Passengerid", "Survived")
write.csv(newpred, file="/Users/byu/Desktop/Data/titanic-RF-pred.csv", row.names=FALSE)





parallel::detectCores()
parallel::detectCores(logical = TRUE)
parallel::detectCores(logical = FALSE)
