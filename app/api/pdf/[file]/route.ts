import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { file: string } }
) {
  const { file } = params; // e.g. 21191-v1_0-betriebsanleitung-anlagenpark-tv73-stiftung-finneck.pdf

  // Construct the remote URL to fetch:
  const remoteUrl = `https://storage.googleapis.com/eurotec_innovation/${file}`;

  try {
    // Fetch PDF from GCS
    const response = await fetch(remoteUrl, { method: "GET" });

    if (!response.ok) {
      return new NextResponse("Error fetching remote PDF", {
        status: response.status,
      });
    }

    // Return the response with proper content type
    return new NextResponse(response.body, {
      headers: {
        "Content-Type": "application/pdf",
        // You can add other headers if needed
      },
    });
  } catch (error) {
    return new NextResponse("Error fetching PDF", { status: 500 });
  }
}
