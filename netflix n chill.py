# -*- coding: utf-8 -*-
"""
Created on Fri Oct 16 23:55:28 2020

@author: ellix
"""

import numpy as np
import pandas as pd
from firebase import Firebase
import firebase_admin
from firebase_admin import credentials, firestore



class Profile: 
    def setMatch(self, m, s):
        self.match.append[m]
        self.score.append[s]
        
        
    def toDf(self, array):
        df = pd.DataFrame(array, columns = ['movies', 'time'])
        df["time"] = pd.to_numeric(df["time"], downcast="float")
        
        df = df.sort_values(['time'], ascending=[False])
        df.reset_index(drop=True, inplace=True)
        return (df)
        
    def __init__(self, name, data):
        self.movies = self.toDf(data)
        self.name = name
        self.match = []
        self.score = []


def main(profiles):
    
    #1 is a full score match 
    #1 - difference btw time of person a - person b 
    #this makes sure both parties watches the movie about the same amount 
    #if doesn't watch the same movie, +0 
    #match with the highest score is the most ideal 
    
    
    for person in profiles: 
        for other in profiles:
            match = 0
            if other is not person and person not in other.match: 
                print ('here')
                for row in range (0, len(other.movies.index)): 
                    movie = other.movies.iloc[row]['movies']
                    indices = person.movies.movies[person.movies.movies == movie].index.values.astype(int)
                    for i in indices:
                        score = float(person.movies.iloc[i]['time'])
                        #print (person.movies.iloc[i]['movies'], ' ', i)
                        #print (person.movies)
                        otherscore = float(other.movies.iloc[row]['time'])
                        match += 1 - abs(score - otherscore)
                        print (other.name, ' ', person.name, ' ', movie,' ', ' ', otherscore, '-',score , '=' , match)
                other.match.append(person)
                other.score.append(match)
            #print (other.name)
            #print (other.movies.movies[other.movies.movies == movie].index.tolist())
            # if other.index.get_loc(movie) != -1: 
              #  print (person, ' ', other)
    
    print ()
    for p in profiles[0].match:
        print (p.name)
    print(profiles[0].score)



    
if __name__ == "__main__" :
    config = { 
        "apiKey": "AIzaSyDBkxQwPlVqAntHabVKC6l2uAMp-E1a2Ic",
        "authDomain": "netflix-n-chi.firebaseapp.com",
        "databaseURL": "https://netflix-n-chi.firebaseio.com",
        "projectId": "netflix-n-chi",
        "storageBucket": "netflix-n-chi.appspot.com",
        "messagingSenderId": "225472206934",
        "appId": "1:225472206934:web:2100d217a60b2d85d243f7", 
        "measurementId": "G-1GXMK6BW2N"
        }
    firebase = Firebase(config)
    open("C:/Users/ellix/Desktop/things/eng projects/txt.txt")

    cred = credentials.Certificate(r"C:/Users/ellix/Desktop/things/eng projects/serviceAccountKey.JSON")
    firebase_admin.initialize_app(cred)

    db = firestore.client() 
    list = db.collections()
    
    profiles = []

    for doc in list: 
        title = []
        time = []
        doc_ref = db.collection(doc.id).document(u'movies')
        
        if doc_ref.id == u'movies': 
            info = str (doc_ref.get().to_dict())
        
        if info != 'None': 
            name = (doc.id)
            counter = 0; 
            
            index = -1
            string = info.split("'")
            for tok in string: 
                
                counter +=1; 
                
                if ((counter-4)%6 == 0): 
                    if tok not in title: 
                        title.append (tok)
                    else: 
                        index = title.index(tok)
                elif ((counter-6)%6 == 0): 
                    if index == -1: 
                        time.append (tok)
                    else: 
                        time[index] = (tok)
                        index = -1
        
            for t in range (0, len(time)): 
                before = 0 
                after = 0
                ti = time[t].split('of')
                a = ti[0].split(':')
                if len(a) == 3: 
                    before += int(a[0].strip())*60 + int(a[1].strip())
                elif len(a) == 2: 
                    before += int(a[0].strip())
                
                a = ti[1].split(':')
                if len(a) == 3: 
                    after +=  int(a[0].strip())*60 + int(a[1].strip())
                elif len(a) == 2: 
                    after += int(a[0].strip())
                
                if (after == 0):
                    time[t] = 0
                else: 
                    time[t] = before/after
            
            data = [title, time]
            data = np.transpose(data)
            
            p = Profile (name, data)
            profiles.append(p)
    
    main(profiles) 