# Naios AI Demo

## Overview

Naios AI Demo is a B2B marketplace platform for cultural commerce that connects artisanal producers with buyers. The platform uses AI-powered matching to facilitate connections between producers of cultural products (such as olive oil, wine, ceramics, textiles) and potential buyers. The application provides separate workflows for producers to register their products and for buyers to discover matching producers based on their requirements.

## Recent Changes

**November 8, 2025**: Completed initial build of B2B marketplace demo
- Set up Next.js 15 project with TypeScript and Tailwind CSS
- Implemented home page with role selection (Producer/Buyer)
- Built complete producer workflow with form, validation, and results page
- Built complete buyer workflow with search form and results page
- Configured dev server on port 5000 with proper host settings for Replit
- All pages are mobile-responsive with clean, professional design
- Using dummy data for AI translations and producer matching

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Choice: Next.js 15 with React 18**
- **Problem**: Need for a modern, performant web application with server-side rendering capabilities
- **Solution**: Next.js 15 with App Router architecture
- **Rationale**: Provides built-in routing, server components, and optimal performance for a marketplace platform
- **Key Features**: 
  - App Router for file-based routing (`app/` directory structure)
  - Client-side interactivity with "use client" directive
  - Built-in optimization for images and performance

**Styling: Tailwind CSS**
- **Problem**: Need for rapid UI development with consistent design
- **Solution**: Utility-first CSS framework with custom theming
- **Rationale**: Enables fast prototyping while maintaining design consistency
- **Configuration**: Custom color variables for background/foreground with dark mode support via CSS variables

**State Management: React Hooks + LocalStorage**
- **Problem**: Need to persist user data across navigation
- **Solution**: Local state with useState hooks and browser localStorage for temporary persistence
- **Rationale**: Lightweight approach suitable for demo/prototype without backend dependency
- **Limitations**: Data is client-side only and not truly persistent; suitable for demonstration purposes

### Application Structure

**Role-Based User Flows**
- **Two Primary User Types**: Producers and Buyers
- **Routing Pattern**: 
  - Landing page (`/`) for role selection
  - Producer flow: `/producer` → `/producer/results`
  - Buyer flow: `/buyer` → `/buyer/results`
- **Design Decision**: Separate workflows optimize for distinct user needs and data collection requirements

**Producer Workflow**
- Collects: name, location, product type, description, photo URL
- Generates: Multi-language product descriptions and SEO keywords
- Demonstrates: AI-powered content generation for international markets

**Buyer Workflow**
- Collects: Search query describing requirements
- Generates: Ranked list of matching producers with match scores
- Demonstrates: AI-powered matching and recommendation system

### Data Flow Pattern

**Client-Side State Management**
- Form data captured via controlled components (useState)
- Data persisted to localStorage during submission
- Results pages retrieve data from localStorage
- **Limitation**: No actual backend API calls; uses simulated delays (setTimeout) to mimic async operations
- **Future Enhancement**: This architecture is prepared for backend integration where localStorage calls would be replaced with API endpoints

### UI/UX Design Patterns

**Loading States**
- Simulated AI processing with loading spinners
- 2-second delays to demonstrate async operations
- Provides user feedback during "AI processing"

**Responsive Design**
- Mobile-first approach with Tailwind breakpoints
- Grid layouts that adapt from single column to multi-column
- Touch-friendly button sizing and spacing

**Visual Design**
- Gradient backgrounds for modern aesthetic
- Card-based layouts for content organization
- Icon-driven navigation (emoji icons for quick recognition)
- Shadow and hover effects for interactive elements

## External Dependencies

### Core Framework Dependencies

**Next.js 15.0.3**
- Purpose: React framework providing routing, rendering, and build optimization
- Features Used: App Router, client components, built-in TypeScript support

**React 18.3.1**
- Purpose: UI component library
- Features Used: Hooks (useState, useEffect), client-side interactivity

**TypeScript 5**
- Purpose: Type safety and developer experience
- Configuration: Strict mode enabled, ES2017 target, path aliases configured (`@/*`)

### Development Tools

**Tailwind CSS 3.4.15**
- Purpose: Utility-first styling framework
- Configuration: Custom content paths, color variable extensions, dark mode support

**ESLint with Next.js Config**
- Purpose: Code quality and consistency
- Configuration: Next.js-recommended rules

**PostCSS & Autoprefixer**
- Purpose: CSS processing and browser compatibility
- Usage: Tailwind CSS compilation

### Missing/Future Dependencies

**Database Layer**
- Current: None (using localStorage)
- Future Need: Database ORM (e.g., Drizzle) for persistent storage
- Potential: Postgres or similar relational database for producer/buyer profiles, matches, and transactions

**Authentication**
- Current: None implemented
- Future Need: User authentication system for secure producer/buyer accounts

**AI/ML Services**
- Current: Simulated with dummy data
- Future Need: Integration with AI services for:
  - Product description translation
  - Semantic search and matching
  - SEO keyword generation
  - Image recognition for product photos

**File Upload Service**
- Current: URL input only
- Future Need: Cloud storage integration for product photos (e.g., AWS S3, Cloudinary)

**API Layer**
- Current: None (client-side only)
- Future Need: REST or GraphQL API for:
  - Producer registration
  - Buyer searches
  - Match generation
  - Transaction management