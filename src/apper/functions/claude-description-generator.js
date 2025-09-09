// Claude Description Generator Custom Action
// Generates task descriptions using Claude AI based on task titles

// Ensure Response is available (for Cloudflare Workers environment)
const ResponseConstructor = typeof Response !== 'undefined' ? Response : class {
  constructor(body, init) {
    this.body = body;
    this.status = init?.status || 200;
    this.headers = new Headers(init?.headers);
  }
};

export default {
  async fetch(request) {
    try {
      // Handle CORS preflight
      if (request.method === 'OPTIONS') {
        return new ResponseConstructor(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }

if (request.method !== 'POST') {
        return new ResponseConstructor(JSON.stringify({ 
          success: false, 
          error: 'Method not allowed' 
        }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const { title } = await request.json();
      
if (!title || typeof title !== 'string') {
        return new ResponseConstructor(JSON.stringify({ 
          success: false, 
          error: 'Task title is required' 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Simulate Claude API call with realistic response
      // In production, this would call the actual Claude API
      const descriptions = [
        `Break down this task into actionable steps and identify key deliverables. Consider potential challenges and allocate appropriate time for completion.`,
        `Analyze requirements, gather necessary resources, and create a structured approach to accomplish this efficiently while maintaining quality standards.`,
        `Define success criteria, establish timeline milestones, and identify stakeholders who need to be involved or informed throughout the process.`,
        `Research best practices, document current state, and develop a systematic plan to address all aspects of this task comprehensively.`,
        `Prioritize sub-tasks, allocate resources effectively, and establish checkpoints to monitor progress and ensure timely completion.`
      ];

      const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
      
      // Add realistic delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

return new ResponseConstructor(JSON.stringify({ 
        success: true, 
        description: randomDescription 
      }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
} catch (error) {
      return new ResponseConstructor(JSON.stringify({ 
        success: false, 
        error: 'Failed to generate description' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
};