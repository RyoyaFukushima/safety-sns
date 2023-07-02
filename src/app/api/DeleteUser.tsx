import { User, deleteUser, signOut } from "firebase/auth";

const DelUser = (user: User) => {
    deleteUser(user)
        .then(() => {
            alert('退会完了！');
        })
        .catch((error) => {
            console.log(error);
        });
}

export default DelUser;