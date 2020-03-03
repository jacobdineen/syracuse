
setwd('C:/Users/jdine/Desktop/SYracuse/Term 5 - Current/Financial Analytics- Fin 654')
data <- na.omit(read.csv("data/metaldata.csv", header = TRUE))
dates <- as.Date(data$DATE, "%m/%d/%Y")
values <-  data[,2:4]
values <- cbind(dates,values)
str(values)
datanew <- values[order(values$dates, decreasing = FALSE), ]

str(datanew)
