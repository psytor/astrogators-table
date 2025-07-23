// apps/mod-ledger/src/app/api/evaluate-mod/route.ts

import { NextResponse } from 'next/server';
import { executeWorkflow, WorkflowResult } from '@/frontend/services/modWorkflowService';
import { CompactMod } from '@/backend/services/modHydrationService';

import { createLogger } from '@astrogators-table/logger';
const logger = createLogger('ML-eval-api');

interface EvaluateModRequest {
  mod: CompactMod;
  profileName: string;
}

export async function POST(request: Request) {
  logger.info('Request received to evaluate a mod.');
  try {
    const body: EvaluateModRequest = await request.json();
    const { mod, profileName } = body;

    if (!mod || !profileName) {
      logger.warn('Invalid request body for mod evaluation.');
      return new NextResponse('Missing mod or profileName in request body', { status: 400 });
    }

    logger.debug(`Executing workflow "${profileName}" for mod ${mod.id}`);
    const result: WorkflowResult = executeWorkflow(mod, profileName);
    logger.debug(`Workflow for mod ${mod.id} completed with result: ${result.resultCode}`);

    return NextResponse.json(result);
  } catch (error) {
    logger.error('An error occurred during mod evaluation:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
