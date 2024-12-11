import boto3
import os
from dotenv import load_dotenv

load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')

s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

def get_idcard(bucket_name, s3_folder, search_filename):
    response = s3.list_objects_v2(Bucket=bucket_name, Prefix=s3_folder)
    if 'Contents' in response:
        for obj in response['Contents']:
            if obj['Key'].endswith(search_filename):
                file_key = obj['Key']
                # Fetch the image data
                image_obj = s3.get_object(Bucket=bucket_name, Key=file_key)
                image_data = image_obj['Body'].read()  # Read binary data from the response
                return image_data  # Return the binary data
    return None
