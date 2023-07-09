import axios from "axios";
import { GetServerSideProps, GetStaticProps } from "next";
import React from "react";

interface PostObj {
  postid: string;
  postdata: {
    created_at: string;
    posted_uid: string;
    violence_rate: number;
    context: string;
    likes: number;
  };
}

interface TimeLineProps {
  posts: PostObj[];
}

const TimeLine: React.FC<TimeLineProps> = ({ posts }) => {
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
              onClick={() => "createPost()"}
            >
              UPDATE いいね
            </button>
            <hr></hr>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<TimeLineProps> = async () => {
  const url = "http://localhost:3000/api/getposts";

  try {
    const response = await axios.get(url);
    const posts: PostObj[] = response.data.map((item: any) => ({
      postid: item.postid,
      postdata: item.postdata,
    }));

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
};

export default TimeLine;