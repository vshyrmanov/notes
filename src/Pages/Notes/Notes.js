import React, {useEffect, useState} from 'react'
import MainInfo from "../../Components/Layout/MainInfo";
import Loading from '../../Components/Utils/Loading/Loading';
import classes from './Notes.module.scss'
import SVG from 'react-inlinesvg'
import {useRequest} from '../../Components/Utils/fetching';
import NoteCard from './NoteCard';

const Notes = () => {
    const [data, setData] = useState()
    const [form, setForm] = useState({text: "New note"})
    const [newNote] = useState({text: "New note"})
    const [rerender, setRerender] = useState(false)
    const {sendGetRequest, sendPutRequest, sendPostRequest, sendDeleteRequest} = useRequest()

    useEffect(() => {
        sendGetRequest('notes/getAll')
            .then(r => (setData(r.data.data), setRerender(false)))
    }, [rerender])


    const create = () => {
         sendPostRequest('notes/create', newNote)
            .then(() => (setRerender(true)))
             .then(() => {
                 let scrollBottom = document.getElementById('notes')
                 scrollBottom.scrollTop = scrollBottom.scrollHeight
             })
    }

    const update = () => {
        sendPutRequest('notes/update', form)
            .then(() => (setRerender(true)))
    }

    const remove = (id) => {
        sendDeleteRequest('notes/remove/', id)
            .then(() => setRerender(true))
    }

    useEffect(() => {
        update()
    }, [form])

    const scale = (i, type, value) => {
        setForm({...i, [`${type}`]: value})
    }


    return (
        <MainInfo>
            <div className={classes.notes_main} id="notes">
                <SVG src={"image/svg/notes/add.svg"} onClick={() => create()} className={classes.notes_add} width={40} height={40}/>
                {data ? data.map(e =>
                    <NoteCard
                        key={e._id}
                        i={e}
                        remove={remove}
                        scale={scale}
                    />) : <Loading />}
                {data && data.length === 0 && <div className={classes.loading}>Empty list of notes. Press + for add note.</div>}
            </div>
        </MainInfo>
    )
}

export default Notes;