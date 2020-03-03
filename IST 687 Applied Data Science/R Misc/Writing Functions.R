mtcars
mtcars [1,1]
colnames(mtcars)
rownames (mtcars)
rnames <- rownames(mtcars)
rnames [20]

bestMPG <- function () {
  index <- which.max(mtcars$mpg)
  car <- mtcars [index,]
  return(car)
}

bestMPG ()

bestMPGName <- function () {
  index <- which.max(mtcars$mpg)
  rownames <- rownames(mtcars) 
  car <- rownames [index]
  return(car)
}

bestMPGName ()

colnames(mtcars) == "mpg"

mfv(dfStates$Jul2011)
help (mfv)

row.names()


csvtoread <- "https://yadi.sk/d/ES0J-wSWvSujg/out-201402.csv" #URL to Read Vector

df <- read.csv(url(csvtoread)) #Creating Vector for Census CSV DF
data.frame (df) #Call DF of readStates 
str (readStates) #Structure of readStates

mydata <- read.csv(file= "out-201402.csv")
