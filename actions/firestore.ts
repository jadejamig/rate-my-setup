import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export type CreatePostInput = {
  authorId: string;
  authorName: string;
  description: string;
  imageUrl: string;
  likes: number;
  comments: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Post = {
  id: string;
  authorId: string;
  authorName: string;
  description: string;
  imageUrl: string;
  likes: number;
  comments: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
};

export const getAllPosts = async (): Promise<Post[]> => {
  const querySnapshot = await getDocs(
    query(collection(db, "posts"), orderBy("updatedAt", "desc"))
  );
  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as CreatePostInput),
  }));
  return posts;
};

export const createPost = async (post: CreatePostInput) => {
  const docRef = await addDoc(collection(db, "posts"), post);
  return docRef;
};

export const subscribeToPosts = (callback: (posts: Post[]) => void) => {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, orderBy("updatedAt", "desc"));

  return onSnapshot(q, (querySnapshot) => {
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as CreatePostInput),
    }));
    callback(posts);
  });
};
