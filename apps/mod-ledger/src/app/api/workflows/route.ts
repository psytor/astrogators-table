import { NextResponse } from 'next/server';
import { EVALUATION_WORKFLOWS, RESULT_CODES } from '@/config/evaluationWorkflows';

/**
 * @swagger
 * /api/workflows:
 *   get:
 *     summary: Fetches the mod evaluation workflow configuration
 *     description: Retrieves the configuration object that defines the rules and logic for the mod evaluation engine on the frontend.
 *     tags:
 *       - Workflows
 *     responses:
 *       200:
 *         description: Successfully retrieved the workflow configuration.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 workflows:
 *                   type: object
 *                   description: The hierarchical structure of evaluation workflows.
 *                 results:
 *                   type: object
 *                   description: The map of result codes to their display text and class names.
 *       500:
 *         description: Internal server error if the configuration cannot be loaded.
 */
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
