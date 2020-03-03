
# coding: utf-8

# # Problem 1
# 
# What will the following Python program print out?
# 
# def fred():
#     print "Zap"
# 
# def jane():
#     print "ABC"
#     
# jane()
# 
# fred()
# 
# jane()
# 
# 
# ### ANSWER BOLDED
# 
# a) Zap ABC jane fred jane
# 
# b) Zap ABC Zap
# 
# c) ABC Zap jane
# 
# #### d) ABC Zap ABC
# 
# e) Zap Zap Zap
# 

# In[3]:


#Test Run

def fred():
    print ("Zap")

def jane():
    print ("ABC")
    
jane()
fred()
jane()


# # Problem 2
# 
# Rewrite your pay computation with time-and-a-half for overtime and create a function called computepay that takes two parameters (hours and rate).
# 
# 
# Enter Hours: 45
# 
# Enter Rate: 10
# 
# Pay: 475.0

# In[3]:


Hours = float(input('Enter Hours:'))
Rate = float(input('Enter Rate:'))

def computepay(Hours, Rate):
    if Hours > 40:
        Pay = ((Hours - 40)* (Rate*1.5) + (40* Rate))
        print('Pay: ${}'.format(Pay))
    else:
        Pay = Hours * Rate
        print('Pay: ${}'.format(Pay))
        
computepay(Hours = Hours, Rate= Rate)

