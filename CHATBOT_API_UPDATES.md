# Chatbot API Client Updates

## Overview

The ChatbotClient has been updated to support the enhanced backend API capabilities while maintaining backward compatibility with the existing frontend. This document explains the changes and how to use the enhanced features.

## Key Changes

### 1. Enhanced API Client

The `ChatbotClient` has been updated to support:

- Enhanced product search with advanced filtering
- Comprehensive health check with service status and usage monitoring
- Backward compatibility with existing code

### 2. New Product Search Capabilities

The `searchProducts` method now supports advanced filtering:

```typescript
// Basic usage (backward compatible)
client.searchProducts('laptop', 10);

// Enhanced usage with filters
client.searchProducts('laptop', {
  limit: 10,
  category: 'electronics',
  brand: 'Apple',
  rating_min: 4,
  in_stock: true,
  discount_min: 10,
  tags: 'premium'
});
```

### 3. Enhanced Health Check

The health check response now includes:

- Service connectivity status (Redis, Pinecone)
- Usage monitoring statistics
- Free tier limits information

```typescript
const health = await client.healthCheck();
console.log('Redis status:', health.data.services?.redis);
console.log('Daily API requests:', health.data.usage_monitoring?.daily_requests);
```

## Implementation Details

### Response Format Handling

The client automatically handles both old and new API response formats:

- For the new backend, it extracts products from the `products` property
- For the old backend, it uses the response data directly

### Type Definitions

Enhanced type definitions have been added:

- `ProductSearchParams` - Includes all available filter parameters
- `HealthCheckResponse` - Includes service status and usage monitoring
- `Product` - Includes additional fields from the enhanced API

## Future Enhancements

While the current implementation focuses on API compatibility without UI changes, future enhancements could include:

1. Adding filter UI components to leverage the advanced search capabilities
2. Creating an admin dashboard to display usage statistics
3. Implementing personalized product recommendations based on user preferences

## Testing

A test script is available at `src/test-api-client.ts` to verify the client works correctly with the enhanced backend.
