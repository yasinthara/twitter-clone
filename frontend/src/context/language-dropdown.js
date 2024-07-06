const Languageoption = (props) => {
    return(
        <select onChange={props.onChange}>
            <option>select Language</option>
            <option value={'en'}>English</option>
            <option value={'chi'}>Chinese</option>
            <option value={'ko'}>Korean</option>
        </select>
    )
}

export default Languageoption;