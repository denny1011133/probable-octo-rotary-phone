import { NextResponse } from 'next/server';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const searchQuery = searchParams.get('search');
  const currentPage = searchParams.get('currentPage');
  const accessToken = process.env.GITHUB_ACCSEETOKEN;
  const apiUrl = `https://api.github.com/search/repositories?page=${currentPage}&q=${encodeURIComponent(
    searchQuery
  )}`;

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  const resToJSON = await res.json();
  return NextResponse.json({ response: resToJSON });
}
