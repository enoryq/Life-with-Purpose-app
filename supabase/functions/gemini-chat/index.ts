
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    // For now, we'll return a helpful response about purpose and life guidance
    // This will be replaced with actual Gemini API integration once API key is provided
    const purposeResponses = [
      "Finding your purpose starts with understanding your core values and what truly matters to you. What activities make you feel most alive and fulfilled?",
      "Purpose isn't always a grand calling - it can be found in small, meaningful actions you take each day. What small steps could you take today to align with your values?",
      "Living with purpose means being intentional about your choices. Consider what legacy you want to leave and work backwards from there.",
      "Your purpose may evolve over time, and that's perfectly normal. What matters most right now in your life, and how can you honor that?",
      "Purpose often emerges at the intersection of what you're good at, what you love, what the world needs, and what you can be paid for. Which of these areas would you like to explore?",
    ];

    const randomResponse = purposeResponses[Math.floor(Math.random() * purposeResponses.length)];
    
    const response = `Thank you for sharing that with me. ${randomResponse}

I'm here to help you explore questions about purpose, meaning, and personal growth. Feel free to share more about what's on your mind or what specific areas of your life you'd like to develop.`;

    return new Response(JSON.stringify({ response }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in gemini-chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'I apologize, but I encountered an issue processing your message. Please try again.',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
