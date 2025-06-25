// Test file for the Supabase Edge Function integration
// Run with: node test-edge-function.js

const EDGE_FUNCTION_URL = 'https://qznrxhgzpjhbwjgaizhz.supabase.co/functions/v1/submit-signup';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bnJ4aGd6cGpoYndqZ2Fpemh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzODEzMDEsImV4cCI6MjA2NDk1NzMwMX0.-nyN4Ob6F2X3IDb1PmB2k5O8LJgKJHVNLVV4Bh2BL0E';

// Test cases
const testCases = [
  {
    name: 'Valid email signup',
    data: { email: 'lermanori@gmail.com' },
    expectedStatus: 200
  },
  {
    name: 'Missing email',
    data: {},
    expectedStatus: 400
  },
  {
    name: 'Empty email',
    data: { email: '' },
    expectedStatus: 400
  },
  {
    name: 'Invalid email format',
    data: { email: 'invalid-email' },
    expectedStatus: 400
  }
];

async function testEdgeFunction() {
  console.log('🧪 Testing Supabase Edge Function Integration\n');
  
  let passedTests = 0;
  let totalTests = testCases.length;

  for (const testCase of testCases) {
    console.log(`📋 Test: ${testCase.name}`);
    console.log(`📤 Sending data:`, testCase.data);
    
    try {
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(testCase.data),
      });

      const responseText = await response.text();
      
      console.log(`📥 Response status: ${response.status}`);
      console.log(`📥 Response body: ${responseText}`);
      
      if (response.status === testCase.expectedStatus) {
        console.log(`✅ PASS - Expected status ${testCase.expectedStatus}, got ${response.status}`);
        passedTests++;
      } else {
        console.log(`❌ FAIL - Expected status ${testCase.expectedStatus}, got ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ERROR - ${error.message}`);
    }
    
    console.log('---\n');
  }

  console.log(`📊 Test Results: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Edge function is working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Please check the edge function implementation.');
  }
}

// Test the frontend integration
async function testFrontendIntegration() {
  console.log('\n🧪 Testing Frontend Integration\n');
  
  const testData = {
    email: 'lermanori@gmail.com',
    phone: '+1234567890',
    location: 'New York',
    reason: 'Testing frontend integration',
    country: 'United States'
  };

  console.log('📋 Test: Frontend form submission simulation');
  console.log('📤 Test data:', testData);
  
  try {
    // Simulate the database insertion (this would normally be done by Supabase client)
    console.log('📥 Simulating database insertion...');
    
    // Simulate the edge function call
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ email: testData.email }),
    });

    const responseText = await response.text();
    
    console.log(`📥 Edge function response status: ${response.status}`);
    console.log(`📥 Edge function response body: ${responseText}`);
    
    if (response.status === 200) {
      console.log('✅ Frontend integration test PASSED');
    } else {
      console.log('❌ Frontend integration test FAILED');
    }
  } catch (error) {
    console.log(`❌ Frontend integration ERROR - ${error.message}`);
  }
}

// Run tests
async function runAllTests() {
  await testEdgeFunction();
  await testFrontendIntegration();
}

// Check if running in Node.js environment
if (typeof window === 'undefined') {
  // Node.js environment - run tests
  runAllTests().catch(console.error);
} else {
  // Browser environment - export for manual testing
  window.testEdgeFunction = testEdgeFunction;
  window.testFrontendIntegration = testFrontendIntegration;
  console.log('🧪 Test functions available in browser console:');
  console.log('- testEdgeFunction()');
  console.log('- testFrontendIntegration()');
} 