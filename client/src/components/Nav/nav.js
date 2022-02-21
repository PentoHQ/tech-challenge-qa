import React from 'react'
import { Link } from 'react-router-dom'

const buttonNames = {
  '/': 'View Saved Sessions',
  '/sessions': 'Create New Session',
}

const buttonPaths = {
  '/': '/sessions',
  '/sessions': '/',
}

const Nav = (props) => {
  const path = (props.location ? props.location.pathname : '/') || '/'
  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <div
          className="disabled"
          style={{ marginBottom: '1em' }}
          aria-disabled="true"
        />
      </li>
      <li className="nav-item">
        <Link
          className="btn btn-secondary btn-sm"
          data-cy="btnSessionToggle"
          to={{
            pathname: buttonPaths[path],
          }}
        >
          {buttonNames[path]}

        </Link>
      </li>
    </ul>
  )
}

export default Nav
