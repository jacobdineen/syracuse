#Week 10 Synch + Asynch

#Text Mining -Looking for patterns in text
#Natural Language processing - Understanding the text 

#Word Cloud is used to present frequently occurring words in documents.
#Package - tm , wordcloud

install.packages("tm")
install.packages("wordcloud")

library(tm)
library(wordcloud)

sbaFile <- "http://www.historyplace.com/speeches/anthony.htm"
sba <- readLines(sbaFile)
str(sba)

#Transformation
words.vec <- VectorSource((sba))
word.corpus <- Corpus(words.vec)
word.corpus

word.corpus <- tm_map(word.corpus, content_transformer(tolower))
word.corpus <- tm_map(word.corpus, removePunctuation)
word.corpus <- tm_map(word.corpus, removeNumbers)
word.corpus <- tm_map(word.corpus, removeWords, stopwords("english"))

tdm<- TermDocumentMatrix
(word.corpus)
tdm
inspect(tdm)

m<- as.matrix(tdm)
wordCounts <- rowSums(m)
wordCounts <- sort(wordCounts, decreasing=TRUE)
head(wordCounts)

wordcloud(names(wordCounts), wordCounts)
cloudFrame <- data.frame(word=names(wordCounts), freq=wordCounts)

wordcloud(names(wordCounts), wordCounts, min.freq = 2, max.words = 10)

findAssocs(wordCounts, "tdm", 0.6)

cloudFrame

#Sentiment Analysis
#Load Positive and Negative word lists
#Count positive words and negative words
#Compute the ratio


pos <- "positive-word.txt"
neg <- "negative-word.txt"

#Read the Files
p <- scan(pos, character(0), sep= "\n")
n <- scan(neg, character(0), sep= "\n")

#Remove the first 34 lines
p <- p[-1:-34]
n <- n[-1:-34]
head(p,10)
head(n,10)

totalWords <- sum(wordCounts)
words <- names(wordCounts)
matched <- match(word,p, nomatch = 0)

mCounts <- wordCounts[which(matched !=0)]
length(mCounts)
mwords <- names(mCounts)
nPos <- sum(mCounts)

#Calculate the ratio of positive to negative keywords
npos/nneg


##Synchronous Work





