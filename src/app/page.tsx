"use client";

import { auth } from "./lib/FirebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import React from 'react';
import SignOut from "./component/SignOut";


export default function Home() {
  /* ↓state変数「user」を定義 */
  const [user, setUser]: any = React.useState();

  /* ↓ログインしているかどうかを判定する */
  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  if(user != null){
  return (
    <>
      <h1>マイページ</h1>
      {/* ↓ユーザーのメールアドレスを表示（ログインしている場合） */}
      <p>{user?.email}</p>
      <button onClick={SignOut}>ログアウト</button>
    </>
  );
  }else{
    return (
      <>
        <h1>マイページ</h1>
        
        <p>Log inしろ</p>
        <a href="/login">login</a>
      </>
    );
  }
}

