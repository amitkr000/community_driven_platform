
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from django.conf import settings

def fetch_books_from_google(query, startIndex, max_results=10):
    url = f'https://www.googleapis.com/books/v1/volumes?q={query}&maxResults={max_results}&startIndex={startIndex}&key={settings.GOOGLE_BOOKS_API_KEY}'
    print(url)
    session = requests.Session()
    retries = Retry(total=3, backoff_factor=1, status_forcelist=[500, 502, 503, 504])
    session.mount('https://', HTTPAdapter(max_retries=retries))
    
    try:
        # Set a timeout of 5 seconds
        response = session.get(url, timeout=5) 
        
        # Raises HTTPError for bad responses (4xx and 5xx)
        response.raise_for_status()  
        data = response.json()
        return data
    except requests.exceptions.Timeout:
        print("The request timed out.")
        return None
    except requests.exceptions.ConnectionError:
        print("A connection error occurred.")
        return None
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None


def process_book_data(raw_data):
    books = []
    if 'items' not in raw_data:
        print("Invalid response: 'items' field is missing.")
        return books

    for item in raw_data['items']:
        volume_info = item.get('volumeInfo', {})
        
        if not volume_info:
            print("Invalid response: 'volumeInfo' field is missing.")
            continue

        book = {
            'title': volume_info.get('title', 'No Title'),
            'authors': volume_info.get('authors', ['Unknown Author']),
            'description': volume_info.get('description', 'No Description'),
            'cover_image': volume_info.get('imageLinks', {}).get('thumbnail', ''),
            'categories' : volume_info.get('categories', ['Unknown categories']),
            'rating': volume_info.get('averageRating', 'No Rating'),
            'publisher': volume_info.get('publisher', 'Unknown'),
            'published_date': volume_info.get('publishedDate', 'No Date')
            
        }
        books.append(book)
    return books
