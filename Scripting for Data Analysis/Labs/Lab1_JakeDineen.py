
# coding: utf-8

# ## Prompt
# 
# For the NBAfile.py program, for each line, create a string using string formatting that puts the team, attendance, and ticket prices into a formatted string. Each line should look something like:
# 
# 
# ‘The attendance at Atlanta was 13993 and the ticket price was $20.06’
# 
# 
# Your program should then print these strings instead of the lines. Submit your code and the output of your program.

# ### Reading in the Data

# In[21]:


#Work from asynch 2
import pandas as pd
import numpy as np
from time import sleep

nba = open('nba-attendance-1989.txt', 'r') #Read in data
count = 0 #prime counter

nba_list = []

for i in nba:
    count += 1
    textline = i.strip()
    items = textline.split()
    nba_list.append(items)
    


# ## Lab One

# In[25]:


#using regular loops
for city, attendance, price in nba_list:
    print('The attendance in {} was {} and the ticket price was ${}'.format(city, attendance, price))
    sleep(.1)

