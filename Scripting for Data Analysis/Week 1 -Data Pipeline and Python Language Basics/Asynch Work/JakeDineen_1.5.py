
# coding: utf-8

# In[28]:


#Activity 1
samples = ['a', 'b', 'c', 'apple', 'banana', 'at', 'car', 'do', 'am', 'bike']
for i,j in enumerate(samples):
    print(i+1,j)
    
[(i+1,j) for i,j in enumerate(samples)]


# In[30]:


samples = ['list', 'string', 'a', 'b', 'c', 'apple', 'banana', 'at', 'car', 'do']
for i in samples:
    if len(i) < 5:
        print(i)

