import React from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { RiVideoAddLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

// Layout
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";

import { MdHistory } from "react-icons/md";
import { CgPlayList } from "react-icons/cg";
import { MdOutlineWatchLater } from "react-icons/md";
import { BiLike } from "react-icons/bi";

import { FaYoutube } from "react-icons/fa";
import { SiYoutubemusic } from "react-icons/si";
import { SiYoutubekids } from "react-icons/si";

import { IoSettingsOutline } from "react-icons/io5";
import { FaRegFlag } from "react-icons/fa6";
import { CiCircleQuestion } from "react-icons/ci";
import { RiFeedbackLine } from "react-icons/ri";
import { Link } from 'react-router-dom';


export default function MenuBar() {
    return (
        <div className='MenuBar'>
            <nav>
                <div className='nav-box'>
                    <div className='layout-controle-btn'><MdOutlineMenu /></div>
                    <div className="logo"><h1><span><FaYoutube /></span>YouTube</h1></div>
                </div>
                <div className='search-container'>
                    <input
                        type="text"
                        placeholder='search You quary...'
                    />
                    <p><IoSearch /></p>
                </div>
                <ul className='nav-box'>
                    <li><RiVideoAddLine /></li>
                    <li><IoNotificationsOutline /></li>
                    <li><CgProfile /></li>
                </ul>
            </nav>

            <div className="Layout">
                <div className='layout-box'>
                    <ul>
                        <Link className='react-link' to='/'>
                            <li>
                                <IoMdHome />
                            </li>
                            <h6>Home</h6>
                        </Link>
                        <Link className='react-link' to='/shorts'>
                            <li><SiYoutubeshorts /></li>
                            <h6>Shorts</h6>
                        </Link>
                        <li><MdOutlineSubscriptions /></li>
                    </ul>
                </div>
                <div className='layout-box'>
                    <ul>
                        <li><CgProfile /></li>
                        <li><MdHistory /></li>
                        <li><CgPlayList /></li>
                        <li><MdOutlineWatchLater /></li>
                        <li><BiLike /></li>
                    </ul>
                </div>
                <div className='layout-box'>
                    <h3>Explore</h3>
                    <ul>
                        <li></li>
                    </ul>
                </div>
                <div className='layout-box'>
                    <ul>
                        <li><FaYoutube /></li>
                        <li><SiYoutubemusic /></li>
                        <li><SiYoutubekids /></li>
                    </ul>
                </div>
                <div className='layout-box'>
                    <ul>
                        <li><IoSettingsOutline /></li>
                        <li><FaRegFlag /></li>
                        <li><CiCircleQuestion /></li>
                        <li><RiFeedbackLine /></li>
                    </ul>
                </div>
                <div className='layout-box'>
                    <p>About Press Copyright Contact Harish Gurjar
                        TermsPrivacyPolicy & SafetyHow YouTube worksTest new features
                        © 2024 Google LLC</p>
                </div>
            </div>
        </div>
    )
}
