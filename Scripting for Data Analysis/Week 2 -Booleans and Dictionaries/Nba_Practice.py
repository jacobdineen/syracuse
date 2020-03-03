#Jake Dineen
#Nba_Practice.py
#Reading txt files
nba = open('nba-attendance-1989.txt', 'r')
count = 0

nba_list = []

for i in nba:
    count += 1
    textline = i.strip()
    items = textline.split()
    nba_list.append(items)
    
print('Number of teams: ', count)

for i in nba_list:
    print ('Line: ', i)
	
	
Output:	

(tensorflowlatest) C:\Users\jdine\Desktop\SYracuse\Term 7\Scripting for Data Analysis\Week 2 -Booleans and Dictionaries>Nba_Practice.py
Number of teams:  27
Line:  ['Atlanta', '13993', '20.06']
Line:  ['Boston', '14916', '22.54']
Line:  ['Charlotte', '23901', '17']
Line:  ['Chicago', '18404', '21.98']
Line:  ['Cleveland', '16969', '19.63']
Line:  ['Dallas', '16868', '17.05']
Line:  ['Denver', '12668', '17.4']
Line:  ['Detroit', '21454', '24.42']
Line:  ['Golden_State', '15025', '17.04']
Line:  ['Houston', '15846', '17.56']
Line:  ['Indiana', '12885', '13.77']
Line:  ['LA_Clippers', '11869', '21.95']
Line:  ['LA_Lakers', '17378', '29.18']
Line:  ['Miami', '15008', '17.6']
Line:  ['Milwaukee', '16088', '14.08']
Line:  ['Minnesota', '26160', '10.92']
Line:  ['New_Jersey', '12160', '13.31']
Line:  ['New_York', '17815', '22.7']
Line:  ['Orlando', '15606', '20.47']
Line:  ['Philadelphia', '14017', '19.04']
Line:  ['Phoenix', '14114', '16.59']
Line:  ['Portland', '12884', '22.19']
Line:  ['Sacramento', '17014', '16.96']
Line:  ['San_Antonio', '14722', '16.79']
Line:  ['Seattle', '12244', '18.11']
Line:  ['Utah', '12616', '18.41']
Line:  ['Washington', '11565', '14.55']