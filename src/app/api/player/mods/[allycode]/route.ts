import { NextRequest, NextResponse } from 'next/server';
import { getPlayerData } from '@/services/modHydrationService';

export async function GET(request: NextRequest) {
  const rawAllyCode = request.nextUrl.pathname.split('/').pop() || '';

  // Normalize the ally code by removing all non-digit characters
  const numericAllyCode = rawAllyCode.replace(/\D/g, '');

  // Validate that the normalized code contains exactly 9 digits
  if (numericAllyCode.length !== 9) {
    return NextResponse.json(
      { error: 'Invalid ally code. It must contain exactly 9 digits.' },
      { status: 400 }
    );
  }

  const playerData = await getPlayerData(numericAllyCode);

  if (!playerData) {
    return NextResponse.json(
      { error: 'Failed to fetch or process player data.' },
      { status: 500 }
    );
  }

  return NextResponse.json(playerData);
}