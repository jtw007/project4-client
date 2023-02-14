import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
	//  const loggedIn = (
	// 	<>
	// 		{/* if the user is logged in... */}
	// 		<Link to="/">
	// 			<span onClick={handleLogout}>logout</span>
	// 		</Link>

	// 		<Link to="/profile">
	// 			profile
	// 		</Link>
	// 	</>
	//  )

	//  const loggedOut = (
	// 	<>
	// 		{/* if the user is not logged in... */}
	// 		<Link to="/register">
	// 			register
	// 		</Link>

	// 		<Link to="/login">
	// 			login
	// 		</Link>
	// 	</>
	//  )

	return (
		<nav>
			{/* user always sees this section */}
			<Link to="/inventory">
				<p>Inventory</p>
			</Link>

			<Link to="/search">
				<p>Search</p>
			</Link>
			<Link to="/create">
				<p>Create</p>
			</Link>
			<Link to="/" onClick={handleLogout}>
				<p>Logout</p>
			</Link>



			{/* {currentUser ? loggedIn : loggedOut} */}
		</nav>
	)
}