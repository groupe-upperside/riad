import { NextResponse } from 'next/server';
import { sendBookingEmail } from '@/app/lib/actions/sendEmail/action';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await sendBookingEmail(data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new NextResponse(message, { status: 500 });
  }
}
