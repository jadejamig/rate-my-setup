import IconGoogle from "@/assets/icons/IconGoogle";
import { signInWithGoogle } from "@/actions/auth";

export default function GoogleSigninButton() {
    const handleSignIn = async () => {
        const result = await signInWithGoogle();
        if (result.user) {
          console.log("User signed in:", result.user);
          console.log("Token:", result.token);
        } else {
          console.error("Error signing in:", result);
        }
      };
      
    return (
        <div
        onClick={handleSignIn}
        className="flex items-center justify-center gap-2 h-full py-3 px-4 rounded-lg hover:bg-stone-100 dark:hover:bg-dark-300 cursor-pointer"
      >
        <IconGoogle />
        <p className="text-sm font-medium">SIGN IN WITH GOOGLE</p>
      </div>
    )
}