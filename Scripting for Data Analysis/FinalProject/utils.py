import urllib
from bs4 import BeautifulSoup
def get_csv_links(url, base_url_csv):
    print('Scraping Webpage:', url)
    link_storage = []
    html = urllib.request.urlopen(url)
    html = html.read()
    soup = BeautifulSoup(html, "lxml")
    links = soup.find_all('a') #Find all href
    #Introduce logic to parse links containing .csv
    try:
        for tag in links:
            link = tag.get('href',None)
            if link is not None:
                if '.csv' in link: 
                    link_storage.append(link)
        clean_urls = [] #instantiate
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