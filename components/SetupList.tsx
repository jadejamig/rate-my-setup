'use client'

import React, { useState } from "react";
import ListRow from "@/components/SetupRow";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import NewPostForm from "@/components/NewPostForm";

const SetupList = () => {
    const [selectedTab, setSelectedTab] = useState("All");
    const [open, setOpen] = useState(false);

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
                </div>
                <div className="flex items-center justify-center gap-1">
                    <button onClick={() => setOpen(true)} className="tab rounded-full p-2">
                        <IconPlus />
                    </button>
                </div>
                <NewPostForm open={open} setOpen={setOpen} />
            </main>
        )
    }
    return (
        <main className="flex flex-col items-center justify-start w-full max-w-3xl rounded-lg">
            <Tabs />
            <ListRow />
            <ListRow />
        </main>
    )
};

export default SetupList;
