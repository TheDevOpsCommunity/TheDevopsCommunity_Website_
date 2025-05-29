import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { name, email, phone, type, message } = await request.json();

    // Validate required fields
    if (!name || !email || !type || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name,
          email,
          phone,
          type,
          message
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error inserting inquiry:', error);
      return NextResponse.json(
        { error: 'Failed to submit inquiry' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Inquiry submitted successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 