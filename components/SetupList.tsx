'use client'

import { getAllPosts, Post, subscribeToPosts, subscribeToSpecificUserPosts } from "@/actions/firestore";
import NewPostForm from "@/components/NewPostForm";
import ListRow from "@/components/SetupRow";
import { useAuth } from "@/context/AuthContext";
import { IconLoader2, IconPlus } from "@tabler/icons-react";
import { Unsubscribe } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const SetupList = () => {
    const [selectedTab, setSelectedTab] = useState("All");
    const [open, setOpen] = useState(false);
    const { user } = useAuth();
    const [fetching, startFetching] = useTransition();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // useEffect(() => {
    //     startFetching(async () => {
    //         const posts = await getAllPosts();
    //         setPosts(posts);
    //     });
    // }, []);
    
    const refreshPostList = () => {
        startFetching(async () => {
            const posts = await getAllPosts();
            setPosts(posts);
        });
    }

    useEffect(() => {
        setLoading(true);
        setPosts([]);
        var unsubscribe: Unsubscribe;
        switch (selectedTab) {
            case "All":
                unsubscribe = subscribeToPosts((newPosts) => {
                setPosts(newPosts);
                setLoading(false);
                });
        
                // Clean up the listener on unmount
                return () => unsubscribe();
            case "Favorites":
                setLoading(false);
                break;
            case "My Setups":
                if (!user) {
                    setLoading(false);
                    return;
                };
                unsubscribe = subscribeToSpecificUserPosts(user.uid, (newPosts) => {
                setPosts(newPosts);
                setLoading(false);
                });
        
                // Clean up the listener on unmount
                return () => unsubscribe();
            default:
                setLoading(false);
                break;
        }
    }, [selectedTab]);


    const Tabs = () => {
        const tabButton = ({label}: {label: string}) => {
            return (
                <button 
                type="button" 
                onClick={() => setSelectedTab(label)}
                className="tab"
                >
                    <div className="flex flex-col w-full items-center justify-center px-2 ">
                        <p>{label}</p>
                    </div>
                    <div className={`w-full h-[2px] ${selectedTab === label ? "bg-emerald-500" : ""}`}/>
                </button>
            )
        }
        
        return (
            <main className="flex justify-between items-center w-full pt-2 pl-2 pr-6 pb-1 md:rounded-t-lg border-b-2 last:border-b-0 border-b-stone-100 dark:bg-dark-200 dark:border-b-dark-100">
                <div className="flex">
                    {tabButton({label: "All"})}
                    {tabButton({label: "Favorites"})}
                    {user && tabButton({label: "My Setups"})}
                </div>
                {user && 
                    <div className="flex items-center justify-center gap-1">
                        <button onClick={() => setOpen(true)} className="tab rounded-full p-2">
                            <IconPlus />
                        </button>
                    </div>
                }
                <NewPostForm open={open} setOpen={setOpen} refresh={refreshPostList} />
            </main>
        )
    }
    return (
        <main className="flex flex-col items-center justify-start w-full max-w-3xl rounded-lg ">
            <Tabs />
            {fetching || loading && (
                <div className="flex items-center justify-center gap-2 p-10">
                    <IconLoader2 className="animate-spin text-emerald-500" />
                    <p className="dark:text-dark-600">Loading...</p>
                </div>
            )}
            {!fetching && posts.map((post) => 
                <div key={post.id} onClick={() => router.push(`/post/${post.id}`)} className="w-full">
                    <ListRow post={post} />
                </div>
            )}
        </main>
    )
};

export default SetupList;
