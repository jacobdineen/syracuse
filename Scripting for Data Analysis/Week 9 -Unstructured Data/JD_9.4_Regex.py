#Jake Dineen
# 9.4
import re

#Finding all websites
text = '''Celebrate #NationalPetDay with our puppy playlist: https://t.co/eBHHFPW0z7 https://t.co/uix5AY2FFQ<a href="http://msande.stanford.edu"> Management Science and Engineering </a><p

      Address: Terman 311, Stanford CA 94305<br>

      Email: ashishg@cs.stanford.edu<br>

      Phone: (650)814-9999 [Cell], Fax: (650)723-9999<br>

      Admin asst: Roz Morf, Terman 405, 650-723-9999, rozm@stanford.edu</p>

The U.S.A. olympic teams have east-west training centers with up-to-date equipment.

'''

urls = re.findall('https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+', text)
urls

#Output
#['https://t.co', 'https://t.co', 'http://msande.stanford.edu']

#finding phone numbers
reg = re.compile(".*?(\(?\d{3}\D{0,3}\d{3}\D{0,3}\d{4}).*?")
reg.findall(text)
#Output
#['(650)814-9999', '(650)723-9999', '650-723-9999']

#Finding Emails
reg = re.findall('\S+@\S+', text)   
reg

#Output
['ashishg@cs.stanford.edu<br>', 'rozm@stanford.edu</p>']

#Find all hyphenated words
re.findall(r'\w+(?:-\w+)+',text)

#Output
#['814-9999', '723-9999', '650-723-9999', 'east-west', 'up-to-date']

#Find acronyms?
pattern = r'(?:[A-Z]\.)+'
re.findall(pattern, text)

#Output
#

1. Match the URLs (there should be three results).

POSSIBLE SOLUTION: '(http:\/\/|https:\/\/)[a-z0-9]+([\.]{1}[a-z0-9]+)*\.[a-z]+(\/.*)?'

2. Match the phone numbers (three results).

POSSIBLE SOLUTION: '\(?\d{3}[\)-]?\d{3}-\d{4}'

3. Match the e-mail addresses (two results).

POSSIBLE SOLUTION: '([A-Z|a-z]+@([A-Z|a-z]+[\.])?[A-Z|a-z]+[\.][EDU,edu]+)'

4. Match the (all) words with one or more internal hyphens (choice is either to have two results or to have many results for all the words, but including the two with internal hyphens).

POSSIBLE SOLUTION: ‘([a-z]+-[a-z]+-?[a-z]+)’

5. Match acronyms (there should be two results, with or without dots: CA and U.S.A.).

POSSIBLE SOLUTION: ‘([A-Z]+\.?[A-Z]\.?[A-Z]?\.?\s)’


