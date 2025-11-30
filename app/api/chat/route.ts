import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("[/api/chat] POST invoked");
  const body = await req.json().catch(() => ({}));
  console.log("[/api/chat] body:", JSON.stringify(body));

  return NextResponse.json({
    ok: true,
    echo: body,
    message: "server received request",
  });
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "chat route ok" });
}
