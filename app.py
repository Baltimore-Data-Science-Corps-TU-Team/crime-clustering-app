from flask import Flask, request
import pandas as pd
import geopandas as gpd
import numpy as np
import hdbscan

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello Baltimore DSC!'

# Selects the page for which a function is to be defined. Right now there will only be one page in your website.
@app.route('/clusters')
#Function for clustering Baltimore crime data based on a date range and crime type
#Run clustering function with parameters
def crime_cluster():
    
    from_date = request.args.get("fromdate", default=None)
    to_date = request.args.get("todate", default=None)
    crime = request.args.get("crime", default=None)

    from_date = from_date.replace('-','/')
    to_date = to_date.replace('-','/')
    
    from_date = pd.to_datetime(from_date).to_pydatetime()
    to_date = pd.to_datetime(to_date).to_pydatetime()

    data = pd.read_csv('crime.csv', sep = ',' , header = 'infer')
    data['CrimeDateTime'] = pd.to_datetime(data['CrimeDateTime']).dt.tz_localize(None)
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

# The above function returns the HTML code to be displayed on the page
if __name__ == '__main__':

   app.run()