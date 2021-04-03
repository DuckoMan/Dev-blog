import Head from "next/head"
import Link from "next/link"
import { Fragment } from "react"

export const MainLayout = ({children , title = "Next"}) => { 
    return (
        <Fragment>
            <Head>
                <title>Next | {title}</title>
            </Head>
            <nav>
                <Link href={"/"}><a>Home</a></Link>
                <Link href={"/about"}><a>About</a></Link>
                <Link href={"/posts"}><a>Posts</a></Link>
            </nav>
            <main>
                {children}
            </main>
            {/* если добавить "global" в тэг "style", то стили станут глобальными */}
            <style jsx >{`
                * {
                    padding:0;
                    margin:0;
                }
                nav{
                    position:fixed;
                    top:0;
                    height:60px;
                    left:0;
                    right:0;
                    width:100%;
                    background-color:black;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                }
                a{
                    color:white;
                    text-decoration:none;
                    padding:10px;
                }
                main{
                    margin-top:60px;
                }
            `}
            </style>
        </Fragment>
    )
}