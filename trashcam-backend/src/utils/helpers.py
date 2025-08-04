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
    



    
#     locations = [
#     (33.6844, 73.0479),
#     (33.6932, 73.0687),
#     (33.7044, 73.0451),
#     (33.6750, 73.0576),
#     (33.6865, 73.0584),
#     (33.6890, 73.0600),
#     (33.6881, 73.0657),
#     (33.6782, 73.0511),
#     (33.6889, 73.0634),
#     (33.6766, 73.0721),
#     (33.7010, 73.0473),
#     (33.6990, 73.0606),
#     (33.6857, 73.0582),
#     (33.6700, 73.0505),
#     (33.6812, 73.0665),
#     (33.6904, 73.0499),
#     (33.7020, 73.0547),
#     (33.6880, 73.0598),
#     (33.6694, 73.0650),
#     (33.6728, 73.0531),
#     (33.6938, 73.0651),
#     (33.6864, 73.0550),
#     (33.6792, 73.0473),
#     (33.6967, 73.0589),
#     (33.6755, 73.0615),
#     (33.6907, 73.0460)
# ]


#     # Call the helper function for each location
#     for lat, lon in locations:
#         address = Helpers.reverse_geocode_geopy(lat, lon)
#         print(address)

    

