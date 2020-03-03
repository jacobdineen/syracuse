#
# HW2 Jake Dineen

mtcars   #Query for mtcars table/dataset
myCars <- mtcars   #Assign table to Vector "myCars"
myCars     #Call "myCars" vector
data.frame(myCars) #dataframe of myCars Dataset
str(myCars) #Structure of myCars Dataset


#Step1
indexHP <- which.max(myCars$hp)  #Store Vector for index w maxhp
indexHP #call Vector for index # w maxhp =335
myCars[31,] #query for observation/index = 31. Results = 335hp from Maserati Bora
#or
myCars [indexHP,]

#or order by descending hp
highHPcars <- myCars[ order(-myCars$hp),] #-myCars$hp to sort in descending by hp
highHPcars #Call Vector highHPcars to render desc order by hp

#or for just the name
row.names(myCars)[31]

#Step2
indexMPG <- which.max(myCars$mpg)#Store Vector for index w maxhp
indexMPG
myCars[20,]#query for observation/index = 20. Results = 33.9mpg from Toyota Corolla
#Or
myCars[indexMPG,]
#sorted data.frame, based on mpg
highMPGcars <-myCars [ order(-myCars$mpg),] #-myCars$mpg to sort desc by mpg
highMPGcars #Call Vector highMPGcars to render desc order by mpg

#or for just the name
row.names(myCars) [which.max(myCars$mpg)]

#Step3
myCars$hp/myCars$mpg #ratio of hp to mpg.
myCars$mpg/myCars$hp #ratio of mpg to hp

#add column to df "myCars" with hp to mpg ratio
myCars$hptompg <-(myCars$hp/myCars$mpg) #add new.co to myCars df with hp/mpg ratio
which.max(myCars$hptompg) #query for max hp to mpg index
myCars [31,]  #call result of best hp to mpg ratio

#add column to df "myCars" with mpg to hp ratio
myCars$mpgtohp <- (myCars$mpg/myCars$hp) #add new.co to myCars df with mpg/hp ratio
which.max(myCars$mpg/myCars$hp) #query for max mpg to hp index
myCars [19,] #call result of best mpg to hp ratio

myCars [order(-myCars$hptompg),] #sort Desc by hptompg ratio
myCars [order(-myCars$mpgtohp),] #sort Desc by mpgtohp ratio

#Step4
#Scaling
myCars$scalempg <-scale (myCars$mpg, scale = T) #New Col for scale of mpg
myCars$scalehp <- scale (myCars$hp, scale = T) #New Col for scale of hp
myCars$scalempgtohp <- (myCars$scalempg/myCars$scalehp) #New Col for derived value of scale of mpg/scale of hp
myCars #call dataframe
which.max(myCars$scalempgtohp) #max index for best scalempgtohp
myCars [11,] #show row for best scale of mpg to hp ratio
