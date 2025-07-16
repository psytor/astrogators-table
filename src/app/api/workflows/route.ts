// src/app/api/workflows/route.ts

import { NextResponse } from 'next/server';
import { EVALUATION_WORKFLOWS, RESULT_CODES } from '@/config/evaluationWorkflows';

export async function GET() {
  try {
    const workflowConfig = {
      workflows: EVALUATION_WORKFLOWS,
      results: RESULT_CODES,
    };
    return NextResponse.json(workflowConfig);
  } catch (error) {
    console.error('Failed to load workflow configuration:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
