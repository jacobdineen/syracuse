#HW 6
##Jacob Dineen
#DUE 8/27 @ MIDNIGHT

#CLEAR ENVIRONMENT AND INSTALL INITIAL PACKAGES
rm(list = ls(all = TRUE))#Clear Enviroment

#Create function for installing/downloading packages
EnsurePackage<-function(x) {
  x <- as.character(x)
  if (!require(x,character.only=TRUE)) {
    install.packages(pkgs=x, repos="http://cran.rproject.
org")
    require(x,character.only=TRUE)
  }
}

#Install Package needed for Data Visualization
EnsurePackage("ggplot2")

#STEP 1 LOAD THE DATA

airquality # Call Airquality dataset
airqual<- data.frame(airquality)# Save Airquality dataset as df

#STEP 2 DATA CLEANSING

str(airqual)
any(is.na(airqual)) #test if any NAs
summary(airqual) #37 NA's on OZONE. 7 NA's on SOLAR.R. NO OTHER NA's
mean(airqual$Ozone) #Run descriptive to see if Na's are impacting
mean(airqual$Ozone, na.rm = TRUE) #Could use na.rm as workaround, but will clean
str(na.omit(airqual)) #Using na.omit removed 42 rows of data from the df. will need to replace NA values instead.

airqual$Ozone[is.na(airqual$Ozone)] <- mean(airqual$Ozone,na.rm = TRUE) #Replace NA's with the mean of the column
airqual$Solar.R[is.na(airqual$Solar.R)] <- mean(airqual$Solar.R,na.rm = TRUE) #Replace NA's with the mean of the column
airqual #Call DF
any(is.na(airqual)) #Test if any NA's remain in data frame

#STEP 3 Understand the data distribution
###Histograms for each Variable.

#ozone
ggplot(airqual,aes(x=Ozone))+geom_histogram(binwidth=5,color='white',fill="black")

#solar
ggplot(airqual,aes(x=Solar.R))+geom_histogram(binwidth=5,color='white',fill="black")

#wind
ggplot(airqual,aes(x=Wind))+geom_histogram(binwidth=5,color='white',fill="black")

#temp
ggplot(airqual,aes(x=Temp))+geom_histogram(binwidth=5,color='white',fill="black")

#Month
ggplot(airqual,aes(x=Month))+geom_histogram(bins=5,color='white',fill="black")

#Day
ggplot(airqual,aes(x=Day))+geom_histogram(bins=31,color='white',fill="black")


###Boxplots

#Melt Data
EnsurePackage("reshape2")
airqual1 <- melt(airqual)

#Ozone Boxplot
Ozone <- airqual1[airqual1$variable== 'Ozone', ] #Save DF for filtered melt df
ggplot(Ozone, aes(variable, value )) + geom_boxplot() #create boxplot on filtered melt df

#Wind Boxplot

Wind <- airqual1[airqual1$variable== 'Wind', ] #Save DF for filtered melt df
Wind$windround <- round(Wind$value) #New Col for Rounded Wind
Wind <- Wind [,-2] #Remove un-rounded value column
Wind
g1<- ggplot(Wind, aes(as.factor(variable), windround)) + geom_boxplot() #create boxplot for rounded wind values
g1

#Step 3 EXPLORE HOW DATA CHANGES OVER TIME
airqual$Date <- as.Date(paste(as.numeric("1973"), airqual$Month, airqual$Day, sep="/")) #Add concatenated Date column with 1973 as year

format(airqual$month, airqual$date, )


str(airqual)
###Line Charts

#Ozone
ggplot(airqual,aes(x=Date,y=Ozone, group=1))   +
  geom_line(color="black") 

#Temp
ggplot(airqual,aes(x=Date,y=Temp, group=1))   +
  geom_line(color="black") 

#Solar.R
ggplot(airqual,aes(x=Date,y=Solar.R, group=1))   +
  geom_line(color="black") 

#Wind
ggplot(airqual,aes(x=Date,y=Wind, group=1))   +
  geom_line(color="black") 

# create one chart with 4 lines, each having a different color

# Rescale Wind values so that they won't be too close to the x axis, and store in a new column
airqual$scalewind <- (airqual$Wind*10) #multiplied original values by 10 + Added new column
airclean <- airqual[ , c(1,2,4,7,8)]  # create a new dataframe containing the four y variables and the x variable (Date).
airclean <- melt(airclean, id= ("Date"))  # reframe the dataframe to stack all the y variables into a single column before visualization (sample on next slide)

# create one chart with four lines, using "Date" as x variable, and the four factors as y variables

ggplot(airclean , aes(x=Date,y=value, group=variable, color=variable)) + geom_line() +  geom_line()


##STEP 4 LOOK AT ALL THE DATA VIA A HEATMAP
ggplot(airclean, aes(x=Date, y=variable, color=value)) +  geom_tile() + scale_fill_gradient(airclean, low="white", high="purple")


#Step 5 Look at all the data via a scatter chart
# Use data frame from step 2 to create a scatter chart, with "Wind" along x-axis and "Temp" along y-axis.
ggplot(airqual, aes(x=Wind, y=Temp)) + geom_point(aes(size=Ozone,color=Solar.R))  # Additionally, set the points' size according to "Ozone" value and set the shade of color according to "Solar.R" value.


# Step 6: Final Analysis
# Do you see any patterns after exploring the data?  
##I think just by looking at the line chart showing all four variables, we can see that there is a correlation between increases in the values as it relates to the 'Date'. 
#When we look at the scatter plot, we can see that when temp is the highest, the wind is the lowest, suggesting an inverse,but correlated relationship.
#The individual line charts don't really help us determine any kind of relationship between the variables, although they work to show us more of an individual time series analysis for each.
#One thing that might be flawed about the dataset, is we're only seeing a sample of 'summer' months, really. 

# What was the most useful visualization?
#I think the 4 piece line chart was the most useful in seeing correlation. The individual charts don't help to paint an aggregate picture.
#Looking at the scatter plot with all four variables plotted, we are able to see that solar and temp are positively correlated against an inverse relationship wind. When the temp is high, the solar value is generally higher, and the wind value is low, which, logically, makes sense. We can also see that when the wind is below the 10 threshold, we see a majority of our high output ozone values. Really when Wind is low, the other three variables are higher, and vice versa. 





