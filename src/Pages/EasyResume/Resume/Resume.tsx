import React, {useEffect, useState} from "react";
import {useRequest} from '../../../Components/Utils/fetching';
import {useParams, Link} from "react-router-dom";

import classes from './Resume.module.scss';
import SVG from "react-inlinesvg";
import cn from "classnames";

interface IAbout {
    firstName: string,
    lastName: string,
    role: string,
    description: string
}

interface ResumeProps {
    name: string,
    about: IAbout
}

const Resume = () => {
    const [data, setData] = useState<ResumeProps>()
    const {sendGetRequest} = useRequest()
    const {id} = useParams()

    const get = () => {
        sendGetRequest('resume/getOne', id)
            .then(r => setData(r.data))
    }
    useEffect(() => {
        get()
    }, [])

    const goto = (to) => {
        localStorage.setItem('path', to)
    }


    console.log(data)

    return (
        <div className={classes.main}>
            <Link to={'/resume'} onClick={() => goto('resume')}>
                <button>Back</button>
            </Link>
            {data && <div className={classes.container}>
                <div className={classes.aside}>
                    <div className={classes.photo} />
                    <h3>Contacts</h3>
                    <div className={classes.section}>
                        <ul>
                            <li>
                                <SVG src={'/image/svg/resume/mail.svg'} width={20} height={20}/>
                                <span>test@teset.com</span>
                            </li>
                            <li>
                                <SVG src={'/image/svg/resume/mail.svg'} width={20} height={20}/>
                                <span>test@teset.com</span>
                            </li>
                            <li>
                                <SVG src={'/image/svg/resume/mail.svg'} width={20} height={20}/>
                                <span>test@teset.com</span>
                            </li>
                        </ul>

                    </div>
                    <h3>Tech skills</h3>
                    <div className={classes.section}>
                        <ul>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>JS</li>
                            <li>React</li>
                            <li>Nodejs</li>
                        </ul>
                    </div>
                    <h3>Soft skills</h3>
                    <div className={classes.section}>
                        <ul>
                            <li>Jira</li>
                            <li>Scrum</li>
                            <li>Activity</li>
                        </ul>
                    </div>
                </div>
                <div className={classes.mainInfo}>
                    <div className={cn(classes.main_section, classes.title)}>
                        <h4>{data.about.role}</h4>
                        <h2>{data.about.firstName} {data.about.lastName}</h2>
                    </div>
                    <div className={cn(classes.main_section, classes.about)}>
                        {data.about.description}
                    </div>
                    <div className={cn(classes.main_section, classes.experience)}>
                        <h3>Work experience</h3>
                        <ul>
                            <h4>Frontend developer at Eatcode</h4>
                            <p>From 2020 - 2021</p>
                            <li>Work with designs.</li>
                            <li>Work with designs.</li>
                            <li>Work with designs.</li>
                            <li>Work with designs.</li>
                        </ul>
                        <ul>
                            <h4>Frontend developer at Eatcode</h4>
                            <p>From 2020 - 2021</p>
                            <li>Work with designs.</li>
                            <li>Work with designs.</li>
                            <li>Work with designs.</li>
                            <li>Work with designs.</li>
                        </ul>
                    </div>
                    <div className={cn(classes.main_section, classes.education)}>
                        <h3>Education</h3>
                        <ul>
                            <h4>NAVS</h4>
                            <label>LAW</label>
                            <p>from 2010 to 2014</p>
                        </ul>
                        <ul>
                            <h4>NAVS</h4>
                            <label>LAW</label>
                            <p>from 2010 to 2014</p>
                        </ul>
                    </div>
                    <div className={cn(classes.main_section, classes.education)}>
                        <h3>Curses</h3>
                        <ul>
                            <h4>Ucode IT Academy</h4>
                            <label>FE</label>
                            <p>from 2010 to 2014</p>
                        </ul>
                        <ul>
                            <h4>Udemy</h4>
                            <label>TS</label>
                            <p>from 2010 to 2014</p>
                        </ul>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Resume;
