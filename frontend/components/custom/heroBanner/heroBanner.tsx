import './style.css'

const HeroBanner = () => {
    return (
        <div className='herobanner_outer_div'>
            <h1 className='herobanner_h1_heading' >The everything app, for work</h1>
            <p className='herobanner_paragraph_below_h1' >One app for projects, knowledge, conversations and more.
                <br/>
                Get more done, faster—together.</p>
            <button className='herobanner_get_started_button' >
                Get started. It's FREE!
            </button>
        </div>
    )
}

export default HeroBanner
