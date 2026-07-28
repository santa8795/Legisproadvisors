import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Support from '../components/Support'
import Clients from '../components/Clients'
import WhyChooseUs from '../components/WhyChooseUs'
import Blogs from '../components/Blogs'

function Home() {
    return (
        <div>
            <Hero />
            <About />
            <Support />
            <Clients />
            <WhyChooseUs />
            <Blogs/>
        </div>
    )
}

export default Home