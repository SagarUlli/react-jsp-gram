# JSPGram - Social Media Web Application (Frontend)

## Description

JSPGram Frontend is a React-based social media application that consumes the JSPGram Spring Boot REST APIs. It provides authentication, profile management, post interactions, social networking features, and Prime membership integration through a responsive user interface.

## Tech Stack

- React
- Vite
- JavaScript (ES6+)
- React Router
- Axios
- Bootstrap 5
- React Toastify

## Features

### Authentication
- Login and Registration
- OTP Verification
- Protected Routes
- Session-based Authentication

### Home Feed
- View posts from followed users
- Like and unlike posts
- Add and view comments

### Post Management
- Create posts
- Edit posts
- Delete posts
- Upload images

### User Management
- View profile
- Edit profile
- View other users' profiles
- Follow and unfollow users
- User suggestions
- Followers and following pages

### Prime Membership
- Razorpay Checkout integration
- Payment verification
- Prime badge display

### UI Features
- Responsive layout using Bootstrap
- Toast notifications
- Loading indicators
- Axios interceptors
- Environment-based API configuration
- Custom 404 page

## Project Structure

- Components
- Pages
- Services
- Routes
- Utilities

## Backend

This frontend consumes REST APIs developed using Spring Boot.

## Build

```bash
npm install
npm run dev
```

Production Build

```bash
npm run build
```
