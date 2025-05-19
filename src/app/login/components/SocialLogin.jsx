import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc'; 


const SocialLogin = () => {
    const handleSocialLogin= async(providerName)=>{
        console.log('socialLogin',providerName)

        const result=await signIn(providerName,{redirect:false})
        console.log(result)

        

    }
    return (
        <div className="flex justify-center mt-4">
            <button onClick={()=>handleSocialLogin("google")}
                className="flex items-center gap-2 border px-4 py-2 rounded text-[#3972C1] hover:bg-gray-100 transition"
            >
                <FcGoogle size={20} /> {/* React icon instead of image */}
                <span>Continue with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;
