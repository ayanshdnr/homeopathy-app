'use server';
/**
 * @fileOverview An AI agent that suggests homeopathic remedies based on user-provided symptoms.
 *
 * - aiSymptomRemedySuggestion - A function that handles the symptom-based remedy suggestion process.
 * - AiSymptomRemedySuggestionInput - The input type for the aiSymptomRemedySuggestion function.
 * - AiSymptomRemedySuggestionOutput - The return type for the aiSymptomRemedySuggestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiSymptomRemedySuggestionInputSchema = z.object({
  symptoms: z.string().describe('The user-provided symptoms in natural language (Hindi or English).'),
});
export type AiSymptomRemedySuggestionInput = z.infer<typeof AiSymptomRemedySuggestionInputSchema>;

const AiSymptomRemedySuggestionOutputSchema = z.object({
  suggestedRemedies: z.array(
    z.object({
      name: z.string().describe('The name of the suggested homeopathic medicine.'),
      reason: z.string().describe('A brief reason why this medicine is suggested for the given symptoms.'),
      potency: z.string().optional().describe('An optional suggested potency (e.g., 30CH).'),
      dosage: z.string().optional().describe('An optional brief dosage guide.'),
    })
  ).describe('A list of homeopathic remedies suggested for the provided symptoms.'),
});
export type AiSymptomRemedySuggestionOutput = z.infer<typeof AiSymptomRemedySuggestionOutputSchema>;

export async function aiSymptomRemedySuggestion(input: AiSymptomRemedySuggestionInput): Promise<AiSymptomRemedySuggestionOutput> {
  return aiSymptomRemedySuggestionFlow(input);
}

const aiSymptomRemedySuggestionPrompt = ai.definePrompt({
  name: 'aiSymptomRemedySuggestionPrompt',
  input: { schema: AiSymptomRemedySuggestionInputSchema },
  output: { schema: AiSymptomRemedySuggestionOutputSchema },
  prompt: `You are an expert homeopathic practitioner. Your task is to analyze the given symptoms, which may be in English or Hindi, and suggest 1 to 3 relevant homeopathic remedies. For each suggested remedy, provide its name, a concise reason for its suggestion based on the symptoms, and optionally a suggested potency and dosage guide.\n\nSymptoms: {{{symptoms}}}\n\nProvide your response in JSON format.`,
});

const aiSymptomRemedySuggestionFlow = ai.defineFlow(
  {
    name: 'aiSymptomRemedySuggestionFlow',
    inputSchema: AiSymptomRemedySuggestionInputSchema,
    outputSchema: AiSymptomRemedySuggestionOutputSchema,
  },
  async (input) => {
    const { output } = await aiSymptomRemedySuggestionPrompt(input);
    return output!;
  }
);
