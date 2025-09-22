// Simple test script for the updated ChatbotClient
import { ChatbotClient } from './lib/api-clients/chatbot';

async function testApiClient() {
  // Initialize client with the specific API endpoint
  const client = new ChatbotClient('https://chatbot-api.ravii.app');
  
  console.log('Testing health check...');
  try {
    const health = await client.healthCheck();
    console.log('Health check result:', JSON.stringify(health.data, null, 2));
    
    // Check if we have the enhanced health check response
    if (health.data.services) {
      console.log('\nService Status:');
      console.log('- Redis:', health.data.services.redis);
      console.log('- Pinecone:', health.data.services.pinecone);
    }
    
    if (health.data.usage_monitoring) {
      console.log('\nUsage Statistics:');
      console.log('- Daily Requests:', health.data.usage_monitoring.daily_requests);
      console.log('- Monthly Embeddings:', health.data.usage_monitoring.monthly_embeddings);
    }
  } catch (error) {
    console.error('Health check failed:', error);
  }
  
  console.log('\nTesting basic product search (backward compatibility)...');
  try {
    const searchResults = await client.searchProducts('laptop', 2);
    console.log(`Found ${searchResults.data.length} products`);
    console.log('First product:', searchResults.data[0]?.title);
  } catch (error) {
    console.error('Product search failed:', error);
  }
  
  console.log('\nTesting enhanced product search with filters...');
  try {
    // Now we can omit the 'q' property since it's optional
    const enhancedResults = await client.searchProducts('laptop', {
      limit: 2,
      rating_min: 3,
      in_stock: true
    });
    console.log(`Found ${enhancedResults.data.length} filtered products`);
    console.log('Products:', enhancedResults.data.map(p => `${p.title} (Rating: ${p.rating})`))
  } catch (error) {
    console.error('Enhanced product search failed:', error);
  }
  
  console.log('\nTesting chat endpoint...');
  try {
    const chatResponse = await client.sendMessage('Show me some laptops');
    console.log('Bot response:', chatResponse.data.response);
    console.log('Detected intent:', chatResponse.data.intent);
    console.log(`Recommended ${chatResponse.data.products.length} products`);
  } catch (error) {
    console.error('Chat request failed:', error);
  }
}

testApiClient().catch(console.error);
