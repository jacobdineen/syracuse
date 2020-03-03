Jake Dineen 9.2

import nltk
from pymongo import MongoClient


client = MongoClient('localhost', 27017)  #Set up client
client.list
db = client.twitter_storage
db.list_collection_names()
coll = db.tweets
docs = coll.find()
doclist = list(docs)
msglist = [doc['text'] for doc in doclist if 'text' in doc.keys()]
len(msglist)
all_tokens = [tok.lower() for msg in msglist for tok in nltk.word_tokenize(msg)]
nltk_stopwords = nltk.corpus.stopwords.words('english')

import re
def alpha_filter(w): 
    pattern = re.compile('^[^a-z]+$') 
    if (pattern.match(w)): 
        return True 
    else:  return False

token_list = [tok.lower() for tok in all_tokens if not alpha_filter(tok)]
token_list = [tok for tok in token_list if tok not in nltk_stopwords]
msgFD = nltk.FreqDist(token_list)
msgFD.most_common(30)

[('trump', 4512),
 ('rt', 4304),
 ('donald', 3779),
 ('john', 1190),
 ('mccain', 1190),
 ('https', 1137),
 ("'s", 689),
 ('president', 678),
 ('white', 619),
 ('american', 479),
 ('statement', 422),
 ('friendly', 404),
 ('palmerreport', 365),
 ('national', 361),
 ('anthem', 361),
 ('patriot', 350),
 ('house', 347),
 ('true', 330),
 ('one', 312),
 ('death', 309),
 ('speak', 304),
 ('robreiner', 296),
 ('rejecting', 296),
 ('mourning', 296),
 ('loss', 296),
 ('cont…', 296),
 ('obama', 290),
 ('j', 287),
 ('get', 285),
 ('yes', 279)]