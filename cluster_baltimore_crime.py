#Returns GeoJSON object of crime locations with cluster labels using HDBSCAN
#Cluster labels are integers ranging from 0 - n where n is the number of clusters + 1
#Outliers are represented by the value -1
#usage: crime_cluster(from_date,to_date,crime)
#from_date and to_date must be in the following format: 'yyyy/MM/dd HH:mm:ss+SS'
#e.g. '2014/01/01 00:00:00+00'
#Valid years include 2014-present
#Valid crimes include the following:
    #"ROBBERY - STREET","COMMON ASSAULT","AGG. ASSAULT","AUTO THEFT","SHOOTING",
    #"HOMICIDE","LARCENY","LARCENY FROM AUTO", "BURGLARY","ROBBERY - COMMERCIAL",
    #"ROBBERY - RESIDENCE","ROBBERY - CARJACKING","RAPE","ARSON"
#Requires: pandas, geopandas, numpy, hdbscan

import pandas as pd
import geopandas as gpd
import numpy as np
import hdbscan

#Function for clustering Baltimore crime data based on a date range and crime type
def crime_cluster(from_date,to_date,crime):
    data = pd.read_csv('https://opendata.arcgis.com/datasets/3eeb0a2cbae94b3e8549a8193717a9e1_0.csv?outSR=%7B%22latestWkid%22%3A2248%2C%22wkid%22%3A102685%7D', sep = ',' , header = 'infer')
    data['CrimeDateTime'] = pd.to_datetime(data['CrimeDateTime'])
    data = data[(data['CrimeDateTime'] > from_date)&(data['CrimeDateTime'] < to_date)]
    data = data[data['Latitude']>0]
    data = data[data['Description']==crime]
    coords = np.array(data[['Longitude','Latitude']])
    model = hdbscan.HDBSCAN(min_cluster_size=4, min_samples = 5, cluster_selection_epsilon = 0.001)
    fit = model.fit(coords)
    labels = fit.labels_.reshape(fit.labels_.shape[0],-1)
    arr = np.concatenate((coords,labels),axis=1)
    df = pd.DataFrame(arr, columns = ['Latitude','Longitude','Cluster'])
    df.Cluster.astype(int)
    gdf = gpd.GeoDataFrame(df, geometry = gpd.points_from_xy(df.Longitude,df.Latitude))
    clus_geojson = gdf.to_json()
    return clus_geojson

#Run clustering function with parameters
from_date = pd.to_datetime('2014/01/01 00:00:00+00') 
to_date = pd.to_datetime('2014/12/31 00:00:00+00')
crime = "HOMICIDE"
clus_geojson = crime_cluster(from_date,to_date,crime)
    