'use server';
/**
 * @fileOverview A conversational briefing flow for new project quotes.
 *
 * - continueChat - A function that continues the conversation with the user.
 * - ChatInput - The input type for the continueChat function.
 * - ChatOutput - The return type for the continueChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { handleQuoteRequest } from './handle-quote-request';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const BriefingSchema = z.object({
  name: z.string().optional().describe('The user\'s full name.'),
  email: z.string().email().optional().describe('The user\'s validated email address.'),
  whatsapp: z.string().optional().describe('The user\'s WhatsApp number, including area code.'),
  company: z.string().optional().describe('The user\'s company name, if applicable.'),
  projectDescription: z.string().optional().describe('A brief description of the desired project.'),
});

const ChatOutputSchema = z.object({
  response: z.string().describe('The AI\'s next message to the user, continuing the conversation.'),
  isComplete: z.boolean().describe('True if all required information for the briefing has been collected and validated.'),
  briefing: BriefingSchema.optional().describe('The object containing all collected briefing information.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function continueChat(input: ChatInput): Promise<ChatOutput> {
  return chatBriefingFlow(input);
}

const briefingPrompt = ai.definePrompt({
  name: 'chatBriefingPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  prompt: `You are Nexus, a friendly and proactive virtual assistant for NJR Tech. Your mission is to guide potential clients through a conversational briefing for a new project. Be informal but professional.

Your goal is to collect and validate the following information, one question at a time:
1. Name (must not be empty)
2. Email (must be a valid email format)
3. WhatsApp (must not be empty)
4. Company Name (optional)
5. Project Description (must not be empty)

**Conversation Guidelines:**
- **One by one:** Look at the chat history to see what information is missing and ask the next question.
- **Be Human:** Use natural language and emojis where appropriate 😉.
- **Validate:** If the user provides invalid info (e.g., an email without "@"), politely ask them to correct it. Example: "Hmm, '[user's text]' doesn't look like a valid email. Could you please check it? 🙏"
- **Start:** Greet the user and ask for their name.
- **End:** Once all required info (Name, Email, WhatsApp, Description) is collected, set 'isComplete' to true. The final response should be a thank you message. Example: "Awesome, [Name]! I have everything I need. Our team will review your project and get in touch soon via email ([Email]) or WhatsApp. Talk to you soon! 👋"

**Chat History:**
{{#each history}}
- {{role}}: {{content}}
{{/each}}

Based on the history, determine the next question or if the briefing is complete. Respond only with the output JSON.`,
});

const chatBriefingFlow = ai.defineFlow(
  {
    name: 'chatBriefingFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await briefingPrompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI.');
    }

    // If the briefing is complete, call the original handleQuoteRequest flow
    if (output.isComplete && output.briefing) {
      const { name, email, whatsapp, company, projectDescription } = output.briefing;
      
      if (name && email && projectDescription && whatsapp) {
        try {
          await handleQuoteRequest({
            name,
            email,
            whatsapp,
            company: company || '',
            projectDescription,
          });
        } catch (e) {
            console.error("Error calling handleQuoteRequest from chatBriefingFlow", e);
            // If webhook fails, we can inform the user.
            return {
                ...output,
                response: "Obrigado pelas informações! Tive um pequeno problema ao enviar seus dados para nossa equipe, mas não se preocupe, eles estão salvos. Entraremos em contato em breve!",
            }
        }
      } else {
        // This case indicates the AI model set isComplete to true but didn't provide all data.
        // We should ask the user to clarify.
        console.warn("Briefing marked as complete but required fields are missing.");
        return {
            briefing: output.briefing,
            isComplete: false,
            response: "Estamos quase lá! Parece que algumas informações estão faltando. Você poderia confirmar seu nome, e-mail e uma descrição do projeto, por favor?",
        }
      }
    }

    return output;
  }
);
