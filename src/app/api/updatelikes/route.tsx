import { addDoc, collection, getFirestore, setDoc, updateDoc } from 'firebase/firestore';

import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/router';
import { db } from '@/app/lib/FirebaseConfig';
import { firestore } from 'firebase-admin';

// Cloud Fire Store POST middle API
// db post ruleの改定が必要(auth requiredにする)
export async function POST(
    req: Request,
    res: NextApiResponse,
) {

    // db table name
    const COLLECTION_NAME = 'post';
    //　初期化する
    const router = useRouter();
    const postId: any = router.query

    try {
        const db = firestore()
        const usersRef = db.collection(COLLECTION_NAME)

        //存在しない場合は作成、存在する場合は何もしない
        usersRef.doc(postId).set({
            postdata: {
                likes: 4,
            },
        }, { merge: true })
        return NextResponse.json({ success: "Likes updated successfully" });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to add document' });
    }
}