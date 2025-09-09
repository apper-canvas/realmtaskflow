import React from "react";
import Error from "@/components/ui/Error";
// Claude Description Generator Custom Action
// Generates task descriptions using Claude AI based on task titles

// Response constructor for Cloudflare Workers environment
const ResponseConstructor = class {
  constructor(body, init) {
    this.body = body;
    this.status = init?.status || 200;
    this.headers = init?.headers || {};
  }
};

export default {
async fetch(request, { secrets, env } = {}) {
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

// Get Claude API key from secrets
// Get Claude API key from secrets or environment
      const claudeApiKey = secrets?.CLAUDE_API_KEY || env?.CLAUDE_API_KEY;
      
      if (!claudeApiKey) {
        throw new Error('Claude API key not found. Please configure CLAUDE_API_KEY in your environment or secrets.');
      }
      
      if (!claudeApiKey) {
        // Fallback to mock descriptions if API key not available
        const fallbackDescriptions = [
          `Break down this task into actionable steps and identify key deliverables. Consider potential challenges and allocate appropriate time for completion.`,
          `Analyze requirements, gather necessary resources, and create a structured approach to accomplish this efficiently while maintaining quality standards.`,
          `Define success criteria, establish timeline milestones, and identify stakeholders who need to be involved or informed throughout the process.`,
          `Research best practices, document current state, and develop a systematic plan to address all aspects of this task comprehensively.`,
          `Prioritize sub-tasks, allocate resources effectively, and establish checkpoints to monitor progress and ensure timely completion.`
        ];
        
        const randomDescription = fallbackDescriptions[Math.floor(Math.random() * fallbackDescriptions.length)];
        
        // Add realistic delay to simulate processing
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
return new ResponseConstructor(JSON.stringify({
          success: true,
          description: randomDescription,
          source: 'fallback'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      try {
        // Call Claude API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': claudeApiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            max_tokens: 200,
            messages: [{
              role: 'user',
              content: `Generate a helpful, actionable task description for the following task title: "${title}"

Please provide a concise description that includes:
- Key steps or considerations
- Potential challenges to think about
- Success criteria or deliverables

Keep it practical and focused on helping someone complete this task effectively. Limit to 1-2 sentences.`
            }]
          })
        });

        if (!response.ok) {
          throw new Error(`Claude API error: ${response.status}`);
        }

        const data = await response.json();
        const generatedDescription = data.content?.[0]?.text || 'Failed to generate description';

        // Add small delay for better UX (Claude is very fast)
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
return new ResponseConstructor(JSON.stringify({
          success: true,
          description: generatedDescription,
          source: 'claude-ai'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error('Claude API error:', error);
        
        // Fallback to mock descriptions on API error
        const fallbackDescriptions = [
          `Break down this task into actionable steps and identify key deliverables. Consider potential challenges and allocate appropriate time for completion.`,
          `Analyze requirements, gather necessary resources, and create a structured approach to accomplish this efficiently while maintaining quality standards.`,
          `Define success criteria, establish timeline milestones, and identify stakeholders who need to be involved or informed throughout the process.`
        ];
        
        const randomDescription = fallbackDescriptions[Math.floor(Math.random() * fallbackDescriptions.length)];
        
// Add realistic delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));
        
        return new ResponseConstructor(JSON.stringify({ 
          success: true, 
          description: randomDescription,
          source: 'fallback'
        }), {
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    } catch (error) {
      return new ResponseConstructor(JSON.stringify({ 
        success: false, 
        error: 'Failed to generate description' 
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }
};