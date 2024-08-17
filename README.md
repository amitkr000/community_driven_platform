# **Book Recommendation System**

## Overview

This project is a Django-based Book Recommendation System that integrates with the Google Books API and includes user authentication, book recommendations, and user interactions like likes and comments. This guide provides setup instructions, API endpoint details, usage examples, and information about external dependencies.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [API Endpoints](#api-endpoints)
   - [Google Books API Integration](#google-books-api-integration)
   - [Authentication API](#authentication-api)
   - [Book Recommendations API](#book-recommendations-api)
3. [Usage Examples](#usage-examples)
4. [External Dependencies](#external-dependencies)

## Setup Instructions

### Prerequisites

- Python 3.10 or higher
- Django 5.x or higher
- Django Rest Framework

### 1. Clone the Repository

```bash
git clone https://github.com/amitkr000/community_driven_platform
cd community_driven_platform
```

### 2. Create and Activate a Virtual Environment

```bash
python -m venv venv
```

**Activate on Windows**:

```bash
venv\Scripts\activate
```

**Activate on macOS/Linux**:

```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the project root with the following variables:

```env
DJANGO_SECRET_KEY=your-secret-key
GOOGLE_BOOKS_API_KEY=your-google-books-api-key
DEBUG=True
```

### 5. Apply Migrations

```bash
python manage.py migrate
```

### 6. Run the Development Server

```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000/` in your browser to access the application.

## API Endpoints

### Google Books API Integration

**Endpoint**: `GET /api/books/search/`

**Description**: Search for books from the Google Books API based on query parameters.

**Query Parameters**:

- `q` (string): Search query (e.g., "python programming").
- `i` (integer): The position in the collection at which to start. The index of the first item is 0(use for Pagination).
- 'filter' (string): special keywords you can specify in the search terms to search in particular fields, such as: inauthor, intitle, inpublisher, etc.

> [!Note]
> maxResults parameter value is set to 10.

For information about google book api: https://developers.google.com/books/docs/v1/using

**Example Request**:

```http
GET /api/gbooks/search/?q=python+inauthor:author_name&i=10
```

**Example Response**:

```json
{
  "results": [
    {
      "id": "1",
      "title": "Learning Python",
      "author": "Mark Lutz",
      "description": "A comprehensive guide to Python programming.",
      "cover_image": "http://example.com/cover1.jpg",
      "rating": 4.5
    }
    // More book objects...
  ]
}
```

### Authentication API

**Register User**:

**Endpoint**: `POST /api/auth/register/`

**Description**: Register a new user.

**Request Example**:

```http
POST /api/auth/register/
Content-Type: application/json

{
  "username": "newuser",
  "emial": "email@gmail.com",
  "password": "password123"
}
```

**Response Example**:

```json
{
  "username": "newuser",
  "token": "your-token"
}
```

**Login User**:

**Endpoint**: `POST /api/auth/login/`

**Description**: Authenticate a user and obtain a token.

**Request Example**:

```http
POST /api/auth/login/
Content-Type: application/json

{
  "username": "newuser",
  "password": "password123"
}
```

**Response Example**:

```json
{
  "token": "your-token"
}
```

### Book Recommendations API

**Submit Recommendation**:

**Endpoint**: `POST /api/recommend/add-book/`

**Description**: Submit a new book recommendation.

**Request Example**:

```http
POST /api/recommend/add-book/
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt and David Thomas",
  "genre": "Programming",
  "rating": 5,
  "description": "A practical guide to programming."
}
```

**Response Example**:

```json
{
  "id": 1,
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt and David Thomas",
  "genre": "Programming",
  "rating": 5,
  "description": "A practical guide to programming."
}
```

**Retrieve Recommendations**:

**Endpoint**: `GET /api/recommend/retrive/`

**Description**: Retrieve a list of book recommendations. Supports filtering and sorting.

**Query Parameters**:

- `genre` (string): Filter by genre.
- `rating` (integer): Filter by rating.
- `publication_date` (string): Filter by publication date.
- `ordering` (string): Sort by field (e.g., `title`, `rating`).

**Example Request**:

```http
GET /api/recommend/retrive/?genre=Programming&ordering=title
```

**Example Response**:

```json
{
  "results": [
    {
      "id": 1,
      "title": "The Pragmatic Programmer",
      "author": "Andrew Hunt and David Thomas",
      "genre": "Programming",
      "rating": 5,
      "description": "A practical guide to programming."
    }
    // More book recommendations...
  ]
}
```

## Usage Examples

1. **Searching for Books**:

   Use the `/api/gbooks/search/` endpoint to find books on specific topics. Adjust query parameters to refine results.

2. **Adding a Recommendation**:

   Submit a POST request to `/api/recommend/add-book` with a valid token to add new recommendations.

3. **Filtering and Sorting Recommendations**:

   Use query parameters with the `/api/recommend/retrive` endpoint to filter by genre, rating, and sort by different fields.

## External Dependencies

- **Django**: Web framework used for building the application.
- **Django Rest Framework**: Toolkit for building Web APIs.
- **django_environ**: To manage environment variables.
- **requests**: To make HTTP requests to the Google Books API.

### Install Dependencies

Ensure all dependencies are listed in `requirements.txt` and install them using:

```bash
pip install -r requirements.txt
```


## **Comprehensive Guide: Building Custom Book-Related API Endpoints in Django**

> [!NOTE]
> The examples provided in this guide are already implemented in this project. This guide serves as a reference for adding new API endpoints

### **1. Setting Up the Django Project**

#### **Step 1: Set up Python Environment**

Open your terminal or command prompt and change to your project directory:
```bash
cd path/to/your/project
```
Use the venv module to create a virtual environment:
```bash
python -m venv venv
```

#### **Step 2: Activate the Virtual Environment**
#### 1. Activate on Windows:

```bash
venv\Scripts\activate
```
#### 2. Activate on macOS/Linux:

```bash
source venv/bin/activate
```
After activation, your command prompt will show the virtual environment name, indicating it is active.

#### **Step 3: Clone the Django Project**

Clone the Django project and create a new app for add new book-related functionalities:

```bash
git clone https://github.com/amitkr000/community_driven_platform.git
cd community_driven_platform
python manage.py startapp books
```

#### **Step 4: Configure Installed Apps**

Add the newly created app to the `INSTALLED_APPS` in `settings.py`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'django_filters',
    'recommend',
    'authentication',
    'books',  # custom app
]
```

### **2. Creating the Book Model**

Create a model to represent books in the `books/models.py` file:

```python
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField()
    genre = models.CharField(max_length=100)
    publication_date = models.DateField()
    rating = models.DecimalField(max_digits=3, decimal_places=2)
    cover_image = models.URLField(max_length=255, blank=True)

    def __str__(self):
        return self.title
```

#### **Step 5: Run Migrations**

Run the migrations to create the `Book` table in the database:

```bash
python manage.py makemigrations
python manage.py migrate
```

### **3. Creating Serializers**

Create a serializer for the `Book` model in `books/serializers.py`:

```python
from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
```

### **4. Building API Views**

#### **Step 6: Create API Views for CRUD Operations**

Create views in `books/views.py` to handle CRUD operations using Django Rest Framework’s generic views:

```python
from rest_framework import generics
from .models import Book
from .serializers import BookSerializer

class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
```

### **6. Setting Up URLs**

#### **Step 7: Define URL Patterns**

Define URL patterns in `books/urls.py`:

```python
from django.urls import path
from .views import BookListCreateView, BookRetrieveUpdateDestroyView

urlpatterns = [
    path('books/', BookListCreateView.as_view(), name='book-list-create'), #add new book entry to database
    path('books/<int:pk>/', BookRetrieveUpdateDestroyView.as_view(), name='book-detail'), #retrive, update, delete exiting book in database(pk - primary key)
]
```

Include the `books` URLs in your project's `urls.py`:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('books.urls')),  # Include the books app URLs
]
```

### **7. Testing API**

#### **Step 8: Run the Development Server**

Run Django development server:

```bash
python manage.py runserver
```

#### **Step 9: Test the API Endpoints**

Use a tool like Postman or cURL to test the API endpoints. For example, to create a new book, send a POST request to `/api/books/` with the book data.

For example:
```bash
curl -X POST http://127.0.0.1:8000/api/books/ -d "tilte=django&author=unknown&description=unknown&genre=computer"
```

### **8. User Authentication**

#### **Step 10: Add User Authentication**

You can integrate authentication for secure access to API endpoints:

- Use Django's built-in authentication or a package like `django-rest-auth` for token-based authentication.

Add authentication classes to your views:

```python
from rest_framework.permissions import IsAuthenticated

class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]  # Require authentication
```