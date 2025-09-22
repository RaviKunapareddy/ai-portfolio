// API Response wrapper
export interface APIResponse<T> {
  data: T;
  status: number;
  success: boolean;
}

// Base API client class
class BaseAPIClient {
  protected baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  protected async request<T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    return {
      data,
      status: response.status,
      success: response.ok,
    };
  }
}

// Exact types matching your backend API
export interface ChatMessage {
  message: string;
  session_id?: string; // Optional, defaults to "default_session"
}

export interface ChatResponse {
  response: string;
  intent: string;
  products: Product[];
  suggestions: string[];
}

export interface Product {
  id?: string;
  name?: string;
  price?: number;
  description?: string;
  image_url?: string;
  category?: string;
  // Fields commonly returned by demo backends and used in UI
  title?: string;
  thumbnail?: string;
  rating?: number;
  discountPercentage?: number;
  stock?: number;
  // Enhanced fields from new API
  brand?: string;
  image?: string;
  originalPrice?: number;
  inStock?: boolean;
  reviewCount?: number;
  // Vector search specific fields
  similarity_score?: number;
  rerank_score?: number;
  // Local UI-only field for cart management
  cartId?: number;
  // Allow unknown extra fields without using 'any'
  [key: string]: unknown;
}

// Enhanced health check response matching the new API
export interface HealthCheckResponse {
  status: string;
  project: string;
  project_id: string;
  environment: string;
  // New fields from enhanced API
  services?: {
    redis?: string;
    pinecone_products?: string;
    pinecone_support?: string;
    pinecone?: string;
    [key: string]: string | undefined;
  };
  usage_monitoring?: {
    daily_requests: number;
    monthly_embeddings: number;
    free_tier_limits: {
      daily_requests_limit: number;
      monthly_embeddings_limit: number;
      note: string;
    };
  };
}

export interface ProductsParams {
  limit?: number;
  offset?: number;
  category?: string;
}

// Enhanced search params matching the new API capabilities
export interface ProductSearchParams {
  q?: string; // Made optional for flexibility
  limit?: number;
  // New parameters from enhanced API
  brand?: string;
  category?: string;
  rating_min?: number;
  in_stock?: boolean;
  discount_min?: number;
  tags?: string;
}

declare global {
  interface Window {
    // For accessing Next.js environment variables on the client side
    ENV_CHATBOT_API?: string;
  }
}

export class ChatbotClient extends BaseAPIClient {
  constructor(apiEndpoint?: string) {
    // Use provided endpoint, or try to get from environment
    // In Next.js, environment variables are injected at build time
    const apiUrl = apiEndpoint || 
      (typeof window !== 'undefined' ? window.ENV_CHATBOT_API : undefined) || 
      'http://52.91.104.111'; // Fallback to the default endpoint from env.example
    super(apiUrl);
  }
  
  async sendMessage(message: string, sessionId?: string): Promise<APIResponse<ChatResponse>> {
    const payload: ChatMessage = {
      message,
      ...(sessionId && { session_id: sessionId })
    };

    return this.request<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getProducts(params?: ProductsParams): Promise<APIResponse<Product[]>> {
    const searchParams = new URLSearchParams();
    
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.offset) searchParams.append('offset', params.offset.toString());
    if (params?.category) searchParams.append('category', params.category);

    const url = searchParams.toString() ? `/products?${searchParams}` : '/products';
    
    // Handle both old and new API response formats
    const response = await this.request<any>(url, {
      method: 'GET',
    });
    
    // Check if the response has a products property (new API format)
    if (response.data && response.data.products) {
      return {
        ...response,
        data: response.data.products
      };
    }
    
    // Return as-is for old format
    return response;
  }

  /**
   * Enhanced product search that supports all filtering capabilities of the new API
   * while maintaining backward compatibility with the old API.
   * 
   * @param query - Search query string
   * @param options - Optional search parameters or just a number for backward compatibility
   * @returns API response with product results
   */
  async searchProducts(query: string, options?: ProductSearchParams | number): Promise<APIResponse<Product[]>> {
    const searchParams = new URLSearchParams({ q: query });
    
    // Handle backward compatibility case where options is just a limit number
    if (typeof options === 'number') {
      searchParams.append('limit', options.toString());
    } 
    // Handle case where options is a full search params object
    else if (options && typeof options === 'object') {
      // If q is provided in options, use it (overrides the query parameter)
      if (options.q) searchParams.set('q', options.q);
      
      if (options.limit) searchParams.append('limit', options.limit.toString());
      if (options.brand) searchParams.append('brand', options.brand);
      if (options.category) searchParams.append('category', options.category);
      if (options.rating_min) searchParams.append('rating_min', options.rating_min.toString());
      if (options.in_stock !== undefined) searchParams.append('in_stock', options.in_stock.toString());
      if (options.discount_min) searchParams.append('discount_min', options.discount_min.toString());
      if (options.tags) searchParams.append('tags', options.tags);
    }

    // Handle both old and new API response formats
    const response = await this.request<any>(`/products/search?${searchParams}`, {
      method: 'GET',
    });
    
    // Check if the response has a products property (new API format)
    if (response.data && response.data.products) {
      return {
        ...response,
        data: response.data.products
      };
    }
    
    // Return as-is for old format
    return response;
  }

  async healthCheck(): Promise<APIResponse<HealthCheckResponse>> {
    return this.request<HealthCheckResponse>('/health', {
      method: 'GET',
    });
  }
} 