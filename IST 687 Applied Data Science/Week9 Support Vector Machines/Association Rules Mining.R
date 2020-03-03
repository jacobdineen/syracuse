#Association Rules
data("Groceries")

itemFrequencyPlot(Groceries, support=0.1)


rule <- apriori(Groceries, parameter = list(support=.01,confidence=.5))
summary(rule)

inspect(rule)
#support is percentage chance of it happening
#confidence is percentage of time the model thinks it's going to happen

install.packages("arulesViz")
library("arulesViz")

rule <- apriori(Groceries, parameter = list(support=.005,confidence=.35))
plot(rule)

goodrules <- rule[quality(rule)$lift > 3.5]
inspect(goodrules)


install.packages("Matrix")
ngCMatrix

