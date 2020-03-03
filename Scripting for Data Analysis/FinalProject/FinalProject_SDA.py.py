
# coding: utf-8

# ### Jake Dineen and Mason David
# ### Scripting For Data Analysis
# ### Final Project
# 
# #### Preface
# This project will center around collections of baseball data ranging from 1871 - 2014, essentially encompassing all recorded statistics over the course of the history of Major League Baseball. Sean Lahman and a group of reasearchers are responsible for the collection and storage of most of the main files we will be working with, although there have been some crowdsourcing attempts at expanding the original sets to include such things as college statistics.
# 
# #### Data
# All data is available to us via a github repository. To explore some of text mining/web scraping tactics, and to exemplify some additional learned skills, we will aggregate the CSV links in using urllib and Beautfiul Soup. This will be an exercise of munging semi-structured HTML while the rest of our task involves structured, tabular data. As seen below, there are 27 different data sets available to us, but not all of them will be relevant for our project's goals.
# 
# #### Our Goal(s)
# We have a number of goals associated with the project:
# - Read in data directly from the web - Parse CSV links from HTML and automate a process for storing data.
# - Work to map datasets together based on certain metadata. The CSV files work similar to a sql db, so we'll need to merge on keys/indices.
# - Summarize descriptive statistics in a variety of ways:
#     - Print out single season record holders for major statistics, along with the corresponding metrics
#     - Print out All Time record holders for major statistics, along with the corresponding metrics
#     - Visualize and decribe through tables/charts the way statistics and salries have changed over time
#     * This work will likely focus on the use of pandas and numpy 
#     - Potentially roll this up into a mini chatbot that requests a user input and outputs a result.
# - Create a heirarchical binary classification problem centered on hall of fame candidacy:
#     - Data munging for cleanup, as well as feature distributions.
#     - Statistical Measures (Chi Square/Correlation/Multicollinearity) for dimensionality reduction
#     - Function Approximation via Gradient Boosted Trees/Logit/Random Forests
#         - Utilize a sigmoid or softmax activation function to output probability distribtuion for class mapping.
#         - Using an interpretable model to understand feature importance/ranking/information gain. 
#         - Display what drives hall of fame potential with a meaningful metric associated with it.
#     - Potentially roll this up into a mini chatbot that requests a user input (statistics) and outputs the probability that they will make it to the Hall of Fame.
#         
#         
# 
# 

# #### Store data sources in Variables

# In[6]:


#link to gdoc: https://docs.google.com/document/d/1PJ1KdNt6EOcvMgaZidQbFdKrhnalx2JvQxEWfTbs434/edit
#https://stackoverflow.com/questions/15517483/how-to-extract-urls-from-an-html-page-in-python
url = 'https://github.com/chadwickbureau/baseballdatabank/tree/master/core'
base_url_csv = 'https://raw.githubusercontent.com/chadwickbureau/baseballdatabank/master/core/'


# #### Extract information from HTML page
# - The goal here is to pull out all of the CSVs that we'll eventually read into a structured format. It could have been done manually, but shows an understanding of webcrawling and HTML scraping.
# The final variable has a list of stored links containing all of the data in csv format.

# In[7]:


#from utils import get_csv_links
import urllib
from bs4 import BeautifulSoup
from IPython.core.display import display
import warnings
warnings.filterwarnings("ignore")

#from utils import get_csv_links. Stored in current working dir
# ^^ Wrap this up in a separate .py file and import it. Helper functions/Wrappers to be stored and imported


def get_csv_links(url, base_url_csv):
    print('Scraping Webpage:', url)
    link_storage = []
    html = urllib.request.urlopen(url)
    html = html.read()
    soup = BeautifulSoup(html, "lxml")
    links = soup.find_all('a')  #Find all href
    #Introduce logic to parse links containing .csv
    try:
        for tag in links:
            link = tag.get('href', None)
            if link is not None:
                if '.csv' in link:
                    link_storage.append(link)
        clean_urls = []  #instantiate
        #Looping through and adding the root URL
        clean_links = []
        #Need to extract after the last backslash
        for i in link_storage:
            clean_links.append(i.rsplit('/', 1)[-1])
        #Piecing URL strings together
        for i in clean_links:
            clean_urls.append(base_url_csv + i)
        print('Number of datasets: {}'.format(len(clean_urls)))
        return clean_urls
    except:
        print('Something went wrong')


#URL is the page that we're scraping. Base URL is the root of the final URL
data_links = get_csv_links(url, base_url_csv)
data_links


