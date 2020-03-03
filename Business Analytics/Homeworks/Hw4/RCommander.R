
UnivBank <- 
  read.table("C:/Users/jdine/Desktop/SYracuse/Business Analytics/Homeworks/Hw4/scm651_homework_4_universal_bank.csv",
   header=TRUE, sep=",", na.strings="NA", dec=".", strip.white=TRUE)
names(UnivBank)
scatterplot(PersonalLoan~Income, reg.line=FALSE, smooth=FALSE, spread=FALSE,
   boxplots=FALSE, span=0.5, ellipse=FALSE, levels=c(.5, .9), data=UnivBank)
GLM.1 <- glm(PersonalLoan ~ CCAvg + CDAccount + CreditCard + Education + 
  Family + Income + Online + SecuritiesAccount, family=binomial(logit), 
  data=UnivBank)
summary(GLM.1)
exp(coef(GLM.1))  # Exponentiated coefficients ("odds ratios")
scatterplot(PersonalLoan~Income, reg.line=FALSE, smooth=FALSE, spread=FALSE, 
  boxplots=FALSE, span=0.5, ellipse=FALSE, levels=c(.5, .9), data=UnivBank)

