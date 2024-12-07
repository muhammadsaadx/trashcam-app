from geopy.geocoders import Nominatim

def reverse_geocode_geopy(lat, lon):
    geolocator = Nominatim(user_agent="myGeocoder")  # User-Agent is required to use Nominatim
    location = geolocator.reverse((lat, lon), language='en', exactly_one=True)
    
    if location:        
        full_address = location.raw.get('display_name', 'Address not found')

        return full_address
    else:
        return "Address not found"

