// "use client"を明示することでクライアントサイドのレンダリングを示す
"use client";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import React, { use } from 'react';
import { auth } from "../lib/FirebaseConfig";
import { NextPage } from 'next'
import Router from 'next/router'
import { redirect } from "next/dist/server/api-utils";

export default function Register() {
    // useStateでユーザーが入力したメールアドレスとパスワードをemailとpasswordに格納する
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const doRegister = () => {
        
        // Firebaseで用意されているユーザー登録の関数
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // ユーザー登録すると自動的にログインされてuserCredential.userでユーザーの情報を取得できる
                const user = userCredential.user;
                // ユーザー登録ができたかどうかをわかりやすくするためのアラート
                alert('登録完了！');
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
            <h1>新規登録(認証情報はFirebaseに格納される)</h1>
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
                            doRegister();
                        }}
                    >
                        登録
                    </a>
                </form>
            </div>

        </div>
    )
}
