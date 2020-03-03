#ADS IST 687
#Jacob Dineen
#Homework 7
#Due 9/3/2017


#CLEAR ENVIRONMENT AND INSTALL INITIAL PACKAGES
rm(list = ls(all = TRUE))#Clear Enviroment dd


#specify the packages of interest
packages=c("maps","zipcode","mapproj","ggmap","ggplot2","gdata", "sqldf")

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


#######################################################STEP 1 Load the Data##################################################################

#Save As DF
medianincome <- read.xls(file.choose()) #File Choose let's me manually choose from taskviewer. 32635 Obs, 4 Variables
str(medianincome)

#Change column names
colnames(medianincome) <- c("zip", "median", "mean", "population")

#Remove row 1 with dupe column Names
medianincome <- medianincome [-1,]

#remove all commas
medianincome$median <- gsub(",", "", medianincome$median)
medianincome$mean <- gsub(",", "", medianincome$mean)
medianincome$population <- gsub(",","",medianincome$population)


#Put zips into standard format- Add a zero to the front of each int string
medianincome$zip <- clean.zipcodes(medianincome$zip)
str(medianincome)


#store zipcode package as a new dataframe
zipcodes <- data(zipcode) #saved as zipcode


merged <- merge(medianincome, zipcode, by="zip")
str(merged)

#Remove HW and Al
merged <- merged[!grepl("HI", merged$state),]
merged <- merged[!grepl("AK", merged$state),]



#Change medianincome and population to numeric
merged$median <- as.numeric(merged$median)
merged$population <- as.numeric(merged$population)
str(merged)


########################################################STEP 2 Show the Income and Population per State##################################################################

income <- tapply(merged$median, merged$state, mean) # calc mean of median by state
str(income)

state <- rownames(income)  # place rownames from income into state variable

medianIncome <- data.frame(state, income) # create a df with state variable & income variable
str(medianIncome)
head(medianIncome)

pop <- tapply(merged$population, merged$state, sum ) # sum up population for each state
str(pop)
head(pop)
state <- rownames(pop)                        
statePop <- data.frame(state, pop)

dfSimple <- merge(medianIncome, statePop, by="state")  # create new df by merging df's medianIncome, stateIncome
str(dfSimple)
head(dfSimple)


#Match statenames per state abbreviations
str(state.abb)
head(state.abb)
match(dfSimple$state,state.abb)  # the relative position of state.abb in dfSimple$state
dfSimple$state
dfSimple$stateName <- state.name[match(dfSimple$state,state.abb)]
str(dfSimple)
head(dfSimple)


#State names to lowercase
dfSimple$stateName <- tolower(dfSimple$stateName)
head(dfSimple)


#Show the US map with avg median income
us <- map_data("state")   # performed above, not adding anything new

mapIncome <- ggplot(dfSimple, aes(map_id = stateName))
mapIncome <- mapIncome + geom_map(map = us, aes(fill = dfSimple$income))
mapIncome <- mapIncome + expand_limits(x = us$long, y = us$lat)
mapIncome <- mapIncome + coord_map()
mapIncome <- mapIncome + ggtitle("average median Income of the U.S")
mapIncome

#Show the US map with color representing state pop
us <- map_data("state")   # performed above, not adding anything new

mapPop <- ggplot(dfSimple, aes(map_id = stateName))
mapPop <- mapPop + geom_map(map = us, aes(fill = dfSimple$pop))
mapPop <- mapPop + expand_limits(x = us$long, y = us$lat)
mapPop <- mapPop + coord_map()
mapPop <- mapPop + ggtitle("Population of the US")
mapPop



##############################################STEP 3 Show the Income per Zip Code##################################################################

head(merged)
merged$stateName <- state.name[match(merged$state,state.abb)]
merged$stateName <- tolower(merged$stateName)
head(merged)



mapZip <- ggplot(merged, aes(map_id = stateName))
mapZip <- mapZip + geom_map(map=us, fill="black", color="white")
mapZip <- mapZip + expand_limits(x =us$long, y = us$lat)
mapZip <- mapZip + geom_point(data = merged, aes(x = merged$longitude, y = merged$latitude, color=merged$median))
mapZip <- mapZip + coord_map() + ggtitle("Income per zip code")
mapZip


##############################################STEP 4 Show Zipcode density##################################################################



mapZip <- ggplot(merged, aes(map_id = stateName))
mapZip <- mapZip + geom_map(map=us, fill="black", color="white")
mapZip <- mapZip + expand_limits(x =us$long, y = us$lat)
mapZip <- mapZip + geom_point(data = merged,aes(x = merged$longitude, y = merged$latitude, color=merged$median))
mapZip <- mapZip + coord_map() + ggtitle("Income per zip code")
mapD <- mapZip + geom_density_2d(data = merged, aes(x = merged$longitude, y = merged$latitude))
mapD


##############################################STEP 5 Zoom in to the region around NYC##################################################################

latlon <- geocode("NYC, ny")
mapZipZoomed <-  mapZip + geom_point(aes(x = latlon$lon, y = latlon$lat), color="darkred", size = 3)
mapZipZoomed <-  mapZipZoomed + xlim(latlon$lon-10, latlon$lon+10) + ylim(latlon$lat-10,latlon$lat+10) + coord_map()
mapZipZoomed



mapDZoomed <- mapD + geom_point(aes(x = latlon$lon, y = latlon$lat), color="darkred", size = 3) 
mapDZoomed <-  mapDZoomed + xlim(latlon$lon-10, latlon$lon+10) + ylim(latlon$lat-10,latlon$lat+10) + coord_map()
mapDZoomed



# remove al & HI from dfNew$state - Did this above, but doing it again here
merged$state<-merged[merged$state!="AK" & merged$state!="HI",]
str(merged)