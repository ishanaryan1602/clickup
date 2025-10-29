import './style.css'

const HeroBanner = () => {
    return (
        <div className='herobanner_outer_div'>
            <h1 className='herobanner_h1_heading' >The everything app, for work</h1>
            <p className='herobanner_paragraph_below_h1' >One app for projects, knowledge, conversations and more.
                <br />
                Get more done, faster—together.</p>
            <div className='herobanner_get_started_button_outer_div2'>
                <div className='herobanner_get_started_button_outer_div1'>
                    <button className='herobanner_get_started_button' >
                        Get started. It's FREE!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner
