"use client";

import axios from "axios";

const Test = () => {

  const createPost = async (postContext :string) => {
    const now = new Date();
    
    // post documentのフィールド形式指定。この辺はDynamoDBの奴に似てるかも
    // uniqueな連番を振ること
    
    const insertData = {
      context: postContext,
      likes: 0,
      posted_uid: "hogeuid",
      violence_rate: 0,
      created_at: now.toLocaleString()
    }

    const json = await axios.post("/api/post", insertData)

    console.log(json)
  }

  return (
    <div className="testmain content">
      <h1>ボタンを押すとCloud Firestoreにデータが送られるよ</h1>
      <button
        className="mt-4 w-60 rounded-full bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
        onClick={() => createPost("PAD is trash")}>
        Insert Post
      </button>
    </div>
  )
};

export default Test;