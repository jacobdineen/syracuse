rm(list = ls(all = TRUE))#Clear Enviroment

titanic <- read.csv(file.choose())
str(titanic)
titanic$PassengerId <- as.factor(titanic$PassengerId)
str(titanic)

sum(is.na(titanic$PassengerId))
sum(is.na(titanic$Survived))
sum(is.na(titanic$Pclass))
sum(is.na(titanic$Name))
sum(is.na(titanic$Sex))
sum(is.na(titanic$Age))
sum(is.na(titanic$Parch))
sum(is.na(titanic$Ticket))
sum(is.na(titanic$Fare))
length(which(is.na(titanic$Cabin)))
titanic[,i][dftestwscores[,i] == NULL] <- "Null"

which(is.null(titanic$Cabin)))
titanic$Cabin [titanic$Cabin == NULL] <- NA

sum(is.na(titanic$Cabin))
sum(is.na(titanic$Embarked))

mean <- mean(titanic$Age, na.rm = TRUE)
titanic$Age[is.na(titanic$Age)] <- mean
length(which(is.na(titanic$Age)))
