Sample(Vector, Size=?, replace=TRUE)  # Replace means that once sample is pulled, it's removed from total pop
mean(Sample(Vector, Size=?, replace=TRUE)) # Find mean of the sample
#Sampling is taking a segment of the population and making inferences about that segment in relation to the total pop.
#Larger Sample, better, more accurate results

#Replication
replicate(X, mean(Sample(Vector, Size=?, replace=TRUE))), simplify = TRUE)
# X is the number of times we want the data sampled. 

mean(replicate(x,mean(Sample(Vector, Size=?, replace=TRUE))), simplify = TRUE)
# Draw X samples of size X. Calc the mean of each sample. Calculate the mean of the X sample means. Answer = calculated mean of the means
#Central Limit Theorem = law of large numbers. More sampling = more stable = more norm.dist around the mean of the population.
#Simplify is structure of returned data

#Example
jar <- c(1,0)
jar
sample(jar, 4, replace=TRUE)
sample(jar, 4, replace=F)
sample(jar, 2, replace=TRUE)

jar1 <- c(-1,0,1)
sample(jar1, size = 250, replace = TRUE)
sample <- sample(jar1, size = 250, replace = TRUE)
mean (sample)
replicate(100,mean(sample))

X [1] #10% quantile
X [2] #50% quantile
X [3] #90% quantile

##Example
pb <- "peanut butter"
v.pb <- replicate(100, pb)
cc <- "chocolate chip"
v.cc <- replicate(100, cc)
jar<- c(v.pb, v.cc)
length(jar)
length(jar[jar=='chocolate chip']) #Filtering
sample (jar, 1)

#Reference for homework
Mysample <- sample(jar,7,replace=TRUE)
length(Mysample[Mysample==pb]) #how many pbs in sample
length(Mysample[Mysample==pb])/length(Mysample)#how many pbs in sample/total sample

grep("x", string)

