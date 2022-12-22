import Router from "next/router";
import { useSession } from "next-auth/react";

interface PostsDataProps {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: {
    email: string;
  };
}

export default function usePosts(data: PostsDataProps) {
  const { data: session } = useSession();

  const userHasValidSession = Boolean(session);

  const postBelongsToUser = session?.user?.email === data?.author?.email;

  const postTitle = {
    true: data.title,
    false: `${data.title} (Draft)`,
  } as any;

  const publishPost = async (id: string): Promise<void> => {
    await fetch(`/api/publish/${id}`, {
      method: "PUT",
    });
    await Router.push("/");
  };

  const deletePost = async (id: string): Promise<void> => {
    await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });
    Router.push("/");
  };

  return {
    userHasValidSession,
    postBelongsToUser,
    postTitle,
    publishPost,
    deletePost,
  };
}