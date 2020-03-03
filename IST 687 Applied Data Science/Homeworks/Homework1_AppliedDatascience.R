#
# HW1 Jake Dineen
height <- c(59,60,61,58,67,72,70)         #Assign Values to height
weight <- c(150,140,180,220,160,140,130)  #Assign Values to weight
a <- 150                                  #Assign Value to a

mean(height)                              #Mean of height
mean(weight)                              #Mean of weight

length(weight)                            #Length of height
length(height)                            #Length of weight
lengthweight <- length(weight)            #Assign length(weight) to lengthweight
lengthheight <- length(height)            #Assign length(height) to lengthheight


sum(height)                               #Sum of height
sum(weight)                               #Sum of weight
sumheight <- sum(height)                  #Assign sum(height) to sumheight
sumweight <- sum(weight)                  #Assign sum(weight) to sumweight

sumheight/sum(lengthheight)               #Average of height using Sum/Length
sumweight/sum(lengthweight)               #Average of weight using Sum/Length

max(height)                               #Max of height
maxH <- max(height)                       #Assign min(height) to maxheight

min(weight)                               #Min of weight
minW <- min(weight)                       #Assign min(weight) to minweight

weight5<-c(150,140,180,220,160,140,130)+5 #Assign new Vector to weight5- Weight + 5 pounds
(weight5)/(height)                        #New Weight/Height for each person using weight+5

if (maxH > 60) "yes" else "no"         #Test max height vs 60
if (minW > a)  "yes"  else "no"          #Test min weight vs assignment of "a"