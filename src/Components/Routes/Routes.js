import React, {Suspense, lazy} from 'react'
import {Route, Routes, Navigate} from "react-router-dom";
import cn from 'classnames'
import Loading from '../Utils/Loading/Loading';
import classes from './Routes.module.scss'

const HomeScreen = lazy(() => import('../../Pages/HomeScreen/HomeScreen'))
const AuthPage = lazy(() => import('../../Pages/AuthPage/AuthPage'))
const Calculator = lazy(() => import('../../Pages/Calculator/Calculator'))
const Quiz = lazy(() => import('../../Pages/Quiz/Quiz'))
const Notes = lazy(() => import('../../Pages/Notes/Notes'))
const EasyResume = lazy(() => import('../../Pages/EasyResume/ListResume/ListResume'))
const Resume = lazy(() => import('../../Pages/EasyResume/Resume/Resume'))
const EditResume = lazy(() => import('../../Pages/EasyResume/EditResume/EditResume'))


const UseRoutes = ({showSidebar, isAuthenticated}) => {

    if (isAuthenticated) {
            return (<Suspense fallback={<Loading />}>
                <div className={showSidebar ? classes.home_main : cn(classes.home_main, classes.home_pullOf)}>
                    <Routes>
                        <Route path="/" element={<HomeScreen />}/>
                        <Route path="home" element={<Notes />} />
                        {/*<Route path="calculator" element={<Calculator />}/>*/}
                        <Route path="quiz" element={<Quiz />} />
                        {/*<Route path="notes" element={<Notes />} />*/}
                        {/*<Route path="resume" element={<EasyResume />} />*/}
                        {/*<Route path="resume/edit/:id" element={<EditResume />} />*/}
                        {/*<Route path="resume/:id" target={"_blank"} element={<Resume />} />*/}
                        {/*<Route path="*" exact element={<Navigate to="/" />} />*/}
                    </Routes>
                </div>
            </Suspense>)

    } else {
        return (<Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="*" exact element={<Navigate to="/" />} />
            </Routes>
        </Suspense>)
    }

}

export default UseRoutes