# In[83]:


#Need positions to act as a heirarchical filter
import pandas as pd
position = pd.read_csv('https://raw.githubusercontent.com/chadwickbureau/baseballdatabank/master/core/Fielding.csv')
position.columns
positions= position[['playerID', 'POS']]
positions.drop_duplicates(subset = 'playerID', inplace= True)


# #### Reading in all necessary data & Munging

# In[84]:


#Reading in batting csv
import pandas as pd
batting = pd.read_csv(data_links[6]) #index 6
batting.drop_duplicates(inplace = True) #No duplicate playerIDs
print('Batting dataset is {} rows by {} columns'.format(
    batting.shape[0], batting.shape[1]))
batting.head(5)


# In[10]:


#Reading in pitching csv
pitching = pd.read_csv(data_links[-8]) #index 8
pitching.drop_duplicates(inplace = True) #no dupes
print('Pitching dataset is {} rows by {} columns'.format(
    pitching.shape[0], pitching.shape[1]))
pitching.head(5)


# In[11]:


#Need people csv for mapping to player names
people = pd.read_csv(data_links[-9])
print('People dataset is {} rows by {} columns'.format(people.shape[0],
                                                       people.shape[1]))
people.head(5)

#This is where we pull in/map player names form.


# In[85]:


#Merging batting and peiple on playerID. This gives player metadata
import os
import sys
current_working_dir = os.getcwd()  #Get working dir
batting_merged = pd.merge(
    batting, people, how='left', on='playerID')  #pandas merge

batting_merged = pd.merge(batting_merged, positions, on = 'playerID')

batting_cols = batting_merged.columns  #store var for column names. Will need for dim. reduction

#Save csv in working dir
batting_merged_filename = 'batting_merged.csv'
batting_merged.to_csv(batting_merged_filename)
#Print Logs
print('File saved to {}:'.format(current_working_dir))
print('File name: {}'.format(batting_merged_filename))
print('{} has {} rows and {} columns'.format(
    batting_merged_filename, batting_merged.shape[0], batting_merged.shape[1]))
print('-----------------------------------')
print('\033[1m' + 'NA Count Distribution by Column' +
      '\033[0m')  #Display text output
print(batting_merged.isna().sum(axis=0))

#We want to get rid of all of the observations where a given name is not present.
print('-----------------------------------')
print(
    ' \033[1m Dropped {} observations where nameGiven was not registered \033[1m'.
    format(batting_merged['nameGiven'].isna().sum(axis=0)))

#Create a column that merges nameFirst and nameLast
batting_merged[
    'FullName'] = batting_merged['nameFirst'] + ' ' + batting_merged['nameLast']

#Want to drop some unnecessary columns
cols_to_drop = [
    'birthMonth', 'birthDay', 'birthState', 'birthCity', 'deathYear',
    'deathMonth', 'deathDay', 'deathState', 'deathCountry', 'deathCity',
    'finalGame', 'retroID', 'bbrefID'
]
print('-----------------------------------')
print('Dropping Unnecessary Columns')
batting_merged.drop(columns=cols_to_drop, inplace=True)
print('-----------------------------------')
#print('Filtering on Position Players Only')
#batting_merged = batting_merged[batting_merged['POS'] != 'P']
print('-----------------------------------')
print('Displaying Cleaned Batting Data')
display(batting_merged.head(5))  #Display tail of df



# In[90]:


#Merging batting and peiple on playerID. This gives player metadata
pitching_merged = pd.merge(pitching, people, how='left', on='playerID')
pitching_merged = pd.merge(pitching_merged, positions, on = 'playerID')
pitching_merged = pitching_merged[pitching_merged['POS'] == 'P']

pitching_cols = pitching_merged.columns

#Save csv in working dir
pitching_merged_filename = 'pitching_merged.csv'
pitching_merged.to_csv(pitching_merged_filename)
#Print Logs
print('File saved to {}:'.format(current_working_dir))
print('File name: {}'.format(pitching_merged_filename))
print('{} has {} rows and {} columns'.format(pitching_merged_filename,
                                             pitching_merged.shape[0],
                                             pitching_merged.shape[1]))
print('-----------------------------------')
print('\033[1m' + 'NA Count Distribution by Column' +
      '\033[0m')  #Display text output
print(pitching_merged.isna().sum(axis=0))

