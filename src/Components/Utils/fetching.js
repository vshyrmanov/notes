import {useContext} from "react";
import {AuthContext} from "../../Context/AuthContext";
import {useHttp} from "../../Hooks/http.hooks";

export const LINK = 'https://arcane-falls-56249.herokuapp.com/'

export const useRequest = () => {
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    const sendGetRequest =  async (type, id = null) =>  {
        try {
            if (id) {
                const data = await request(`${LINK}${type}/${id}`, 'GET', null, {
                    Authorization: `Bearer ${auth.token}`
                })
                return {data}
            } else {
                const data = await request(`${LINK}${type}`, 'GET', null, {
                    Authorization: `Bearer ${auth.token}`
                })
                return {data}
            }
        } catch (e) {
        }
    }
    const sendPostRequest = async (type, data) => {
        try {
            await request(`${LINK}${type}`, 'POST', data, {
                Authorization: `Bearer ${auth.token}`
            })
        } catch (e) {
        }
    }
    const sendPutRequest = async (type, data) => {
        try {
            await request(`${LINK}${type}`, 'PUT', data, {
                Authorization: `Bearer ${auth.token}`
            })
        } catch (e) {
        }
    }
    const sendDeleteRequest = async (type, id) => {
        try {
            await request(`${LINK}${type}${id}`, 'DELETE', null, {
                Authorization: `Bearer ${auth.token}`
            })
        } catch (e) {
        }
    }

    return {sendGetRequest, sendPostRequest, sendPutRequest, sendDeleteRequest}
}
