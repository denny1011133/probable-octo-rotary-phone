import { NextResponse } from 'next/server';

export async function GET(request) {
  const searchQuery = 'topic:python'; //TODO
  const accessToken = process.env.GITHUB_ACCSEETOKEN;
  const apiUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(
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
