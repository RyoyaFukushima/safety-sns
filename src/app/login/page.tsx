// "use client"を明示することでクライアントサイドのレンダリングを示す
"use client";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import React, { use } from 'react';
import { auth } from "../lib/FirebaseConfig";

import { NextPage } from 'next'
import Router from 'next/router'
import { redirect } from "next/dist/server/api-utils";

export default function SignIn() {
    // useStateでユーザーが入力したメールアドレスとパスワードをemailとpasswordに格納する
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const doSignIn = () => {
        
        // Firebaseで用意されているユーザー登録の関数
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // ログインされてuserCredential.userでユーザーの情報を取得できる
                const user = userCredential.user;
                // ユーザー登録ができたかどうかをわかりやすくするためのアラート
                alert('Logged IN!');
                console.log(user);
            })
            .catch((error) => {
                // easily validation
                if(email.length == 0){
                    alert("email is empty")
                }else if(password.length == 0){
                    alert("password is empty")
                }else if(email.length == 0 && password.length == 0){
                    alert("email and pass is empty")
                }else{
                    alert(error)
                }
                console.log(error);
            });
    }

    return (
        <div className="register">
            <h1>LOGIN</h1>
            <div>
                <form>
                    <p>email</p>
                    <input
                        type="email"
                        name="email"
                        style={{ height: 50, fontSize: "1.2rem" }}
                        // onChangeでその値をemailに入れる
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)} />
                    <p>pass word</p>
                    <input
                        type="password"
                        name="password"
                        style={{ height: 50, fontSize: "1.2rem" }}
                        // onChangeでその値をpasswordに入れる
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)} />

                    <a 
                        onClick={() => {
                            doSignIn();
                        }}
                    >
                        ログイン
                    </a>
                </form>
            </div>

        </div>
    )
}
