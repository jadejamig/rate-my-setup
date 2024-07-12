import React from "react";
import { IconStar, IconMessage, IconFlame } from "@tabler/icons-react";
import Image from "next/image";
import { Post } from "@/actions/firestore";

const ListRow = ({ post }: { post: Post }) => {
  // const photoUrl = 'https://firebasestorage.googleapis.com/v0/b/nextfire-40455.appspot.com/o/images%2FReact.png?alt=media&token=908a4279-205e-4de9-ae3c-c4023cac86de'
  // const photoUrl2 = 'https://firebasestorage.googleapis.com/v0/b/nextfire-40455.appspot.com/o/images%2FIMG_5512jpeg.jpg?alt=media&token=55d00d42-eac0-4fb8-9436-7ff59cf0ef2e'
  // const photoUrl3 = 'https://firebasestorage.googleapis.com/v0/b/nextfire-40455.appspot.com/o/my-setup.jpg?alt=media&token=fcc90adf-e108-4ed4-aa54-cda35596b883'
  const capitalizeFullName = (name: string) => {
    const words = name.split(" ");
    return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  };
  return (
    <main className="rowPost font-Quicksand">
      <div className="flex flex-col md:flex-row items-center justify-start gap-4 p-2 h-[450px] md:h-[220px] w-full">
        <div className="relative flex flex-[0.8] md:flex-[0.6] items-center h-[300px] md:h-[220px] w-full justify-center overflow-hidden shadow-md rounded-sm hover:scale-[1.02] duration-500">
          <Image
            src={post.imageUrl}
            alt="My Setup"
            fill
            className="object-cover rounded-sm"
          />
        </div>
        <div className="flex flex-col flex-[0.2] md:flex-[0.4] items-start justify-start h-full w-full overflow-y-hidden gap-2 text-ellipsis">
          <div>
            <p className="text-lg dark:text-dark-600 font-semibold">
              {capitalizeFullName(post.authorName)}
            </p>
            <p className="text-xs dark:text-dark-500">
              {new Date().toDateString()}
            </p>
          </div>
          <div
            className="text-md dark:text-dark-400 overflow-hidden text-ellipsis line-clamp-2 md:line-clamp-[7]"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
            }}
          >
            {post.description}
          </div>
        </div>
      </div>

      <div className="flex gap-1 w-full md:w-auto">
        <div className="hidden md:block w-[2px] h-[220px] bg-stone-200 dark:bg-dark-400" />
        <ul className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 w-full md:w-auto">
          <li className="rowIcon">
            <IconStar size={24} />
            <p className="text-xs">(234)</p>
          </li>
          <li className="rowIcon">
            <IconFlame size={24} />
            <p className="text-xs">(374)</p>
          </li>
          <li className="rowIcon">
            <IconMessage size={24} />
            <p className="text-xs">(23)</p>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default ListRow;
