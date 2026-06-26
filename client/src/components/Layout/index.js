import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

import './index.css'

const Layout = ({children}) => {

    return(

        <div>

            <Navbar/>

            <div className="layout">

                <Sidebar/>

                <main className="main-content">

                    {children}

                </main>

            </div>

        </div>

    )

}

export default Layout