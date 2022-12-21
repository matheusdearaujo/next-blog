import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import { prisma } from "@/lib/prisma";

import Card from "@/components/Card";
import Image from "next/image";

import useAuthUser from "@/hooks/useAuthUser";
import Link from "next/link";

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: session } = useSession();
  const { user } = useAuthUser();

  return (
    <>
      <Head>
        <title>DevHack News</title>
      </Head>

      <main className="container mx-auto bg-white w-full py-6 px-8 my-10">
        {!session ? (
          <>
            <h1 className="text-center text-2xl text-gray-500 font-bold">
              Bem vindo ao DevHack News
            </h1>
            <h2 className="text-center">Você não está logado no momento.</h2>
            <div className="flex justify-center items-center mt-5">
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 border-b-4 border-gray-500 hover:border-gray-500 rounded shadow flex gap-2"
                onClick={() => signIn("github")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Login</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center flex-col gap-2">
            <Image
              alt="Profile Image"
              className="rounded-full"
              src={session?.user?.image ? session.user?.image : "/favicon.ico"}
              width={200}
              height={200}
            />
            <div>
              <h2 className="text-center font-bold">{session?.user?.name}</h2>
              {!user || user?.message === "Not Found" ? (
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              ) : (
                <h3 className="text-center">@{user?.login}</h3>
              )}
            </div>
            <div className="flex justify-center items-center flex-col md:flex-row mt-5 gap-4">
              <Link
                className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 border-b-4 border-gray-500 hover:border-gray-500 rounded shadow flex gap-2"
                href="/write"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.408 13.032c1.158-.062 2.854-.388 4.18-1.128.962-1.478 1.598-2.684 2.224-4-.86.064-1.852-.009-2.736-.257 1.068-.183 2.408-.565 3.422-1.216 1.255-1.784 2.185-4.659 2.502-6.429-2.874-.048-5.566.89-7.386 2.064-.614.7-1.146 2.389-1.272 3.283-.277-.646-.479-1.68-.242-2.542-1.458.767-2.733 1.643-4.177 2.86-.72 1.528-.834 3.29-.768 4.276-.391-.553-.915-1.63-.842-2.809-2.59 2.504-4.377 5.784-2.682 9.324 1.879-1.941 4.039-3.783 5.354-4.639-3.036 3.474-5.866 8.047-7.985 12.181l2.504-.786c1.084-1.979 2.059-3.684 2.933-4.905 3.229.423 6.096-2.168 8.028-4.795-.77.19-2.246-.058-3.057-.482z" />
                </svg>
                <span>Escrever</span>
              </Link>
              <Link
                className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 border-b-4 border-gray-500 hover:border-gray-500 rounded shadow flex gap-2"
                href="/drafts"
              >
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path d="M24 23h-20c-2.208 0-4-1.792-4-4v-15.694c.313-1.071 1.285-2.306 3-2.306 1.855 0 2.769 1.342 2.995 2.312l.005 1.688h18v18zm-2-16h-16v11s-.587-1-1.922-1c-1.104 0-2.078.896-2.078 2s.896 2 2 2h18v-14zm-2 12h-12v-10h12v10zm-8-9h-3v8h10v-8h-6v3h6v1h-2v3h-1v-3h-3v3h-1v-7z" />
                </svg>
                <span>My drafts</span>
              </Link>
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 border-b-4 border-gray-500 hover:border-gray-500 rounded shadow flex gap-2"
                onClick={() => signOut()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 14.874v-1.814h-3.25c-.745 0-1.128-.26-1.451-.706l-1.709-2.302-2.791 3.024 1.509 2.149c.478.753.514 1.267.514 1.952v5.823h-2.699v-5.474c-.021-1.512-2.455-2.945-3.303-1.723l-1.617 2.281c-.359.51-.971.686-1.565.686h-4.638v-2.621l3.483-.003c.544 0 1.017-.193 1.274-.806l1.549-3.782c.269-.563.632-1.076 1.076-1.515l3.609-3.573-1.02-.891c-.306-.267-.716-.381-1.116-.311l-2.999.525-.471-2.201 4.115-.784c.771-.147 1.433.103 2.009.636l3.961 3.656c.628.57 1.272 1.563 2.276 3.047.184.272.443.656 1.053.656h2.201v-1.85l3 2.96-3 2.961zm-3.101-8.747c1.403-.268 2.323-1.623 2.055-3.026-.269-1.403-1.624-2.323-3.026-2.055-1.403.269-2.323 1.624-2.055 3.026.268 1.404 1.623 2.324 3.026 2.055z" />
                </svg>
                <span>Sair</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {data.map((post: any) => (
        <Card
          key={post.id}
          title={post.title}
          content={post.content}
          createdAt={post.createdAt}
          authorName={post.author.name}
          authorImage={post.author.image}
        />
      ))}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, image: true },
      },
    },
  });

  const data = JSON.parse(JSON.stringify(feed));

  return {
    props: { data },
    revalidate: 10,
  };
};
