'use client'

import { getAllPosts, Post, subscribeToPosts } from "@/actions/firestore";
import NewPostForm from "@/components/NewPostForm";
import ListRow from "@/components/SetupRow";
import { useAuth } from "@/context/AuthContext";
import { IconLoader2, IconPlus } from "@tabler/icons-react";
import { useEffect, useState, useTransition } from "react";

const SetupList = () => {
    const [selectedTab, setSelectedTab] = useState("All");
    const [open, setOpen] = useState(false);
    const { user } = useAuth();
    const [fetching, startFetching] = useTransition();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    
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
        const unsubscribe = subscribeToPosts((newPosts) => {
          setPosts(newPosts);
          setLoading(false);
        });
    
        // Clean up the listener on unmount
        return () => unsubscribe();
      }, []);


    const Tabs = () => {
        return (
            <main className="flex justify-between items-center w-full pt-2 pl-2 pr-6 pb-1 md:rounded-t-lg border-b-2 border-b-stone-100 dark:bg-dark-200 dark:border-b-dark-100">
                <div className="flex">
                    <button 
                    type="button" 
                    onClick={() => setSelectedTab("All")}
                    className="tab"
                    >
                        <div className="flex flex-col w-full items-center justify-center px-2 ">
                            <p>All</p>
                        </div>
                        <div className={`w-full h-[2px] ${selectedTab === "All" ? "bg-emerald-500" : ""}`}/>
                    </button>
                    <button 
                    type="button" 
                    onClick={() => setSelectedTab("Favorites")} 
                    className="tab"
                    >
                        <div className="flex flex-col w-full items-center justify-center px-2">
                            <p>Favorites</p>
                        </div>
                        <div className={`w-full h-[2px] ${selectedTab === "Favorites" ? "bg-emerald-500" : ""}`}/>
                    </button>
                    <button 
                    type="button" 
                    onClick={() => setSelectedTab("Favorites")} 
                    className="tab"
                    >
                        <div className="flex flex-col w-full items-center justify-center px-2">
                            <p>Favorites</p>
                        </div>
                        <div className={`w-full h-[2px] ${selectedTab === "Favorites" ? "bg-emerald-500" : ""}`}/>
                    </button>
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
            {/* <ListRow />
            <ListRow /> */}
            {fetching || loading && (
                <div className="flex items-center justify-center gap-2 p-10">
                    <IconLoader2 className="animate-spin text-emerald-500" />
                    <p className="dark:text-dark-600">Loading...</p>
                </div>
            )}
            {!fetching && posts.map((post) => <ListRow key={post.id} post={post} />)}
        </main>
    )
};

export default SetupList;
