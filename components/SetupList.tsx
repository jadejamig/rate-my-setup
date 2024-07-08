'use client'

import React, { useState } from "react";
import ListRow from "@/components/SetupRow";

const SetupList = () => {
    const [selectedTab, setSelectedTab] = useState("All");
    
    const Tabs = () => {
        return (
            <main className="flex justify-start items-center w-full pt-2 px-2 pb-1 md:rounded-t-lg border-b-2 border-b-stone-100 dark:bg-dark-200 dark:border-b-dark-100">
                <button 
                type="button" 
                onClick={() => setSelectedTab("All")}
                className="tab"
                >
                    <div className="flex flex-col w-full items-center justify-center px-2 dark:text-dark-600">
                        <p>All</p>
                    </div>
                    <div className={`w-full h-[2px] ${selectedTab === "All" ? "bg-emerald-500" : ""}`}/>
                </button>
                <button 
                type="button" 
                onClick={() => setSelectedTab("Favorites")} 
                className="tab"
                >
                    <div className="flex flex-col w-full items-center justify-center px-2 dark:text-dark-600">
                        <p>Favorites</p>
                    </div>
                    <div className={`w-full h-[2px] ${selectedTab === "Favorites" ? "bg-emerald-500" : ""}`}/>
                </button>
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
