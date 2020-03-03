
# coding: utf-8

# In[9]:



from wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt
stopwords = set(STOPWORDS)

def show_wordcloud(data, title = None):
    wordcloud = WordCloud(
        background_color='white',
        stopwords=stopwords,
        max_words=200,
        max_font_size=40, 
        scale=3,
        random_state=1 # chosen at random by flipping a coin; it was heads
    ).generate(str(data))

    fig = plt.figure(1, figsize=(12, 12))
    plt.axis('off')
    if title: 
        fig.suptitle(title, fontsize=20)
        fig.subplots_adjust(top=2.3)

    plt.imshow(wordcloud)
    plt.show()
    
wc = 'female, silver hair, light skin, wearing glasses, average height, average weight,friendly, practical, logical, analytical, independent, observant,I am south Asian, I wear black and thin rimmed glasses, and I have black hair,Married, Pittsburgh, software developer, loves movies,methodical, hard-working, reliable, confident, punctual, motivated,pensive, deliberative, curious, intelligent, gray eyes, nose ring,Short Brown Hair, Stocky, Slate Blue Eyes, Chin Strap Goatee, Bushy Eyebrows, Caucasian,small, redhead, female, blue eyed, glasses, freckled'

show_wordcloud(wc,title = 'Description WordCloud')

