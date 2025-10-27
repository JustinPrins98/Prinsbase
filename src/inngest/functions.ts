import { prisma } from "@/lib/db";
import { inngest } from "./client";
import * as Sentry from "@sentry/nextjs";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai"
import { createAnthropic } from "@ai-sdk/anthropic"
import { generateText } from "ai";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const execute = inngest.createFunction(
  { id: "execute-ai", },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("pretend", "5s")

    Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' })


    const { steps: geminiSteps } = await step.ai.wrap("gemini-generate-text",
      generateText, {
      model: google("gemini-2.5-flash"),
      system: "You are a helpful assistant.",
      prompt: "What is 2 + 2?",
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    })

    const { steps: openaiSteps } = await step.ai.wrap("openai-generate-text",
      generateText, {
      model: openai("gpt-4.1-nano"),
      system: "You are a helpful assistant.",
      prompt: "What is 2 + 2?",
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    })

    const { steps: anthropicSteps } = await step.ai.wrap("anthropic-generate-text",
      generateText, {
      model: anthropic("claude-3-5-haiku-20241022"),
      system: "You are a helpful assistant.",
      prompt: "What is 2 + 2?",
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    })


    return {
      geminiSteps,
      openaiSteps,
      anthropicSteps
    };
  },
);