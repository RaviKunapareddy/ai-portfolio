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
  // Local UI-only field for cart management
  cartId?: number;
  // Allow unknown extra fields without using 'any'
  [key: string]: unknown;
}

export interface HealthCheckResponse {
  status: string;
  project: string;
  project_id: string;
  environment: string;
}

export interface ProductsParams {
  limit?: number;
  offset?: number;
  category?: string;
}

export interface ProductSearchParams {
  q: string;
  limit?: number;
}

export class ChatbotClient extends BaseAPIClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_CHATBOT_API || '');
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
    
    return this.request<Product[]>(url, {
      method: 'GET',
    });
  }

  async searchProducts(query: string, limit?: number): Promise<APIResponse<Product[]>> {
    const searchParams = new URLSearchParams({ q: query });
    if (limit) searchParams.append('limit', limit.toString());

    return this.request<Product[]>(`/products/search?${searchParams}`, {
      method: 'GET',
    });
  }

  async healthCheck(): Promise<APIResponse<HealthCheckResponse>> {
    return this.request<HealthCheckResponse>('/health', {
      method: 'GET',
    });
  }
} 