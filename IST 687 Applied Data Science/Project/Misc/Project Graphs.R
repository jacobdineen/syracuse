#Graphs

histogram(dftestwscores$GuestAgeRange)
histogram(dftestwscores$GuestGender)
histogram(dftestwscores$POV_H)


#Ozone Boxplot
Ozone <- airqual1[airqual1$variable== 'Ozone', ] #Save DF for filtered melt df
ggplot(Ozone, aes(variable, value )) + geom_boxplot() #create boxplot on filtered melt df

revenue <- dftestwscores[dftestwscores$Revenue_USD]