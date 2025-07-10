import { NextResponse } from 'next/server';
import { getDbLookups } from '@/services/modHydrationService';

export async function GET() {
  const dbLookups = await getDbLookups();
  return NextResponse.json(dbLookups);
}
