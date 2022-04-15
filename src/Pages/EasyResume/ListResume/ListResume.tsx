import {useEffect, useState} from "react";
import MainInfo from "../../../Components/Layout/MainInfo";
import Button from "../../../Components/Buttons/Button";
import {useRequest} from '../../../Components/Utils/fetching';
import List from "../../../Components/List/List";
import {Modal} from "../../../Components/Modal/Modal";
import {Input} from "../../../Components/Input/Input";
import {IResumes} from "../../../Types/types";
import {ItemResume} from "../../../Components/ListItem/ItemResume";
import {Form} from '../../../Components/Form/Form';
import Loading from "../../../Components/Utils/Loading/Loading";
import classes from './ListResume.module.scss';

const ListResume = () => {
    const [data, setData] = useState<IResumes[]>([])
    const [rerender, setRerender] = useState(false)
    const [form, setForm] = useState({name: ''})
    const [modal, setModal] = useState(false)
    const {sendGetRequest, sendPostRequest, sendDeleteRequest} = useRequest()

    useEffect(() => {
        sendGetRequest('resume/getAll')
            .then(r => (setData(r.data.data), setRerender(false)))
    }, [rerender])


    const create = () => {
        sendPostRequest('resume/create', form)
            .then(() => (setRerender(true), handleModal()))
    }

    const remove = (id: string) => {
        sendDeleteRequest(`resume/remove/`, id)
            .then(() => setRerender(true))
    }

    const handleModal = () => {
        setModal(!modal)
    }

    const getFormValues = (val) => {
        setForm({...form, name: val})

    }

    console.log(data)

    return (
        <MainInfo>
            <div className={classes.listResume_main}>
                {<List
                    items={data}
                    renderItem={(resume: IResumes, index) =>
                        <ItemResume
                            key={resume._id}
                            resumes={resume}
                            index={index}
                            remove={remove}
                        />}
                />}
                <Button onClick={handleModal}>Create resume</Button>
                {modal && <Modal handleModal={handleModal}>
                    <Form value={form.name} onChange={getFormValues} sendForm={create} />
                </Modal>}
            </div>
        </MainInfo>
    )
}

export default ListResume