#We want to get rid of all of the observations where a given name is not present.
print('-----------------------------------')
print(
    ' \033[1m Dropped {} observations where nameGiven was not registered \033[1m'.
    format(pitching_merged['nameGiven'].isna().sum(axis=0)))
pitching_merged.dropna(subset=['nameGiven'], inplace=True)

#Create a column that merges nameFirst and nameLast
pitching_merged[
    'FullName'] = pitching_merged['nameFirst'] + ' ' + pitching_merged['nameLast']

#Want to drop some unnecessary columns
cols_to_drop = [
    'IBB', 'SH', 'SF', 'GIDP', 'birthMonth', 'birthDay', 'birthState',
    'birthCity', 'deathYear', 'deathMonth', 'deathDay', 'deathCountry',
    'deathCity', 'finalGame', 'retroID', 'bbrefID', 'deathState'
]
print('-----------------------------------')
print('Dropping Unnecessary Columns')
pitching_merged.drop(columns=cols_to_drop, inplace=True)
print('-----------------------------------')
print('Displaying Cleaned Pitching Data')
display(pitching_merged.tail(5))  #Display tail of df


# #### Writing a program that outputs record holders for desired statistics
# - Singe function for batters and pitchers
# - Added support for timeslices - Done
# - Basic error handling - Done
# - Moved column slice out of params/arg
# - Maybe add support for by player
# 

# In[91]:


# Want a program that outputs all time records
import numpy as np


def fetch_records(category, keystatistic, n=5, year=None):
    '''
    category == 'pitching' or 'hitting' str
    key statistic= Filterable stats. Ultimately ranked on this column. str dtype required
    n = Number of samples to display. Numeric value passed through.
    year = Defaults to none, meaning records are all time. Can set a numeric range between 1871-2013
    '''
    try:
        if 'batting' in category:
            #columns = The columns that run through this program. Defaults to a fixed subset. list like object passed in.
            columns = [
                'playerID', 'FullName', 'yearID', 'G', 'AB', 'R', 'H', '2B',
                '3B', 'HR', 'RBI', 'SB', 'CS', 'BB', 'SO'
            ]
            batting_copy = batting_merged.copy()  #Create copy of df
            sliced = pd.DataFrame(
                batting_copy[columns])  #Slice df on default cols
            #Introduce Error Handling
            try:
                if year is not None:
                    sliced = sliced[sliced['yearID'] == year]
            except:
                if type(year) != int:
                    return (
                        'TypeError: Please Enter a Numeric value for the year argument'
                    )
                if year > 2017 or year < 1871:
                    return (
                        'Please enter a valid year between 1871 & 2017, inclusive'
                    )

            group = sliced.groupby(['playerID', 'FullName']).sum()
            #Have to manually create a BA column
            group['BattingAverage'] = np.round(group['H'] / group['AB'], 3)
            sort = group.sort_values(by=keystatistic, ascending=False)

            if keystatistic == 'BattingAverage':
                print('Need to reconcile this with an atbat threshold')
            sort.drop(columns=['yearID'], inplace=True)
            sort_indexed = sort[:n]
            #Deoending on parameter entry - These are print logs
            if year is None:
                timeslice = 'Alltime'
            else:
                timeslice = int(year)
            print(
                '\033[1m Displaying top 5 players sorted by {}, Timeslice = {}  \033[1m'.
                format(i, timeslice))
            print(
                '-----------------------------------------------------------------'
            )
            return sort_indexed
        elif 'pitching' in category:
            #columns = The columns that run through this program. Defaults to a fixed subset. list like object passed in.
            columns = [
                'playerID', 'yearID', 'W', 'L', 'G', 'GS', 'CG', 'SHO', 'SV',
                 'BAOpp', 'ERA', 'FullName'
            ]
            pitching_copy = pitching_merged.copy()  #Create copy of df
            pitching_copy.drop_duplicates(inplace=True)  #Remove duplicates
            sliced = pd.DataFrame(
                pitching_copy[columns])  #Slice df on default cols
            try:
                if year is not None:
                    sliced = sliced[sliced['yearID'] == year]
            except:
                if type(year) != int:
                    return (
                        'TypeError: Please Enter a Numeric value for the year argument'
                    )
                if year > 2017 or year < 1871:
                    return (
                        'Please enter a valid year between 1871 & 2017, inclusive'
                    )
                #Agg lets us take different measures against different vars in a group by
            group = sliced.groupby(['playerID', 'FullName']).agg({
                'W': 'sum',
                'L': 'sum',
                'G': 'sum',
                'GS': 'sum',
                'CG': 'sum',
                'SHO': 'sum',
                'SV': 'sum',
                'BAOpp': 'mean',
                'ERA': 'mean',
            })
            sort = group.sort_values(by=keystatistic, ascending=False)
            sort_indexed = sort[:n]
            if year is None:
                timeslice = 'Alltime'
            else:
                timeslice = int(year)
            print(
                '\033[1m Displaying top 5 players sorted by {}, Timeslice = {}  \033[1m'.
                format(i, timeslice))
            print(
                '-----------------------------------------------------------------'
            )
            return sort_indexed

    except:
        if KeyError:
            print('Please Check Arguments')


