#
#
#
#      pre-cursor functions,,,readCensus, Numberize 
#
#      read in the census data set
#
readCensus <- function() {
  urlToRead <-"http://www2.census.gov/programs-surveys/popest/tables/2010-2011/state/totals/nst-est2011-01.csv"
  
  #read the data from the web
  testFrame <- read.csv(url(urlToRead))
  
  #remove the first 8 rows (‘header information’)
  testFrame<-testFrame[-1:-8,]
  
  #only keep the first 5 columns
  testFrame<-testFrame[,1:5]
  
  #rename the first column
  testFrame$stateName <- testFrame[,1]
  testFrame<-testFrame[,-1]
  
  #remove the last rows (tail info)
  testFrame<-testFrame[-52:-58,]
  
  #remove the ‘dot’ from the state name
  testFrame$stateName <- gsub("\\.","", testFrame$stateName)
  
  #convert the columns to actual numbers and rename columns
  testFrame$april10census <-Numberize(testFrame$X)
  testFrame$april10base <-Numberize(testFrame$X.1)
  testFrame$july10pop <-Numberize(testFrame$X.2)
  testFrame$july11pop <-Numberize(testFrame$X.3)
  testFrame <- testFrame[,-1:-4]
  
  #remove the old rownames, which are now confusing
  rownames(testFrame) <- NULL
  
  return(testFrame)
}
#
Numberize <- function(inputVector)
{
  # Get rid of commas
  inputVector<-gsub(",","", inputVector)
  # Get rid of spaces
  inputVector<-gsub(" ","", inputVector)
  
  return(as.numeric(inputVector))
}

#  Packages: maps, zipcode, mapproj, ggmap, ggplot2, gdata

#specify the packages of interest
packages=c("maps","zipcode","mapproj","ggmap","ggplot2","gdata")

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


#
#      state.name  - R data set
#
str(state.name)
head(state.name)
state.name[3]
#
dummyDF <- data.frame(state.name, stringsAsFactors=FALSE)
dummyDF$state <- tolower(dummyDF$state.name)
dummyDF[3,]
dummyDF$state[3]
#
us <- map_data("state")       ## map_data is a function in ggplot2 package
str(us)
us[1,]
us[1000,]
#
map.simple <- ggplot(dummyDF, aes(map_id = state))
map.simple <- map.simple +
  geom_map(map = us, fill="light blue", color="black")
map.simple
map.simple <- map.simple +
  expand_limits(x = us$long, y = us$lat)
map.simple
#
#
#
miami <- geocode("miami, florida")

map.simple <- map.simple +
  coord_map(latlon$lon, latlon$lat) + ggtitle("basic map of USA")
map.simple

map.simple <- map.simple +
  coord_map() + ggtitle("basic map of USA")
map.simple

miami

map.simple + geom_point(data = miami, aes(x= -80.19, y= 25.76))

