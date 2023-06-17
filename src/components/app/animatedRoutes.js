import React from "react"
import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import { AnimatePresence } from 'framer-motion/dist/framer-motion'

const MainPage = lazy(() => import('../pages/mainPage'));
const ComicsPage = lazy(() => import('../pages/comicsPage'));
const Page404 = lazy(() => import('../pages/404'));
const SingleComicPage = lazy(() => import('../pages/singleComicPage'));
const SingleCharPage = lazy(() => import('../pages/singleCharPage'))

const Animatedroutes = () => {
    const location = useLocation();
    return (
        <div>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/comics" element={<ComicsPage />} />
                    <Route path="/comics/:comicId" element={<SingleComicPage />} />
                    <Route path="*" element={<Page404 />} />
                    <Route path="/comics/*" element={<Page404 />} />
                    <Route path="/characters/:character" element={<SingleCharPage />} />
                </Routes>
            </AnimatePresence>
        </div>
    )
}

export default Animatedroutes;