# ### Testing our Batting Program

# In[148]:


#test output
keystats = ['H', 'HR', 'RBI']
#iterate through list of keystats
for i in keystats:
    display(fetch_records(category='batting',keystatistic=i, n=5, year = 2017))


# ### Testing our Pitching Program

# In[95]:


keystats = ['W', 'L']
#iterate through list of keystats
for i in keystats:
    display(fetch_records(category='pitching',keystatistic=i, n=5, year=None))


# ### On to Modeling
# - Here we want to merge the hall of fame data with the batting data.
# - - Typically train test split. Analyze model/model results
# 
# 
# - Show which features are driving hall of fame propensity.
# 
# - Build a lightweight function w/ fuzzy matching on user input. User will enter a player name, and the we'll test that player's data using our trained model. Output will be probability dist.

# ##### Upsampling minority Class

# In[165]:


import sklearn

#This step joins the hall of fame data with the batting data from above. We only need the 'inducted' var as our target.

hof = pd.read_csv(data_links[13]) #read in HOG
hof.head(5)
np.shape(hof)

columns = ['playerID', '2B', '3B', 'AB', 'BAOpp', 'BB',  'CG', 'ERA',       'FullName', 'G', 'GS', 'H',  'HR',  'R', 'RBI', 'SB',  'SHO', 'SO', 'SV', 'W', 'L'
           ]

merged = pd.concat(
    [batting_merged, pitching_merged], axis=0, ignore_index=True)
merged.drop_duplicates(inplace=True)

merged = pd.DataFrame(merged[columns]) #Only take relevant columns
#Group by for data aggregation
merged = merged.groupby(['playerID', 'FullName']).agg({
    '2B': 'sum',
    '3B': 'sum',
    'AB': 'sum',
    'BAOpp': 'mean',
    'BB': 'sum',
    'CG': 'sum',
    'ERA': 'mean',
    'G': 'sum',
    'GS': 'sum',
    'H': 'sum',
    'HR': 'sum',
    'R': 'sum',
    'RBI': 'sum',
    'SB': 'sum',
    'SHO': 'sum',
    'SO': 'sum',
    'SV': 'sum',
    'W': 'sum',
    'L': 'sum',
})
merged.reset_index(inplace=True)

#Clean/Binarize/Merge HOF data with our position player data
inducted = hof[hof['inducted'] == 'Y']
players_inducted = inducted[inducted['category'] == 'Player']
players_cols = ['playerID', 'inducted']
players_inducted = players_inducted[players_cols]

hall_merged = pd.merge(merged, players_inducted, how='left', on='playerID')
hall_merged['inducted'].fillna(0, inplace=True)
hall_merged['inducted'].replace('Y', 1, inplace=True)
hall_merged.fillna(0, inplace=True)

#We notice that we have a severe class imbalance problem. Only 230 players are hall of famers. We'll likely need to do some
#stratified sampling to ensure we put an equal dist. of each class in our train test split.
#hall_merged[hall_merged['inducted'] == 1].head(5)

#We bring in upsampling techniques to create class balance. In other words, we are resampling the minority class
#or our hall of fame class, with replacement, until the number of samples in class == 1 is equal to class ==0.
#This prevents us from building a model that randomly guesses the majority class each time
#https://elitedatascience.com/imbalanced-classes

#We actually shift to downsampling the majority class so that when we predict later, we aren't simply using a model
#That's memorized the entirety of the training data.
df_majority = hall_merged[hall_merged.inducted == 0]
df_minority = hall_merged[hall_merged.inducted == 1]

from sklearn.utils import resample

df_minority_upsampled = resample(
    df_majority,
    replace=True,  # sample without replacement
    n_samples=len(df_minority),  # to match minority class
    random_state=123)  # reproducible results

