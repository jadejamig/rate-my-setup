'use client'

import ListRow from "@/components/SetupRow";
import { IconArrowNarrowLeft } from "@tabler/icons-react"
import { useRouter } from "next/navigation";

const CreatePage = () => {
    const router = useRouter();

    return (
        <main className="flex items-center justify-center bg-white md:rounded-lg shadow-md w-full max-w-3xl dark:bg-dark-200">
            <div className="flex flex-col items-center justify-start w-full max-w-3xl rounded-lg">
                <div className="flex justify-start items-center w-full p-2 md:rounded-t-lg border-b-2 border-b-stone-100 dark:bg-dark-200 dark:border-b-dark-100">
                    <button onClick={() => router.push("/")} className="tab rounded-full p-2">
                        <IconArrowNarrowLeft />
                    </button>
                </div>
                <div className="flex flex-col items-start justify-start w-full p-4">
                    <h1 className="text-xl font-semibold dark:text-dark-600 ">Share your setup</h1>

                    <form>
                        
                    </form>
                </div>
            </div>
        </main>
    )
}

export default CreatePage