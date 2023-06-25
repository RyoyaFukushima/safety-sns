// "use client"を明示することでクライアントサイドのレンダリングを示す
"use client";
import { sendPasswordResetEmail } from "firebase/auth"
import React, { use } from 'react';
import { auth } from "../lib/FirebaseConfig";


export default function ResetPassword() {
    const [email, setEmail] = React.useState<string>('');

    const doResetEmail = () => {

        const actionCodeSettings = {
            // パスワード再設定後にログイン画面にリダイレクトさせる
            url: 'http://localhost:3000/login',
            handleCodeInApp: false,
        }

        // // Firebaseで用意されているパスワード再設定のメールを送るための関数
        sendPasswordResetEmail(auth, email, actionCodeSettings)
            .then(() => {
                // パスワード再設定のメールが送信されたことをわかりやすくするためのアラート
                alert("再設定メールを" + email + "に送信したよ");
                console.log(email);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="resetpass content">
            <h1>パスワード再設定</h1>
            <div>
                <p>email</p>
                <input
                    type="email"
                    name="email"
                    style={{ height: 50, fontSize: "1.2rem" }}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    style={{ width: 220 }}
                    color="primary"
                    onClick={() => {
                        doResetEmail();
                    }}
                >
                    送信
                </button>
            </div>
        </div>
    )
}