df_upsampled = pd.concat([df_minority, df_minority_upsampled])

X = df_upsampled.copy()
X.drop(columns=['inducted', 'playerID', 'FullName'], inplace=True)
y = df_upsampled['inducted']


# ##### Train Test Splits + Grid Searching hyperparams.

# In[97]:


from sklearn.model_selection import train_test_split
from sklearn.grid_search import GridSearchCV
from sklearn.metrics import confusion_matrix, classification_report
import warnings

xtrain, xtest, ytrain, ytest = train_test_split(
    X, y, test_size=0.5, stratify=y)

#Item freq tells us that we are stratified. We have an equal proportion of each class in our train and test sets
from scipy.stats import itemfreq
print('Frequency in Training Set')
print('-------------------------')
print(itemfreq(ytrain))
print('Frequency in Training Set')
print('-------------------------')
print(itemfreq(ytest))

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import GradientBoostingClassifier

model = GradientBoostingClassifier()

#instantiate parm grid
ex_param_grid = {
    "loss": ['deviance', 'exponential'],
    "learning_rate": [0.001, 0.01, 0.1, 1],
    'n_estimators': [100, 200, 300],
    'max_depth': [3, 5, 7, 9]
}

#Grid Search
gsExtC = GridSearchCV(
    model,
    param_grid=ex_param_grid,
    cv=5,
    scoring="accuracy",
    n_jobs=4,
    verbose=1)

#Fit model / Print Score
gsExtC.fit(xtrain, ytrain)
ExtC_best = gsExtC.best_estimator_


# ##### Showing Our Best Model 

# In[98]:


print('----------------------------------------------')
print('Below is the grid searched best estimator:')
print('----------------------------------------------')
print(gsExtC.best_estimator_)


# In[99]:


print('-------------------------')
print('Model Score on test set:', np.round(ExtC_best.score(xtest, ytest), 4))
print('-------------------------')


# In[276]:


#Here we want to merge our feature importances and features to output feat. ranking

features = list(np.round(clf.feature_importances_, 5))
column_names = ['2B', '3B', 'AB', 'BAOpp', 'BB', 'CG', 'ERA', 'G', 'GS', 'H', 'HR', 'R',
       'RBI', 'SB', 'SHO', 'SO', 'SV', 'W', 'L']

#merge lists
dictionary = dict(zip(column_names, features))

print('\tReturning Feature Ranking')
#Sort Dictionary on values
for w in sorted(dictionary, key=dictionary.get, reverse=True):
    print (w, dictionary[w])


# In[101]:


ypred = ExtC_best.predict(xtest)

print('Classification Report')
print('-------------------------')
confusion_matrix(ytest, ypred)
print(classification_report(ytest, ypred))


# In[102]:


import itertools
import matplotlib.pyplot as plt

#Borrowed from Sklearn Docs
def plot_confusion_matrix(cm,
                          classes,
                          normalize=False,
                          title='Confusion matrix',
                          cmap=plt.cm.Blues):
    """
    This function prints and plots the confusion matrix.
    Normalization can be applied by setting `normalize=True`.
    """
    plt.imshow(cm, interpolation='nearest', cmap=cmap)
    plt.title(title)
    plt.colorbar()
    tick_marks = np.arange(len(classes))
    plt.xticks(tick_marks, classes, rotation=45)
    plt.yticks(tick_marks, classes)

    if normalize:
        cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]

    thresh = cm.max() / 2.
    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        plt.text(
            j,
            i,
            cm[i, j],
            horizontalalignment="center",
            color="white" if cm[i, j] > thresh else "black")

    plt.tight_layout()
    plt.ylabel('True label')
    plt.xlabel('Predicted label')


confusion_mtx = confusion_matrix(ytest, ypred)
# plot the confusion matrix
plot_confusion_matrix(confusion_mtx, classes=['Not Hall', 'Hall of Fame'])


# ###### Using Pickle to dump Model. This is useful so we don't have retrain our model each time we load this notebook.

# In[103]:


import pickle
# now you can save it to a file
with open('ensemble_new.pkl', 'wb') as f:
    pickle.dump(ExtC_best, f)


# In[104]:


# and later you can load it
with open('ensemble_new.pkl', 'rb') as f:
    clf = pickle.load(f) 


# #### Now we want to create a function that takes user input on a player and outputs their probability of making the hall of fame

# In[149]:


#!pip install fuzzywuzzy
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
import time


