import {useState , useEffect} from 'react'
import Link from "next/link";
import Image from 'next/image'  
import { MainLayout } from "../components/MainLayout";
import { Loader } from '../components/Loader';
import {PostTags} from "../components/posts/PostTags"
import { useSelector } from 'react-redux';
import PostStats from "../components/posts/PostStats"
import Router from 'next/router'

export default function Posts({ posts : serverPosts }){
    const [posts , setPosts] = useState(serverPosts)
    const userData = useSelector(state => state.auth)

    useEffect(() => {
        //frontend query
        const load = async () => {
            const responce = await fetch(`http://localhost:4200/posts`)
            const data = await responce.json()
            setPosts(data)
        }
        if(!serverPosts){
            load()
        }
    }, [])
    const clickHandles = ()=>{
        Router.push("./post/createPost")
    }
    if(!posts){ //если посты не подгрузились , показывает лоадер
        return (
            <MainLayout>
                <Loader/>
            </MainLayout>
        )
    }
    return (
        <MainLayout title={"Posts 💻"}>
            <div className="feeds">
                <div className="feeds__newsFeed">
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}} className="feeds__newsFeed__feedHeading">
                        <h1>POSTS 📃</h1>
                        { userData.userRole == "admin" ||  userData.userRole == "creator" ? <button onClick={clickHandles} className="crateArticleButton">Создать статью </button> : <div></div>}
                    </div>
                    <ul>
                        {posts.map(post => (
                            <div key={post.id} className="newsBlock">
                                <div className="news__heading">
                                    <Link className="news__heading__link" href={`/post/[id]`} as={`/post/${post.id}`}><a> {post.title} </a></Link>
                                    <PostStats liked={post.liked} watched={post.watched}/>
                                    <PostTags tagsList={post.tags}/>
                                    <hr/>
                                </div>
                                <div className="news__descriptin">{post.bodyPreview}</div>
                                {/* вместо чисел width и height в Image можно указать "auto" */}
                                <Image src={`/static/uploads/${post.preview}`} alt="post preview picture" width="1920" height="1080" /> 
                                <div className="news__footer">
                                    <h4 style={{textAlign:"start"}} className="news__footer__item news__footer__news__date">{post.date}</h4>
                                    <h4 style={{textAlign:"end"}} className="news__footer__item news__footer__news__author">by {post.author}</h4>
                                </div>
                            </div>
                            ))
                        }
                    </ul>
                </div>

                <div className="feeds__userFeed">

                </div>
            </div>


            <style jsx >{`
                .feeds{
                    width:100%;
                    display:flex;
                    justify-content:center;
                }
                .feeds__newsFeed{
                    display:flex;
                    flex-direction:column;
                    width: 48%;
                }
                .newsBlock{
                    list-style: none;
                    margin-bottom: 2%;
                    border-radius:5px;
                    display:block;
                }
                .news__heading__stats{
                    align-items: center;
                    display:flex;
                }
                .news__heading__stats__likes{
                    cursor:pointer;
                }
                .news__heading__stats__stat{
                    display:flex;
                    margin: 10px 20px 0 0;
                }
                .news__heading__stats__tags{
                    margin:2% 0 2% 0;
                    display:flex;
                }
                .news__descriptin{
                    color:#424242;
                    text-align: justify;
                    max-height: 200px;
                    overflow: hidden;
                    margin-bottom: 1%;
                }
                .news__footer{
                    display:flex;
                }
                ul{
                    justify-content:center;
                    padding:0;
                }
                a{
                    font-size: 1.9em;
                    color: #232323;
                    font-weight: 500;
                }
                .news__footer__item{
                    width:50%;
                    opacity:60%;
                }
                .crateArticleButton{
                    background:white;
                    color:black;
                    border:2px solid black;
                    transition:.3s;
                    padding:1%;
                    cursor:pointer;
                    border-radius:8px;
                }
                .crateArticleButton:hover{
                    background:black;
                    color:white;
                }
                .crateArticleButton:focus{
                    background:black;
                    color:white;
                }
                @media(max-width:1340px){
                    .feeds__newsFeed{
                        width:70%  
                    }
                }
                @media(max-width:800px){
                    .feeds__newsFeed{
                        width:80%  
                    }
                }
                @media(max-width:660px){
                    .feeds__newsFeed{
                        width:100%  
                    }
                }
            `}
            </style>
        </MainLayout>
    )
}

Posts.getInitialProps = async (ctx) => { // getInitialProps хорошо подходит тогда, когда необходимо взаимодействовать с фронтом
    if (!ctx.req){
        return {posts : null}
    }
    const responce = await fetch("http://localhost:4200/posts")
    const posts = await responce.json()

    return {
        posts
    }
}