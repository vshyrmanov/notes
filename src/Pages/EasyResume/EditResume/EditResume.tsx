import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useRequest} from '../../../Components/Utils/fetching';
import MainInfo from "../../../Components/Layout/MainInfo";
import Button from "../../../Components/Buttons/Button";
import EditElement from "../../../Components/EditElement/EditElement";
import cn from "classnames";
import classes from './EditResume.module.scss';
import {Input} from "../../../Components/Input/Input";


interface IAbout {
    firstName: string,
    lastName: string,
    role: string,
    description: string
}

interface IContact {
    name: string,
    value: string
}

interface EditProps {
    name: string,
    about: IAbout,
    contacts: IContact[]
}



const EditResume = () => {
    const [data, setData] = useState<EditProps>()
    const [form, setForm] = useState<IAbout>()
    const [contact, setContact] = useState({name: "", value: ""})
    const [rerender, setRerender] = useState(false)
    const {id} = useParams()
    const {sendGetRequest, sendPutRequest} = useRequest()

    const get = () => {
        sendGetRequest('resume/getOne', id)
            .then(r => (setData(r.data), setForm(r.data.about), setRerender(false)))
    }
    const update = () => {
        sendPutRequest('resume/update', data)
            .then(() => setRerender(true))
    }

    useEffect(() => {
        get()
    }, [rerender])

    const clearAbout = (type: string): void => {
        setData({...data, [`${activeTab}`]: {...data[`${activeTab}`], [`${type}`]: ""}})
    }

    const clearContact = (type: string): void => {
        setContact({...contact, [`${type}`]: ""})
    }

    const editHandler = (type: string, val: string): void => {
        setData({...data, [`${activeTab}`]: {...data[`${activeTab}`], [`${type}`]: val}})
    }

    const editContact = (type: string, val: string, todo = setContact): void => {
        todo({...contact, [`${type}`]: val})
    }

    const aboutList = (type) => {
        return (
            <EditElement
                title={data[`${activeTab}`][`${type}`]}
                value={data[`${activeTab}`][`${type}`]}
                clearInput={() => clearAbout(type)}
                onChange={(e) => editHandler(type, e.target.value)}
            />
        )
    }

    const addContacts = (type) => {
        return (
            <>
                <Input
                    value={contact[`${type}`]}
                    clearInput={() => clearContact(type)}
                    onChange={(e) => editContact(type, e.target.value)} />
            </>
        )
    }

    const updateContacts = () => {

        setData({...data, contacts: [...data.contacts, contact]})
    }

    const [tabsList] = useState([
         "about",
        "contacts",
         "techSkills",
         "softSkills",
         // "Work experience",
         // "Education"
    ])

    const [activeTab, setActiveTab] = useState('about')

    const checkedTabs = (type) => {
        setActiveTab(type)
    }

    console.log(data)
    console.log(contact)

    return (
        <MainInfo>
            {data && form && <div className={classes.main}>
                <div className={classes.tabs}>
                    {tabsList.map(e =>
                        <span className={activeTab === e ? cn(classes.tab, classes.active) : classes.tab} key={e}
                              onClick={() => checkedTabs(e)}>{e}</span>)}
                </div>
                {activeTab === 'about' && aboutList('firstName')}
                {activeTab === 'about' && aboutList('lastName')}
                {activeTab === 'about' && aboutList('role')}
                {activeTab === 'about' && aboutList('description')}
                {activeTab === 'contacts' && (data.contacts.length ?
                    data.contacts.map(e => <div>{e}</div>) : <div>Empty contacts list</div>)}
                {activeTab === 'contacts' && addContacts('name')}
                {activeTab === 'contacts' && addContacts('value')}
                <Button onClick={updateContacts}>Add contact</Button>
                <Button onClick={update}>Update</Button>
            </div>}
        </MainInfo>

    )
}

export default EditResume;