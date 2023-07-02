import axios from "axios";
import { NextApiResponse } from "next";
//import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
// 名前を明示しないとダメ（GET,POST)
// src/app/api/hoge/route.tsx or js or ts がこのバージョンのAPIの作りかた
export async function GET(
    req: Request,
    res: NextApiResponse
) {

    const result = await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.data);
    return NextResponse.json({res:result})
}