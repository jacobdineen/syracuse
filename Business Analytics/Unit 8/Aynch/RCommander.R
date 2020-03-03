
OJ <- 
  read.table("C:/Users/jdine/Desktop/SYracuse/Business Analytics/Unit 8/Aynch/business_analytics__week_8_oj.csv",
   header=TRUE, sep=",", na.strings="NA", dec=".", strip.white=TRUE)
RegModel.1 <- lm(logmove~AGE60+INCOME+price, data=OJ)
summary(RegModel.1)
library(zoo, pos=14)
library(lmtest, pos=14)
resettest(logmove ~ AGE60 + INCOME + price, power=2:3, type="regressor", 
  data=OJ)
vif(RegModel.1)
bptest(logmove ~ AGE60 + INCOME + price, varformula = ~ 
  fitted.values(RegModel.1), studentize=FALSE, data=OJ)
dwtest(logmove ~ AGE60 + INCOME + price, alternative="greater", data=OJ)
outlierTest(RegModel.1)

