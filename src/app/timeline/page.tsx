"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";

interface PostObj {
    postid: string,
    postdata: {
        created_at: string,
        posted_uid: string,
        violence_rate: number,
        context: string,
        likes: number,
    }
}

const url = "http://localhost:3000/api/getposts";

const TimeLine = () => {
    const [posts, setPOST] = useState<PostObj[]>([]);
    //データ取得用配列
    const arrList: PostObj[] = [];
    useEffect(() => {
        axios.get(url).then((res) => {
            console.log(res.data)
            const json = res.data
            for (var i: number = 0; i < json.length; i++) {
                arrList.push({
                    postid: json[i].postid, postdata: json[i].postdata
                })
            }
            setPOST(arrList)
        })
    }, []);

    const updateLikes = (postId: string) => {
        const updateUrl = `/api/updatelikes/${postId}`;

        axios.patch(updateUrl)
            .then((res) => {
                // 更新成功時の処理
                console.log("いいねが更新されました");
                // 更新後のデータを反映するなどの処理が必要な場合はここで行う
            })
            .catch((error) => {
                // 更新失敗時の処理
                console.error("いいねの更新に失敗しました:", error);
            });
    };

    return (
        <div>
            <ul>
                {posts.map((post: PostObj) => (
                    <li key={post.postid}>
                        <hr></hr>
                        <div>ID：{post.postid}</div>
                        <div>内容：{post.postdata.context}</div>
                        <div>脅威度：{post.postdata.violence_rate}</div>
                        <div>投稿者ID：{post.postdata.posted_uid}</div>
                        <div>いいね：{post.postdata.likes}</div>
                        <div>投稿者ID：{post.postdata.created_at}</div>
                        <button
                            className="mt-4 w-60 rounded-full bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
                            onClick={() => updateLikes(post.postid)}>
                            UPDATE いいね
                        </button>
                        <hr></hr>
                    </li>
                ))}
            </ul>
        </div>
    );
}


/*
static Propsが動かないんで
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await axios.get(url)
    const json: PostObj = res.data
    return {
        props: {
            json: res.data
        }
    };
}*/
export default TimeLine;