#Helper Function
def fuzzymatching_player(player):
    '''
    input:: User input Movie Title
    returns:: Closest Match to user input
    '''
    name = hall_merged['FullName']
    potential_matches = process.extractOne(player, name) #Takes the highest likelihood
    return str(potential_matches[0])


def hall_of_fame_projection(userinput=True, player_search=None):
    print(
        '----------------------------------------------------------------------------------------------------------------------------'
    )
    print(
        'This program takes a player name as an input, and outputs the players probability of being elected to the baseball hall of fame'
    )
    print(
        '----------------------------------------------------------------------------------------------------------------------------'
    )
    try:
        #User input parm
        if userinput == True:
            print('----------------------------')
            player = input('Please Enter a PlayerName:')
            print('----------------------------')
            playername_stringmatch = fuzzymatching_player(player)
            print('-----------------------')
            print('Predicting HOF propensity for {}'.format(
                playername_stringmatch))
            print('----------------------------')
            time.sleep(.1)

        else:
            #Manual parm entry in function instantiatiation
            player = player_search
            playername_stringmatch = fuzzymatching_player(player)
            print('Predicting HOF propensity for {}'.format(
                playername_stringmatch))
            time.sleep(.1)
        if playername_stringmatch is not None:
            with open('ensemble_new.pkl', 'rb') as f:
                clf = pickle.load(f)
            X = hall_merged.copy()
            X = hall_merged[hall_merged['FullName'] == playername_stringmatch]
            X.drop(columns=['inducted', 'playerID', 'FullName'], inplace=True)
            prob = clf.predict_proba(X)[0][1] * 100
            print('-----------------------------------')
            print(
                '\n {} has a {}% chance of making the Baseball Hall of Fame,based on stats through 2017'.
                format(playername_stringmatch, np.round(prob, 2)))

        print('\t Returning career Statistics through 2017')
        return display(
            hall_merged[hall_merged['FullName'] == playername_stringmatch])

    except:
        print('Something went wrong')


# #### Using our Model for Inference

# ##### Testing chatbox user input
# - This works pretty well.  Due to the downsampling of the majority class we performed above, this is a more viable representation of how good our model really is, since we aren't training it on the entire dataset.

# In[150]:


hall_of_fame_projection(userinput=True, player_search=None)


# ##### Testing iteration

# In[151]:


players = ['Barry Bonds', 'Cy Young', 'Mike Trout', 'Bryce Harper']

for i in players:
    hall_of_fame_projection(userinput=False, player_search=i)


# ### Visualizations

# In[163]:


viz = batting_merged.groupby(['yearID']).sum()
viz.reset_index(inplace=True)
viz
import matplotlib.pyplot as plt
import matplotlib
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
plt.rcParams["figure.figsize"] = (20, 15)
matplotlib.rcParams.update({'font.size': 22})
sns.set_style("darkgrid")
x = np.arange(6)

fig = plt.figure()
fig.show()
ax = fig.add_subplot(111)

ax.plot(
    viz.yearID,
    viz.H,
    c='b',
    marker="^",
    ls='--',
    label='Hits',
    fillstyle='none')
ax.plot(viz.yearID, viz.HR, c='g', marker=(8, 2, 0), ls='--', label='HomeRuns')
ax.plot(viz.yearID, viz.RBI, c='k', ls='-', label='RBI')
ax.plot(viz.yearID, viz.SB, c='r', marker="v", ls='-', label='StolenBases')
ax.plot(
    viz.yearID,
    viz.BB,
    c='m',
    marker="o",
    ls='--',
    label='BSwap',
    fillstyle='none')

plt.legend(loc=2)
plt.xlabel('Time - Year')
plt.ylabel('Count')
plt.draw()


# In[248]:


columns = [
    'playerID', 'FullName', 'yearID', 'G', 'AB', 'R', 'H', '2B', '3B', 'HR',
    'RBI', 'SB', 'CS', 'BB', 'SO'
]
test = batting_merged.groupby(['playerID', 'FullName']).sum()

test.reset_index(inplace=True)
test = test[columns]

hall_merged = pd.merge(test, players_inducted, how='left', on='playerID')
hall_merged['inducted'].fillna(0, inplace=True)
hall_merged['inducted'].replace('Y', 1, inplace=True)
hall_merged.fillna(0, inplace=True)
hall_merged = hall_merged.groupby(['inducted']).mean()
hall_merged.reset_index(inplace=True)
hall_merged.drop(columns='yearID', inplace=True)

display(hall_merged)

