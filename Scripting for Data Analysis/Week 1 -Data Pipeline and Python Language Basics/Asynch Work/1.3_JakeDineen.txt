
# coding: utf-8

# Jacob Dineen
# 
# IST 652
# 
# 

# ### Activity 1:
# 
# What will the following code print out?
# 
# x = 43
# 
# x = x + 1
# 
# print (x)
# 
# a) 43
# b) 44
# c) x + 1
# d) Error because x = x + 1 is not possible mathematically

# In[1]:


#Answer
# B. 

x = 43
x = x +1
print(x)


# ### Activity 2:
# 
# Write a sequence of statements into the Python interpreter to prompt the user for hours and rate per hour, 
# 
# printing each one, and then to compute gross pay as (hours * rate). Your output lines should look something like:
# 
# Enter Hours: 35
# 
# Enter Rate: 2.75
# 
# Pay: 96.25
# 
# Don’t worry about making sure that Pay has exactly two digits after the decimal point.
# Submit your code and the output by doing a copy/paste from the Python interpreter.

# In[22]:


#Answer for Activity 2
hours = float(input('Enter hours:' , ))
rate = float(input('Enter Rate:' ,))
print('Pay: ${}'.format(hours*rate))


# ### Activity 3:
# 
# Assume that we execute the following assignment statements:
# 
# width = 17
# 
# height = 12.0
# 
# For each of the following expressions, write the value of the expression and its type.
# 1. width / 2
# 2. width / 2.0
# 3. height / 3
# 4. 1 + 2 * 5
# 
# Use the Python interpreter to check your answers. Submit your answers.

# In[27]:


#Answer for Activity 3
width = 17
height = 12.0

width_by2 = width/2
width_by2float = width/2.0
height_by3 = height/3
arith = 1 + 2 * 5

def printanswer(i,x):
    print('Question {}: |Type {}: | Answer {}'.format(i, type(x), x))
    
printanswer(1,width_by2)
printanswer(2,width_by2float)
printanswer(3,height_by3)
printanswer(4,arith)

