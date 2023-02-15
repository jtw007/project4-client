import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import ListSearch from './ListSearch'
import InputSearch from './InputSearch'

const Search = () => {

   const [ fitsToDisplay, setFitsToDisplay ] = useState([])
   const [ filterValue, setFilterValue  ] = useState('')

   // make a reset button, resets filter value to empty string, call fetch data again

    const navigate = useNavigate()
    const token = localStorage.getItem('jwt')


    const fetchData = async () => {
        try {
            // hit the auth locked endpoint
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/inventory`, {headers: {'Authorization': token}})
            console.log(response.data, 'goodbuebd')
            setFitsToDisplay(response.data)
            // we are trying to set state to this fit components? trying to
            // this console logs all dbs clothes
            console.log(response.data, 'hello')
            console.log(fitsToDisplay, 'hello')
        } catch (err) {
            // if the error is a 401 -- that means that auth failed
            console.warn(err)
            if (err.response) {
                if (err.response.status === 401) {
                    // send the user to the login screen
                    navigate('/login')
                }
            }
        }
    }

    useEffect(() => {
			fetchData()
	}, [])


    const handleFilterChange = async (e) => {
        try {
        e.preventDefault()
        const filteredClothes = fitsToDisplay.filter(piece => {
            return piece.nickname.toLowerCase().includes(e.target.value.toLowerCase())
        })
        // this controls state from input
        setFilterValue(e.target.value)
        setFitsToDisplay(filteredClothes)
        } catch (error) {
            console.warn(error)
        }
    }
    
  

    return ( 
        <div>
            <h1>Search your Closet:</h1>
                <InputSearch
                    value={filterValue}
                    handleFilterChange={handleFilterChange}
                />
            <h1>Your filtered</h1>
                <ListSearch
                    pieces={fitsToDisplay}
                />
        </div>
        
     );
}
 
export default Search;