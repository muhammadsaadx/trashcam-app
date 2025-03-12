import requests
from geopy.geocoders import Nominatim

class Helpers:
    @staticmethod
    def reverse_geocode_geopy(lat, lon):
        geolocator = Nominatim(user_agent="myGeocoder", timeout=10)  
        location = geolocator.reverse((lat, lon), language='en', exactly_one=True)
        
        if location:        
            full_address = location.raw.get('display_name', 'Address not found')
            return full_address
        else:
            return "Address not found"

    def get_city_sectors(city_name):
        geolocator = Nominatim(user_agent="myGeocoder", timeout=10)
        location = geolocator.geocode(city_name, exactly_one=True)

        if location:
            lat, lon = location.latitude, location.longitude
            
            # Query Overpass API to get neighborhoods
            overpass_url = "http://overpass-api.de/api/interpreter"
            query = f"""
            [out:json];
            area[name="{city_name}"]->.searchArea;
            (
              node["place"="neighbourhood"](area.searchArea);
              way["place"="neighbourhood"](area.searchArea);
              relation["place"="neighbourhood"](area.searchArea);
            );
            out center;
            """
            response = requests.get(overpass_url, params={'data': query})
            data = response.json()

            if "elements" in data:
                return [element["tags"]["name"] for element in data["elements"] if "tags" in element and "name" in element["tags"]]
        
        return ["No sectors found"]