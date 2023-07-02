import { signOut } from "firebase/auth";
import { auth } from "../lib/FirebaseConfig"

const SignOut = () => {
    signOut(auth)
        .then(() => {
            // ログアウトされたことをわかりやすくするためのアラート
            alert('ログアウト完了！');
        })
        .catch((error) => {
            console.log(error);
        });
}

export default SignOut;
 
// firebaseのAPIを使ってるのでログアウト、退会はAPI外の機能としている
