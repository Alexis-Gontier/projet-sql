import { Outlet } from 'react-router-dom'

import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

export default function MainLayout() {
  return (
    <>
        <Header />
        <main className="max-w-6xl mx-auto pt-14">
            <Outlet />
        </main>
        <Footer />
    </>
  )
}
