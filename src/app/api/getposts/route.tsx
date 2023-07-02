import { db } from "@/app/lib/FirebaseConfig";
import { CollectionReference, collection, doc, getDocs } from "firebase/firestore";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";


// 名前を明示しないとダメ（GET,POST)
// src/app/api/hoge/route.tsx or js or ts がこのバージョンのAPIの作りかた
export async function GET(
    // req: Request,
    res: NextApiResponse
) {
    const COLLECTION_NAME = 'post';
    
    //　初期化する
    const documentRef = collection(db, COLLECTION_NAME);
    const querySnap = await getDocs(documentRef);
    // https://pontaro.net/891/#toc7
    const result = querySnap.docs.map((doc) => doc.data())
    return NextResponse.json(result);
}