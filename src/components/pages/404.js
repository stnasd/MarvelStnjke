import { Link } from 'react-router-dom'
import ErrorMessenge from '../errorMessenge/errorMessenge'

import grut from '../../resources/img/грут333.png'

import { motion } from "framer-motion/dist/framer-motion"
import { Helmet } from 'react-helmet'




const Page404 = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="error 404 page"
                />
                <title>error 404 page</title>
            </Helmet>
            <motion.div style={{ 'background': '#23411f', 'textShadow': '1px 1px black', 'position': 'relative' }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
            >
                <div style={{ 'display': 'flex', 'justifyContent': 'center', 'marginTop': '120px', 'alignItems': 'center' }}>
                    <p style={{ 'fontSize': '130px', 'textAlign': 'center', 'fontWeight': '600', 'color': '#9f0013' }}><span style={{ 'fontSize': '100' }}>error</span> 4<span style={{ 'color': 'black' }}>0</span>4</p>
                    <img src={grut} alt="grut" style={{ 'height': '100%', 'position': 'absolute', 'left': '75%', 'top': '0px' }} />
                </div>
                {/* <p style={{ 'fontSize': '35px', 'textAlign': 'center', 'fontWeight': '600' }}>Page doesn't exist</p> */}
                <Link
                    style={{
                        'color': '#9f0013', 'fontSize': '50px',
                        'fontWeight': '900', 'marginLeft': '10%'

                    }}
                    to="/">Back <span style={{ 'color': 'black' }}> to main page</span></Link>
            </motion.div>
        </>
    )
}


export default Page404;