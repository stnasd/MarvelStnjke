import AppHeader from "../appHeader/AppHeader";
import Animatedroutes from "./animatedRoutes";
import { Suspense } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Spinner from "../spinner/spinner";




const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Animatedroutes />
                    </Suspense>
                </main>
            </div>
        </Router >
    )

}



export default App;