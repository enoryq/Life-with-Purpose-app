
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

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
    const { message, conversationId } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    // Get the authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      throw new Error('Authorization header is required');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user from auth header
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Authentication failed');
    }

    console.log('Processing message for user:', user.id, 'conversation:', conversationId);
    console.log('Message:', message);

    // Fetch user's tool insights
    const userInsights = await getUserInsights(supabase, user.id);
    console.log('User insights:', userInsights);

    // Build context from user insights
    let contextualInformation = '';
    if (userInsights.hasData) {
      contextualInformation = `\n\nIMPORTANT CONTEXT ABOUT THE USER:\n${userInsights.context}`;
    }

    // Call Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a compassionate AI companion specialized in helping people find their purpose and live meaningful lives. Your role is to provide thoughtful guidance, ask insightful questions, and support users on their journey of self-discovery and personal growth.

Key areas you help with:
- Purpose discovery and clarification
- Goal setting and achievement
- Values exploration
- Life direction and meaning
- Personal development
- Overcoming challenges and obstacles
- Building fulfilling relationships
- Creating work-life balance
- Spiritual and emotional growth

Your approach should be:
- Empathetic and non-judgmental
- Thoughtful and reflective
- Encouraging yet realistic
- Focused on helping users find their own answers
- Supportive of their unique journey
- Personalized based on what you know about the user

${contextualInformation}

User message: ${message}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API error: ${geminiResponse.status} - ${errorText}`);
    }

    const geminiData = await geminiResponse.json();
    console.log('Gemini response:', geminiData);

    if (!geminiData.candidates || geminiData.candidates.length === 0) {
      throw new Error('No response generated from Gemini');
    }

    const response = geminiData.candidates[0].content.parts[0].text;

    console.log('Generated response:', response);

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

async function getUserInsights(supabase: any, userId: string) {
  try {
    // Fetch user's values assessment results
    const { data: values } = await supabase
      .from('user_values')
      .select('*')
      .eq('user_id', userId)
      .order('assessment_date', { ascending: false })
      .limit(10);

    // Fetch user's recent goals
    const { data: goals } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    // Fetch recent daily reflections
    const { data: reflections } = await supabase
      .from('daily_reflections')
      .select('*')
      .eq('user_id', userId)
      .order('reflection_date', { ascending: false })
      .limit(3);

    // Fetch vision board items
    const { data: visionItems } = await supabase
      .from('vision_board_items')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(5);

    let context = '';
    let hasData = false;

    // Process values assessment
    if (values && values.length > 0) {
      hasData = true;
      const topValues = values
        .sort((a: any, b: any) => b.rating - a.rating)
        .slice(0, 3)
        .map((v: any) => `${v.value_name} (rated ${v.rating}/5)`)
        .join(', ');
      
      context += `The user's top core values are: ${topValues}. `;
    }

    // Process goals
    if (goals && goals.length > 0) {
      hasData = true;
      const activeGoals = goals.filter((g: any) => g.status === 'active');
      const completedGoals = goals.filter((g: any) => g.status === 'completed');
      
      if (activeGoals.length > 0) {
        const goalTitles = activeGoals.slice(0, 3).map((g: any) => g.title).join(', ');
        context += `Current active goals: ${goalTitles}. `;
      }
      
      if (completedGoals.length > 0) {
        context += `They have completed ${completedGoals.length} goal(s) recently. `;
      }
    }

    // Process reflections
    if (reflections && reflections.length > 0) {
      hasData = true;
      const recentReflection = reflections[0];
      
      if (recentReflection.mood) {
        context += `Recent mood: ${recentReflection.mood}. `;
      }
      
      if (recentReflection.accomplishment) {
        context += `Recent accomplishment: ${recentReflection.accomplishment}. `;
      }
      
      if (recentReflection.challenge) {
        context += `Recent challenge: ${recentReflection.challenge}. `;
      }
    }

    // Process vision board
    if (visionItems && visionItems.length > 0) {
      hasData = true;
      const visionTitles = visionItems.slice(0, 3).map((v: any) => v.title).join(', ');
      context += `Vision board aspirations: ${visionTitles}. `;
    }

    if (hasData) {
      context += '\n\nUse this information to provide more personalized and relevant guidance. Reference their values, goals, and recent reflections when appropriate to show that you understand their journey.';
    }

    return { hasData, context };
  } catch (error) {
    console.error('Error fetching user insights:', error);
    return { hasData: false, context: '' };
  }
}
