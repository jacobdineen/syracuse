#ADS IST 687
#Jacob Dineen
#Homework 8
#Due 9/10/2017

#################All Calls to Clear Environment and Fetch Packages
#CLEAR ENVIRONMENT AND INSTALL INITIAL PACKAGES
rm(list = ls(all = TRUE))#Clear Enviroment

################ START OF HOMEWORK ASSIGNMENT 8. IST687 - Making Predictions

#Read in Dataset
URLtoRead <- "http://college.cengage.com/mathematics/brase/understandable_statistics/7e/students/datasets/mlr/excel/mlr01.xls"
regression <- read.xls(URLtoRead) 

str(regression)
View(regression)

#Update Column Names
colnames(regression) <- c("Fawn", "Antelope", "Precipitation", "WinterRating")
str(regression)

#Bivariate Plots

##Fawn V Antelope
ggplot(regression,aes(x=regression$Antelope,y=regression$Fawn))+ geom_point(color="red", size=2)+ labs(x = "Antelope", y= "Fawn", title = "Antelope V Fawn")

##Fawn V Precipitation
ggplot(regression,aes(x=regression$Precipitation,y=regression$Fawn))+ geom_point(color="red", size=2)+ labs(x = "Precipitation", y= "Fawn", title = "Precipitation V Fawn")

##Fawn V Severity of Winter
ggplot(regression, aes(x=regression$WinterRating, y=regression$Fawn))+ geom_point(color="red", size=2)+ labs(x = "WinterRating", y= "Fawn", title = "WinterRating V Fawn")

#Fawn is the Dependent Variable, so it goes on the Y axis of each of these plots.

#linear models

  ##Fawn V Severity of Winter
model1 <- lm(formula= Fawn ~ WinterRating, data=regression)
summary(model1)
plot(regression$WinterRating, regression$Fawn)
abline(model1)

      #Predict#
range(regression$WinterRating)
newdata <- data.frame (WinterRating=3)
predict(model1, newdata, type="response")

        #Analysis
# Adjusted R-squared: 0.4702, so the variance in Fawns is not heavily reliant on the variance in the severity of the winter.
#The predictor 'winterRating' was not statistally significant in this model - pvalue= 0.036263



  ##Fawn v Precipation & Severity of Winter
model2 <- lm(formula=Fawn ~ WinterRating+Precipitation, data=regression)
summary(model2)
range(regression$WinterRating)
range (regression$Precipitation)

      #Predict#
newdata1 <- data.frame(Precipitation= 12.5, WinterRating=4)
predict(model2, newdata1, type="response")

          #Analysis
# Adjusted R-squared:   0.86, so this model was a pretty solid fit for our data. 
#We can see that precipitation, with a p value of .008 was a very statistically significant predictor variable for our model.


  ##Fawn V All Variables
model3 <- lm(formula= Fawn~ ., data=regression)
summary(model3)
range(regression$WinterRating)
range (regression$Precipitation)
range (regression$Antelope)

      #Predict#
newdata2 <- data.frame(Precipitation= 14, WinterRating=2, Antelope=8.5)
predict(model3,  newdata2, type= "response")

        #Analysis
#Adjusted R-squared:  0.955, so this model, with 3 variables used, was the best fit for our data. 
#All of the variables were statistically significant in the model, with everything registering a pvalue < .05.


#Look at step function in week8synchcode file


#Parasimonious Model

step(model3,data=regression,direction='backward')


#if we decide to use the AIC function to best determine the best model, with the least amount of variables, we see that the result is a model that 
#includes all relevant variables. In this case, we see a model that includes all three of the initial variables. 
#With all 3 variables wee see an adjusted r2 of .955 and see that all variables are statistically relevant to the outcome (y)

summary(lm(formula = Fawn ~ Antelope + Precipitation + WinterRating, 
           data = regression))



#Plotting

model1 <- lm(formula= Fawn ~ WinterRating, data=regression)
summary(model1)
g <- ggplot(regression, aes(x=WinterRating, y= Fawn)) + geom_point()
g + geom_smooth(method = "lm")


model4 <- lm(formula= Fawn ~ Antelope, data=regression)
summary(model4)
g1 <- ggplot(regression, aes(x=Antelope, y= Fawn)) + geom_point()
g1 + geom_smooth(method = "lm")

model5 <- lm(formula= Fawn ~ Precipitation, data=regression)
summary(model5)
g2 <- ggplot(regression, aes(x=Precipitation, y= Fawn)) + geom_point()
g2 + geom_smooth(method = "lm")

model6 <- lm(formula= Fawn ~ Precipitation+Antelope, data=regression)
summary(model6)


