'use client'

import { getPostById, Post, deletePost } from "@/actions/firestore";
import MenuSelector from "@/components/MenuSelector";
import { getFirebaseDate } from "@/utils/date";
import { IconArrowNarrowLeft, IconDots, IconLoader2 } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const PostPage = ({params}: {params: {id: string}}) => {
    const router = useRouter();
    const [post, setPost] = useState<Post | null>(null);
    const [fetching, startFetching] = useTransition();
    const [isOpen, setIsOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        startFetching(async () => {
            const fetchedPost = await getPostById(params.id);
            setPost(fetchedPost);
        });
    }, [params.id]);

    const handleToggle = () => {
        setIsOpen((prevOpen) => !prevOpen);
    };

    const deletePostHandler = async () => {
        const deleted = await deletePost(params.id);
        if (deleted) {
            toast.success("Post deleted");
            router.push("/");
            return;
        }
        toast.error("Failed to delete post");
    }

    const menuItems = [
        {
            label: "Delete",
            onClick: () => deletePostHandler(),
        }
    ]
    return (
        <main className="flex items-center justify-center bg-white md:rounded-lg shadow-md w-full max-w-3xl dark:bg-dark-200">
            <div className="flex flex-col items-center justify-start w-full max-w-3xl rounded-lg">
                <div className="flex justify-start items-center w-full p-2 md:rounded-t-lg border-b-2 last:border-b-0 border-b-stone-100 dark:bg-dark-200 dark:border-b-dark-100">
                    <div className="flex items-center justify-between w-full">
                        <button onClick={() => router.back()} className="tab rounded-full p-2">
                            <IconArrowNarrowLeft />
                        </button>
                        <button 
                        ref={anchorRef}
                        onClick={handleToggle} 
                        className="rounded-full p-2"
                        >   
                            <MenuSelector menuItems={menuItems}>
                                <IconDots />
                            </MenuSelector>
                        </button>
                    </div>
                </div>
                {fetching && (
                    <div className="flex items-center justify-center gap-2 p-10">
                        <IconLoader2 className="animate-spin text-emerald-500" />
                        <p className="dark:text-dark-600">Loading...</p>
                    </div>
                )}
                {!fetching && post && 
                    <div className="flex flex-col items-center justify-start w-full p-4 gap-4">
                        <div className="flex flex-col items-start justify-start w-full ">
                            <h1 className="text-xl font-semibold dark:text-dark-600 ">{post.authorName}</h1>
                            <p className="text-xs dark:text-dark-400">{getFirebaseDate(post.createdAt)}</p>
                        </div>
                        <div className="relative flex items-center h-[400px] w-full justify-center overflow-hidden shadow-md rounded-sm duration-500 cursor-zoom-in">
                            <Image
                                src={post.imageUrl}
                                alt="My Setup"
                                fill
                                className="object-cover rounded-sm"
                            />
                        </div>
                    </div>
                }
            </div>
            
        </main>
    )
}

export default PostPage