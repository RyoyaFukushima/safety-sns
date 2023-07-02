import { addDoc, collection, setDoc } from 'firebase/firestore';
import { db } from '../../lib/FirebaseConfig';
import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';

// Cloud Fire Store POST middle API
// db post ruleの改定が必要(auth requiredにする)
export async function POST(
  req: Request,
  res: NextApiResponse,
) {

  // db table name
  const COLLECTION_NAME = 'post';
  //　初期化する

  // 参照先情報データベース名とテーブル名
  const documentRef = collection(db, COLLECTION_NAME);
  // NextApiRequest reqのbodyだと取れない
  // Next 13以降はRequestのreqをつかってjsonメソッドを使う
  const requestBody = await req.json()

  try {
    await addDoc(documentRef, requestBody)
    return NextResponse.json(requestBody);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add document' });
  }
}