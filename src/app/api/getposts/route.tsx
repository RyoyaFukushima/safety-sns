import { db } from "@/app/lib/FirebaseConfig";
import { CollectionReference, collection, getDocs } from "firebase/firestore";
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
    const querySnap = (await getDocs(documentRef));


    //データ取得用配列
    const arrList = [];

    // https://pontaro.net/891/#toc7
    // map() メソッドは、与えられた関数を配列のすべての要素に対して呼び出し、その結果からなる新しい配列を生成します。
    // 配列のそれぞれに処理をしたいときforループよりモダンに書きたい時はこうしよう
    const result = querySnap.docs.map((doc) => ({
        postid: doc.id,
        postdata: doc.data(),
    }));
    return NextResponse.json(result);
}
/*
    const querySnap = (await getDocs(documentRef));
    // https://pontaro.net/891/#toc7
    const docIds = querySnap.docs.map((doc) => doc.id)
    const data =  querySnap.docs.map((doc) => doc.data())
    var result = []

    for(var i = 0; i < querySnap.size; i++){
        result[i] = {
            postid: docIds[i],
            postdata:data[i],
        }
    }
    return NextResponse.json(result);
}
*/